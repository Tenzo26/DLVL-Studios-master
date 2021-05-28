import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card_collection = ({
	collection,
	viewOnly
}) => {
	const showViewButton = () => {
		if(viewOnly) {	
			return(
				<Link to={`/collection/${collection._id}/viewonly`} className="mr-2">
					<button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
						View Collection
					</button>
				</Link>
			);
		}
		else {
			return(
				<Link to={`/collection/${collection._id}/default`} className="mr-2">
				<button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
					View Collection
				</button>
				</Link>
			)
		}
	};

	return (
		<div className="cardcoll">
			<div className="card-bodycoll">
				<a href={`/collection/${collection._id}/viewonly`}>
					<h1>{collection.name}</h1>
					<ShowImage item={collection._id} />
					<p>
						{collection.description.substring(0, 100)}{" "}
					</p>
				</a>
			</div>
		</div>
	);
};

export default Card_collection;
