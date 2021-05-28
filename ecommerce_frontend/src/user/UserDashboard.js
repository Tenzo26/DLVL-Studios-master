import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";
import { itemTotal } from "../core/cartHelpers";
import search from '../core/search.png';
import Navbarmenu from '../core/navbarmenu';


const Dashboard = () => {
	const [history, setHistory] = useState([]);
	const [showId, setshowId] = useState(false);

	const {
		user: { _id, name, email, role },
	} = isAuthenticated();

	const token = isAuthenticated().token;

	const init = (userId, token) => {
		getPurchaseHistory(userId, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistory(data);
			}
		});
	};

	useEffect(() => {
		init(_id, token);
	}, []);


	const userInfo = () => {
		return (
			<div className="cardash mb-5">
				<h3 className="card-header" id="dashhead">USER INFORMATION 
				<div className="d-flex flex-row-reverse">
				 <Link id="updatedash" to={`/profile/${_id}`}></Link>
				 </div>
				 </h3>
				<ul className="list-group">
					<li className="list-group-item" id="labeldash"><b>User ID:</b>&nbsp;&nbsp;&nbsp;&nbsp;
						<Link className = "submitforalldash" onClick = {() => {setshowId(true)}} style = {{display: showId ? 'none': ''}}><u>SHOW</u></Link>
						<span id = "labeldash" style = {{display: showId ? '':'none'}}> {_id}</span>
					</li>
					<li className="list-group-item" id="labeldash"><b>Name:</b> {name}</li>
					<li className="list-group-item" id="labeldash"><b>E-mail:</b> {email}</li>
					<li className="list-group-item" id="labeldash">
						{role === 1 ? "Administrator" : "Registered User"}
					</li>
				</ul>
			</div>
		);
	};

	const showInput = (key, value) => (
				<div>
               Order ID:
				<input type = "text" value = {value} style={{border:"none", width:"2.3in", marginBottom:"0.3in" }}readOnly/>
                </div>
           
    );

	const purchaseHistory = (history) => {
		return (
			<div className="cardash mb-5">
				<h3 className="card-header" id="dashhead">PURCHASE HISTORY</h3>
				<ul className="list-group">
					<li className="list-group-item">
						{history.map((h, i) => {
							return (
								<div>
								
									{h.products.map((p, i) => {
										return (
											<div key={i}>
												<h6 id="labeldash"><b>Product Name:</b><Link style={{color:"black", textDecoration:"underline"}} to = {`/product/${p._id}`}> {p.name}</Link></h6>
												<h6 id="labeldash"><b>Product Price: ₱</b>{p.price}</h6>
												<h6 id="labeldash"><b>Product Size:</b> {p.size}</h6>
												<h6 id="labeldash"><b>Product Quantity:</b> {p.count}</h6>
												<h6 id="labeldash"><b>Mode of Payment:</b> {h.mode_payment ? h.mode_payment : "MODE OF PAYMENT NOT FOUND"}</h6>
												<h6 id="labeldash"><b>Mode of Shipment:</b> {h.mode_shipment ? h.mode_shipment : "MODE OF SHIPPING NOT FOUND"}</h6>				
												<h6 id="labeldash" style={{marginBottom:"-28px"}}><b>{showInput("Order ID: ", h._id ?  h._id : "ORDER ID NOT FOUND")} </b></h6>
												<hr/>
											</div>
										);
									})}
								</div>
							);
						})}
					</li>
				</ul>
			</div>
		);
	};

	return (
		<Layout
			title="Dashboard"
			description={`Welcome back, ${name}!`}
			className="container-fluid"
		>
			<div class="pl-4">
					<Navbarmenu/>
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
		<div className = "d-flex justify-content-center">
               
					{userInfo()}
					</div>
					<div className = "d-flex justify-content-center">
					{purchaseHistory(history)}
					</div>
		</Layout>
	);
};

export default Dashboard;