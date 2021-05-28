/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../core/Layout";
import { useState, useEffect } from "react";
import { Collapse } from "antd";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getFaq } from "../admin/apiAdmin";
import Navbarmenu from '../core/navbarmenu';
import { itemTotal } from "../core/cartHelpers";
import search from '../core/search.png';

const { Panel } = Collapse;

const userFAQ = () => {
	const [faq, setFaq] = useState([]);
		

	useEffect(() => {
		const fetchFaq = async () => {
			const res = await getFaq();
			const { data: result } = res;
			setFaq(result.result);
		};

		fetchFaq();

		return () => {
			setFaq([]);
		};
	}, []);

	const renderFaq = () => {
		return faq.map((item) => (
			<Panel style={{border:"none"}}  className="faqsPanel"

			 	header={item.title}
			
				key={item.id}>
				
				<p style={{overflow:"scroll"}}>{item.content}</p>
				
			</Panel>

			
		));
	};

	return (
		<Layout
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
			<div style={{marginTop:"40px"}}>
			<h1 id="faqsLabel">FAQs</h1>
			<Collapse defaultActiveKey={["0"]}  style={{backgroundColor:"white", border:"none",display:"block", marginRight:"auto", marginLeft:"auto"}}  className="faqsUser" >{renderFaq()}</Collapse>
			</div>
			<br></br>
			<br></br>
			<br></br>

		</Layout>
		
	);
};

export default userFAQ;
