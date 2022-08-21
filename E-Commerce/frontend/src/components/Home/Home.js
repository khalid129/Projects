import React, { Fragment, useEffect } from 'react';
import { BsMouse } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Home.css";
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import Loader from "../layout/Loader/Loader"
import { getProduct, clearErrors } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux"

const Home = () => {

    const dispatch = useDispatch();
    const { loading, error, products} = useSelector(state => state.products)

    useEffect(() => {
        if(error){
            toast(error);
            dispatch(clearErrors())
        }
        dispatch(getProduct());
    }, [dispatch,error]);
    return (
        <Fragment>
        <ToastContainer position="top-center" closeOnClick type="error"/>
            {
                loading ? (<Loader/>): (
                    <Fragment>
                        <MetaData title="ECOMMERCE" />
                        <div className="banner">
                            <p>Welcome to Ecommerce </p>
                            <h1>FIND THE AMAZING PRODUCTS BELOW</h1>

                            <a href="#container">
                                <button>
                                    Scroll <BsMouse />
                                </button>
                            </a>
                        </div>

                        <h2 className="homeHeading">
                            Featured Product
                        </h2>

                        <div className="container" id="container">
                            {
                                products && products.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            }
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default Home