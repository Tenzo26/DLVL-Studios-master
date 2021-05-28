import React from "react";
import { API } from "../config";

const ShowImage_1_ShopMob = ({ item, url }) => (
	<div className="product-img prodimg">
		<img
			className="mb-3"
			src={`${API}/${url}/photo_1/${item._id}`}
			alt={item.name}
			style={{ maxHeight: "100%", maxWidth: "100%" }}
		/>
	</div>
);

export default ShowImage_1_ShopMob;

//'/product/photo/:productId'