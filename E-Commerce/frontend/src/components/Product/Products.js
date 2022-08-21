import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import Loader from "../layout/Loader/Loader"
import { getProduct, clearErrors } from "../../actions/productActions";
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from '../Home/ProductCard';
import { Pagination, Stack, Slider, Typography } from '@mui/material/';

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones"
];

export const Products = () => {

    const dispatch = useDispatch();

    const { keyword } = useParams();

    const { products, loading, error, resultPerPage, filterCount } = useSelector(state => state.products);

    const count = filterCount;

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 3000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0)

    const setCurrentPageNo = (event, value) => {
        setCurrentPage(value);
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    useEffect(() => {
        if (error) {
            toast(error);
            dispatch(clearErrors())
        }

        dispatch(getProduct(keyword, currentPage, price,category,ratings));
    }, [dispatch, keyword, currentPage, price, category,ratings,error]);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                <MetaData title="All" />
                    <ToastContainer position="top-center" closeOnClick type="error" />
                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {products && products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    <div className="filterBox">
                        <Typography className="price">Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="on"
                            aria-labelledby='range-slider'
                            size="small"
                            min={0}
                            max={3000}
                        />

                        <Typography>Categories</Typography>
                        <ul className='categoryBox'>
                            {
                                categories.map((category) => (
                                    <li className='category-link'
                                        key={category}
                                        onClick={() => { setCategory(category) }}>
                                        {category}
                                    </li>
                                ))
                            }
                            <li 
                            className='category-link'
                            onClick={() => { setCategory("") }}
                            >All Products</li>
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                            value={ratings}
                            onChange={(e,newRating)=>{
                                setRatings(newRating);
                            }}
                            aria-labelledby='continuous-slider'
                            valueLabelDisplay='auto'
                            size="small"
                            min={0}
                            max={5}
                        />
                        </fieldset>
                    </div>

                    {resultPerPage < count && (
                        <div className="paginationBox">
                            <Stack spacing={2}>
                                <Pagination
                                    count={Math.ceil(count / resultPerPage)}
                                    page={currentPage}
                                    onChange={setCurrentPageNo} />
                            </Stack>
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}
