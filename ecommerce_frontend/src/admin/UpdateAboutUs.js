/* eslint-disable no-restricted-globals */
import React, {useState, useEffect} from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect, useHistory } from "react-router-dom";
import { updateAboutUs, removeAboutUs } from "./apiAdmin";
import { getDesc } from "../core/apiCore"
import Navbarmenuadmin from '../core/navbarmenuadmin'
import { AutoComplete } from 'antd';

// changing about us description
const UpdateAboutUs = ({ match }) => {
	const [values, setValues] = useState({
		description: "",
		loading: false,
		error: false,
	});

	const history = useHistory(); 
	
	const { user, token } = isAuthenticated();

	const {
		description,
		loading,
		error,
		formData,
	} = values;

	const handleChange = () => (event) => {
		setValues({ ...values, description: event.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		
		if (!(description.length === 0 || !description.trim())) {
			updateAboutUs(user._id, token, description)
			.then((res) => {
					setValues({
						...values,
						loading: false,
						error: false,
					});
					history.push("/admin/landingpageadmin")
			});
		}
		else {
			alert("Description cannot be empty")
		}
	};

	const newPostForm = () => (
		<form className="mb-3" onSubmit={clickSubmit}>
				<div style={{marginTop:"-40px"}}>
			<h4 className="usupdate">&nbsp;&nbsp;UPDATE ABOUT US</h4>
			</div>
			<div className="form-group">
			<div style={{marginLeft:"auto", marginRight:"auto"}}>
				<textarea
					onChange={handleChange()}
					className="aboutuseditbox"
					value={description}
					name="description"
					placeholder="Enter About Us"
				/>
				</div>
			</div>
			<div className="d-flex justify-content-around">
			<button type="submit" className="submitforall">
				UPDATE 
			</button>
			</div>
		</form>
	);

	const showError = () => (
		<div
			className="alert alert-danger"
			style={{ display: error ? "" : "none" }}
		>
			{error}
		</div>
	);

	const showLoading = () =>
		loading && (
			<div className="alert alert-success">
				<h2>Loading...</h2>
			</div>
		);

return (
    <Layout
        title="Dashboard"
        description={`Edit the About Us description here ${user.name}`}
        className="container-fluid"
    >
		<div class="pl-4">
            <Navbarmenuadmin/>
        </div>
				<div className="col-md-8 offset-md-2">
					{showLoading()}
					{showError()}
					<div style={{marginLeft: "auto", marginRight:"auto"}}>
					{newPostForm()}
					</div>
				</div>
   
        
    </Layout>
);
};


export default UpdateAboutUs;