import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { getCategory, updateCategory } from "./apiAdmin";
import Navbarmenuadmin from '../core/navbarmenuadmin'


const UpdateCategory = ({ match }) => {
	const [values, setValues] = useState({
		name: "",
		loading: false,
		error: false,
        success: false,
        redirectToProfile: false
	});

	const { user, token } = isAuthenticated();
	const {
		name,
		loading,
		error,
        redirectToProfile,
        success
	} = values;

	const init = (categoryId) => {
		getCategory(categoryId)
            .then(data => {
                if (data.error) {
                    setValues({
                        error: "Category failed to load.",
                        success: false,
                        loading: false
                    })
                }
                else {
                    setValues({
                        name: data.name
                    })
                }
            });
	};

	useEffect(() => {
		init(match.params.categoryId);
	}, []);

	const handleChange = () => (event) => {
		setValues({
            ...values,
            error: false,
            loading: false,
            success: false,
            name: event.target.value
        })
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
        updateCategory(match.params.categoryId, user._id, token, {name: name})
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: "Category failed to update", loading: false });
                }
                else {
                    setValues({ ...values, success: true, error: false, loading: false, redirectToProfile: true});
                }
            })

	};

	const newPostForm = () => (
		<form className="mb-3" onSubmit={clickSubmit}>
			<h1 id="addCateg" style={{marginTop:"20px"}}>UPDATE COLOR</h1>
			<div class="container"  style={{marginLeft:"auto", marginRight:"auto"}}>
            	<div class="row" style={{marginLeft:"auto", marginRight:"auto"}}>
						<input
						onChange={handleChange()}
						type="text"
						id="categoryName"
						value={name}/>
			</div>
			<button id = "saveCateg">SAVE CHANGES</button>
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

	const showSuccess = () => (
		<div
			className="alert alert-info"
			style={{ display: success ? "" : "none" }}
		>
			<h2 style={{fontFamily: "Times New Roman"}}>{`${name}`} is updated!</h2>
		</div>
	);

	const showLoading = () =>
		loading && (
			<div className="alert alert-dark">
				<h2 style={{fontFamily: "Times New Roman"}}>Loading...</h2>
			</div>
		);

	const redirectUser = () => {
		if (redirectToProfile) {
			if (!error) {
				return <Redirect to="/admin/categories" />;
			}
		}
	};

	return (
		<Layout
			title="Update Category"
			className="container-fluid"
			description={`${user.name}, update this category!`}
		>
			<div class="pl-4">
            <Navbarmenuadmin/>
            </div>
			<div>
				<div className="col-md-8 offset-md-2">
					{showLoading()}
					{showSuccess()}
					{showError()}
					{newPostForm()}
					{redirectUser()}
				</div>
			</div>
		</Layout>
	);
};

export default UpdateCategory;
