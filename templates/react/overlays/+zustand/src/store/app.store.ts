import { create } from 'zustand';

// ── types ────────────────────────────────────────────────────────

type Theme = 'light' | 'dark' | 'system';

interface UIState {
  readonly sidebarOpen: boolean;
  readonly theme: Theme;
  readonly setSidebarOpen: (open: boolean) => void;
  readonly toggleSidebar: () => void;
  readonly setTheme: (theme: Theme) => void;
}

// ── store factory ────────────────────────────────────────────────
// Factory pattern enables DI: replace createAppStore() in tests
// to get a fresh, isolated store per test case.

export function createAppStore() {
  return create<UIState>((set) => ({
    sidebarOpen: false,
    theme: 'system',
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    setTheme: (theme) => set({ theme }),
  }));
}

// ── default singleton (production) ───────────────────────────────

export const useAppStore = createAppStore();
export type AppStore = ReturnType<typeof createAppStore>;
