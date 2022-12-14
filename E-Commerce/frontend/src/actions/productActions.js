import axios from "axios";

// Get All Products

export const getProduct = (keyword="",currentPage=1, price=[0,3000], category,ratings=0)=> async (dispatch)=>{
    try{
        dispatch({type : "ALL_PRODUCT_REQUEST"});

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
        }

        const {data} = await axios.get(link);
        
        dispatch({
            type : "ALL_PRODUCT_SUCCESS",
            payload : data,
        });

    }catch(error){
        dispatch({
            type : "ALL_PRODUCT_FAIL",
            payload : error.response.data.message,
        });
    }
};

// Get Product Detail

export const getProductDetails = (id)=> async (dispatch)=>{
    try{
        dispatch({type : "PRODUCT_DETAIL_REQUEST"});

        const {data} = await axios.get(`/api/v1/product/${id}`);
        
        console.log(data);

        dispatch({
            type : "PRODUCT_DETAIL_SUCCESS",
            payload : data,
        });
    }catch(error){
        dispatch({
            type : "PRODUCT_DETAIL_FAIL",
            payload : error.response.data.message,
        });
    }
};


// Clearing Errors
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type : "CLEAR_ERRORS"});
}