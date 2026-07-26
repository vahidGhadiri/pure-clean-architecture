# Architecture: Modular Clean Architecture with Vertical Slice Presentation

## Two top-level concerns

```
src/
├── kernel/           ← Architecture layers: modules, shared, adapters
│   ├── modules/      ← Business logic per domain (account, product, order…)
│   ├── shared/       ← Cross-cutting: contracts, composition, infrastructure
│   └── adapters/     ← UI adapters (React Query hooks)
├── presentation/     ← Presentation/UI organized as vertical slices
└── providers/        ← Provider wrappers (e.g., QueryProvider)
```

**Modules** contain pure business logic, following Clean Architecture layering
internally. They are framework-agnostic (except for documented, isolated exceptions).

**Features** are presentation-layer vertical slices — one folder per user-facing
feature. They consume modules through their public API only (`modules/*/index.ts`).

A single business domain (module) may be consumed by multiple features. A single
feature may consume multiple modules. This many-to-many relationship is why modules
and features are **not** nested inside each other.

```
features/dashboard/hooks/use-dashboard-accounts.ts
  → imports from modules/account/index.ts   (module public API)

features/transfer/hooks/use-transfer.ts
  → imports from modules/account/index.ts   (same module, different feature)
  → imports from modules/card/index.ts      (different module, same feature)
```

## The dependency rule

Enforced by `eslint-plugin-boundaries` — violations fail lint/CI.

```
domain → (nothing)
application → domain only
infrastructure → domain + shared/contracts
modules/*/index.ts (public API) → application only
adapters/* → modules/*/index.ts only
```

```
┌─────────────────────────────────────────────────────┐
│  adapters/*                                         │
│    ↳ modules/*/index.ts  ← ONLY entry point         │
├─────────────────────────────────────────────────────┤
│  modules/account/account.context.ts                 │
│    ↳ application + infrastructure                   │
├─────────────────────────────────────────────────────┤
│  modules/account/application/                       │
│    ↳ modules/account/domain                         │
├─────────────────────────────────────────────────────┤
│  modules/account/infrastructure/                    │
│    ↳ domain + shared/contracts                      │
├─────────────────────────────────────────────────────┤
│  modules/account/domain/                            │
│    ↳ shared/composition only                        │
├─────────────────────────────────────────────────────┤
│  shared/infrastructure                              │
│    ↳ shared/contracts + shared/composition          │
├─────────────────────────────────────────────────────┤
│  shared/contracts                                   │
│    ↳ shared/composition                             │
├─────────────────────────────────────────────────────┤
│  shared/composition                                 │
│    ↳ (nothing)                                      │
└─────────────────────────────────────────────────────┘
```

## Result-based error handling

Use-cases return `Result<T, AppError>` — never throw across the module boundary.
Infrastructure repositories may throw (they interact with the outside world), but
errors are wrapped and converted to `Result` at the use-case boundary via `tryCatch()`.

```typescript
// kernel/shared/composition/result.ts
type Result<T, E = AppError> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: E };

// Helper: wraps any async function into Result
async function tryCatch<T>(fn: () => Promise<T>): Promise<Result<T>>

// Convenience utilities
ok(data)                    // → Result<T> with success
err(error)                  // → Result<never> with error
unwrap(result)              // → T or throws
isOk(result) / isErr(result) // type guards
mapResult(result, fn)       // transform success value
combine(resultA, resultB)   // merge multiple Results
```

## Adapters

### React Query

React Query hooks in `kernel/adapters/` serve as the adapter between the UI and
module use-cases. They handle data fetching, caching, loading/error states, and
mutation orchestration — while use-cases handle pure business logic.

```typescript
// kernel/adapters/account/queries/use-get-accounts.ts
import { useQuery } from "@tanstack/react-query";
import { useAccountContext } from "../..";

export function useAccounts() {
  const { getAccounts } = useAccountContext();

  const { isLoading, refetch, error, data } = useQuery({
    queryFn: () => getAccounts.execute(),
    queryKey: ["accounts"],
  });

  return { accounts: data ?? [], isLoading, refetch, error };
}
```

The hook calls the module's public API, unwraps the Result, and lets React Query
manage the async state. Components never see Result — they see `{ data, isLoading, error }`.

## Module provider: before vs. after

### Before (manual composition per module)

```typescript
// Every module needed this boilerplate:
const accountHttp = createHttp(AccountEndpoints, { baseUrl: API_URL });
const accountRepository = new AccountRepository(accountHttp);
const createAccount = new CreateAccountUseCase(accountRepository);
const getAccount = new GetAccountUseCase(accountRepository);
const getAccounts = new GetAccountsUseCase(accountRepository);
const updateAccount = new UpdateAccountUseCase(accountRepository);

export { createAccount, getAccount, getAccounts, updateAccount };
```

5 lines of wiring per use-case. If you add a 6th use-case, you add another line.
If you change the repository constructor, you update every module's wiring.

### After (with `createModuleProvider`)

```typescript
// account.context.ts — one-time, generic
import { createModuleProvider } from "@shared_kernel/composition";

export const createAccountProvider = createModuleProvider({
  createRepository: ({ http }) => new AccountRepository(http),
  createUseCases: (repo) => ({
    createAccount: new CreateAccountUseCase(repo),
    getAccount: new GetAccountUseCase(repo),
    getAccounts: new GetAccountsUseCase(repo),
    updateAccount: new UpdateAccountUseCase(repo),
  }),
});
```

```typescript
// modules/account/index.ts — public API
export function createAccountModule(http: IHttp<AccountEndpoints>) {
  return createAccountProvider({ http });
}
```

The factory eliminates repetition across modules. Every module follows the same
pattern: define `createRepository` + `createUseCases`, and the factory handles
the wiring. Adding a new use-case means adding one entry to `createUseCases` — no
boilerplate outside that single object.

## File naming conventions

| Pattern | Example | Purpose |
|---------|---------|---------|
| `*.entity.ts` | `account.entity.ts` | Class with validating factory + encapsulated invariants |
| `*.value-objects.ts` | `account.value-objects.ts` | Value objects with their own validation |
| `*.errors.ts` | `account.errors.ts` | Domain-specific error classes extending `AppError` |
| `*.repository.ts` (domain) | `account.repository.ts` | Port/interface — methods accept/return domain types only |
| `*.repository.ts` (infra) | `account.repository.ts` | Adapter implementing the port |
| `*.dto.ts` | `create-account.dto.ts` | Data transfer objects in `application/dto/` |
| `*.use-case.ts` | `create-account.use-case.ts` | One class per use-case, single responsibility |
| `*.provider.ts` | `account.provider.ts` | Composition root for this module ONLY |
| `*.endpoints.ts` | `account.endpoints.ts` | Endpoint path constants in infrastructure |
| `*.mapper.ts` | `account.mapper.ts` | Pure functions: raw API shape ↔ domain entity |

**Critical:** Never use "domain" in the name of anything that performs infrastructure
wiring or composition. A composition factory is `*.provider.ts`, not `*DomainProvider`.

### Template variables

- projectName
