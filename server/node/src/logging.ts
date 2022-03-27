import chalk from 'chalk';

export class Logging
{
  constructor()
  {
  }

  error   = (txt : string) => console.log(chalk.bgRed.whiteBright(txt));
  warning = (txt : string) => console.log(chalk.hex('#FF8000') (txt));
  
  ok(txt : string)
  {
    console.log(chalk.yellow('OK   :'), chalk.green(txt));
  }

  info(txt : string)
  {
    console.log(chalk.yellow('info :'), chalk.blueBright(txt));
  }
}