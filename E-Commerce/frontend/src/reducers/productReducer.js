import { createReducer } from "@reduxjs/toolkit";

const productState = {
    loading: true,
    products: []
}
export const productReducer = createReducer(productState, {
    ALL_PRODUCT_REQUEST: (state) => {
        state.loading = true;
        state.products = [];
    },
    ALL_PRODUCT_SUCCESS: (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filterCount = action.payload.filterCount;
    },
    ALL_PRODUCT_FAIL: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    CLEAR_ERROR: (state) => {
        state.loading = false;

    },
});

const productDetailState = {
    loading: true,
    product: {}
}

export const productDetailsReducer = createReducer(productDetailState, {
    PRODUCT_DETAIL_REQUEST: (state) => {
        state.loading = true;
        state.product = {};
    },
    PRODUCT_DETAIL_SUCCESS: (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
    },
    PRODUCT_DETAIL_FAIL: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    CLEAR_ERROR: (state) => {
        state.loading = false;
    },
})




