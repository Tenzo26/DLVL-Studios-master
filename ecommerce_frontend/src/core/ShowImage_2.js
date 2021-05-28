import React from "react";
import { API } from "../config";

const ShowImage_2 = ({ item, url }) => (
	<div className="product-img">
		<img
			className="mb-3"
			src={`${API}/${url}/photo_2/${item._id}`}
			alt={item.name}
			style={{ maxHeight: "100%", maxWidth: "100%" }}
		/>
	</div>
);

export default ShowImage_2;
