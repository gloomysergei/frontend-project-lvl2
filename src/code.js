import { Command } from 'commander';

const commander = new Command();

function finddiff() {
  commander
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1>, <filepath2>')
    .option('-f, --format [type]', 'output format');
  commander.parse(process.argv);
}
export default finddiff;
