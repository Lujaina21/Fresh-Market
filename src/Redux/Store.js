import { configureStore } from '@reduxjs/toolkit'
import { productReducer } from './ProductSlice'

//dayman elstore mstny mny reducer
export const store = configureStore({
    reducer: {
        //Reducer Name
        productRed: productReducer,
    },
})