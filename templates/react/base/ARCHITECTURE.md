# Architecture: Modular Clean Architecture with Vertical Slice Presentation

## Two top-level concerns

```
src/
├── shared/          ← Cross-cutting: kernel, contracts, infrastructure
├── modules/         ← Business logic per domain (account, card, loan…)
└── features/        ← Presentation/UI organized as vertical slices
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
features/* → modules/*/index.ts only
```

```
┌─────────────────────────────────────────────────────┐
│  features/*                                         │
│    ↳ modules/*/index.ts  ← ONLY entry point        │
├─────────────────────────────────────────────────────┤
│  modules/account/account.provider.ts                │
│    ↳ application + infrastructure                   │
├─────────────────────────────────────────────────────┤
│  modules/account/application/                       │
│    ↳ modules/account/domain                         │
├─────────────────────────────────────────────────────┤
│  modules/account/infrastructure/                    │
│    ↳ domain + shared/contracts                      │
├─────────────────────────────────────────────────────┤
│  modules/account/domain/                            │
│    ↳ shared/kernel only                             │
├─────────────────────────────────────────────────────┤
│  shared/infrastructure                              │
│    ↳ shared/contracts + shared/kernel               │
├─────────────────────────────────────────────────────┤
│  shared/contracts                                   │
│    ↳ shared/kernel                                  │
├─────────────────────────────────────────────────────┤
│  shared/kernel                                      │
│    ↳ (nothing)                                      │
└─────────────────────────────────────────────────────┘
```

## Result-based error handling

Use-cases return `Result<T, AppError>` — never throw across the module boundary.
Infrastructure repositories may throw (they interact with the outside world), but
errors are wrapped and converted to `Result` at the use-case boundary via `tryCatch()`.

```typescript
// shared/kernel/result.ts
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

## React Query as adapters

React Query hooks in `features/*/hooks/` serve as the adapter between the UI and
module use-cases. They handle data fetching, caching, loading/error states, and
mutation orchestration — while use-cases handle pure business logic.

```typescript
// features/dashboard/hooks/use-dashboard-accounts.ts
import { useQuery } from "@tanstack/react-query";
import { getAccounts } from "@modules/account";

export function useAccounts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const result = await getAccounts.execute();
      if (!result.success) throw result.error;  // React Query catches this
      return result.data.map(toDto);             // map domain → DTO
    },
  });

  return { accounts: data ?? [], isLoading, error };
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
// account.provider.ts — one-time, generic
import { createModuleProvider } from "@shared/kernel";

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
- stateManagement
