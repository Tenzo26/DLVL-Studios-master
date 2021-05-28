import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { getCollections } from "../core/apiCore";
import AdminCard_collection from "./AdminCard_collection";
import {getDesc} from "./apiAdmin";
import { Link } from "react-router-dom";
import Popup from './Popup';
import { itemTotal } from "../core/cartHelpers";
import search from '../core/search.png';
import Navbarmenuadmin from '../core/navbarmenuadmin'

const AdminCollections = () => {
	const [desc, setDesc] = useState("");
	const [error, setError] = useState("");
	const [collections, setCollections] = useState([]);

	const getDescription = () => {
		getDesc().then((data) => {
			if (data.error){
				setError(data.error);
			} else {
				setDesc(data.content.description);
			}
		})
	}

	const init = () => {
		getCollections().then(data => {
			if (data.error) {
				setError(data.error);
			}
			else {
				setCollections(data)
			}
		});
	}

function AddPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return <div className="d-flex flex-row-reverse">
    		<input type="button" class="btnAdd" onClick={togglePopup} />
		{isOpen && <Popup
		content={<>
		<br/>
			<Link id="linkDesign" to="/create/category">Add Colors</Link>
			<Link id="linkDesign" to="/create/collection">Add Collection</Link>
		</>}
		handleClose={togglePopup} 
		/>}
	</div>
}

function EditPopup() {
	const [isOpen, setIsOpen] = useState(false);
  
	const togglePopup = () => {
	  setIsOpen(!isOpen);
	}
  
	return <div>
	  		<input type="button" class="btnEdit" onClick={togglePopup} />
 		{isOpen && <Popup
		content={<>
		  <br/>
		  <Link style={{marginLeft:"25px"}}id="linkDesign" to="/admin/categories">Manage Colors</Link>
		  <Link id="linkDesign" to="/admin/collections">Manage Collections</Link>
		</>}
		handleClose={togglePopup} 
		/>}
	</div>
  }

	const displayCollection = (collections) => (
		<h1>{collections ? collections.map((collection) => (
			<div className = "col-4_Coll mb-3">
				<AdminCard_collection collection = {collection} viewOnly = {false}/>
			</div>               
	   )) : ""}</h1>
	);

	useEffect(() => {
		getDescription();
		init();
	}, []);

	return (
		<Layout className="container-fluid"
		title=" "
		>
			<div class="pl-4">
            <Navbarmenuadmin/>
            </div>
            <div class="d-flex justify-content-end">
				<div class="pr-5">
				{EditPopup()}
				</div>
				<div style={{paddingRight:"20px"}}></div>
				</div>
					
		
		{displayCollection(collections)}
		</Layout>
	);
};

export default AdminCollections;
