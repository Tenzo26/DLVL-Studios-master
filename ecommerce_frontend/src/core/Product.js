import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {read, listRelated} from './apiCore';
import Card5 from './Card5';
import { Link } from "react-router-dom";
import { itemTotal } from "./cartHelpers";
import search from './search.png';
import Navbarmenu from './navbarmenu';


const Product = (props) => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                }
                else {
                    setProduct(data);
                    listRelated(data._id)
                        .then(data => {
                            if (data.error) {
                                setError(data.error);
                            }
                            else {
                                setRelatedProduct(data);
                            }
                        });
                }
            });
    };

    useEffect(() => {  
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout title = {product && product.name}
        description = {product && product.description && product.description.substring(0,100)}
        className = "container-fluid">
            <div class="pl-4">
					<Navbarmenu  />
				</div>
				<div class="d-flex justify-content-end">
	
					<div class="pr-5" >
						<Link to={"/SearchPage"}>
							<img src={search} className="searchBtn"/>
						</Link>	
					</div>

				
				<div class="pr-5">
					<Link id="cartbag" to="/cart"> {" "}
						{itemTotal() == 0 ? (
							``
						) : (<sup>
							 <div className="bpos">
							<small className="cart-badge">{itemTotal()}</small>
                            </div>
						</sup>)}{" "}</Link>
				</div>

				<div style={{paddingRight:"20px"}}></div>
				</div>

         <h1 id="colltitle">COLLECTION ITEMS</h1>
            <div className = "col-4_item mb-3">
                    {product && 
                    product.description && 
                    product.description.substring(0,100)
                    &&  <div className = "mb-3-Coll">
                        <Card5 product = {product} showViewProductButton={false} showOtherImages = {true}/>
                        </div>}
                </div>

               {/* <div className ="col-4">
                    <h4>Related Products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className = "mb-3">
                            <Card3 key = {i} product = {p}/>
                    </div> *
                    ))} 
                    </div> */}
    
        </Layout>
    );

};

export default Product;