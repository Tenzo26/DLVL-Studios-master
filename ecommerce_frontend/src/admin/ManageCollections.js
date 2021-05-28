import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getCollections, deleteCollection} from './apiAdmin';
import {  Popconfirm } from "antd";
import Navbarmenuadmin from '../core/navbarmenuadmin'

const ManageCollections = () => {
    const [collections, setCollections] = useState([]);
    const {user, token} = isAuthenticated();

    const loadCollections = () => {
        getCollections()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setCollections(data);
                    console.log("Collections loaded");  
                }
            });
        };

    const destroy = collectionId => {
            deleteCollection(collectionId, user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    loadCollections();   
                }
            })
    };

    /*if (window.confirm("Deleting this Collection may affect the products under it.\nYou have to configure the collection of each affected product.\nContinue?")) {*/

    
    useEffect(() => {
        loadCollections();
    },[]);

    const showCollections = () => {
        return (
            <div style={{marginLeft:"auto", marginRight: "auto"}}>
            <h1 id="addCateg">MANAGE COLLECTIONS</h1>
            <table className = "table table-striped" style={{marginLeft:"auto", marginRight: "auto"}}>
            <thead id="manageth">
                <tr>
                <th id="manageth" scope="col">COLLECTIONS (TOTAL: {collections.length})</th>
                <th id="manageth" scope="col">DESCRIPTION</th>
                <th id="manageth" scope="col">EDIT OR DELETE</th>       
                </tr>
            </thead>
            <tbody>
                {collections.map((collection, i) => (
                    <tr key = {i}>
                        <td id="managetd">
                            {collection.name}
                        </td>
                        <td id="managetd" >
                            {collection.description}
                        </td>
                        <td id="managetd">
                            <Link to = {`/admin/collection/update/${collection._id}`}>
                                    <button id="manageEdit2"></button>
                                </Link>
                                <Popconfirm
                                    title="Click ok to delete permanently."
                                    onConfirm={() => destroy(collection._id)}>
                                <button  id="manageDelete2"></button>
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
            <Link className="nav-link" to="/create/collection">
            <button className = "btnAddcateg"></button>
            </Link>
        </div>
    );

    return (
        <Layout title = "Manage Collections" 
        description = "Modify or Remove Collections Here"
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
            <div>
                <div className = "col-12">
                <h2 className = "text-center"></h2>
                {showCollections()}
                </div>
            </div>
        </Layout>
    );
};

export default ManageCollections;


