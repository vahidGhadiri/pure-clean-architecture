export type ExitCode = (typeof ExitCode)[keyof typeof ExitCode];

export const ExitCode = {
  USER_CANCELLED: 2,
  SYSTEM_ERROR: 3,
  CONFIG_ERROR: 4,
  SUCCESS: 0,
  GENERAL: 1,
} as const;
