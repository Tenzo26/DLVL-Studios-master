import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { forgot1, forgot2, forgotPasswordByEmail } from "../auth";
import { resetPassword } from "../auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import usePasswordToggle from "../user/usePasswordToggle";
import { Link, Redirect, useHistory } from "react-router-dom";
import Dialog from '../core/Dialog';
import { itemTotal } from "../core/cartHelpers";
import search from '../core/search.png';
import Navbarmenuusers from '../core/navbarmenuusers';


const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

const ResetPasswordEmail = (props) => {
	const history = useHistory(); 
	const [PasswordInputType, ToggleIcon] = usePasswordToggle();
	const [passwordFocused, setPasswordFocused] = useState(false)
	const [passwordValidity, setPasswordValidity] = useState({
		minChar : null,
		number : null,
		specialChar: null
	})
	const [showSuccessDialog, setShowSuccessDialog] = useState(false);

	const [values, setValues] = useState({
		password: '',
		confirm_password:'',
		error: false,
	})

	const {
		password,
		confirm_password,
		error,
	} = values;

	const {
		minChar,
		number,
		specialChar
	} = passwordValidity;


	/*
	useEffect(() => {  
    	setValues({
			...values,
			key: props.match.params.token
		})
    }, [props]);
	*/

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!(minChar && number && specialChar)) {
			setValues({
				...values,
				error: "Password does not meet requirements",
				success: false
			});
			return
		}
		try {
			resetPassword(password,confirm_password,props.match.params.token)
				.then (data => {
					if (data.error) {
						setValues({
							...values,
							error: "Password does not match",
							success: false
						});
					}
					else {
						setShowSuccessDialog(true)
						setValues({
							...values,
							message: data.message,
							success: true,
							password: "",
							error: "",
							confirm_password: "",
						});
						
					}
				})
		} catch (error) {
			setValues({ ...values, error: "Something went wrong." });
		}
	}

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const onChangePassword = (password) => {
		setValues({ ...values, error: false, password : password });
       setPasswordValidity({
            minChar: password.length >= 8 ? true : false,
            number: isNumberRegx.test(password) ? true : false,
            specialChar: specialCharacterRegx.test(password) ? true : false
        });
    };
	
	const passwordForm = () => (
		<form onSubmit={handleSubmit}  style={{ display: error ? "none" : "block" }}>

					<div className='d-flex justify-content-center'>
						<label className='resetlabel'>RESET PASSWORD </label>
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
										placeholder="Confirm New Password"
										type={PasswordInputType}
										value={confirm_password}
										onChange={handleChange("confirm_password")}
									/>
									
									</div>
									<div className="passwordstrength2">
									{passwordFocused && (
									<PasswordStrengthIndicator
									validity={passwordValidity}
									/>
                                	)}
									</div>

			<div className='d-flex justify-content-center'>
			<button className="submitforall">SAVE CHANGES</button>
			</div>

		</form>
	)
	
	const showError = () => (
		<div style={{ display: error ? "" : "none"}} className="errorpassword">
		
			<form onSubmit={handleSubmit}>

<div className='d-flex justify-content-center'>
	<label className='resetlabel'>RESET PASSWORD </label>
</div>
<div className="form-group input-group">

				<div className="input-group-prepend">
				</div>
				<input
					className="nameupdateerror1"
					placeholder="New Password"
					type={PasswordInputType}
					value={password}
					onFocus={() => {setPasswordFocused(true)}}
					onChange = {e => onChangePassword(e.target.value)}
				/>
					</div>
					{error===("Password doesn't meet requirements.")
								? <span className="errorspan">&nbsp;Password does not meet requirements! Please check your password.</span>
								: <span className="errorspan">&nbsp;Password does not match! Please check your password.</span>
							}

					<div className="form-group input-group">
				<div className="input-group-prepend">
				</div>
				<input
					className="nameupdateerror"
					placeholder="Confirm New Password"
					type={PasswordInputType}
					value={confirm_password}
					onChange={handleChange("confirm_password")}
				/>
				{error===("Password does not match")
								? <span className="errorspan">&nbsp;Password does not match! Please check your password.</span>
								: <span className="errorspan">&nbsp;Password does not meet requirements! Please check your password.</span>
							}
				
				</div>
				<div className="passwordstrength2">
				{passwordFocused && (
				<PasswordStrengthIndicator
				validity={passwordValidity}
				/>
				)}
				</div>

<div className='d-flex justify-content-center'>
<button className="submitforall">SAVE CHANGES</button>
</div>

</form>
		</div>
	);

	return (
		<Layout
			title="Change your password here"
			description="Password Reset for DLVL Studios"
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
			{showError()}
            {passwordForm()}
			<Dialog isOpen={showSuccessDialog} onClose={(e) => {
				history.push('/signin')
                setShowSuccessDialog(false)
            }}>
                <p style={{textAlign:"center", fontSize:"17px"}}>Successfully created your account. Please Log in to continue.</p>
            </Dialog>
		</Layout>
	);
};

export default ResetPasswordEmail;