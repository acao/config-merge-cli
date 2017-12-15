#! /usr/bin/node
const meow = require('meow');
const Config = require('merge-config');
const writeData = require('write-data');
const chalk = require('chalk');
const path = require('path');

const config = new Config();

var cli = meow(`
    Usage
      $ combine-config <paths> -d output/path.json (or .yaml)

    Options
      --destination, -d:  Output path, './config.json' by default.
        - You can also specify .yaml, .yml or .json as an extension.
        - Each successive path's files override the ones before it.
        - Files from directories are combined alphabetically and, currently, non-recursively.
        - Does not accept glob paths such as **/*

      --verbose, v: Verbose output

    Examples
      $ combine-config /path/to/config path/to/config.json -d config.yaml

        combine-config - wrote output config to <cwd>/config.yml
  `, {
  flags: {
        destination: {
          type: 'string',
          alias: 'd',
          default: './config.json'
        },
        verbose: {
          type: 'boolean',
          alias: 'v',
          default: false
        }
    }
});

const log = (message, type = 'success') => {
  const colors = {
    success: 'blue',
    error: 'red'
  }
  const color = colors[type];
  console.log(`${chalk[`bg${color.charAt(0).toUpperCase() + color.slice(1)}`](' combine-config ')} - ${chalk[color](message)}`)
}
if (cli.input.length < 1) {
  log('must provide some input paths!', 'error')
  process.exit(1)
}


const inputs = cli.input.filter(path => !!path).map((sourcePath) => {
  return new Promise((resolve, reject) => {
    try {
      config.file(path.resolve(sourcePath))
      if (cli.flags.v) {
        log(`successfully parsed ${path.resolve(sourcePath)}`)
      }
      resolve(config);
    }
    catch (err) {
      reject(err);
    }
  })
})

Promise.all(inputs)
  .then(()=> {
    writeData.sync(path.resolve(cli.flags.destination), config.get());
    log(`wrote output config to ${path.resolve(cli.flags.destination)}`)
  })
  .catch(err => log(err, 'error'));
