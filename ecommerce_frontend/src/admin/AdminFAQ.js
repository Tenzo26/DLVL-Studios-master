import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import React, { useState } from "react";
import FaqTable from "../core/FaqTable";
import Navbarmenuadmin from '../core/navbarmenuadmin';

const AdminFAQ = () => {
	const {
		user: { name },
	} = isAuthenticated();

	return (
		<Layout
			title="FAQs"
			description={` ${name}, Please Edit the FAQS here`}
			className="container-fluid"
		>
			<div class="pl-4">
			<Navbarmenuadmin/>
			</div>
			<FaqTable />
		</Layout>
	);
};
export default AdminFAQ;
