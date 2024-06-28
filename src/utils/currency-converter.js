import {roundToDecimalPlaces} from './decimal-transform';

export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  const response = await fetch(
    `https://open.er-api.com/v6/latest/${fromCurrency}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates");
  }

  const blob = await response.blob();
  const text = await new Response(blob).text();
  const data = JSON.parse(text);

  const rate = data?.rates?.[toCurrency];

  return roundToDecimalPlaces(amount * (rate ?? 1),2);
};
