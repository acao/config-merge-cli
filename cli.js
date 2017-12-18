#! /usr/bin/node
const meow = require('meow');
const Config = require('merge-config');
const writeData = require('write-data');
const chalk = require('chalk');
const path = require('path');

const { USAGE, logger, capitalize } = require('./util');

const cli = meow(USAGE, {
  flags: {
        destination: {
          type: 'string',
          alias: 'd',
          default: 'config.json'
        },
        verbose: {
          type: 'boolean',
          alias: 'v',
          default: false
        }
    }
});

const DESTINATION_PATH = path.resolve(cli.flags.destination);
const IS_VERBOSE = cli.flags.v;

if (cli.input.length < 1) {
  logger('must provide some input paths!', 'error');
  process.exit(1);
}

const inputPaths = cli.input.filter(path => !!path).map((sourcePath) => {
  return new Promise((resolve, reject) => {
    try {
      config.file(path.resolve(sourcePath));
      IS_VERBOSE && logger(`successfully parsed ${path.resolve(sourcePath)}`);
      resolve(config);
    }
    catch (err) {
      reject(err);
    }
  })
})

Promise.all(inputPaths)
  .then(()=> {
    writeData.sync(DESTINATION_PATH, config.get());
    logger(`wrote config to ${destinationPath}`);
  })
  .catch(err => logger(err, 'error'));
