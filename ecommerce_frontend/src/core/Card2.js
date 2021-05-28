import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage_1 from "./ShowImage_1";
import ShowImage_2 from "./ShowImage_2";
import ShowImage_3 from "./ShowImage_3";
import moment from "moment";
import { addItem, updateItem, removeItem} from "./cartHelpers";
import { isAuthenticated } from "../auth";

const Card = ({
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
					className="closecart card-btn-1  "
				>
				</button>
			)
		);
	};

	const showStock = (qSmall, qMed, qLarge, qFree) => {
		return qSmall > 0 || qMed  > 0 || qLarge > 0 || qFree > 0 ? (
			<span className="badge badgecart-primary badge-pill">In Stock </span>
		) : (
			<span className="badge badge-danger badge-pill">Out of Stock </span>
		);
	};

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
						</div>
						<input
							type="number"
							className="quantity"
							value={count}
							onChange={handleChange(product._id)}
						/>
					</div>
				</div>
			)
		);
	};

	return (
		<div className="card2">
			<div className="card-body">
				{shouldRedirect(redirect)}
				<ShowImage_1 item={product} url="product" />
				{showOtherImages ? (<ShowImage_2 item={product} url="product"/>) : ""}
				{showOtherImages ? (<ShowImage_3 item={product} url="product"/>) : ""}	
				<p className="card-p blackcart-10">{product.name}</p>
				<p className="card-p blackcart-9">&#8369; {product.price} | {showStock(product.quantitySmall,product.quantityMed,product.quantityLarge,product.quantityFree)}</p>
				<br />
				{showAddToCart(showAddToCartButton)}
				{showRemoveButton(showRemoveProductButton)}
				{showCartUpdateOptions(cartUpdate)}
				
				<br />
			</div>
		</div>
	);
};

export default Card;
