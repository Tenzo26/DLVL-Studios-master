import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getProducts, deleteProduct} from './apiAdmin';
import {  Popconfirm } from "antd";
import Navbarmenuadmin from '../core/navbarmenuadmin';
import DialogCritical from '../core/DialogCritical'
import { CRITICAL_STOCK } from "../config";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const {user, token} = isAuthenticated();
    const [showCritical, setshowCritical] = useState(false);

    const loadProducts = () => {
        getProducts()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setProducts(data);
                    console.log("Products loaded");  
                }
            });
        };

    const destroy = productId => {
        deleteProduct(productId, user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    loadProducts();   
                }
            })
    };

    const scanProducts = (role) => {
		if (role == 1) {
			getProducts()
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    data.map((product, i) => {
						if (
							(product.sizeSmall && product.quantitySmall <= CRITICAL_STOCK) || 
							(product.sizeMed && product.quantityMed <= CRITICAL_STOCK) || 
							(product.sizeLarge && product.quantityLarge <= CRITICAL_STOCK) || 
							(product.sizeFree && product.quantityFree <= CRITICAL_STOCK)
						)
							{
                            console.log(product.name + " low")
							setshowCritical(true)
						}
					}) 
                }
            });
		}
	}
    
    useEffect(() => {
        loadProducts();
        scanProducts(user.role);
    },[]);

    const criticalAlert = () => {
		if (user.role == 1) {
			return (
				<DialogCritical isOpen = {showCritical} redirectButton = "OK" showCancelButton = "no" onClose = {(e) => {
					<div style={{backgroundColor: 'black', width: '800px', height: '100%'}}></div>
					setshowCritical(false)
				}}>
					There's a product with critically low stock! Please check.
				</DialogCritical>
			)
		}
	}

    const showProducts = () => {
        return (
            <div class="inventory">
                <h1 style={{marginTop:"-50px"}}id="inventorytitle">MANAGE PRODUCTS</h1>
                <table className = "prodtable table-striped">
            <thead className="prodth">
                <tr>
                <th  id="prodth" scope="col">PRODUCTS <br/>(TOTAL: {products.length})</th>
                <th  id="prodth" scope="col">GENDER</th>
                <th  id="prodth" scope="col">COLOR</th>
                <th  id="prodth" scope="col">COLLECTION</th>
                <th  id="prodth" scope="col">SMALL</th>
                <th  id="prodth" scope="col">MEDIUM</th>
                <th  id="prodth" scope="col">LARGE</th>
                <th  id="prodth" scope="col">FREE SIZE</th>
                <th  id="prodth" scope="col">SHIPPING</th>
                <th  id="prodth" scope="col">SOLD<br/>(SMALL)</th>
                <th  id="prodth" scope="col">SOLD<br/>(MEDIUM)</th>
                <th  id="prodth" scope="col">SOLD<br/>(LARGE)</th>
                <th  id="prodth" scope="col">SOLD<br/>(FREE SIZE)</th>
                <th  id="prodth" scope="col">EDIT OR DELETE</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, i) => (
                    <tr key = {i}>
                        <td id="prodtd">
                            {product.name}
                        </td>
                        <td id="prodtd">
                            {product.gender ? product.gender : '-'}
                        </td>
                        <td id="prodtd">
                            {product.category ? product.category.name : '-'}
                        </td>
                        <td id="prodtd">
                            {product._collection ? product._collection.name : "-"}
                        </td>
                        <td id="prodtd">
                            {product.sizeSmall ? product.quantitySmall : '-'}
                        </td>
                        <td id="prodtd">
                            {product.sizeMed ? product.quantityMed : '-'}
                        </td>
                        <td id="prodtd">
                            {product.sizeLarge ? product.quantityLarge : '-'}
                        </td>
                        <td id="prodtd">
                            {product.sizeFree ? product.quantityFree : '-'}
                        </td>
                        <td id="prodtd"> 
                            {product.shipping ? "Available" : "Not Available"}
                        </td>
                        <td id="prodtd">
                            {product.sizeSmall ? product.soldSmall : '-'}
                        </td>
                        <td id="prodtd">
                            {product.sizeMed ? product.soldMed : '-'}
                        </td>
                        <td id="prodtd">
                            {product.sizeLarge ? product.soldLarge : '-'}
                        </td>
                        <td id="prodtd">
                            {product.sizeFree ? product.soldFree : '-'}
                        </td>
                        <td id="prodtd">
                            <Link to = {`/admin/product/update/${product._id}`}>
                                    <button id="manageEdit"></button>
                                </Link>
                            <Popconfirm
                                    title="Click ok to delete permanently."
                                    onConfirm={() => destroy(product._id)}>
                                <button  id="manageDelete"></button>
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
            <Link className="nav-link" to="/create/product">
            <button className = "btnAddcateg"></button>
            </Link>
        </div>
    );

    return (
        <Layout title = "Manage Products" 
        description = "Modify or Remove Products Here"
        className = "container-fluid">
            {criticalAlert()}
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
                {showProducts()}
                </div>
            </div>
            <br></br>
        </Layout>
    );
};

export default ManageProducts;


