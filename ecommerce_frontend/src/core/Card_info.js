import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage_1 from "./ShowImage_1";
import ShowImage_2 from "./ShowImage_2";
import ShowImage_3 from "./ShowImage_3";
import moment from "moment";
import { addItem, updateItem, removeItem} from "./cartHelpers";
import { isAuthenticated } from "../auth";

const Card_info = ({
	product
}) => {
	const showViewButton = () => {
		return (
				<Link to={`/product/${product._id}`} className="mr-2">
					<button id="viewCardInfo">
						View Product
					</button>
				</Link>
		);
	};

	return (
			<div>	
			<div style={{width: "300px", display:"block", marginLeft:"auto", marginRight:"auto"}}><ShowImage_1 item={product} url="product" style={{width:"20px", height:"10px"}}/></div>

				<p style={{textAlign:"center", fontSize:"25px", color:"black"}}>{product.name}</p>
				<p style={{textAlign:"center", marginTop:"-25px", fontSize:"25px", color:"black"}}>&#8369; {product.price}</p>
				{/** 
			<div className="card-header card-header-1 ">{product.name}</div>
			<div className="card-body">
				<ShowImage_1 item={product} url="product" />
				<p className="card-p black-10">&#8369; {product.price}</p>
				<p className="black-7">
					Added on {moment(product.createdAt).fromNow()}
				</p>*/}
				{showViewButton()}
				<br />
				</div>
	);
};

export default Card_info;
