import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { getCollection, updateCollection, updateCollectionImage } from "./apiAdmin";
import Navbarmenuadmin from '../core/navbarmenuadmin'

const UpdateCollection = ({ match }) => {
	const [values, setValues] = useState({
		name: "",
        description: "",
		loading: false,
		error: false,
        success: false,
        photo:'',
        formData: '',
        redirectToProfile: false
	});

	const { user, token } = isAuthenticated();
	const {
		name,
        description,
		loading,
        photo,
        formData,
		error,
        redirectToProfile,
        success
	} = values;

	const init = (categoryId) => {
		getCollection(categoryId)
            .then(data => {
                if (data.error) {
                    setValues({
                        error: "Collection failed to load.",
                        success: false,
                        loading: false
                    })
                }
                else {
                    setValues({
                        name: data.name,
                        description: data.description,
                        formData: new FormData()
                    })
                }
            });
	};

	useEffect(() => {
		init(match.params.collectionId);
	}, []);

	const handleChange = (name) => (event) => {
		setValues({
            ...values,
            error: false,
            loading: false,
            success: false,
            [name]: event.target.value
        })
	};

	const [imgPreview, setImgPreview] = useState(null);
    const handlePhoto = (name) => (event) => {
		const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name,value)
		setValues({
            ...values,
            error: false,
            loading: false,
            success: false,
            [name]: value})

			if (value.length != 0){
				let reader = new FileReader();
				reader.onloadend = () => {
					setImgPreview(reader.result);
				}
				reader.readAsDataURL(value);
			}
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
        updateCollection(match.params.collectionId, user._id, token, {name: name, description: description})
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: "Collection failed to update", loading: false });
                }
                else {
                    updateCollectionImage(user._id, token, formData, data._id)
                        .then(data2 => {
                            if (data2.error) {
                                setValues({ ...values, error: "Failed to upload collection image", loading: false });
                            }
                            else {
                                setValues({ ...values, error: false, loading: false, redirectToProfile: true, success: true });
                            }
                        });
                }
            })

	};

	const newPostForm = () => (
		<form className="mb-3" onSubmit={clickSubmit}>
			<h1 id="addCateg">UPDATE COLLECTION</h1>
			<div class="container">
				<div class="row" style={{marginLeft:"auto", marginRight:"auto"}}>

					<label id="nameLabel">Collection Name</label>
					<input
					onChange={handleChange("name")}
					type="text"
					id="updatecollectionName"
					value={name}/>
				
				<label id="descLabel">Description</label>
				<input
					onChange={handleChange("description")}
					type="text"
					id="updateDesc"
					value={description}/>

				<div className = "imgPreview"  style={{background: imgPreview ? `url("${imgPreview}") no-repeat center/cover` : "none"}}>
					{!imgPreview && (
						<span>Edit Lookbook Pic</span>)}
				</div>
				
				<div class="row">
					<div class="col">
						<label for="choosephoto" id="customizeInput">CHOOSE PHOTO
						<input onChange = {handlePhoto('photo')} 
							type = "file" 
							name = "photo" 
							accept = "image/*" 
							id="choosephoto"
							style={{display:'none'}}/>
							</label>
					</div>
				</div>
		
				</div>
				<button id="saveCollection">SAVE CHANGES</button>
				<br></br>
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
				return <Redirect to="/admin/collections" />;
			}
		}
	};


	return (
		<Layout
			title="Update Collection"
			description={`${user.name}, update this collection!!`}
		>
			<div className="container-fluid">
			<div class="pl-4">
            <Navbarmenuadmin/>
            </div>
			</div>
			<div >
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

export default UpdateCollection;
