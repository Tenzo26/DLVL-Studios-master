import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getCategories, deleteCategory} from './apiAdmin';
import {  Popconfirm } from "antd";
import Navbarmenuadmin from '../core/navbarmenuadmin'

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const {user, token} = isAuthenticated();

    const loadCategories = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setCategories(data);
                    console.log("Categories loaded");  
                }
            });
        };

    const destroy = categoryId => {
            deleteCategory(categoryId, user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    loadCategories();   
                }
            })
    };
          /*}  if (window.confirm("Deleting this Category may affect the products under it.\nYou have to configure the category of each affected product.\nContinue?")) {*/

    useEffect(() => {
        loadCategories();
    },[]);

    const showCategories = () => {
        return (
            <div>
                <h1 id="addCateg">MANAGE COLORS</h1>
                <table className = "table table-striped">
            <thead id= "manageth">
                <tr>
                <th id="manageth" scope="col">COLORS (TOTAL: {categories.length})</th>
                <th id="manageth" scope="col">EDIT OR DELETE</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category, i) => (
                    <tr key = {i}>
                        <td id="managetd">
                            {category.name}
                        </td>
                        <td id="managetd">
                            <Link to = {`/admin/category/update/${category._id}`}>
                                    <button id="manageEdit3"></button>
                            </Link>
                            <Popconfirm
                                    title="Click ok to delete permanently."
                                    onConfirm={() => destroy(category._id)}>
                                <button  id="manageDelete3"></button>
                                </Popconfirm>
                        </td>          
                    </tr>
                ))}
            </tbody>
            </table>
            </div>
        );
    };

    const showCreate = () => (
        <div>
            <Link className="nav-link" to="/create/category">
            <button className = "btnAddcateg"></button>
            </Link>
        </div>
    );


    return (
        <Layout title = "Manage Categories" 
        description = "Modify or Remove Categories Here"
        className = "container-fluid">
            <div class="pl-4">
            <Navbarmenuadmin/>
            </div>
            <div class="d-flex justify-content-end">
				<div class="pr-5">
                {showCreate()}
				</div>
				<div style={{paddingRight:"20px"}}></div>
				</div>
            <div >
                <div className = "col-12">
                <h2 className = "text-center"></h2>
                {showCategories()}
                </div>
            </div>
        </Layout>
    );
};

export default ManageCategories;


