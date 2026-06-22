import path from 'node:path';
import fs from 'fs-extra';

interface PureCleanConfig {
  plugins: Array<[string, Record<string, unknown>] | string>;
}

interface PluginConfigEntry {
  options?: Record<string, unknown>;
  name: string;
}

export function getPluginConfigs(): PluginConfigEntry[] {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      return [];
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as Record<string, unknown>;
    const config = (packageJson['pure-clean'] as PureCleanConfig) || { plugins: [] };

    return config.plugins.map((plugin) => {
      if (Array.isArray(plugin)) {
        return { options: plugin[1], name: plugin[0] };
      }
      return { name: plugin };
    });
  } catch {
    return [];
  }
}
