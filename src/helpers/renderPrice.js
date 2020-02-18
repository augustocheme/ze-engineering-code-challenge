export function renderPrice(value, currency) {
  const price = value.toString().replace('.', ',');

  return price ? (currency || '') + price : null;
}
