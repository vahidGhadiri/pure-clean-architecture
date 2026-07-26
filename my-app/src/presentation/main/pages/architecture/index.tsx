import { useState } from 'react';

import './architecture.css';

type LayerId = 'presentation' | 'adapters' | 'application' | 'domain' | 'infrastructure';

interface TechDetail {
  readonly label: string;
  readonly value: string;
}

interface LayerInfo {
  readonly id: LayerId;
  readonly name: string;
  readonly hex: string;
  readonly subtitle: string;
  readonly description: string;
  readonly files: readonly string[];
  readonly techDetails: readonly TechDetail[];
  readonly rules: readonly string[];
  readonly path: string;
}

const presentationLayer: LayerInfo = {
  id: 'presentation',
  name: 'Presentation',
  hex: '#ec4899',
  subtitle: 'React Components & Routes',
  description:
    'The outermost layer. Contains React components, page layouts, and routing configuration. Components never contain business logic — they delegate all data operations to adapter hooks.',
  files: [
    'Components — Reusable UI elements (buttons, cards, forms)',
    'Pages — Route-level layouts (Main, Contact, Architecture)',
    'Routes — React Router configuration with lazy loading',
    'Styles — CSS modules or Tailwind classes',
  ],
  techDetails: [
    { label: 'Framework', value: 'React 19 + TypeScript' },
    { label: 'Routing', value: 'React Router v7 with lazy() code splitting' },
    { label: 'Styling', value: 'CSS Modules / Tailwind CSS' },
    { label: 'State', value: 'Local useState/useReducer only — no global state' },
    { label: 'Data Access', value: 'Adapter hooks (useAccounts, useCreateProduct)' },
    { label: 'Rendering', value: 'Server-compatible with strict mode enabled' },
  ],
  rules: [
    'Never import from core/ or infrastructure/',
    'Delegate all data fetching to adapter hooks',
    'Components receive data via props — no side effects',
    'All pages use React.lazy() for code splitting',
  ],
  path: 'src/presentation',
};

const adaptersLayer: LayerInfo = {
  id: 'adapters',
  name: 'Adapters',
  hex: '#f59e0b',
  subtitle: 'TanStack Query Hooks',
  description:
    'Bridge between Presentation and the Bounded Context. Adapter hooks call the module\'s public API (use cases) and wrap results in useQuery/useMutation for automatic caching, background refetch, and cache invalidation.',
  files: [
    'Commands — useCreateAccount, useUpdateAccount (mutations)',
    'Queries — useAccounts, useAccount (queries)',
    'Query Keys — Cache invalidation strategies per entity',
    'Context — useAccountContext for dependency injection',
  ],
  techDetails: [
    { label: 'State Manager', value: 'TanStack Query v5' },
    { label: 'Caching', value: 'Stale-while-revalidate with configurable gcTime' },
    { label: 'Mutations', value: 'useMutation with automatic query invalidation' },
    { label: 'Query Keys', value: 'Entity-scoped arrays: ["accounts"], ["accounts", id]' },
    { label: 'DI Pattern', value: 'React Context wrapping bounded context factories' },
    { label: 'Optimistic Updates', value: 'onMutate callback + queryClient.setQueryData' },
  ],
  rules: [
    'Always resolve use case from context — never instantiate directly',
    'Wrap every use case call in useQuery or useMutation',
    'Define query keys as typed constants per entity',
    'Invalidate related queries after successful mutations',
  ],
  path: 'src/adapters',
};

const applicationLayer: LayerInfo = {
  id: 'application',
  name: 'Application',
  hex: '#10b981',
  subtitle: 'Use Cases — Orchestrating Logic',
  description:
    'Inside the Bounded Context. Each use case represents a single business operation. It receives a repository port from the domain and orchestrates the business logic. Use cases depend ONLY on domain interfaces — no HTTP, no databases, no React.',
  files: [
    'Use Cases — One class per operation (Create, Get, Update)',
    'DTOs — Input/output typed shapes',
    'Ports — Receives repository interface via constructor',
  ],
  techDetails: [
    { label: 'Pattern', value: 'Single Responsibility — one class per use case' },
    { label: 'Dependencies', value: 'Domain interfaces only (repository ports)' },
    { label: 'DI', value: 'Constructor injection with typed port interfaces' },
    { label: 'Error Handling', value: 'Result<T> type — no thrown exceptions' },
    { label: 'Input/Output', value: 'DTOs defined in domain layer' },
    { label: 'Testing', value: 'Unit test with mock repository — no I/O' },
  ],
  rules: [
    'Never import from adapters/, presentation/, or infrastructure/',
    'Receive repository port via constructor — never instantiate',
    'One use case class per business operation',
    'Return Result<T> instead of throwing errors',
  ],
  path: 'src/kernel/modules/*/application',
};

const domainLayer: LayerInfo = {
  id: 'domain',
  name: 'Domain',
  hex: '#6366f1',
  subtitle: 'DTOs & Repository Ports',
  description:
    'Inside the Bounded Context. Contains DTOs (data transfer objects) and repository port interfaces. This layer has ZERO external dependencies — no React, no HTTP, no databases. It defines WHAT the business needs, not HOW it\'s implemented.',
  files: [
    'DTOs — AccountDto, CreateAccountDto, UpdateAccountDto',
    'Repository Ports — IAccountRepository interface',
    'Types — AccountType enum, domain-specific values',
    'Zero external imports — pure TypeScript only',
  ],
  techDetails: [
    { label: 'Dependencies', value: 'Zero — pure TypeScript types only' },
    { label: 'DTOs', value: 'Readonly interfaces with branded types where needed' },
    { label: 'Ports', value: 'Repository interfaces defining CRUD contracts' },
    { label: 'Enums', value: 'Const enums for domain-specific values' },
    { label: 'Validation', value: 'Zod schemas co-located with DTOs' },
    { label: 'Tree-Shaking', value: 'Full — no runtime code, types only' },
  ],
  rules: [
    'Zero imports from any other layer or external library',
    'Define interfaces for what the business needs — not how',
    'Use readonly properties on all DTOs',
    'Co-locate Zod schemas with their DTO definitions',
  ],
  path: 'src/kernel/modules/*/domain',
};

const infrastructureLayer: LayerInfo = {
  id: 'infrastructure',
  name: 'Infrastructure',
  hex: '#a855f7',
  subtitle: 'Repository Implementations & HTTP',
  description:
    'The innermost layer. Implements domain repository ports with concrete HTTP calls, storage, and external service integrations. This is where requests actually happen. Swapping an API provider changes ONLY this layer.',
  files: [
    'Repositories — Implements IAccountRepository',
    'Endpoints — API path constants per entity',
    'HTTP Client — Typed request/response via shared kernel',
    'Storage — Cache persistence via shared kernel',
  ],
  techDetails: [
    { label: 'HTTP Client', value: 'Typed fetch wrapper with request/response generics' },
    { label: 'Storage', value: 'LocalStorage + session with type-safe get/set' },
    { label: 'Endpoints', value: 'Const object mapping action → URL + method' },
    { label: 'Error Mapping', value: 'HTTP status → domain error codes' },
    { label: 'Interceptors', value: 'Request/response middleware via HOF pattern' },
    { label: 'Swap Cost', value: 'Change one file to switch API providers' },
  ],
  rules: [
    'Implement domain repository interfaces — nothing else',
    'All HTTP calls go through the shared typed client',
    'Map HTTP errors to domain Result error codes',
    'Endpoint definitions are static const objects per entity',
  ],
  path: 'src/kernel/modules/*/infrastructure',
};

const layers: readonly LayerInfo[] = [
  infrastructureLayer,
  domainLayer,
  applicationLayer,
  adaptersLayer,
  presentationLayer,
];

const Architecture = () => {
  const [selected, setSelected] = useState<LayerId>('domain');
  const active = layers.find((l) => l.id === selected)!;

  return (
    <div className="arch">
      <div className="arch-glow" />

      <section className="arch-hero">
        <div className="arch-hero-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          Clean Architecture
        </div>
        <h1 className="arch-title">Architecture Deep Dive</h1>
        <p className="arch-desc">Click on any layer to explore its responsibilities, tech stack, and constraints.</p>
      </section>

      <section className="arch-explorer">
        <div className="explorer-diagram">
          <div className="rings-stack" style={{ '--active-hex': active.hex } as React.CSSProperties}>
            {[...layers].reverse().map((layer) => {
              const isActive = selected === layer.id;
              const isDimmed = selected !== layer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  className={[
                    'ring',
                    `ring-${layer.id}`,
                    isActive && 'ring-active',
                    isDimmed && 'ring-dimmed',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{ '--ring-hex': layer.hex } as React.CSSProperties}
                  onClick={() => setSelected(layer.id)}
                >
                  <span className="ring-label">{layer.name}</span>
                </button>
              );
            })}
            <div className="boundary-line">
              <span className="boundary-text">BOUNDARY</span>
            </div>
            <div className="ring-center-dot" />
          </div>
          <p className="diagram-caption">Presentation → Adapters → <strong>Bounded Context</strong> → Application → Domain → Infrastructure</p>
        </div>

        <div className="explorer-detail" key={active.id}>
          <div className="detail-header">
            <div className="detail-badge" style={{ color: active.hex, background: `${active.hex}1a` }}>
              {active.name}
            </div>
            <code className="detail-path">{active.path}</code>
          </div>

          <h2 className="detail-subtitle">{active.subtitle}</h2>
          <p className="detail-desc">{active.description}</p>

          <div className="detail-tech">
            <h4>Tech Details</h4>
            <div className="tech-grid">
              {active.techDetails.map((t) => (
                <div key={t.label} className="tech-item">
                  <span className="tech-label">{t.label}</span>
                  <span className="tech-value">{t.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-files">
            <h4>What goes here</h4>
            <ul>
              {active.files.map((file) => (
                <li key={file}>{file}</li>
              ))}
            </ul>
          </div>

          <div className="detail-rules">
            <h4>Rules & Constraints</h4>
            <ul>
              {active.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Architecture;
