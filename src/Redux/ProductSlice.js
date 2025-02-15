import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    counter: 0,
    products: [],
    brands: [],
};

export let getBrands = createAsyncThunk("Product/getBrands", async function () {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    return data;
});

export let productSlice = createSlice({
    name: "Product",
    initialState,  //initialState: initialState
    reducers: {//bta5od mny functions
        //fnc.
        increment: (state) => {
            state.value++;
        },
        decrement: (state) => {
            state.value--;
        }
    },
    //bta5od mny APIs
    extraReducers: (builder) => {
        builder.addCase(getBrands.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.brands = action.payload.data;
            })
            .addCase(getBrands.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export let { increment, decrement } = productSlice.actions;
export let productReducer = productSlice.reducer;