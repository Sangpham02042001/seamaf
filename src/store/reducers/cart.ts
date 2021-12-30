import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface cartInterface {
    [key: string]: any
}

export const cartSlice = createSlice({
    name: 'Cart',
    initialState: {
        cart: {
        } as cartInterface
    },
    reducers: {
        getCart(state) {
            let myCart = JSON.parse(localStorage.getItem('cart') || '{}')
            state.cart = myCart
        },
        changeCartQuantity(state, action) {
            const {key, quantity} = action.payload
            if (state.cart[key]) {
                state.cart[key].quantity = quantity
            }
            localStorage.setItem('cart', JSON.stringify(state.cart || {}))
        },
        deleteCartItem(state, action) {
            const {key} = action.payload
            if (state.cart[key]) {
                delete state.cart[key]
            }
            localStorage.setItem('cart', JSON.stringify(state.cart || {}))
        }
    }
})

export const {getCart, changeCartQuantity, deleteCartItem} = cartSlice.actions

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer