# A simple json/yaml agnostic CLI merge tool

Utilizes [merge-config](https://www.npmjs.com/package/merge-config) for combining json and yaml files


[write-data](https://www.npmjs.com/package/write-data) is used as a simple, extension-agnostic config export library.


```
Usage
  $ combine-config <paths> -d output/path.json (or .yaml)

  - Each successive path's files override the ones before it.
  - Files from directories are combined alphabetically and, currently, non-recursively.
  - Does not accept glob paths such as **/*

Options
  --destination, -d:  A single output path, './config.json' by default.
    You can specify .yaml, .yml or .json as an extension.

  --verbose, v: Verbose output

Examples
  $ combine-config /path/to/config path/to/config.json -d config.yaml

    combine-config - wrote config to <cwd>/config.yml
```
