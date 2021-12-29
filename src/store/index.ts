import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './reducers/categories'
import productReducer from './reducers/products'
import { useDispatch } from 'react-redux'

const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 

export default store;