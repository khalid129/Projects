import axios from "axios";

// Login
export const login = (email,password)=> async(dispatch)=>{
    try{
        dispatch({type : "LOGIN_REQUEST"});

        const config = {Headers : {"Content-Type":"application/json"}};

        const {data} = await axios.post(
            `/api/v1/login`,
            {email, password},
            config
        ) 

        dispatch({type : "LOGIN_SUCCESS", payload:data.user});
    }catch(error){
        dispatch({type : "LOGIN_FAIL", payload:error.response.data.message});
    }
};

// REgistration
export const register = (userData)=> async(dispatch)=>{
    try{
        dispatch({type : "REGISTRATION_REQUEST"});

        const config = {Headers : {"Content-Type":"multipart/form-data"}};

        const {data} = await axios.post(
            `/api/v1/register`,
            userData,
            config
        ) 

        dispatch({type : "REGISTRATION_SUCCESS", payload:data.user});
    }catch(error){
        dispatch({type : "REGISTRATION_FAIL", payload:error.response.data.message});
    }
};


// Clearing Errors
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type : "CLEAR_ERRORS"});
}