// Converts the first character of a string to lower case
export const toCamelCase = (str) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

// Converts the first character of a string to upper case
export const toPascalCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Recursively converts the keys of an object from PascalCase to camelCase
export const pascalToCamel = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => pascalToCamel(v));
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((result, key) => {
      result[toCamelCase(key)] = pascalToCamel(obj[key]);
      return result;
    }, {});
  }
  return obj;
};

// Recursively converts the keys of an object from camelCase to PascalCase
export const camelToPascal = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelToPascal(v));
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((result, key) => {
      result[toPascalCase(key)] = camelToPascal(obj[key]);
      return result;
    }, {});
  }
  return obj;
};
