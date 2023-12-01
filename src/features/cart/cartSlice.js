import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: [],
    delivaryFee:50,
    discount:10
};



const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, quantity } = action.payload;

            const existingProduct = state.items.find(item => item.id === product.id);
            console.log(existingProduct)

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                state.items.push({ ...product, quantity });
            }
        },
        decrementQuantity: (state, action) => {
            const { id } = action.payload;
            const existingProduct = state.items.find(item => item.id === id);

            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
            }
        },
        removeFromCart: (state, action) => {
            const { id } = action.payload;
            const confirmRemoval = window.confirm('Are you sure you want to remove this item from the cart?');

            if (confirmRemoval) {
                state.items = state.items.filter(item => item.id !== id);
            }
        },
        clearCart: (state) => {
            state.items = []
        },

    }
});

export const { addToCart, decrementQuantity, removeFromCart ,clearCart} = cartSlice.actions;
export default cartSlice.reducer;