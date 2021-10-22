export const getCartTotal = (products) =>
  products.reduce((prev, { price, quantity }) => prev + price * quantity, 0);
