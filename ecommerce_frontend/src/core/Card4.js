import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage_1 from "./ShowImage_1_ShopMob";
import ShowImage_2 from "./ShowImage_2";
import ShowImage_3 from "./ShowImage_3";
import moment from "moment";
import { addItem, updateItem, removeItem} from "./cartHelpers";
import { isAuthenticated } from "../auth";

const Card4 = ({
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
				return <Redirect to="/cart" />;
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
					className="btn btn-outline-warning mt-2 mb-2 card-btn-1"
				>
					Add to cart
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
		return qSmall > 0 || qMed  > 0 || qLarge > 0 || qFree > 0 ? (
			<span>
				<span className="badge badge-primary badge-pill pillCard4" style = {{display: qSmall > 0 ? '' : "none"}}>S</span>
				<span className="badge badge-primary badge-pill pillCard4" style = {{display: qMed > 0 ? '' : "none"}}>M</span>
				<span className="badge badge-primary badge-pill pillCard4" style = {{display: qLarge > 0 ? '' : "none"}}>L</span>
				<span className="badge badge-primary badge-pill pillCard4" style = {{display: qFree > 0 ? '' : "none"}}>FS</span>
			</span>
			
		) : (
			<span className="badge badge-danger badge-pill pillCard4">Out of Stock </span>
		);
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

	return (
		<div className="card">
			<div className="card-body3">
				{shouldRedirect(redirect)}
				<Link to={`/product/${product._id}`}>
                    <ShowImage_1 className="prodimg" item={product} url="product" />
				</Link>
				{/* {showOtherImages ? (<ShowImage_2 item={product} url="product"/>) : ""}
				{showOtherImages ? (<ShowImage_3 item={product} url="product"/>) : ""} */}
				<div className="card-header3 card-header-1 "><h1 className="cardHead">{product.name}</h1></div>
				{/* <p className="card-p_card4">
					{product.description.substring(0, 100)}{" "}
				</p> */}
				<p className="card-p_card4 price">&#8369; {product.price}</p>
				{/* <p className="black-9">
					Category: {product.category && product.category.name}
				</p>
				<p className="black-8">
					Collection: {product._collection && product._collection.name}
				</p>
				<p className="black-8">
					Gender: {product.gender && product.gender}
				</p>
				<p className="black-7">
					Added on {moment(product.createdAt).format("MM-DD-YY")}
				</p>*/}
                <p className="card-p_card4">
                    Sizes: {showStock(product.quantitySmall,product.quantityMed,product.quantityLarge,product.quantityFree)}
                </p>
                <div className="btnGroup-shop">
                    {/* {showViewButton(showViewProductButton)} */}
				    {/* {showAddToCart(showAddToCartButton)} */}
				    {showRemoveButton(showRemoveProductButton)}
				    {showCartUpdateOptions(cartUpdate)}
                </div>		
				<br />
			</div>
		</div>
	);
};

export default Card4;