import { API } from "../config";
import axios from "axios";

export const read = (userId, token) => {
	return fetch(`${API}/user/${userId}`, {
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

export const update = async (userId, token, user) => {
	const config = {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			'Authorization': `Bearer ${token}`
		}
	}
	const body = user
	const res = await axios.put(`${API}/user/profile/${userId}`, 
		body,
		config
	).catch (error => {
			return {
				error: true
			}
		}
	);
	return res
};

export const updateUser = (user, next) => {
	if (typeof window !== "undefined") {
		if (localStorage.getItem("jwt")) {
			let auth = JSON.parse(localStorage.getItem("jwt"));
			auth.user.email = user.data.user.email
			auth.user.name = user.data.user.name
			auth.user.role = user.data.user.role
			auth.user._id = user.data.user._id
			localStorage.setItem("jwt", JSON.stringify(auth));
			next();
		}
	}
};

export const getPurchaseHistory = (userId, token) => {
	return fetch(`${API}/orders/by/user/${userId}`, {
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

export const getPublishedFeedback = async () => {
	const res = await axios.get(`${API}/publishedFeedback`);
	return res;
};

// user update feedback by id
export const updateById = async (id, content) => {
	const res = await axios.patch(`${API}/user/userFeedback/${id}`, {
		content,
	});

	return res.data;
};

