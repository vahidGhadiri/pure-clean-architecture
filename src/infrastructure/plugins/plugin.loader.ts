import type { Plugin } from './plugin.interface.js';

interface PluginConfig {
  options?: Record<string, unknown>;
  name: string;
}

export class PluginLoader {
  async loadPlugins(pluginConfigs: PluginConfig[]): Promise<Plugin[]> {
    const plugins: Plugin[] = [];

    for (const config of pluginConfigs) {
      try {
        const plugin = await this.loadPlugin(config);
        plugins.push(plugin);
      } catch {
        console.warn(`Failed to load plugin "${config.name}"`);
      }
    }

    return plugins;
  }

  private async loadPlugin(config: PluginConfig): Promise<Plugin> {
    const module = await import(config.name);
    const factory = module.default || module;

    if (typeof factory !== 'function') {
      throw new Error(`Plugin "${config.name}" does not export a function`);
    }

    return factory(config.options || {});
  }
}
