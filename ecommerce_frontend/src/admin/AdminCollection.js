import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {readCollection, listRelatedCollection} from '../core/apiCore';
import Card from '../core/Card';
import { Link } from "react-router-dom";

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
			<div class="row justify-content-between">
				<div class="col-4"></div>
				<div class="col-2">
				<Link id="btnAddItem" to="/create/product"></Link>
            	</div>
            </div>
            <div class="row justify-content-between">
				<div class="col-4"></div>
				<div class="col-1">
				<Link id="btnTrashbinItem"></Link>
				</div>
            </div>
            <div className = "row">
                    {relatedProduct.map((p, i) => (
                        <div className = "mb-3">
                            <Card key = {i} product = {p}
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