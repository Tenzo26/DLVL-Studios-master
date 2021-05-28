import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createCollection, uploadCollectionImage} from './apiAdmin';
import Navbarmenuadmin from '../core/navbarmenuadmin'

const AddCollection = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setFormData] = useState({
        formData: '',
        photo: ''
    });

    const {
        formData,
        photo
    } = form;

    const{user, token} = isAuthenticated();

    useEffect(() => {
        setFormData({
            ...form,
            formData: new FormData()
        })
    },[]);

    const handleChangeName = (e) => {
        setError('');
        setName(e.target.value);
    };

    const handleChangeDesc = (e) => {
        setError('');
        setDescription(e.target.value);
    };


    const [imgPreview, setImgPreview] = useState(null);
    const handlePhoto = e => {
        const value = e.target.files[0];
        let reader = new FileReader();       

        formData.set(e.target.name, value);
        setFormData({...form, [e.target.name]: value});

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
        setError('');
        setSuccess(false);

        createCollection(user._id, token, {name, description})
            .then(data => {
                if (data.error) {
                    setError('It\'s either the collection name already exists or something wrong happened');
                }
                else {
                    setSuccess(true);
                    uploadCollectionImage(user._id, token, formData, data.data._id)
                        .then(data => {
                            if (data.error) {
                                setError('The collection is saved but the image failed to upload.')
                                setSuccess(false)
                            }
                            else {
                                setError('');
                            }
                        });
                }
            });   
    };

    const Upload = (e) => {
        if (photo == "" ) { 		      
            alert("Please try again and upload a lookbook pic before clicking the add button.")
        }
	}

    const newCollectionForm = () => (
        <form onSubmit={clickSubmit}>
        <h1 id="addCateg">ADD COLLECTION</h1>

         <div class="container" style={{marginLeft:"auto", marginRight:"auto"}}>
            <div class="row" style={{marginLeft:"auto", marginRight:"auto"}}>      
                <input type = "text" id="collectionName" placeholder="Collection Name"  onChange={handleChangeName} value = {name} required/>
                <input type = "text" id="collectionDesc" placeholder="Collection Description" onChange={handleChangeDesc} value = {description} required/>
           
            <div className = "imgPreview" style={{background: imgPreview ? `url("${imgPreview}") no-repeat center/cover` : "none"}}>
                {!imgPreview && (<span>Lookbook Pic</span> )}
            </div>

            <div class="row">
                <div class="col">
                    <label for="choosephoto" id="customizeInput">CHOOSE PHOTO
                    <input onChange = {handlePhoto} type = "file" name = "photo" accept = "image/*" id="choosephoto" style={{display:'none'}} required/>
                    </label>
                </div>
            </div>
            </div>
            <button id="saveCollection" onClick={Upload}>SAVE CHANGES</button>  
         </div>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 style={{fontFamily:"Times New Roman"}} className = "alert alert-success">"{name}" Collection is Created.</h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className = "alert alert-danger">Failed to create Collection "{name}". {error}.</h3>
        }
    }

    return (
        <Layout title = "Create a new Collection" className="container-fluid" description = {`Awaiting orders, ${user.name}!`}>
            <div class="pl-4">
            <Navbarmenuadmin/>
            </div>
        <div >
            <div className = "col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {newCollectionForm()}
            </div>
        </div>
        <br></br>
        <br></br>
        </Layout>        
    );
};

export default AddCollection;