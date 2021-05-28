import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createProduct, getCategories, getCollections} from './apiAdmin';
import {getGenderValues} from '../core/apiCore';
import Navbarmenuadmin from '../core/navbarmenuadmin';

const AddProduct = () => {
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        collections: [],
        genders: [],
        gender: '',
        category: '',
        _collection: '',
        shipping: '',
        quantitySmall: '',
        quantityMed: '',
        quantityLarge: '',
        quantityFree: '',
        photo_1: '',
        photo_2: '',
        photo_3: '',
        loading: false,
        error: '',
        createdProduct: '',
        sizeSmall: false,
        sizeMed: false,
        sizeLarge: false,
        sizeFree: false,
        redirectToProfile: false,
        formData: ''
    });

    const {
        name,
        description,
        price,
        categories,
        collections,
        genders,
        gender,
        category,
        _collection,
        shipping,
        quantitySmall,
        quantityMed,
        quantityLarge,
        quantityFree,
        photo_1,
        photo_2,
        photo_3,
        loading,
        error,
        createdProduct,
        sizeSmall,
        sizeMed,
        sizeLarge,
        sizeFree,
        redirectToProfile,
        formData
    } = values;

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({...values, error:data.error});
            }
            else {
                getCollections().then(data2 => {
                    if (data2.error) {
                        setValues({...values, error:data.error});
                    }
                    else {
                        getGenderValues().then(data3 => {
                            if (data3.error) {
                                setValues({...values, error:data.error});
                            }

                            else {
                                setValues({...values, categories: data, collections: data2, genders: data3, formData: new FormData()});
                            }
                        })
                    }
                });
            }
        });
    };

    useEffect(() => {
        init();
    },[]);

    const handleChange = (name) => event => {
        const value = name === 'photo_1' || name === 'photo_2' || name === 'photo_3' ? 
            event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value});
    };

    const clickSubmit = (event) => {
        event.preventDefault();

        if (photo_1 === "" || photo_1 === undefined
        || photo_2 === "" || photo_2 === undefined 
        || photo_3 === "" || photo_3 === undefined)return;

        setValues({...values, error: '', loading: true});
        createProduct(user._id, token, formData)
            .then(data => {
                if(data.error) {
                    setValues({...values, error: true, loading: false});
                }
                else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        photo_1: '',
                        photo_2: '',
                        photo_3: '',
                        price: '',
                        quantitySmall: '',
                        quantityMed: '',
                        quantityLarge: '',
                        quantityFree: '',
                        sizeSmall: false,
                        sizeMed: false,
                        sizeLarge: false,
                        sizeFree: false,
                        error: false,
                        loading: false,
                        createdProduct: data.name
                    });
                }
            });
    };

    const Upload = (e) => {
        if ((photo_1 == "" || photo_2 == "" || photo_3 =="")) { 		      
            alert("Please try again and upload 3/3 item photos before clicking the add button.")
        }
	}
	

    const newPostForm = () => (
        <form className = "mb-3" onSubmit={clickSubmit}>
        <h1 id="addCateg">ADD ITEM</h1>
        <div class="itemdiv">
                <div class="row" style={{marginLeft:"auto", marginRight:"auto"}}>
                 <div class="col-8">
                    <input onChange = {handleChange('name')} type = "text"  id="itemName" placeholder="Item Name" value = {name} required/>
                 </div>
                    <input onChange = {handleChange('price')} type = "number" id="itemPrice" placeholder="Php" min="0" value = {price} required/>
                </div>
                   
                <div class="row" style={{marginLeft:"auto", marginRight:"auto"}}>
                    <div class="col">
                        <textarea onChange = {handleChange('description')} id="itemDescription" placeholder="Garment Description" value = {description} required/>
                    </div>
                </div>

                <div class="row" style={{marginLeft:"auto", marginRight:"auto"}}>
                    <div class="col">
                        <div class="dropdown">
                            <select onChange = {handleChange('gender')} id="itemGender" required>
                            <option disabled selected hidden>Gender</option>
                            {genders && genders.map((gender, index) => (
                            <option key = {index} value = {gender}>{gender}</option>
                            ))}
                        </select>
                        <div class="select__arrow"></div>
                    </div>
                </div>
            </div>
       
            <div class="row" style={{marginLeft:"auto", marginRight:"auto"}}>
                <div class="col">
                    <div class="dropdown">
                        <select onChange = {handleChange('category')} id="itemColor" required>
                        <option disabled selected hidden>Color</option>
                        {categories && categories.map((c, i) => (
                            <option key = {i }value = {c._id}>{c.name}</option>
                        ))}
                        </select>
                        <div class="select__arrow"></div>
                    </div>
                </div>
            </div>
               
            <div class="row" style={{marginLeft:"auto", marginRight:"auto"}}>
                <div class="col">
                    <div class="dropdown">
                        <select onChange = {handleChange('_collection')} id="itemColor" required>
                        <option disabled selected hidden>Collection</option>
                        {collections && collections.map((c, i) => (
                            <option key = {i }value = {c._id}>{c.name}</option>
                        ))}
                        </select>
                        <div class="select__arrow"></div> 
                    </div>
                </div>
            </div>

            <div class="row" style={{marginLeft:"auto", marginRight:"auto"}}>
                    <div class="col">
                        <div class="dropdown"> 
                            <select onChange = {handleChange('shipping')} id="itemColor" required>
                                <option disabled selected hidden>Shipping</option>
                                <option value = "1">Available</option>
                                <option value = "0">Not Available</option>
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
                        <input onChange = {handleSize('sizeSmall')} id="smallchk" type = "checkbox" value = {sizeSmall}/>
                        <span className="prodCheckmark"></span>
                        </label>

                        <label id="smallLabel">Small
                        <input onChange = {handleChange('quantitySmall')} style = {{display: sizeSmall ? '' : 'none'}}
                        type = "number" id="smallNum" placeholder="Pcs" min="0" value = {quantitySmall}/>
                        </label>
                        </div>

                    <div className = "form-check">
                    <label className="prodCheckbox">
                        <input onChange = {handleSize('sizeMed')} type = "checkbox" value = {sizeMed}/>
                        <span className="prodCheckmark"></span>
                        </label>

                        <label id="medLabel">Medium
                        <input onChange = {handleChange('quantityMed')} style={{display: sizeMed ? '' : 'none'}}
                        type = "number" id="medNum" placeholder="Pcs" min="0" value = {quantityMed}/>
                        </label>
                    </div>

                    <div className = "form-check">
                    <label className="prodCheckbox">
                        <input onChange = {handleSize('sizeLarge')} id = "largechk" type = "checkbox" value = {sizeLarge}/>
                        <span className="prodCheckmark"></span>
                    </label>

                        <label for="largechk" id="largeLabel">Large
                        <input onChange = {handleChange('quantityLarge')} style = {{display: sizeLarge ? '' : 'none'}}
                        type = "number" id="largeNum" placeholder="Pcs" min="0"  value = {quantityLarge}/>
                        </label>
                    </div>

                    <div className = "form-check">
                    <label className="prodCheckbox">
                        <input onChange = {handleSize('sizeFree')} id = "freechk" type = "checkbox" value = {sizeFree}/>
                        <span className="prodCheckmark"></span>
                    </label>

                        <label for="freechk" id="freeLabel">Free Size
                        <input onChange = {handleChange('quantityFree')} style = {{display: sizeFree ? '' : 'none'}}
                        type = "number" id="freeNum" placeholder="Pcs" min="0" value = {quantityFree}/>
                        </label>
                    </div>
                </div>
            </div>
       
            <div class="row">
                <div class="outer">
                        <div class="inner">
                            <label for="choosephoto" id="uploadPhoto">CHOOSE PHOTO 1
                            <input onChange = {handleChange('photo_1')} type = "file" name = "photo_1" accept = "image/*"  id="choosephoto" 
                            style={{display:'none'}}
                            required/>
                            </label>
                        </div>
                    
                        <div class = "inner">
                                <label class="inner" for="choosephoto2" id="uploadPhoto">CHOOSE PHOTO 2
                                <input onChange = {handleChange('photo_2')} type = "file" name = "photo_2" accept = "image/*" id="choosephoto2" required
                                style={{display:'none'}}/>
                                </label>
                        </div>
                    
                        <div class= "inner">
                            <label for="choosephoto3" id="uploadPhoto">CHOOSE PHOTO 3
                            <input onChange = {handleChange('photo_3')} type = "file" name = "photo_3" accept = "image/*" id="choosephoto3" required
                            style={{display:'none'}}/>
                            </label>
                        </div>
                    </div>             
            </div>
    </div>
          <button id="add" onClick={Upload}>ADD</button>
    </form>
    );

    const handleSize = (name) => event => {
        const value = event.target.checked;
        event.target.value = event.target.checked;
        formData.set(name, value);
        setValues({...values, [name]: value});
    };

    const showError = () => (
        <div className = "alert alert-danger" style = {{display: error ? '' : 'none'}}>
            <h5 style={{fontFamily: "Times New Roman"}}>
                Insufficient Details! Please review your input and try again.
            </h5>
        </div>
    );

    const showSuccess = () => (
        <div className = "alert alert-success" style = {{display: createdProduct ? '' : 'none'}}>
            <h5 style={{fontFamily: "Times New Roman"}}>{createdProduct} is successfully created!</h5>
        </div>
    );

    const showLoading = () => (
        loading && (
        	<div style={{ border:"0",fontFamily: "Times New Roman", width:"50%", display:"block",marginRight:"auto", marginLeft:"auto" }} className="alert alert-dark w-75">
			<h4 style={{fontFamily: "Times New Roman"}}>Loading...</h4>
        </div>)
    );
    
    return (
        <Layout title = "Create a new Product" className="container-fluid" description = {`Ready to add a new product, ${user.name}!`}>
          <div class="pl-4">
            <Navbarmenuadmin/>
            </div>   
        <div className = "row">
            <div className = "col-md-8 offset-md-2">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newPostForm()}
            </div>
        </div>
        <br></br>
            
        </Layout>        
    );
};

export default AddProduct;
