import type { Ora } from 'ora';
import pc from 'picocolors';
import ora from 'ora';

export class TerminalService {
  private spinner: null | Ora = null;

  step(current: number, total: number, message: string): void {
    console.log(pc.dim(`  [${current}/${total}]`) + ` ${message}`);
  }

  succeed(message?: string): void {
    if (this.spinner) {
      this.spinner.succeed(message);
      this.spinner = null;
    }
  }

  fail(message?: string): void {
    if (this.spinner) {
      this.spinner.fail(message);
      this.spinner = null;
    }
  }

  stop(): void {
    if (this.spinner) {
      this.spinner.stop();
      this.spinner = null;
    }
  }

  update(message: string): void {
    if (this.spinner) {
      this.spinner.text = message;
    }
  }

  start(message: string): void {
    this.spinner = ora({ text: message, color: 'cyan' }).start();
  }

  warning(message: string): void {
    console.log(pc.yellow(`  ⚠ ${message}`));
  }

  success(message: string): void {
    console.log(pc.green(`  ✓ ${message}`));
  }

  error(message: string): void {
    console.log(pc.red(`  ✗ ${message}`));
  }

  info(message: string): void {
    console.log(pc.cyan(`  ℹ ${message}`));
  }

  blank(): void {
    console.log();
  }
}
