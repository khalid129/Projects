import {configureStore} from "@reduxjs/toolkit";
import {
    productReducer,
    productDetailsReducer 
} from "./reducers/productReducer";

import { LoginReducer, registerationReducer } from "./reducers/userReducer";

const store = configureStore({
    reducer :{
        products : productReducer,
        productDetails : productDetailsReducer,
        loginUser : LoginReducer,
        registerUser : registerationReducer,
    }
});

export default store;