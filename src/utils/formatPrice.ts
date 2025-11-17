const formatPrice = (
  price: number,
  price_min: number,
  price_max: number
): string => {
  if (price_min && price_max) {
    return `${price_min} - ${price_max}`;
  } else if (price_max) {
    return `0 - ${price_max}`;
  } else if (price_min) {
    return `${price_min} +`;
  } else {
    return price.toString();
  }
};

export default formatPrice;
