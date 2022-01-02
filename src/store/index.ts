import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './reducers/categories'
import productsReducer from './reducers/products'
import productReducer from './reducers/product'
import cartReducer from './reducers/cart'
import userReducer from './reducers/user'
import { useDispatch } from 'react-redux'

const store = configureStore({
    reducer: {
        category: categoryReducer,
        products: productsReducer,
        product: productReducer,
        cart: cartReducer,
        user: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 

export default store;