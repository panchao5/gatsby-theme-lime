import get from "lodash/get";

export class MissingValueError extends Error {
  constructor(key: string) {
    super(
      `Missing a value for ${key ? `the placeholder: ${key}` : "a placeholder"}`
    );
    this.name = "MissingValueError";
  }
}

interface Options {
  ignoringMissing: boolean;
}

export const t = (
  template: string,
  data: object = {},
  options: Options = { ignoringMissing: false }
) => {
  const { ignoringMissing } = options;
  const replace = (placeholder: string, key: string) => {
    const value = get(data, key);

    if (value === undefined) {
      if (ignoringMissing) {
        return placeholder;
      }
      throw new MissingValueError(key);
    }

    return String(value);
  };

  const braceRegex = /{(\d+|[a-z$_][\w\-$]*?(?:\.[\w\-$]*?)*?)}/gi;

  return template.replace(braceRegex, replace);
};

export default t;
