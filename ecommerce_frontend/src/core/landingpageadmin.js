import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts, getBg } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import {getDesc} from "../admin/apiAdmin";
import { Link } from "react-router-dom";
import Navbarmenuadmin from "./navbarmenuadmin"
import {isAuthenticated} from '../auth';
import DialogCritical from '../core/DialogCritical'
import { CRITICAL_STOCK } from "../config";

const Home = () => {
	const [desc, setDesc] = useState("");
	const [error, setError] = useState(false);
	const [showCritical, setshowCritical] = useState(false);
	const {user} = isAuthenticated();
	/*
	const [productsBySell, setProductsBySell] = useState([]);
	const [productsByArrival, setProductsByArrival] = useState([]);
	

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
*/
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

	const scanProducts = (role) => {
		if (role == 1) {
			getProducts()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    data.map((product, i) => {
						if (
							(product.sizeSmall && product.quantitySmall <= CRITICAL_STOCK) || 
							(product.sizeMed && product.quantityMed <= CRITICAL_STOCK) || 
							(product.sizeLarge && product.quantityLarge <= CRITICAL_STOCK) || 
							(product.sizeFree && product.quantityFree <= CRITICAL_STOCK)
						)

							{
							setshowCritical(true)
						}
					}) 
                }
            });
		}
	}
 
	useEffect(() => {
		getBg().then((res) => {
			console.log(res);
		});
		//loadProductsByArrival();
		//loadProductsBySell();
		getDescription();
		scanProducts(user.role);
	}, []);

	const criticalAlert = () => {
		if (user.role == 1) {
			return (
				<DialogCritical isOpen = {showCritical} redirect = "/admin/products" redirectButton = "OK" cancelButton = "LATER" onClose = {(e) => {
					<div style={{backgroundColor: 'black', width: '800px', height: '100%'}}></div>
					setshowCritical(false)
				}}>
					There's a product with critically low stock! Proceed to Manage Products to check.
				</DialogCritical>
			)
		}
	}
	
	
	return (
		<Layout
			title="Landing Page"
			description= ""
			className="container-fluid"
			hasBg={true}
			imgSrc="http://localhost:8000/api/getBg"
		>
			{criticalAlert()}
			<div class="pl-4">
				<Navbarmenuadmin/>
				</div>
				<div class="d-flex justify-content-end">
	
			
				
				<div class="pr-5">
					<Link id="updatebg" to="/admin/updateBackground" />
				</div>

				<div style={{paddingRight:"20px"}}></div>
				</div>

				<div style={{minHeight:"1000px"}}>
				<h1 id="aboutusperm">ABOUT US  
				<div class="pl-5">
				<div class="pl-5">
				<div class="pl-5">
				<div class="pl-5">
				<div class="pl-5">
				<div className="d-flex justify-content-center">
				<Link id="editabout" to="/admin/UpdateAboutUs"></Link>
				</div>
				</div>
				</div>
				</div>
				</div>
				</div>
				</h1>
				<h1 id="aboutus">{desc}</h1>
				<div className="d-flex justify-content-center">
               
				<h1 id="emailaboutus">Email: studios.dlvl@gmail.com</h1>
				<a target = "_blank" id="fb" href="https://www.facebook.com/dlvlstudios"></a>
				<a target = "_blank" id="ig" href="https://www.instagram.com/dlvlstudios"></a>
				</div>
				</div>
			
		
		</Layout>
	);
};

export default Home;
/*
<Search />
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
*/