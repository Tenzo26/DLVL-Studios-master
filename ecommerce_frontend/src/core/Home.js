import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts, getBg } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import {getDesc} from "../admin/apiAdmin";
import { Link } from "react-router-dom";
import { itemTotal } from "./cartHelpers";
import search from './search.png';

const Home = () => {
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
			//console.log(res);
		});
		loadProductsByArrival();
		loadProductsBySell();
		getDescription();
	}, []);

	return (
		<Layout
			title="Home Page"
			description={desc}
			className="container"
			hasBg={true}
			imgSrc="http://localhost:8000/api/getBg"
		>
			
			<div className="d-flex flex-row-reverse">
			<Link to={"/SearchPage"}>
					<img src={search} className="searchBtn"/>
				</Link>	
				<Link id="cartbag" to="/cart">{" "}
					{itemTotal() == 0 ? (
						``
					) : (<sup>
							 <div className="bpos">
							<small className="cart-badge">{itemTotal()}</small>
                            </div>
						</sup>)}{" "}</Link>

			</div>
			<div>
				<h2 className="mb-4">New Arrivals</h2>
				<div className="row">
					{productsByArrival.map((product, i) => (
						<div key={i} className="col-4 mb-3">
							<Card product={product} />
						</div>
					))}
				</div>

				<h2 className="mb-4">Best Sellers</h2>
				<div className="row">
					{productsBySell.map((product, i) => (
						<div key={i} className="col-4 mb-3">
							<Card product={product} />
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Home;
