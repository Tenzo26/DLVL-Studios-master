import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCollections } from "./apiCore";
import Card_collection from "./Card_collection";
import {getDesc} from "../admin/apiAdmin";
import { Link } from "react-router-dom";
import { itemTotal } from "./cartHelpers";
import search from './search.png'

const Collections = () => {
	const [desc, setDesc] = useState("");
	const [error, setError] = useState("");
	const [collections, setCollections] = useState([]);

	const getDescription = () => {
		getDesc().then((data) => {
			if (data.error){
				setError(data.error);
			} else {
				setDesc(data.content.description);
			}
		})
	}

	const init = () => {
		getCollections().then(data => {
			if (data.error) {
				setError(data.error);
			}
			else {
				setCollections(data)
			}
		});
	}

	const displayCollection = (collections) => (
		<h1>{collections ? collections.map((collection) => (
			<div className = "col-4_Coll mb-3">
				<Card_collection collection = {collection} viewOnly = {false}/>
			</div>               
	   )) : ""}</h1>
	);

	useEffect(() => {
		getDescription();
		init();
	}, []);

	return (
		<Layout
			title="COLLECTIONS"
			description="DLVL Studio's Exclusive Collection"
			className="container"
		>
				<div className="d-flex flex-row-reverse">
				<Link id="cartbag" to="/cart">{" "}
					{itemTotal() == 0 ? (
						``
					) : (<sup>
							<small className="cart-badge">{itemTotal()}</small>
						</sup>)}{" "}</Link>
				<Link to={"/SearchPage"}>
					<img src={search} className="searchBtn"/>
				</Link>		
				</div>
				<h1 id="h1UserFeedback">COLLECTIONS</h1>
		{displayCollection(collections)}
		</Layout>
	);
};

export default Collections;
