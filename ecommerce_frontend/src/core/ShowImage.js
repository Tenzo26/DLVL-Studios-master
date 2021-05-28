import React from "react";
import { API } from "../config";

const ShowImage = ({ item }) => (
	<div className="product-img">
		<img
			className="mb-3"
			src={`${API}/collection/photo/${item}`}
			style={{ maxHeight: "100%", maxWidth: "100%" }}
		/>
	</div>
);

export default ShowImage;

//'/product/photo/:productId'
