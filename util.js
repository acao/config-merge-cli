export const USAGE = `
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
  `;

export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const logger = (message, type = 'success') => {
  const colors = {
    success: 'blue',
    error: 'red'
  };
  const color = colors[type];
  console.log(`${chalk[`bg${capitalize(color)}`](' combine-config ')} - ${chalk[color](message)}`);
}
