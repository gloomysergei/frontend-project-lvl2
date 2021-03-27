import { Command } from 'commander';
import compareFiles from './src/compareFiles.js';
import parse from './src/parse.js';

const commander = new Command();

function finddiff() {
  commander
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstFile>  <secondFile>')
    .option('-f, --format [type]', 'output format')
    .action((firstFile, secondFile) => {
      const file1 = parse(firstFile);
      const file2 = parse(secondFile);
      const str = compareFiles(file1, file2);
      console.log(str);
    });
  commander.parse(process.argv);
}
export default finddiff;
