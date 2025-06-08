const toCamel = (str) => str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());

const camelCaseKeys = (input) =>
  Array.isArray(input)
    ? input.map(camelCaseKeys)
    : input && typeof input === "object" && !(input instanceof Date)
    ? Object.fromEntries(
        Object.entries(input).map(([k, v]) => [toCamel(k), camelCaseKeys(v)])
      )
    : input;

const toSnake = (str) =>
  str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);

const snakeCaseKeys = (input) =>
  Array.isArray(input)
    ? input.map(snakeCaseKeys)
    : input && typeof input === "object" && !(input instanceof Date)
    ? Object.fromEntries(
        Object.entries(input).map(([k, v]) => [toSnake(k), snakeCaseKeys(v)])
      )
    : input;

module.exports = {
  camelCaseKeys,
  snakeCaseKeys,
};
