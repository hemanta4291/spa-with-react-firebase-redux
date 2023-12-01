// selectors.js
export const useCalculateTotalPrice = (cart) => {
  const itemSubTotal = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
  const totalBeforeDiscountAndFee = itemSubTotal + cart.delivaryFee;

  const discountAmount = (totalBeforeDiscountAndFee * cart.discount) / 100;
  const totalPriceAfterDiscount = totalBeforeDiscountAndFee - discountAmount;
  return { itemSubTotal, totalPriceAfterDiscount };
};
