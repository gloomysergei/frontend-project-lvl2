import { Command } from 'commander';
import compareJsonFile from './compareJsonFile.js';

const commander = new Command();

function finddiff() {
  commander
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstFile>  <secondFile>')
    .option('-f, --format [type]', 'output format')
    .action((firstFile, secondFile) => {
      const str = compareJsonFile(firstFile, secondFile);
      console.log(str);
    });
  commander.parse(process.argv);
}
export default finddiff;
