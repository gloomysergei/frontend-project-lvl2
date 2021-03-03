import { Command } from 'commander';

const commander = new Command();

function finddiff() {
  commander
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.');
  commander.parse(process.argv);
}
export default finddiff;
