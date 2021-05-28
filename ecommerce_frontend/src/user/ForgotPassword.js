import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "../core/Layout";
import { forgot1, forgot2, forgotPasswordByEmail } from "../auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import usePasswordToggle from "../user/usePasswordToggle";
import Dialog from '../core/Dialog'
import Navbarmenuusers from '../core/navbarmenuusers';
import { itemTotal } from "../core/cartHelpers";
import search from '../core/search.png';



const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

const Reset = () => {
	const history = useHistory(); 
	const [PasswordInputType, ToggleIcon] = usePasswordToggle();
	const [passwordFocused, setPasswordFocused] = useState(false)
	const [showSuccessDialog, setShowSuccessDialog] = useState(false);
	const [passwordValidity, setPasswordValidity] = useState({
		minChar : null,
		number : null,
		specialChar: null
	})
	
	const [values, setValues] = useState({
		step: 1,
		email: "",
		password: "",
		confirm_password: "",
		user: null, // store user id 
		userId: null,
		questions: {},
		answer_1: "",
		answer_2: "",
		answer_3: "",
		error: false,
		message: "",
		success: false,
	});

	const {
		email,
		password,
		confirm_password,
		error,
		success,
		questions,
		message,
		user,
		userId,
		answer_1,
		answer_2,
		answer_3,
	} = values;

	const {
		minChar,
		number,
		specialChar
	} = passwordValidity;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	
	// reset thru gmail 
	const Step1Form = () => (
		<form onSubmit={step1Submit} style={{ display: error ? "none" : "block" }}>
			<div className= "form-group">
			<div className='d-flex justify-content-center'>
				<label style={{marginTop:"-10px"}} className='resetlabel'>RESET PASSWORD </label>
					</div>
			<div className='d-flex justify-content-center'>
				<label className="emailnote">Enter your Gmail account</label>
				</div>

				<label className="text-muted"></label>
				<input
					onChange={handleChange("email")}
					type="email"
					className="gmailfield"
					placeholder="Email Address"
					value={email}
				/>
				
				<div></div>
				<div className="d-flex justify-content-around">
				<Link className="idreset2" style={{color:"black", textDecoration:"underline"}}
					onClick={() =>
						setValues({
							...values,
							step: 4,
							email: "",
							userId: "",
							error: false,
						})
					}
				>
					Reset Directly by answering your Security Questions
				</Link>
				</div>
			</div>
			<div className="d-flex justify-content-center">
			<button className="submitforall" disabled = {!success ? false : true}>SUBMIT</button>
			</div>
		</form>
	);

	// // reset thru gmail submit button
	const step1Submit = async (e) => {
		e.preventDefault();
		const res = await forgotPasswordByEmail( email );
		const { message, error, userId } = res.data;

		if (error) {
			setValues({ ...values, error: message });
			return;
		}

		alert("Reset link is sent to your e-mail. Please check it out!")
		setValues({
			...values,
			success: true,
			user: userId,
		});
	};
	// reset thru secu questions form
	const step2Form = () => {
		return (
			<form onSubmit={step2Submit}>
				<div>
				<div className='d-flex justify-content-center'>
				<label style={{marginTop:"-40px"}} className='resetlabel'>RESET PASSWORD </label>
					</div>

					<div className='d-flex justify-content-center'>
				<label className="uidnote">Answer the following questions correctly to reset password</label>
				</div>
				</div>

				<div className="form-group">
				<div className='d-flex justify-content-center'>
					<label className="q1head">QUESTION 1</label>
					</div>
					<div className='d-flex justify-content-center'>
					<input
						type="text"
						className="q1"
						value={questions.q1.question}
						disabled
					/>
					</div>
					<div className='d-flex justify-content-center'>
					<input
						required
						type="text"
						name="answer_1"
						className="q1ans"
						placeholder="Type your answer here"
						onChange={handleChange("answer_1")}
					/>
					</div>
				</div>

				<div className="form-group">
				<div className='d-flex justify-content-center'>
					<label className="q1head">QUESTION 2</label>
					</div>
					<div className='d-flex justify-content-center'>
					<input
						type="text"
						className="q1"
						value={questions.q2.question}
						disabled
					/>
					</div>
						<div className='d-flex justify-content-center'>
					<input
						required
						type="text"
						name="answer_2"
						className="q1ans"
						placeholder="Type your answer here"
						onChange={handleChange("answer_2")}
					/>
					</div>
				</div>

				<div className="form-group">
				<div className='d-flex justify-content-center'>
					<label className="q1head">QUESTION 3</label>
					</div>
					<div className='d-flex justify-content-center'>
					<input
						type="text"
						className="q1"
						value={questions.q3.question}
						
						disabled
					/>
					</div>
						<div className='d-flex justify-content-center'>
					<input
						required
						type="text"
						name="answer_3"
						placeholder="Type your answer here"
						className="q1ans"
						onChange={handleChange("answer_3")}
					/>
				</div>
				<div></div>
				</div>
				<div className='d-flex justify-content-center'>
				<button className="submitforallsec">SUBMIT</button>
				</div>
				<br></br>
			</form>
		);
	};
	// reset thru secu questions submit button
	const step2Submit = (e) => {
		e.preventDefault();
		let correctAnswer = 0;

		for (let key in questions) {
			const { answer } = questions[key];

			switch (answer) {
				case answer_1:
					correctAnswer++;
					continue;

				case answer_2:
					correctAnswer++;
					continue;

				case answer_3:
					correctAnswer++;
					continue;

				default:
					continue;
			}
		}

		if (correctAnswer < 3) {
			setValues({ ...values, error: "Answers are incorrect." });
			
			return;
		}

		setValues({ ...values, step: 3 });
		setShowSuccessDialog(true)
	};

	const onChangePassword = (password) => {
		setValues({ ...values, error: false, password : password });
       setPasswordValidity({
            minChar: password.length >= 8 ? true : false,
            number: isNumberRegx.test(password) ? true : false,
            specialChar: specialCharacterRegx.test(password) ? true : false
        });
    };

//reset password form
	const Step3Form = () => (
		<form onSubmit={step3Submit}  style={{ display: error ? "none" : "block" }}>
					<div className='d-flex justify-content-center'>
						<label style={{marginTop:"-10px"}} className='resetlabel'>RESET PASSWORD </label>
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
	);

//change password submit button
	const step3Submit = async (e) => {
		e.preventDefault();

		if (password !== confirm_password) {
			setValues({ ...values, error: "Password does not match" });
			return;
		} else if (!(minChar  && number && specialChar )) {
			setValues({...values, error: "Password doesn't meet requirements."})
			setPasswordFocused(true)
			return;
		}

		try {
			const res = await forgot2(user, password);
			const { data } = res;
			setValues({
				...values,
				message: data.message,
				success: true,
				password: "",
				confirm_password: "",
				error: "",
				step: 6,
			});
		} catch (error) {
			setValues({ ...values, error: "Something went wrong." });
		} 

	};
		


	//RESET THRU SECURITY QUESTIONS
	const Step4Form = () => (
		<form onSubmit={step4Submit}  style={{ display: error ? "none" : "block" }}>
		<div className= "form-group">
		<div className='d-flex justify-content-center'>
				<label style={{marginTop:"-10px"}} className='resetlabel'>RESET PASSWORD </label>
					</div>
			<div className='d-flex justify-content-center'>
				<label className="secunote">Enter your email address to answer the security questions</label>
				</div>
				<input
					onChange={handleChange("email")}
					type="email"
					placeholder="Email Address"
					className="secufield"
					value={email}
				/>
			</div>
			<div className="form-group">
			
			</div>
			

				<div></div>
				<div className="d-flex justify-content-around">
				<Link className="idreset1" style={{color:"black", textDecoration:"underline"}}
					onClick={() =>
						setValues({
							...values,
							step: 1,
							email: "",
							userId: "",
							error: false,
						})
					}
				>
					Reset through your Gmail account
				</Link>
				</div>
				<div></div>
				<div></div>
				<div className='d-flex justify-content-center'>
			<button className="submitforall2">SUBMIT</button>
			</div>
			
		</form>
	);
	
	//RESET THRU SECURITY QUESTIONS
	const step4Submit = async (e) => {
		e.preventDefault();
		const res = await forgot1({ email });
		const { message, error, questions, userId } = res.data;
		if (error || email == "") {
			setValues({ ...values, error: message });
			return;
		}

		setValues({
			...values,
			questions: { ...questions },
			user: userId,
			step: 2,
		});
	};

	const renderForms = () => {
		switch (values.step) {
			case 1:
				return Step1Form(); // RESET THRU EMAIL-GMAIL

			case 2:
				return step2Form();  // forms of security questions

			case 3:
				return Step3Form(); // CHANGE PASSWORD FORM
			case 4:
				return Step4Form(); // RESET THRU EMAIL-SECURITY QUESTIONS

			case 6:
				return showSuccess();
			default:
				return;
		}
	};

	const showError = () => (
		<div style={{ display: error ? "" : "none"}} className="errorpassword">
		
		{
		 error===("Password doesn't meet requirements.") || error===("Password does not match")
		?<form onSubmit={step3Submit}>
							<div className='d-flex justify-content-center'>
								<label style={{marginTop:"-10px"}} className='resetlabel'>RESET PASSWORD </label>
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


			: error===("User with that email does not exist") 
			
					?  <form onSubmit={step4Submit} >
					<div className= "form-group">
			<div className='d-flex justify-content-center'>
					<label className='resetlabel'>RESET PASSWORD </label>
						</div>
				<div className='d-flex justify-content-center'>
					<label className="secunote">Enter your email address to answer the security questions</label>
					</div>
					<input
						onChange={handleChange("email")}
						type="email"
						placeholder="Email Address"
						className="secufielderror"
						value={email}
					/>
					{error==("") 
					? <span className="errorspan">&nbsp;Email does not exist! Please enter a valid email!</span>
					: <span className="errorspan">&nbsp;Email does not exist! Please enter a valid email!</span>
							}
				</div>
				<div className="form-group">
				
				</div>
				
					<div></div>
					<div className="d-flex justify-content-around" >
					<Link className="idreset1" style={{color:"black", textDecoration:"underline"}}
						onClick={() =>
							setValues({
								...values,
								step: 1,
								email: "",
								userId: "",
								error: false,
							})
						}
					>
						Reset through your Gmail account
					</Link>
					</div>
					<div></div>
					<div></div>
					<div className='d-flex justify-content-center'>
				<button className="submitforall2">SUBMIT</button>
				</div>
				
			</form>


	: error===("User with that email does not exist!") 
			
		?  	<form onSubmit={step1Submit}>
		<div className= "form-group">
		<div className='d-flex justify-content-center'>
			<label style={{marginTop:"-10px"}} className='resetlabel'>RESET PASSWORD </label>
				</div>
		<div className='d-flex justify-content-center'>
			<label className="emailnote">Enter your Gmail account</label>
			</div>

			<label className="text-muted"></label>
			<input
				onChange={handleChange("email")}
				type="email"
				className="gmailfielderror"
				placeholder="Email Address"
				value={email}
			/>
				{error===("User with that email does not exist!") 
					? <span className="errorspan">&nbsp;Email does not exist! Please enter a valid email!</span>
					: <span className="errorspan">&nbsp;Email does not exist! Please enter a valid email!</span>
							}
			
			<div></div>
			<div className="d-flex justify-content-around">
			<Link className="idreset2" style={{color:"black", textDecoration:"underline", marginTop: "0.2in"}}
				onClick={() =>
					setValues({
						...values,
						step: 4,
						email: "",
						userId: "",
						error: false,
					})
				}
			>
				Reset Directly by answering your Security Questions
			</Link>
			</div>
		</div>
		<div className="d-flex justify-content-center">
		<button className="submitforall" disabled = {!success ? false : true}>SUBMIT</button>
		</div>
	</form>


		
		 :
		 <div style={{borderRadius:"0px"}}className="popup-box">
		 <div className="dialogStyles">
		 <p style={{marginBottom:"-0.2in"}}>{error}</p>
		 <Link to="/forgot">
		 <button className="submitforall" style={{marginLeft:"auto", marginRight:"auto"}} onClick={Step4Form()}>GO BACK</button>
		</Link>
	 </div> 
	 </div>
			
						


		}	
		
		
		
		</div>
	
	);
											
	const showSuccess = () => (
		<div
		
			style={{ display: success ? "" : "" }}>
			<Dialog isOpen={showSuccessDialog} onClose={(e) => {
				history.push('/signin')
                setShowSuccessDialog(false)
            }}>
                <p style={{textAlign:"center", fontSize:"17px"}}>Successfully created your account. Please Log in to continue.</p>
            </Dialog>
		</div>
	);

	return (
		<Layout
			title="Password Reset"
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
			{renderForms()}
		</Layout>
	);
};

export default Reset;