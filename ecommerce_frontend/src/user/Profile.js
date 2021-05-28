import React, { useState, useEffect, useImperativeHandle } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect,  useHistory } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import usePasswordToggle from "../user/usePasswordToggle";
import Dialog from '../core/Dialog'

const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

const Profile = ({ match }) => {
	const [PasswordInputType, ToggleIcon] = usePasswordToggle();
	const [passwordFocused, setPasswordFocused] = useState(false)
	const [passwordValidity, setPasswordValidity] = useState({
		minChar : null,
		number : null,
		specialChar: null
	})
	
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		error: false,
		success: false,
	});

	const {
		minChar,
		number,
		specialChar
	} = passwordValidity;
	
	const { token, user } = isAuthenticated();

	const { name, email, password, confirmPassword, error, success } = values;

	const init = (userId) => {
		read(userId, token).then((data) => {
			if (data.error) {
				setValues({ ...values, error: true });
			} else {
				setValues({ ...values, name: data.name, email: data.email});
			}
		});
	};

	useEffect(() => {
		init(match.params.userId);
	}, []);

	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const onChangePassword = (password) => {
		setValues({ ...values, error: false, password : password });
       setPasswordValidity({
            minChar: password.length >= 8 ? true : false,
            number: isNumberRegx.test(password) ? true : false,
            specialChar: specialCharacterRegx.test(password) ? true : false
        });
    };

	const clickSubmit = (e) => {
		e.preventDefault();

		let errors = ""
		if (name == "") {
			errors += "Name cannot be empty. "
			
		}
		
		if (email == "") {
			errors += "Email cannot be empty. "
		}

		if ((password != "") && !(minChar  && number && specialChar )) {
			errors += "Password doesn't meet requirements. "
		}

		if (errors != "") {
			setValues({...values, error: errors})
			return
		}

		update(match.params.userId, token, { name, email, password, confirmPassword }).then(
			(data) => {
				if (data.error) {
					errors += "Passwords not matched. "
					setValues({
						...values,
						error: errors
					})
					
				} 
				
				else {
					updateUser(data, () => {
						setValues({
							success: true,
							error: false
						});
					});
					alert("Your profile has been updated.")
				} 
			}
		);
	};

	const redirectUser = (success) => {
		if (success) {
			if (user.role == 1) {
				return <Redirect to="/admin/dashboard" />;
			}
			else {
				return <Redirect to="/user/dashboard" />;
			}
		}
	};

	const profileUpdate = (name, email, password) => {
		return (
			<form  style={{ display: error ? "none" : "block" }}>
				<div className="form-group">
				<div className="d-flex justify-content-around">
					<input
						type="text"
						onChange={handleChange("name")}
						className="nameupdate"
						placeholder="Full Name"
						value={name}
						required
					/>
					</div>
				</div>
				

				<div className="form-group">
				<div className="d-flex justify-content-around">
					<input
						type="email"
						onChange={handleChange("email")}
						placeholder="Email Address"
						className="nameupdate"
						value={email}
						required
					
					/>
				</div>
				</div>

				<div className="form-group input-group">
				
                                    <div className="input-group-prepend">
                                       
                                    </div>
                                    <input
                                        className="nameupdate"
                                        placeholder="New Password"
                                        type={PasswordInputType}
                                        value={password}
                                        onFocus={() => {setPasswordFocused(true)}}
										onChange = {e => onChangePassword(e.target.value)}
                                    />

							
                                   
                               		 </div>

				<div className="form-group input-group">
				
									<div className="input-group-prepend">
									</div>
									<input
										className="nameupdate"
										placeholder="Confirm Password"
										type={PasswordInputType}
										value={confirmPassword}
										onChange={handleChange("confirmPassword")}
									/>
									
							
									</div>
									<div className="passwordstrength">
									{passwordFocused && (
									<PasswordStrengthIndicator
									validity={passwordValidity}
									/>
                                	)}
	</div>


				<div className="d-flex justify-content-around">
				<button style={{marginTop:"0px"}}className="submitforall" onClick={clickSubmit}>
					SAVE CHANGES
				</button>
				</div>
			
			</form>
		);
	};

	const showError = () => (
		<div style={{ display: error ? "" : "none"}} className="errorprof">

<form>
				<div className="form-group">
				<div className="d-flex justify-content-around">
					<input
						type="text"
						onChange={handleChange("name")}
						className="nameupdateerror"
						placeholder="Full Name"
						value={name}
						required
					/>
					</div>
				{(typeof(error) == "string" &&  error.includes("Name cannot be empty"))
							? <span style={{color:"red", fontFamily:"Times New Roman" }}>&nbsp;Name is empty! Please enter a name.</span>
							: ""
						}	
				</div>

				<div className="form-group">
				<div className="d-flex justify-content-around">
					<input
						type="email"
						onChange={handleChange("email")}
						placeholder="Email Address"
						className="nameupdateerrorprof"
						value={email}
						required
					/>
				</div>
				{(typeof(error) == "string" &&  error.includes("Email cannot be empty"))
							? <span style={{color:"red", fontFamily:"Times New Roman" }}>&nbsp;Email is empty! Please enter a name!</span>
							: ""
						}	
				</div>
				<div className="form-group input-group">
				
                                    <div className="input-group-prepend">
                                       
                                    </div>
                                    <input
                                        className="nameupdateerrorprof1"
                                        placeholder="New Password"
                                        type={PasswordInputType}
                                        value={password}
                                        onFocus={() => {setPasswordFocused(true)}}
										onChange = {e => onChangePassword(e.target.value)}
                                    />
										{(typeof(error) == "string" &&  error.includes("Password doesn't meet requirements"))
							? <span style={{color:"red", fontFamily:"Times New Roman" }}>&nbsp;Password does not meet requirements! Please check your password.</span>
							: (typeof(error) == "string" &&  error.includes("Passwords not matched"))
							? <span style={{color:"red", fontFamily:"Times New Roman" }}>&nbsp;Passwords do not match! Please check your password.</span> : ""
						}
                                   
                               		 </div>

				<div className="form-group input-group">
				
									<div className="input-group-prepend">
									</div>
									<input
										className="nameupdateerror3"
										placeholder="Confirm Password"
										type={PasswordInputType}
										value={confirmPassword}
										onChange={handleChange("confirmPassword")}
									/>
										{(typeof(error) == "string" &&  error.includes("Passwords not matched"))
							? <span style={{color:"red", fontFamily:"Times New Roman" }}>&nbsp;Passwords do not match! Please check your password. </span> 
							: <span style={{color:"red", fontFamily:"Times New Roman" }}>&nbsp;Password does not meet requirements! Please check your password.</span> 
							
						}
									</div>
									<div className="passwordstrength">
									{passwordFocused && (
									<PasswordStrengthIndicator
									validity={passwordValidity}
									/>
                                	)}
	</div>


				<div className="d-flex justify-content-around">
				<button className="submitforall" onClick={clickSubmit}>
					SAVE CHANGES
				</button>
				</div>
				
			</form>
			</div>
	);

	return (
		<Layout
			title="Update Profile"
			description="Update your profile here"
			className="container-fluid"
		>
			<div className="d-flex justify-content-around">
			<h2 style={{marginTop:"30px", marginBottom:"15px"}} className="profupdate">PROFILE UPDATE</h2>
			</div>
			<div className="d-flex justify-content-around">
			{showError()}
			</div>
			{profileUpdate(name, email, password)}
			{redirectUser(success)}

		</Layout>
	);
};

export default Profile;






