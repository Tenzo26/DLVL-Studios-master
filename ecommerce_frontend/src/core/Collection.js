import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {readCollection, listRelatedCollection} from './apiCore';
import Card7 from './Card7';
import { Link } from "react-router-dom";
import { itemTotal } from "./cartHelpers";
import search from './search.png';
import Navbarmenu from './navbarmenu';

const Collection = (props) => {
    const [collection, setCollection] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = collectionId => {
        readCollection(collectionId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                }
                else {
                    setCollection(data);
                    listRelatedCollection(data._id)
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
        const collectionId = props.match.params.collectionId;
        loadSingleProduct(collectionId);
    }, [props]);

    return (
        <Layout title = {collection && collection.name}
        description = {collection && collection.description && collection.description.substring(0,100)}
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
							<small className="cart-badge">{itemTotal()}</small>
						</sup>)}{" "}</Link>
				</div>

				<div style={{paddingRight:"20px"}}></div>
				</div>
            <h1 id="h1UserFeedback">{collection && collection.name} COLLECTION</h1>
            <div className = "col-4_Coll mb-3">
                    {relatedProduct.map((p, i) => (
                        <div className = "mb-3-Coll">
                            <Card7 key = {i} product = {p}
                            showAddToCartButton = {props.match.params.mode == "viewonly" ? false : true}
                            showOtherImages = {true}
                            />

                        </div>
                    ))}
            </div>
        </Layout>
    );

};

/*
{product && 
                    product.description && 
                    product.description.substring(0,100)
                    && <Card product = {product} showViewProductButton={false} showOtherImages = {true}/>}
()
*/
export default Collection;