import { API } from "../config";
import axios from "axios";

export const createCategory = (userId, token, category) => {
	return fetch(`${API}/category/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(category),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

export const createProduct = (userId, token, product) => {
	return fetch(`${API}/product/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

export const read = (productId) => {
	return fetch(`${API}/product/${productId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const uploadCollectionImage = (userId, token, photo, collectionId) => {
	return fetch(`${API}/collection/upload/${userId}/${collectionId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: photo,
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

export const createCollection = (userId, token, data) => {
	return fetch(`${API}/collection/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

export const getCategories = () => {
	return fetch(`${API}/categories`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const listOrders = (userId, token) => {
	return fetch(`${API}/order/list/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getStatusValues = (userId, token) => {
	return fetch(`${API}/order/status-values/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
	return fetch(`${API}/order/${orderId}/status/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ status, orderId }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const refundQuantity = (userId, token, orderId) => {
	return fetch(`${API}/order/${orderId}/refund/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		}
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getProducts = () => {
	return fetch(`${API}/products?limit=undefined`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const deleteCategory = (categoryId, userId, token) => {
	return fetch(`${API}/category/${categoryId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const deleteCollection = (collectionId, userId, token) => {
	return fetch(`${API}/collection/${collectionId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getProduct = (productId) => {
	return fetch(`${API}/product/${productId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getCategory = (categoryId) => {
	return fetch(`${API}/category/${categoryId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateCategory = (categoryId, userId, token, name) => {
	console.log(JSON.stringify(name))
	return fetch(`${API}/category/${categoryId}/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(name)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateCollection = (collectionId, userId, token, collection) => {
	return fetch(`${API}/collection/${collectionId}/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(collection)
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateCollectionImage = (userId, token, photo, collectionId) => {
	return fetch(`${API}/collection/upload/${userId}/${collectionId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: photo,
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

// create feedback
export const createFeedback = (token, userId, feedbackToken, content) => {
	const body = { content };
	const config = {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	return axios
		.post(`${API}/createFeedback/${userId}/${feedbackToken}`, body, config)
			.then((response) => {
				return response;
			})
		.catch((error) => {
			return {
				error: true
			}
		});
};

// admin show feedback
export const getPendingFeedback = async (token) => {
	const config = {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const res = await fetch(`${API}/pendingFeedback`, config);
	const feedback = await res.json();

	return feedback;
};

// admin update feedback
export const updateFeedback = (feedbackId, token) => {
	const config = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	fetch(`${API}/updateFeedback/${feedbackId}`, config);
};

// admin delete feedback
export const deleteFeedback = (feedbackId, token) => {
	const config = {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	fetch(`${API}/deleteFeedback/${feedbackId}`, config);
};

// admin get faq
export const getFaq = async () => {
	const res = await axios.get(`${API}/faq`);
	return res;
};

// admin add faq
export const addFaq = async (title, content) => {
	const body = {
		title,
		content,
	};

	await axios.post(`${API}/faq`, body);
};

// admin update faq
export const updateFaq = async (faq) => {
	const { key, title, content } = faq;

	const data = {
		title,
		content,
	};

	await axios.patch(`${API}/faq/${key}`, data);
};

// admin delete faq
export const deleteFaq = async (id) => {
	await axios.delete(`${API}/faq/${id}`);
};

// admin update feedback by id
export const updateById = async (id, values) => {
	const res = await axios.patch(`${API}/admin/adminFeedback/${id}`, {
		content: values.content,
		status: values.status,
	});

	return res.data;
};

export const changeBg = (user, token, background) => {
	return fetch(`${API}/changeBg/${user}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: background,
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const removeBg = (user, token) => {
	return fetch(`${API}/removeBg/${user}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// get info of about us to homepage
export const getDesc = () => {
	return fetch(`${API}/aboutUs`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

//back up if need ng token
//export const getDesc = (userId, token) => {
//	return fetch(`${API}/aboutUs${userId}`, {
//		method: "GET",
//		headers: {
//			Accept: "application/json",
//			Authorization: `Bearer ${token}`,
//		},
//	})
//		.then((response) => {
//			return response.json();
//		})
//		.catch((err) => console.log(err));
//};


// update About us
export const updateAboutUs = async (userId, token, description) => {
	const desc = description;

	const data = {
		description: desc
	};

	await axios.put(`${API}/updateAboutUs/${userId}`, data, {
		headers:  {
			'Authorization': `Bearer ${token}`
		}
	})
	.then((response) => {
		return response.json();
	})
	.catch((error) => {
		console.log(error);
	});
};


// delete about us description
export const removeAboutUs = async (user, token) => {
	try {
		const response = await fetch(`${API}/removeAboutUs/${user}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		return await response.json();
	} catch (err) {
		return console.log(err);
	}
};


export const getCollections = () => {
	return fetch(`${API}/collections`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getCollection = (collectionId) => {
	return fetch(`${API}/collection/${collectionId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const sendFeedbackEmail = async (userId, token, orderId) => {
	const body = {}
	const config = {
		headers: {
			Accept: "application/json",
			'Authorization': `Bearer ${token}`
		}
	};
	const res = await axios.post(`${API}/order/send/feedback/${orderId}/${userId}`, 
		body, config
	);
		
	return res;
}
