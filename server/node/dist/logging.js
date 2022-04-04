import chalk from 'chalk';
export class Logging {
    constructor() {
        this.error = (txt) => console.log(chalk.bgRed.whiteBright(txt));
        this.warning = (txt) => console.log(chalk.hex('#FF8000')(txt));
    }
    ok(txt) {
        console.log(chalk.yellow('OK   :'), chalk.green(txt));
    }
    info(txt) {
        console.log(chalk.yellow('info :'), chalk.blueBright(txt));
    }
}
//# sourceMappingURL=logging.js.map