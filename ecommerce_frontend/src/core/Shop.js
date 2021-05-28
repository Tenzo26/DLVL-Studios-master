import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getCategories, getFilteredProducts, getCollections, getGenderValues} from './apiCore';
import Card4 from './Card4';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import {prices} from './fixedPrices';
import { Link } from "react-router-dom";
import { itemTotal } from "./cartHelpers";
import search from './search.png';
import Navbarmenu from './navbarmenu';

const Shop = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [categories, setCategories] = useState([]);
    const [collections, setCollections] = useState([]);
    const [gender, setGender] = useState([]);
    const [error, setError] = useState(false);
    const [myFilters, setMyFilters] = useState({
        filters: {
            category: [],
            collection: [],
            gender: [],
            price: []
        }
    });
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            }
            else {
                setCategories(data);
                getCollections().then(data2 => {
                    if (data2.error) {
                        setError(data2.error);
                    }
                    else {
                        setCollections(data2)
                        getGenderValues().then(data3 => {
                            if (data3.error) {
                                setError(data3.error)
                            }
                            else {
                                setGender(data3)
                            }
                        })
                    }
                });
            }
        });
    };

    const loadFilteredResults = (newFilters) => {
        getFilteredProducts(skip, limit, newFilters)
            .then (data => {
                if (data.error) {
                    setError(data.error);
                }
                else {
                    setFilteredResults(data.data);
                    setSize(data.size);
                    setSkip(0);
                }
            });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters)
            .then (data => {
                if (data.error) {
                    setError(data.error);
                }
                else {
                    setFilteredResults([...filteredResults,...data.data]);
                    setSize(data.size);
                    setSkip(toSkip);
                }
            });
    };

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick = {loadMore} className = "btn btn-warning mb-5">SHOW MORE</button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if (filterBy == "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    

    return (
        <Layout title = "Shop Now" 
        description = "DLVL Studios Official Website"
        className = "container-fluid">
            <div class="pl-4">
					<Navbarmenu  />
			</div>
				<div class="d-flex justify-content-end">
	
					<div class="pr-5" >
						<Link to={"/SearchPage"}>
							<img src={search} className="searchBtn"/>
						</Link>	
					</div>

				
				<div class="pr-5">
					<Link id="cartbag" to="/cart"> {" "}
						{itemTotal() == 0 ? (
							``
						) : (<sup>
							 <div className="bpos">
							<small className="cart-badge">{itemTotal()}</small>
                            </div>
						</sup>)}{" "}</Link>
				</div>

				<div style={{paddingRight:"20px"}}></div>
				</div>
                <div className="container">            
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <div className='nav-menu-items'>
                        <div className="d-flex justify-content-around">
                            <h3 className="h3Fil">FILTERS AND SORT</h3>
                        </div>
                        <h4 className="h4Fil">Filter by Color</h4>
                            <ul className="groupFil">
                                <Checkbox categories = {categories} type = "category" 
                                handleFilters = {filters =>
                                    handleFilters(filters,'category')}/>
                            </ul>
                
                        <h4 className="h4Fil" >Filter by Collection</h4>
                            <ul className="groupFil">
                                <Checkbox categories = {collections} type = "collection"
                                handleFilters = {filters =>
                                    handleFilters(filters,'_collection')}/>
                            </ul>
                        <h4 className="h4Fil">Filter by Gender</h4>
                            <ul className="groupFil">
                                <Checkbox categories = {gender} type = "gender"
                                 handleFilters = {filters =>
                                    handleFilters(filters,'gender')}/>
                            </ul>
                        <h4 className="h4Fil">Filter by Price Range</h4>
                            <div className="groupFil beforeBtn">
                                <RadioBox prices = {prices} 
                                handleFilters = {filters =>
                                    handleFilters(filters,'price')}/>
                            </div>
                            <div className="btnGroup">
                                <button onClick={showSidebar} className="exitbtn">Exit</button>
                                {/* <button className="clearbtn">Clear</button> */}
                            </div>
                            <br></br>
                    </div>
                </nav>
                    <Link to="#">
                        <h1 className='FiltersTxt' onClick={showSidebar}>+Filters</h1>
                    </Link>
                <h2 className = "mb-4 prod">PRODUCTS</h2>
                <div className = "row mobProducts">
                        {filteredResults.map((product, i) => (
                            <div key = {i} className = "col-4 mb-3">
                                 <Card4  product = {product}/>
                            </div>
                        ))}
                </div>
                {loadMoreButton()}
                </div>
        </Layout>
    );
};


export default Shop;

