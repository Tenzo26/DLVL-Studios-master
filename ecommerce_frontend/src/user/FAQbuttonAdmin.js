/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../core/Layout";
import { useState, useEffect } from "react";
import { Collapse } from "antd";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getFaq } from "../admin/apiAdmin";
import Navbarmenuadmin from '../core/navbarmenuadmin';


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
			title="FAQS"
			className="container-fluid"
		>
				<div class="pl-4">
            <Navbarmenuadmin/>
            </div>
            <div class="d-flex justify-content-end">
				<div class="pr-5">
				<Link to={"/admin/AdminFAQ"}>
					<button  id="editFaqs"></button>
					</Link>
				</div>
				<div style={{paddingRight:"20px"}}></div>
				</div>

			<div style={{marginTop:"40px"}}>
			<h1 id="faqsLabel">FAQs</h1>
			
			<Collapse defaultActiveKey={["0"]}  style={{border:"none",display:"block", marginRight:"auto", marginLeft:"auto"}}  className="faqsUser" >{renderFaq()}</Collapse>			</div>
			<br></br>
			<br></br>
			<br></br>

		</Layout>
		
	);
};

export default userFAQ;
