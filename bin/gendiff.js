#!/usr/bin/env node
import { Command } from 'commander';
import finddiff from '../index.js';

const commander = new Command();
commander
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstFile> <secondFile>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((firstFile, secondFile, options) => {
    const diff = finddiff(firstFile, secondFile, options.format);
    console.log(diff);
  });
commander.parse(process.argv);
