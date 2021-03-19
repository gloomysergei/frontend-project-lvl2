import { Command } from 'commander';
import readFile from './src/getFixtures.js';
import compareJsonFile from './src/compareJsonFile.js';

const commander = new Command();

function finddiff() {
  commander
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstFile>  <secondFile>')
    .option('-f, --format [type]', 'output format')
    .action((firstFile, secondFile) => {
      const readFirstFile = readFile(firstFile);
      const readSecondFile = readFile(secondFile);
      const file1 = JSON.parse(readFirstFile);
      const file2 = JSON.parse(readSecondFile);
      const str = compareJsonFile(file1, file2);
      console.log(str);
    });
  commander.parse(process.argv);
}
export default finddiff;
