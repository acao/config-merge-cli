# A simple json/yaml agnostic CLI merge tool

```
A json/yaml data/config merge cli tool

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
```
