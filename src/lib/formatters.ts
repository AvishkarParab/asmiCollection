export const currencyPipe = (
  value: number | string = 0,
  currency: string = "INR",
  locale: string = "en-IN"
): string => {
  const amount = Number(value) || 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};
