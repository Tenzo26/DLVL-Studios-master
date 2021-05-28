import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { getProduct, getCategories, updateProduct, getCollections } from "./apiAdmin";
import { getGenderValues } from "../core/apiCore";
import Navbarmenuadmin from '../core/navbarmenuadmin'

const UpdateProduct = ({ match }) => {
	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		categories: [],
		collections: [],
		genders: [],
		gender: '',
		category: "",
		_collection: "",
		shipping: "",
		quantitySmall: '',
        quantityMed: '',
        quantityLarge: '',
        quantityFree: '',
		photo_1: '',
        photo_2: '',
        photo_3: '',
		loading: false,
		loadingProduct: false,
		error: false,
		createdProduct: "",
		sizeSmall: false,
        sizeMed: false,
        sizeLarge: false,
        sizeFree: false,
		redirectToProfile: false,
		formData: "",
	});
	const [categories, setCategories] = useState([]);
	const [collections, setCollections] = useState([]);
	const [genders, setGenders] = useState([]);

	const { user, token } = isAuthenticated();
	const {
		name,
		description,
		price,
		// categories,
		// collections,
		gender,
		category,
		_collection,
		shipping,
		quantitySmall,
		quantityMed,
		quantityLarge,
		quantityFree,
		loading,
		loadingProduct,
		error,
		createdProduct,
		sizeSmall,
        sizeMed,
        sizeLarge,
        sizeFree,
		redirectToProfile,
		formData,
	} = values;

	const init = (productId) => {
		setValues({
			...values,
			loadingProduct: true
		})
		getProduct(productId).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {

				let category
				let _collection 
				try {
					category = data.category._id
					_collection = data._collection._id
				}

				catch {
					alert("Category or Collection not found")
				}
				
				setValues({
					...values,
					name: data.name,
					description: data.description,
					price: data.price,
					gender: data.gender,
					category: category,
					_collection: _collection,
					shipping: data.shipping,
					quantitySmall: data.quantitySmall,
					quantityMed: data.quantityMed,
					quantityLarge: data.quantityLarge,
					quantityFree: data.quantityFree,
					sizeSmall: data.sizeSmall,
        			sizeMed: data.sizeMed,
        			sizeLarge: data.sizeLarge,
        			sizeFree: data.sizeFree,
					loadingProduct: false,
					formData: new FormData(),
				});
				console.log("Product loaded")
				// load categories
				initCategories();
			}
		});
	};

	// load categories and set form data
	const initCategories = () => {
		getCategories().then(data => {
            if (data.error) {
                setValues({...values, error:data.error});
            }
            else {
                getCollections().then(data2 => {
                    if (data2.error) {
                        setValues({...values, error:data2.error});
                    }
                    else {
						getGenderValues().then(data3 => {
							if (data3.error) {
								setValues({...values, error:data3.error});
							}
							else {
								setCategories(data);
								setCollections(data2);
								setGenders(data3);
							}
						})
                        
                    }
                });
            }
        });
	};

	useEffect(() => {
		init(match.params.productId);
	}, []);

	const handleChange = (name) => (event) => {
		const value = name === 'photo_1' || name === 'photo_2' || name === 'photo_3' ? 
            event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });

		updateProduct(match.params.productId, user._id, token, formData).then(
			(data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({
						...values,
						name: "",
						description: "",
						photo_1: '',
                        photo_2: '',
                        photo_3: '',
						price: "",
						quantitySmall: '',
                        quantityMed: '',
                        quantityLarge: '',
                        quantityFree: '',
						loading: false,
						error: false,
						redirectToProfile: true,
						createdProduct: data.name,
					});
				}
			}
		);
	};

	const newPostForm = () => (
		<form className="mb-3" onSubmit={clickSubmit} style = {{display: loadingProduct ? 'none':''}}>
		<h1 id="addCateg">EDIT ITEM</h1>
		<div class="itemdiv">
		
			<div class="row"  style={{marginLeft:"auto", marginRight:"auto"}}>
			<div class="outer">
				<div class="inner">
				<label id="nameLabel2">Item Name</label>
					<input
						onChange={handleChange("name")}
						type="text"
						id="itemName2"
						value={name}
						required/>
				</div>

				<div class="inner2">
				<label id="descLabel2">&nbsp;&nbsp;&nbsp;Item Price</label>
					<input
						onChange={handleChange("price")}
						type="number"
						id="itemPrice2"
						value={price}
						required/>
				</div>
				</div>
			</div>

			<div class="row"  style={{marginLeft:"auto", marginRight:"auto"}}>
				<div class="col">
				<label id="descLabel">Description</label>
					<textarea
						onChange={handleChange("description")}
						id="itemDescription2" 
						value={description}
						required/>
				</div>	
			</div>
			
			<div class="row"  style={{marginLeft:"auto", marginRight:"auto"}}>
				<div class="col">
					<div class="dropdown">
					<label id="descLabel">Gender</label>
						<select onChange = {handleChange('gender')}  id="itemGender2" value = {gender} required>
						<option disabled selected hidden>Gender</option>
						{genders && genders.map((gender, index) => (
							<option key = {index} value = {gender}>{gender}</option>
							))}
						</select>
						<div class="select__arrow"></div>
					</div>
				</div>
			</div>
			
			<div class="row"  style={{marginLeft:"auto", marginRight:"auto"}}>
				<div class="col">
				<label id="descLabel">Color</label>
					<div class="dropdown">
						<select
						onChange={handleChange("category")}
						id="itemColor2" value = {category} required>
						<option>Color</option>
						{categories &&
							categories.map((c, i) => (
								<option key={i} value={c._id}>
									{c.name}
								</option>
							))}
						</select>
						<div class="select__arrow"></div>
					</div>
				</div>
			</div>
			
			<div class="row"  style={{marginLeft:"auto", marginRight:"auto"}}>
				<div class="col">
				<label id="descLabel">Collection</label>
					<div class="dropdown">
						<select onChange = {handleChange('_collection')}  id="itemColor2" value = {collections} required>
						<option disabled selected hidden>Collection</option>
						{collections && collections.map((c, i) => (
							<option key = {i }value = {c._id}>{c.name}</option>
						))}
						</select>
						<div class="select__arrow"></div>
					</div>	
				</div>
			</div>

			<div class="row"  style={{marginLeft:"auto", marginRight:"auto"}}>
				<div class="col">
					<label id="descLabel">Shipping</label>
					<div class="dropdown">
						<select
						onChange={handleChange("shipping")}
						id="itemColor2" value = {shipping} required
						>
						<option disabled selected hidden>Shipping</option>
						<option value="0">No</option>
						<option value="1">Yes</option>
						</select>
						<div class="select__arrow"></div>
					</div>
				</div>
			</div>
		
			<div class="row">
            <h1 id="itemSizes">Sizes</h1>
            </div>
			
            <div class="row" style={{marginLeft:"auto", marginRight:"auto"}}>
                <div class="col">
                    <div className="form-check">
                        <label className="prodCheckbox">
                        <input onChange = {handleSize('sizeSmall')} id="smallchk" type = "checkbox" value = {sizeSmall} checked = {sizeSmall}/>
                        <span className="prodCheckmark"></span>
                        </label>

                        <label id="smallLabel">Small
                        <input onChange = {handleChange('quantitySmall')} style = {{display: sizeSmall ? '' : 'none'}}
                        type = "number" id="smallNum" placeholder="Pcs" min="0" value = {quantitySmall}/>
                        </label>
                        </div>

                    <div className = "form-check">
                    <label className="prodCheckbox">
                        <input onChange = {handleSize('sizeMed')} type = "checkbox" value = {sizeMed} checked = {sizeMed}/>
                        <span className="prodCheckmark"></span>
                        </label>

                        <label id="medLabel">Medium
                        <input onChange = {handleChange('quantityMed')} style={{display: sizeMed ? '' : 'none'}}
                        type = "number" id="medNum" placeholder="Pcs" min="0" value = {quantityMed}/>
                        </label>
                    </div>

                    <div className = "form-check">
                    <label className="prodCheckbox">
                        <input onChange = {handleSize('sizeLarge')} id = "largechk" type = "checkbox" value = {sizeLarge} checked = {sizeLarge}/>
                        <span className="prodCheckmark"></span>
                    </label>

                        <label for="largechk" id="largeLabel">Large
                        <input onChange = {handleChange('quantityLarge')} style = {{display: sizeLarge ? '' : 'none'}}
                        type = "number" id="largeNum" placeholder="Pcs" min="0"  value = {quantityLarge}/>
                        </label>
                    </div>

                    <div className = "form-check">
                    <label className="prodCheckbox">
                        <input onChange = {handleSize('sizeFree')} id = "freechk" type = "checkbox" value = {sizeFree} checked = {sizeFree}/>
                        <span className="prodCheckmark"></span>
                    </label>

                        <label for="freechk" id="freeLabel">Free Size
                        <input onChange = {handleChange('quantityFree')} style = {{display: sizeFree ? '' : 'none'}}
                        type = "number" id="freeNum" placeholder="Pcs" min="0" value = {quantityFree}/>
                        </label>
                    </div>
                </div>
            </div>
		
				<div class="row"  style={{marginLeft:"auto", marginRight:"auto"}}>
					<div class="outer">
						<div class="inner">
							<label for="choosephoto" id="uploadPhoto">CHOOSE PHOTO 1
							<input onChange = {handleChange('photo_1')} id="choosephoto" type = "file" name = "photo_1" accept = "image/*"
							style={{display:'none'}}/>
							</label>
						</div>
						

						<div class="inner">
							<label for="choosephoto2" id="uploadPhoto">CHOOSE PHOTO 2
							<input onChange = {handleChange('photo_2')}id="choosephoto2" type = "file" name = "photo_2" accept = "image/*"
							style={{display:'none'}}/>
							</label>
						</div>
				
						<div class="inner">
							<label for="choosephoto3" id="uploadPhoto">CHOOSE PHOTO 3	
							<input onChange = {handleChange('photo_3')} id="choosephoto3" type = "file" name = "photo_3" accept = "image/*"
							style={{display:'none'}}/>
							</label>
						</div>
					</div>
				</div>
		</div>	
			<button id="add">SAVE CHANGES</button>
		</form>
	);

	const handleSize = (name) => event => {
        const value = event.target.checked;
        event.target.value = event.target.checked;
        formData.set(name, value);
        setValues({...values, [name]: value});
    };

	const showError = () => (
		<div
			className="alert alert-danger"
			style={{ display: error ? "" : "none",
			}}
		>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div
			className="alert alert-info"
			style={{ display: createdProduct ? "" : "none" }}>
			<h2 style={{fontFamily: "Times New Roman"}}>{`${createdProduct}`} is updated!</h2>
		</div>
	);

	const showLoading = () =>
		loading && (
			<div style={{ border:"0",fontFamily: "Times New Roman", width:"50%", display:"block",marginRight:"auto", marginLeft:"auto" }} className="alert alert-dark w-75">
			<h4 style={{fontFamily: "Times New Roman"}}>Loading...</h4></div>
		);

	const showLoadingProduct = () =>
		loadingProduct && (
			<div style={{ border:"0",fontFamily: "Times New Roman", width:"50%", display:"block",marginRight:"auto", marginLeft:"auto" }} className="alert alert-dark w-75">
			<h4 style={{fontFamily: "Times New Roman"}}>Loading Product...</h4></div>
		);

	const redirectUser = () => {
		if (redirectToProfile) {
			if (!error) {
				return <Redirect to="/admin/products" />;
			}
		}
	};


	return (
		<Layout
			title="Update Product"
			description={`${user.name}, update this product!`}
			className="container-fluid"
		>
			<div class="pl-4">
            <Navbarmenuadmin/>
            </div>
			<div className="row">
				<div className="col-md-8 offset-md-2">
					{showLoading()}
					{showLoadingProduct()}
					{showSuccess()}
					{showError()}
					{newPostForm()}
					{redirectUser()}
				</div>
			</div>
			<br></br>
		</Layout>
	);
};

export default UpdateProduct;
