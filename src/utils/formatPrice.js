export const formatPrice = (price, currency = "USD", locale = "en-US") => {
  if (isNaN(price) || price === null) return "N/A";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};
