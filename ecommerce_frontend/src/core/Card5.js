import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage_1 from "./ShowImage_1";
import ShowImage_2 from "./ShowImage_2";
import ShowImage_3 from "./ShowImage_3";
import moment from "moment";
import { addItem, updateItem, removeItem} from "./cartHelpers";
import { isAuthenticated } from "../auth";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

const Card5 = ({
	product,
	showViewProductButton = true,
	showOtherImages = false,
	showAddToCartButton = true,
	cartUpdate = false,
	showRemoveProductButton = false,
	setRun = (f) => f,
	run = undefined,
}) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

	const showViewButton = (showViewProductButton) => {
		return (
			showViewProductButton && (
				<Link to={`/product/${product._id}`} className="mr-2">
					<button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
						View Product
					</button>
				</Link>
			)
		);
	};

	const shouldRedirect = (redirect) => {
		if (redirect) {
			if (isAuthenticated()) {
				return <Redirect to="/shop" />;
			}
			else {
				return <Redirect to="/signin" />;
			}
		}
	};

	const AddToCart = () => {
		if (isAuthenticated()) {
			addItem(product, () => {
				setRedirect(true);
			});
		}
		setRedirect(true);
	};

	const isOutofStock = (qSmall, qMed, qLarge, qFree) => {
		return qSmall > 0 || qMed > 0 || qLarge > 0 || qFree > 0;
	};
	
	const showAddToCart = (showAddToCartButton) => {
		return (
			showAddToCartButton &&
			isOutofStock(product.quantitySmall,product.quantityMed,product.quantityLarge,product.quantityFree) && (
				<button
					onClick={AddToCart}
					className="addcart"
                    >ADD TO CART
				</button>
			)
		);
	};

	const showRemoveButton = (showRemoveProductButton) => {
		return (
			showRemoveProductButton && (
				<button
					onClick={() => {
						removeItem(product._id);
						setRun(!run);
					}}
					className="btn btn-outline-danger mt-2 mb-2 card-btn-1  "
				>
					Remove from Cart
				</button>
			)
		);
	};

	const showStock = (qSmall, qMed, qLarge, qFree) => {
		return qSmall > 0 || qMed  > 0 || qLarge > 0 || qFree > 0 ? 
        (<div class="avail">
             <select id="availSizes">
            <option disabled selected hidden>Available Sizes</option>
                <option style = {{display: qSmall > 0 ? '' : "none"}}>S</option>
                <option style = {{display: qMed > 0 ? '' : "none"}}>M</option>
                <option style = {{display: qLarge > 0 ? '' : "none"}}>L</option>
                <option style = {{display: qFree > 0 ? '' : "none"}}>FS</option>
            </select>
            <div class="select__arrow"></div>
        </div>): (
                <span className="badge badge-danger_card5 badge-pill_card5">Out of Stock</span>
            )
            {/*<span>
				<span className="badge badge-primary badge-pill" style = {{display: qSmall > 0 ? '' : "none"}}>S </span>
				<span className="badge badge-primary badge-pill" style = {{display: qMed > 0 ? '' : "none"}}>M </span>
				<span className="badge badge-primary badge-pill" style = {{display: qLarge > 0 ? '' : "none"}}>L </span>
				<span className="badge badge-primary badge-pill" style = {{display: qFree > 0 ? '' : "none"}}>FS </span>
			</span> */}	
	};

	/*
	const showStock = (qSmall, qMed, qLarge, qFree) => {
		return qSmall > 0 || qMed  > 0 || qLarge > 0 || qFree > 0 ? (
			<span className="badge badge-primary badge-pill">S </span>
		) : (
			<span className="badge badge-danger badge-pill">Out of Stock </span>
		);
	};
	*/

	const handleChange = (productId) => (event) => {
		setRun(!run);
		if (event.target.value > 5) event.target.value = 5
		setCount(event.target.value < 1 ? 1 : event.target.value);
		if (event.target.value >= 1) {
			updateItem(productId, event.target.value);
		}
	};

	const showCartUpdateOptions = (cartUpdate) => {
		return (
			cartUpdate && (
				<div>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text">
								Adjust Quantity
							</span>
						</div>
						<input
							type="number"
							className="form-control"
							value={count}
							onChange={handleChange(product._id)}
						/>
					</div>
				</div>
			)
		);
	};

	function Slider(){
		return(
			<div class="imagediv">
				<div className="slider">
					<AliceCarousel autoPlay autoPlayInterval="2500" infinite>
						<ShowImage_1 item={product} url="product" className="sliderimg"/>
						<ShowImage_2 item={product} url="product" className="sliderimg"/>
						<ShowImage_3 item={product} url="product" className="sliderimg"/>
					</AliceCarousel>
				</div> 
			</div>
			);
	}

	return (
		<div className="container" style={{margin: "auto", justifyContent: "center"}}>
        <div className="carditems">
		{Slider()}	
        <div className="card5-body">
				{shouldRedirect(redirect)}
			
                <div className="card-header2 card-header-1"><h1 className="h1ItemHead">{product.name}</h1></div>
                <p className="card-p_card5">{product.description.substring(0, 100)}{" "}</p>
                <br></br><br></br>
				<p className="card-p_price">PHP {product.price.toLocaleString()}.00</p>		
                <p className="card-p_other">
					Color: {product.category && product.category.name}
				</p>
                <p className="card-p_card5">
					Gender: {product.gender && product.gender}
				</p>
	
				{showStock(product.quantitySmall,product.quantityMed,product.quantityLarge,product.quantityFree)}
				{showViewButton(showViewProductButton)}
				{showAddToCart(showAddToCartButton)}
				{showRemoveButton(showRemoveProductButton)}
				{showCartUpdateOptions(cartUpdate)}	
				<br />
			</div>
		</div>
	</div>
	);
};

export default Card5;
