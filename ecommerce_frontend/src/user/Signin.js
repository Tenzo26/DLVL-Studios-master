import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";
import { loadSavedCart } from "../core/apiCore";
import { storeSavedCart } from "../core/cartHelpers";
import Navbarmenuusers from '../core/navbarmenuusers';
import { itemTotal } from "../core/cartHelpers";
import search from '../core/search.png';

const Signin = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
		redirectToReferrer: false,
	});

	const { email, password, error, loading, redirectToReferrer } = values;
	const { user } = isAuthenticated();

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				authenticate(data, () => {
					setValues({
						...values,
						success: false,
						redirectToReferrer: true,
					});
					
					loadSavedCart(data.user._id,data.token)
						.then(info => {
							storeSavedCart(info);
						});
						
				});
			}
		});
	};

	const signUpForm = () => (
		<form  style={{ display: error ? "none" : "block" }}>
			
			
			<div className="form-group" style={{marginTop:"70px"}}>
			<h1 id="h1Login">LOGIN</h1>
				<input type="text" id="email" style={{borderColor:"black"}}placeholder="Email" onChange={handleChange("email")}
					value={email} />
				

			</div>
			<div className="form-group">
				<input type="password" className="password" id="password" placeholder="Password" onChange={handleChange("password")}
					value={password}/>

			</div>
			<div className="form-group">
				<p id="forgot"><Link to="/forgot"><u id="forgot">Forgot your password?</u></Link></p>
			</div>
			<button id="login" onClick={clickSubmit} >
				LOGIN
			</button>
			<div className="form-group">
				<p id="registerText">Don't have an account? <Link to="/signup"><u id="register">Register here!</u></Link></p>
			</div>
			<br></br>
			<br></br>
			<br></br>

		</form>
	);

	const showError = () => (
		<div style={{ display: error ? "" : "none", backgroundColor:"transparent", width:"350px",marginRight:"auto", marginLeft:"auto", marginTop:"-10px"}}>

			<form>
			
				<div className="form-group" style={{marginTop:"70px"}}>
					<h1 id="h1LoginError">LOGIN</h1>
					<input type="text" id="emailError" placeholder="Email" onChange={handleChange("email")}
						value={email} />

					{error===("Email and password dont match")
        				? <span style={{color:"red", fontFamily:"Times New Roman"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please check your email</span>
        				: <span style={{color:"red", fontFamily:"Times New Roman"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User with that email does not exist</span>
					}
	
	
				</div>
				<div className="form-group">
					<input type="password" className="password" id="passwordError" placeholder="Password" onChange={handleChange("password")}
						value={password}/>
					
					{error===("Email and password dont match")
        				? <span style={{color:"red", fontFamily:"Times New Roman"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please check your password</span>
        				: <span style={{color:"red", fontFamily:"Times New Roman"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kindly enter a valid password</span>
					}
				</div>
				
				<div className="form-group">
					<p id="forgot"><Link to="/forgot"><u id="forgot">Forgot your password?</u></Link></p>
				</div>
				<button id="login" onClick={clickSubmit}>
					LOGIN
				</button>
				<div className="form-group">
					<p id="registerText">Don't have an account? <Link to="/signup"><u id="register">Register here!</u></Link></p>
				</div>
				<br></br>
				<br></br>
				<br></br>
	
			</form>

		</div>
	);

	const showLoading = () =>
		loading && (
			<div style={{ border:"0",fontFamily: "Times New Roman", display:"block",marginRight:"auto", marginLeft:"auto" }} className="alert alert-dark">
			<h4 style={{fontFamily: "Times New Roman"}}>Loading...</h4>
		</div>
	);

	const redirectUser = () => {
		if (redirectToReferrer) {
			if (user && user.role === 1) {
				return <Redirect to="/admin/landingpageadmin" />;
			} else {
				return <Redirect to="/" />;
			}
		}

		if (isAuthenticated()) {
			return <Redirect to="/" />;
		}
	};
	return (
		<Layout
		className="container-fluid"

		>
			<div class="pl-4">
				<Navbarmenuusers/>
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
							<small className="cart-badge">{itemTotal()}</small>
						</sup>)}{" "}</Link>
				</div>

				<div style={{paddingRight:"20px"}}></div>
			</div>
			{showLoading()}
			{showError()}
			{signUpForm()}
			{redirectUser()}
		</Layout>
	);
};

export default Signin;
