import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts, getBg } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import {getDesc} from "../admin/apiAdmin";
import search from './search.png';
import { Link } from "react-router-dom";
import { itemTotal } from "./cartHelpers";
import Navbarmenu from './navbarmenu';

const SearchPage = () => {
	const [productsBySell, setProductsBySell] = useState([]);
	const [productsByArrival, setProductsByArrival] = useState([]);
	const [error, setError] = useState(false);
	const [desc, setDesc] = useState("");

	const loadProductsBySell = () => {
		getProducts("sold").then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProductsBySell(data);
			}
		});
	};

	const loadProductsByArrival = () => {
		getProducts("createdAt").then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProductsByArrival(data);
			}
		});
	};

	//change homepage about us
	const getDescription = () => {
		getDesc().then((data) => {
			if (data.error){
				setError(data.error);
			} else {
				setDesc(data.content.description);
			}
		})
	}

	useEffect(() => {
		getBg().then((res) => {
			console.log(res);
		});
		loadProductsByArrival();
		loadProductsBySell();
		getDescription();
	}, []);

	return (
		<Layout
			title=" "
			description={desc}
			className="container-fluid"
		>
			<div class="pl-4">
				<Navbarmenu />
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
			<Search/>
		</Layout>
	);
};

export default SearchPage;
