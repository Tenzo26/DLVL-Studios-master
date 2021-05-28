/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Popconfirm } from "antd";
import {
	Comment,
	Tooltip,
	Avatar,
	Input,
	Form,
	Button,
	Pagination,
	Table,
} from "antd";
import moment from "moment";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { deleteFeedback, createFeedback } from "../admin/apiAdmin";
import { getPublishedFeedback } from "../user/apiUser";
import { itemTotal } from "../core/cartHelpers";
import search from '../core/search.png';
import Navbarmenu from "../core/navbarmenu";

const userFeedback = ({match}) => {
	const [feedback, setFeedback] = useState([]);
	const [currentItems, setCurrentItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const paginate = () => {
		const indexOfLastPost = currentPage * 5;
		const indexOfFirstPost = indexOfLastPost - 5;

		const currentFeedback = feedback.slice(
			indexOfFirstPost,
			indexOfLastPost
		);

		setCurrentItems(currentFeedback);
	};

	useEffect(() => {
		const fetchFeedback = async () => {
			const res = await getPublishedFeedback();
			setFeedback(res.data.result);
		};

		fetchFeedback();

		return () => {
			setFeedback([]);
		};
	}, []);

	useEffect(() => {
		paginate();
	}, [currentPage, feedback]);

	const handleChangePage = (page) => {
		console.log(currentItems);
		setCurrentPage(page);
		// paginate();
	};

	const renderFeedback = () => {
		return currentItems.map((item) => (
			<FeedbackCard
				userId={item.user._id}
				feedbackId={item._id}
				key={item._id}
				content={item.content}
				name={item.user.name}
				date={item.updatedAt}
			/>
		));
	};

	return (
		<Layout
			title=""
			className="container-fluid">
			<div class="pl-4">
				<Navbarmenu/>
			</div>
			<div class="d-flex justify-content-end">
	
				<div class="pr-5" >
					<Link to={"/SearchPage"}>
						<img src={search} className="searchBtn"/>
					</Link>	
				</div>

				
				<div class="pr-5">
					<Link id="cartbag" to="/cart"> {" "}
						{itemTotal() == 0 ? (
							``
						) : (<sup>
							 <div className="bpos">
							<small className="cart-badge">{itemTotal()}</small>
                            </div>
						</sup>)}{" "}</Link>
				</div>

				<div style={{paddingRight:"20px"}}></div>
			</div>
			<h1 id="h1UserFeedback" >FEEDBACK</h1>
			<div className="userFeedback" >
				<div className="userFeedback__container" style={{ marginTop:"-20px", color:"black",textAlign:"left", display:"block", marginLeft:"auto", marginRight:"auto"}}>
					
						
							{renderFeedback()}
						<Pagination
							defaultPageSize={5}
							style={{ margin: "25px 0", textAlign:"center" }}
							defaultCurrent={currentPage}
							total={feedback.length}
							onChange={handleChangePage}
						/>
						
					

				</div>
			</div>

		</Layout>
	);
};

const FeedbackCard = ({ userId, feedbackId, name, content, date }) => {
	const auth = isAuthenticated();

	if (auth) {
		const {
			user: { _id, role },
		} = isAuthenticated();

		const handleDelete = () => {
			deleteFeedback(feedbackId, null);
			location.reload();
		};

		const renderAction = () => {
			let actions = [];

			if (role === 1 && _id === userId) {
				actions.push(

					<Link
						to="#"
						onClick={() => handleDelete()}
						style={{  }}
					>
						<span className="comment-action">Delete</span>
					</Link>
				);
			} else if (role === 0 && _id === userId) {
				actions.push(
<Popconfirm
						title="Is that your final answer?"
						onConfirm={() => handleDelete()}
					>
						<Link
						to="#"
						style={{ color:"black" }}
					>
						<span className="comment-action">Delete</span>
					</Link>
						
					</Popconfirm>

					
				);
			}

			return actions;
		};

		return (
			<Comment
				style={{
					boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.1)",
					padding: "12px",
					marginTop: "20px",
					

				}}
				actions={renderAction()}
				author={<p style={{fontSize:"15px", color:"black"}}>{name}</p>}
				avatar={<Avatar alt={name} >{name}</Avatar>}
				content={<p style={{marginTop:"-10px",fontSize:"15px"}}>{content}</p>}
				datetime={
					<Tooltip  title={moment().format("YYYY-MM-DD HH:mm:ss")}>
						<span>{moment(date).fromNow()}</span>
					</Tooltip>
				}
			/>
		);
	} else {
		return (

			<Comment 
				
				author={<p style={{fontSize:"15px", color:"black"}}>{name}</p>}
				avatar={<Avatar alt={name}>{name}</Avatar>}
				content={<p style={{fontSize:"15px"}}>{content}</p>}
				datetime={
					<Tooltip  title={moment().format("YYYY-MM-DD HH:mm:ss")}>
						<span>{moment(date).fromNow()}</span>
					</Tooltip>
				}
			/>
		);
	}
};


const FeedbackForm = ({feedbackToken}) => {
	const history = useHistory();
	const [form] = Form.useForm();
	const { TextArea } = Input;

	const onReset = () => {
		form.resetFields();
		//history.push("/");
	};

	const onFinish = async () => {
		if (!isAuthenticated()) {
			history.push("/signin");
			return;
		}

		const {
			token,
			user: { _id },
		} = isAuthenticated();

		try {
			let values = await form.validateFields();
			try {
				createFeedback(token, _id, feedbackToken, values.Feedback)
				.then(data => {
					if (data.error) {
						alert("Error while submitting feedback! You might have an invalid token or you didn't submit anything.")
					}
					else {
						alert("Feedback Submitted! Thank you!")
						onReset();
					}
				})
			}
			catch {
				alert("Invalid feedback token!")
			}
			
		} catch (errInfo) {
			console.log("Error:", errInfo);
		}
	};

	return (
		<Form form={form} layout="horizontal" onFinish={onFinish}>
			<Form.Item
				style={{
				marginTop: 16,
				}}
				name="Feedback"
				label="Feedback (max 150 characters)"
				labelCol={{
					span: 6,
				}}
				
				wrapperCol={{
					span: 16,
				}}
			>
				<TextArea rows={6} maxlength="150" />
		</Form.Item>
		<Form.Item
				wrapperCol={{
					span: 14,
					offset: 6,
				}}
			>
				<Button htmlType="submit" type="primary">
					Submit
				</Button>
				&nbsp;&nbsp;&nbsp;
				<Button htmlType="button" onClick={onReset}>
					Reset
				</Button>
			</Form.Item>
		</Form>
	);
};

export default userFeedback;
