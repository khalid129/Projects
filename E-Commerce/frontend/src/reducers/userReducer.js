import { createReducer } from "@reduxjs/toolkit";

const userState = {};

export const LoginReducer = createReducer(userState,{
    LOGIN_REQUEST: (state)=>{
        state.loading = true;
        state.isAuthenticated = false;
    },
    LOGIN_SUCCESS:(state,action)=>{
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
    },
    LOGIN_FAIL:(state,action)=>{
        state.loading = false;
        state.isAuthenticated = false;
        state.user = {};
        state.error = action.payload;
    },
    CLEAR_ERROR: (state) => {
        state.loading = false;
    },
});

export const registerationReducer = createReducer(userState,{
    REGISTRATION_REQUEST: (state)=>{
        state.loading = true;
        state.isAuthenticated = false;
    },
    REGISTRATION_SUCCESS:(state,action)=>{
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
    },
    REGISTRATION_FAIL:(state,action)=>{
        state.loading = false;
        state.isAuthenticated = false;
        state.user = {};
        state.error = action.payload;
    },
    CLEAR_ERROR: (state) => {
        state.loading = false;
    },
});