import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import Navbarmenuadmin from '../core/navbarmenuadmin'

const AdminDashboard = () => {
	const {
		user: { _id, name, email, role },
	} = isAuthenticated();

	const adminInfo = () => {
		return (
			<div className="cardash mb-5">
				<h3 className="card-header"  id="dashhead">USER INFORMATION
				<div className="d-flex flex-row-reverse">
				 <Link id="updatedash" to={`/profile/${_id}`}></Link>
				 </div></h3>
				<ul className="list-group">
					<li className="list-group-item" id="labeldash"><b>User ID: </b>{_id}</li>
					<li className="list-group-item" id="labeldash"><b>Name: </b>{name}</li>
					<li className="list-group-item" id="labeldash"><b>Email: </b>{email}</li>
					<li className="list-group-item" id="labeldash">
						{role === 1 ? "Administrator" : "Registered User"}
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
            	<Navbarmenuadmin/>
            </div>
			<div className = "d-flex justify-content-center">
               
				{adminInfo()}
			</div>
					
		</Layout>
	);
};

export default AdminDashboard;