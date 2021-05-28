import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card4 from "./Card4";
import searchIcon from "./search.png";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data });
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return (<span className="badge badge-success badge-pill">Found {results.length} Products</span>);
        }
        if (searched && results.length < 1) {
            return (<span className="badge badge-warning badge-pill">No Products Found</span>);
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div className="searchMob">
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>

                <div className="row mobProducts">
                    {results.map((product, i) => (
                        <div className="col-4 mb-3">
                            <Card4 key = {i} product = {product}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text mobGroupsearch">
                <div className="input-group input-group-lg">
                <div
                        className="btn input-group-append"
                        style={{ border: "none" }}
                    >
                        <button className="input-group-text" style={{ border: "none" }}>
                            <img src={searchIcon} className="searchI"/>
                        </button>
                    </div>

                    <input
                        type="search"
                        className="form-control2"
                        onChange={handleChange("search")}
                        placeholder="Search"
                    />

                    <div className="input-group-prepend2">
                        <select
                            className="btn mr-2"
                            onChange={handleChange("category")}
                        >
                            <option value="All">All</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div class="select__arrowS" ></div>
                </div>
            </span>
        </form>
    );

    return (
        <div className="container">
            <div className="container mb-2">{searchForm()}</div>
            <div className="row searchDiv">
                {searchedProducts(results)}
            </div>
        </div>
    );
};

export default Search;