/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect, useHistory } from "react-router-dom";
import { changeBg, removeBg } from "./apiAdmin";
import Dialog from '../core/Dialog'
import {  Popconfirm } from "antd";
import Navbarmenuadmin from '../core/navbarmenuadmin'


const UpdateBackground = ({ match }) => {
	const [values, setValues] = useState({
		photo: "",
		formData: new FormData(),
		loading: false,
		error: false,
	});

	const history = useHistory();

	const { user, token } = isAuthenticated();

	const { loading, error, photo, formData } = values;

	const [imgPreview, setImgPreview] = useState(null);
	const handleChange = (name) => (event) => {
		const value =
			name === "photo" ? event.target.files[0] : event.target.value;
			let reader = new FileReader();    
		formData.set(name, value);
		setValues({ ...values, [name]: value });

		//image preview
        if (value != null){     
            reader.onloadend = () => {
            setImgPreview(reader.result);
            }
            reader.readAsDataURL(value);
        }
	};

	const clickSubmit = (e) => {
		e.preventDefault();

		if (photo === "" || photo === undefined)return;

		changeBg(user._id, token, formData).then((res) => {
			if (res.error) {
				setValues({ ...values, error:true });
			} else {
				alert("Background has been successfully updated!")
				history.push("/admin/landingpageadmin");

				setValues({
					...values,
					photo: "",
					loading: false,
					error: false,
				});
			}
		});

	};

	const handleRemoveBg = () => {
		removeBg(user._id, token).then((res) => {
			if (!res.error) alert("Background has been successfully removed!");history.push("/admin/landingpageadmin");
		});
	};

	const hiddenFileInput=React.useRef(null);
	const handleClick = e =>{
		hiddenFileInput.current.click();
	};

	const handleSubmit = (e) => {

        if ((photo == "")) { 		      
            alert("Please try again and choose a background photo before clicking the upload button.")
        }  

	}
	


	const newPostForm = () => (
		<form className="mb-3" onSubmit={clickSubmit}>
			<div style={{marginTop:"70px"}}>
				<h4 id="updateBgLabel" >Update Background Image</h4>
				<div className = "bgPreview" style={{background: imgPreview ? `url("${imgPreview}") no-repeat center/cover` : "none"}}>
                {!imgPreview && (<span>Background Picture</span> )}
            </div>
				<div class="d-flex justify-content-between">
    			<div>
				

					<label >
						<button id="chooseBg" onClick={handleClick}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CHOOSE PHOTO</button>
						<input onChange={handleChange("photo")} ref={hiddenFileInput} style={{display:'none'}} type="file" name="photo" accept="image/*" required/>
					</label>
    			</div>
				<div>
				<button type="submit" id="uploadBg" onClick={handleSubmit}>
					UPLOAD 
				</button>
				</div>
    			</div>
  			


			</div>
		</form>
	);


	const showError = () => (
		<div
			className="alert alert-danger"
			style={{ display: values.error===true ? "" : "none" }}
		>
			<h1>hi</h1>
		</div>
	);

	// const showSuccess = () => (
	// 	<div
	// 		className="alert alert-info"
	// 		style={{ display: createdProduct ? "" : "none" }}
	// 	>
	// 		<h2>{`${createdProduct}`} is updated!</h2>
	// 	</div>
	// );



	return (
		
		<Layout className="container-fluid">
			<div class="pl-4">
            	<Navbarmenuadmin/>
            </div>
			<div class="d-flex justify-content-end">
				<div class="pr-2">
				<Popconfirm
						title="Is that your final answer?"
						onConfirm={handleRemoveBg}
					>
					
					<button  id="removeBg"></button>
					</Popconfirm>
				</div>
				<div style={{paddingRight:"20px"}}></div>
				</div>

				<div className="col-md-8 offset-md-2">
					{/* {showSuccess()} */}
					{showError()}
					{newPostForm()}
				</div>
		</Layout>
	);
};

export default UpdateBackground;
