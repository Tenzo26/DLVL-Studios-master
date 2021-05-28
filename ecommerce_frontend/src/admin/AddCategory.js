import React, {useState} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createCategory} from './apiAdmin';
import Navbarmenuadmin from '../core/navbarmenuadmin'

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const{user, token} = isAuthenticated();
    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        createCategory(user._id, token, {name})
            .then(data => {
                if (data.error) {
                    setError(true);
                }
                else {
                    setError('');
                    setSuccess(true);
                }
            });
    };

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
        <h1 id="addCateg" style={{marginTop:"20px"}}>ADD COLOR</h1>
            <div class="container" style={{marginLeft:"auto", marginRight:"auto"}}>
                <div class="row" style={{marginLeft:"auto", marginRight:"auto"}}>
                        <input type = "text" id="categoryName" placeholder="Color" onChange={handleChange} value = {name} autoFocus required/>
                    </div>
                        <button id="saveCateg">CREATE COLOR</button>
                </div>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 style={{fontFamily:"Times New Roman"}} className = "alert alert-success">"{name}" Color is Created.</h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className = "alert alert-danger">Failed to create color "{name}". The category may already exist.</h3>
        }
    }

    return (
        <Layout title = "Create a new Category" className="container-fluid" description = {`Awaiting orders, ${user.name}!`}>
             <div class="pl-4">
            <Navbarmenuadmin/>
            </div>
        <div>
            <div className = "col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
            </div>
        </div>
            
        </Layout>        
    );
};

export default AddCategory;