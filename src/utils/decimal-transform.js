export const roundToDecimalPlaces = async (number, decimalPlaces) => {
    if (typeof number !== 'number' || typeof decimalPlaces !== 'number') {
        throw new TypeError('Both arguments should be of type number');
      }
      const factor = Math.pow(10, decimalPlaces);
      return Math.round(number * factor) / factor;
  };