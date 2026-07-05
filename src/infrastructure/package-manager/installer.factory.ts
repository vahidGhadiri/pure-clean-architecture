import type { IPackageInstaller, IInstallerFactory } from '../../domain/interfaces.js';
import type { PackageManager } from '../../domain/project.options.js';
import { PnpmInstaller } from './installers/pnpm.installer.js';
import { YarnInstaller } from './installers/yarn.installer.js';
import { NpmInstaller } from './installers/npm.installer.js';

const installers: Record<PackageManager, () => IPackageInstaller> = {
    pnpm: () => new PnpmInstaller(),
    yarn: () => new YarnInstaller(),
    npm: () => new NpmInstaller(),
};

export class InstallerFactory implements IInstallerFactory {
    create(manager: string): IPackageInstaller {
        const factory = installers[manager as PackageManager];

        if (!factory) {
            throw new Error(`Unknown package manager: ${manager}`);
        }

        return factory();
    }
}
