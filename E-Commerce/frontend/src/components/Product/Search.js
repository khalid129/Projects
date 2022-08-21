import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import "./Search.css";

const Search = () => {

    const [keyword, setKeyword] = useState("");

    const history = useNavigate();

    const searchSubmitHandler = (e) => {
        console.log("errer")
        e.preventDefault();
        if (keyword.trim()) {
            history(`/products/${keyword}`);
        } else {
            history("/products");
        }
    };

    return (
        <Fragment>
            <MetaData title="Search A Product -- ECOMMERCE" />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a Product ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" onClick={searchSubmitHandler}/>
            </form>
        </Fragment>
    );
}

export default Search;