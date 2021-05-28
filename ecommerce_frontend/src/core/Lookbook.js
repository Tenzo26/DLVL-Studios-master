import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCollections } from "./apiCore";
import Card_collection from "./Card_collection";
import {getDesc} from "../admin/apiAdmin";
import { Link } from "react-router-dom";
import { itemTotal } from "./cartHelpers";
import search from './search.png';
import Navbarmenu from './navbarmenu';

const Lookbook = () => {
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
				<Card_collection collection = {collection} viewOnly = {true}/>
			</div>               
	   )) : ""}</h1>
	);

	useEffect(() => {
		getDescription();
		init();
	}, []);

	return (
		<Layout
			title="LOOKBOOK"
			description="DLVL Studio's Exclusive Collection"
			className="container-fluid"
		>
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
			<h1 id="h1UserFeedback">LOOKBOOK</h1>
			{displayCollection(collections)}
		</Layout>
	);
};

export default Lookbook;
