const formatPrice = (price, price_min, price_max) => {
  if (price_min && price_max) {
    return `${price_min} - ${price_max}`;
  } else if (price_max) {
    return `0 - ${price_max}`;
  } else if (price_min) {
    return `${price_min} +`;
  } else {
    return price;
  }
};

export default formatPrice;
