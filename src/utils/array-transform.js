export const toCamelCase = (str) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const pascalToCamel = (obj) => {
  if (Array.isArray(obj)) {
      return obj.map(v => pascalToCamel(v));
  } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).reduce((result, key) => {
          result[toCamelCase(key)] = pascalToCamel(obj[key]);
          return result;
      }, {});
  }
  return obj;
};