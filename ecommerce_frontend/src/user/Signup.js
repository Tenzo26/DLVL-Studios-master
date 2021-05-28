import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import usePasswordToggle from "../user/usePasswordToggle";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import Dialog from '../core/Dialog'
import Popup from './Popup';
import Navbarmenuusers from '../core/navbarmenuusers';
import { itemTotal } from "../core/cartHelpers";
import search from '../core/search.png';

const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

const Signup = () => {
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
		name: "",
		email: "",
		password: "",
		question_1: "What is your favorite book",
		question_2: "Where did you meet your spouse",
		question_3: "Where did you go to high school/college",
		answer_1: "",
		answer_2: "",
		answer_3: "",
		error: "",
		success: false,
	});

	const {
		name,
		email,
		password,
		error,
		success,
		question_1,
		question_2,
		question_3,
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

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false });

		let errors
		if (name == "") {
			errors += "Name is required "
		}

		if (email == "") {
			errors += "`email` is required. "
		}

		if (minChar && number && specialChar) {
			signup({
				name,
				email,
				password,
				question_1,
				question_2,
				question_3,
				answer_1,
				answer_2,
				answer_3,
			}).then((data) => {
				if (data.error) {
					errors += data.error + " "
					setValues({ ...values, error: errors, success: false });
				} else {
					setValues({
						...values,
						name: "",
						email: "",
						password: "",
						question_1: "What Is your favorite book",
						question_2:
							"Where did you meet your spouse",
						question_3: "Where did you go to high school/college",
						answer_1: "",
						answer_2: "",
						answer_3: "",
						error: "",
						errorName:"",
						success: true,
					});
					setPasswordFocused(false)
					setPasswordValidity({
						minChar : null,
						number : null,
						specialChar: null
					})
					setShowSuccessDialog(true)
				}
			});
		}

		else {
			errors += "Password doesn't meet requirements. "
			setValues({...values, error: errors})
			setPasswordFocused(true)
		}

		
	};

	  

	const onChangePassword = (password) => {
		setValues({ ...values, error: false, password : password });
       setPasswordValidity({
            minChar: password.length >= 8 ? true : false,
            number: isNumberRegx.test(password) ? true : false,
            specialChar: specialCharacterRegx.test(password) ? true : false
        });
    };

	const signUpForm = () => (
		
		<form style={{ display: error ? "none" : "block" }}>
			<h1 style={{marginTop:"-40px"}}id="h1SignUp">CREATE ACCOUNT</h1>
			<div className="form-group input-group">
				<input type="text" id="fullname"  onChange={handleChange("name")} 
					value={name} placeholder="Full Name"/>
            </div>

			<div className="form-group input-group">
				<input type="email" id="emailSignUp"  placeholder="Email" onChange={handleChange("email")} 
					value={email}/>

			</div>
			<div className="form-group input-group">
				
				<input type="password" id="passwordSignUp" placeholder="Password" type={PasswordInputType} value={password} 
					onFocus={() => {setPasswordFocused(true)}}
					onBlur = {() => {setPasswordFocused(false)}}
					onChange = {e => onChangePassword(e.target.value)} />
			</div>
			

			<div class="d-flex justify-content-center">

									    	<div class="p-5" style={{marginBottom:"-100px"}}></div>
    										<div class="p-5" style={{marginBottom:"-100px"}}></div>
											<div class="p-5" style={{marginBottom:"-100px"}}></div>
    										<div class="p-2" id="eyeSignUp">
											<span className="password-toggle-icon-signin">
												{ToggleIcon}
                                   			</span>
											</div>
  										</div>
							<div  id="passwordStrength">
								{passwordFocused && (
									<PasswordStrengthIndicator
									
									
									validity={passwordValidity}
								/>
                                )}
								</div>
								
	<label id="secTitle">
		Security Questions
		</label>
		<label id="secP1" >
			These questions will help us verify your identity
		</label>
		<label id="secP2" >
			in any case that you forgot your password.
		</label>


<div >
				<label id="q1Label">Question 1:</label>
				<select
					name="question_1"
					required
					id="secQ1"
					onChange={handleChange("question_1")}
				>
					<option selected value="What Is your favorite book">
						What is your favorite book?
					</option>
					<option value="What is the name of the road you grew up on">
						What is the name of the road you grew up on?
					</option>
					<option value="What is your mother’s maiden name">
						What is your mother’s maiden name?
					</option>
				</select>
				<input
					required
					type="text"
					name="answer_1"
					id="ansSecQ1"
					onChange={handleChange("answer_1")}
					value={answer_1}
				/>
			</div>


			<div className="form-group">
				
			<label id="q2Label">Question 2:</label>
				<select
					name="question_2"
					id="secQ2"
					required
					onChange={handleChange("question_2")}
					
				>
					<option selected value="Where did you meet your spouse">
						Where did you meet your spouse?
					</option>
					<option
						
						value="What was the name of your first/current/favorite pet"
					>
						What was the name of your first/current/favorite pet?
					</option>
					<option  value="What was the first company that you worked for">
						What was the first company that you worked for?
					</option>
					
				</select>
				<input
					required
					type="text"
					name="answer_2"
					id="ansSecQ2"
					onChange={handleChange("answer_2")}
					value={answer_2}

				/>
			</div>

			<div className="form-group">
			<label id="q3Label">Question 3:</label>
				<select
					name="question_3"
					id="secQ3"
					required
					onChange={handleChange("question_3")}
					
				>
					<option
						selected
						value="Where did you go to high school/college">
						Where did you go to high school/college?
					</option>
					<option value="What is your favorite food">
						What is your favorite food?
					</option>
					<option value="What city were you born in">
						What city were you born in?
					</option>
					<option value="Where is your favorite place to vacation">
						Where is your favorite place to vacation?
					</option>
				</select>
				<input
					required
					type="text"
					name="answer_3"
					id="ansSecQ3"
					onChange={handleChange("answer_3")}
					value={answer_3}
				/>
			</div>
	 
			<br></br>

			<button onClick={clickSubmit} id="registerSignUp" >
				REGISTER
			</button>
			<br></br>
			<br></br>
			
		</form>
	);



	
	const showError = () => (

		<div
		id="signUpErrorW"
		style={{ display: error ? "" : "none", backgroundColor:"transparent",marginRight:"auto", marginLeft:"auto", marginTop:"-10px"}}
		>
			
			<form >
			<h1 style={{marginTop:"-40px"}} id="h1SignUp">CREATE ACCOUNT</h1>
			<div style={{marginTop:"50px"}}>
			<div className="form-group input group">
			{(typeof(error) == "string" &&  error.includes("Name is required"))
					? <input type="text" id="fullnameError"  onChange={handleChange("name")} 
					value={name} placeholder="Full Name"/>
					:<input type="text" id="fullname"  onChange={handleChange("name")} 
					value={name} placeholder="Full Name"/>
				}
			{(typeof(error) == "string" &&   error.includes("Name is required"))
						? 
						<div style={{ marginBottom:"-20px"}}>
						<span style={{color:"red", fontFamily:"Times New Roman"}}>&nbsp;Name is required</span>
						</div>
        				: <span style={{ marginBottom:"20px"}}></span>
					}
            </div>
			<div className="form-group ">
			{(typeof(error) == "string" &&  error.includes("`email` is required."))
					? <input type="email" id="emailSignUpError"  placeholder="Email" onChange={handleChange("email")} 
					value={email}/>
					: (typeof(error) == "string" &&  error.includes("duplicate key error collection"))?
						<input type="email" id="emailSignUpError"  placeholder="Email" onChange={handleChange("email")} 
					value={email}/>
					: (typeof(error) == "string" &&  error.includes("Please fill a valid email address"))?
						<input type="email" id="emailSignUpError"  placeholder="Email" onChange={handleChange("email")} 
					value={email}/>
					:<input type="email" id="emailSignUp"  placeholder="Email" onChange={handleChange("email")} 
						value={email}/>
	
				}
				{(typeof(error) == "string" &&   error.includes("`email` is required."))
						? 
						<div style={{ marginBottom:"-20px"}}>
						<span style={{color:"red", fontFamily:"Times New Roman"}}>&nbsp;Email is required</span>
						</div>
						: (typeof(error) == "string" &&  error.includes("duplicate key error collection"))?
						<div style={{ marginBottom:"-20px"}}>
						<span style={{color:"red", fontFamily:"Times New Roman"}}>&nbsp;Please use another email. User with that email already exists</span>
						</div>
						: (typeof(error) == "string" &&  error.includes("Please fill a valid email address"))?
						<div style={{ marginBottom:"-20px"}}>
						<span style={{color:"red", fontFamily:"Times New Roman"}}>&nbsp;Please fill a valid email address</span>
						</div>
						: <span style={{ marginBottom:"20px"}}></span>
					}
				
            </div>
			
			<div className="form-group">
			{(typeof(error) == "string" &&  error.includes("Password doesn't meet requirements."))
				?<input type="password" id="passwordSignUpError" placeholder="Password" type={PasswordInputType} value={password} 
					onFocus={() => {setPasswordFocused(true)}}
					onBlur = {() => {setPasswordFocused(false)}}
					onChange = {e => onChangePassword(e.target.value)} />
					:
					<input type="password" id="passwordSignUp" placeholder="Password" type={PasswordInputType} value={password} 
					onFocus={() => {setPasswordFocused(true)}}
					onBlur = {() => {setPasswordFocused(false)}}
					onChange = {e => onChangePassword(e.target.value)} />
			}
			
			</div>

			<div class="d-flex justify-content-center">

									    	<div class="p-5" style={{marginBottom:"-100px"}}></div>
    										<div class="p-5" style={{marginBottom:"-100px"}}></div>
											<div class="p-5" style={{marginBottom:"-100px"}}></div>
    										<div class="p-2" id="eyeSignUp">
											<span className="password-toggle-icon-signin">
												{ToggleIcon}
                                   			</span>
											</div>
  										</div>
										  {(typeof(error) == "string" &&   error.includes("Password doesn't meet requirements."))
						? 
						<div style={{ marginTop:"-10px", marginBottom:"5px"}}>
						<span style={{color:"red", fontFamily:"Times New Roman"}}>&nbsp;Password does not meet the requirements</span>
						</div>
        				: <span style={{ marginBottom:"20px"}}></span>
					}

									

								<div style={{width:"375px", marginRight:"auto", marginLeft:"auto", marginBottom:"60px"}}>
								{passwordFocused && (
									<PasswordStrengthIndicator
									style={{fontFamily:"Times New Roman"}}
									validity={passwordValidity}
								/>
                                )}
								</div>

		<label id="secTitle">
		Security Questions
		</label>
		<label id="secP1" >
			These questions will help us verify your identity
		</label>
		<label id="secP2" >
			in any case that you forgot your password.
		</label>

<div className="form-group">
				<label id="q1Label">Question 1:</label>
				
				<select
					name="question_1"
					required
					id="secQ1"
					onChange={handleChange("question_1")}
					value={question_1}
				>
					<option selected value="What Is your favorite book">
						What is your favorite book?
					</option>
					<option value="What is the name of the road you grew up on">
						What is the name of the road you grew up on?
					</option>
					<option value="What is your mother’s maiden name">
						What is your mother’s maiden name?
					</option>
				</select>
				{(typeof(error) == "string" &&  error.includes("questions.q1.answer: Answer is required"))
				?<input
					required
					type="text"
					name="answer_1"
					id="ansSecQ1Error"
					onChange={handleChange("answer_1")}
					value={answer_1}
				/>
				:<input
				required
				type="text"
				name="answer_1"
				id="ansSecQ1"
				onChange={handleChange("answer_1")}
				value={answer_1}
			/>
				
				}
				{(typeof(error) == "string" &&   error.includes("questions.q1.answer: Answer is required"))
						? 
						<div style={{ marginBottom:"-20px"}}>
						<span style={{color:"red", fontFamily:"Times New Roman"}}>&nbsp;Answer in Question 1 is required</span>
						</div>
        				: <span style={{ marginBottom:"20px"}}></span>
					}
			</div>

			<div className="form-group">
			<label id="q2Label">Question 2:</label>
				<select
					name="question_2"
					id="secQ2"
					required
					onChange={handleChange("question_2")}
					value={question_2}		
				>
					<option selected value="Where did you meet your spouse">
						Where did you meet your spouse?
					</option>
					<option
						
						value="What was the name of your first/current/favorite pet"
					>
						What was the name of your first/current/favorite pet?
					</option>
					<option  value="What was the first company that you worked for">
						What was the first company that you worked for?
					</option>
					
				</select>
				{(typeof(error) == "string" &&  error.includes("questions.q2.answer"))
				?<input
					required
					type="text"
					name="answer_2"
					id="ansSecQ2Error"
					onChange={handleChange("answer_2")}
					value={answer_2}
				/>
				:<input
				required
				type="text"
				name="answer_2"
				id="ansSecQ2"
				onChange={handleChange("answer_2")}
				value={answer_2}
			/>
				}
			{(typeof(error) == "string" &&   error.includes("questions.q2.answer"))
						? 
						<div style={{ marginBottom:"-20px"}}>
						<span style={{color:"red", fontFamily:"Times New Roman"}}>&nbsp;Answer in Question 2 is required</span>
						</div>
        				: <span style={{ marginBottom:"20px"}}></span>
					
				
			}
			</div>

			<div className="form-group">
			<label id="q3Label">Question 3:</label>
				<select
					name="question_3"
					id="secQ3"
					required
					onChange={handleChange("question_3")}
					value={question_3}
				>
					<option
						selected
						value="Where did you go to high school/college">
						Where did you go to high school/college?
					</option>
					<option value="What is your favorite food">
						What is your favorite food?
					</option>
					<option value="What city were you born in">
						What city were you born in?
					</option>
					<option value="Where is your favorite place to vacation">
						Where is your favorite place to vacation?
					</option>
				</select>
				{(typeof(error) == "string" &&  error.includes("questions.q3.answer: Answer is required"))
				?<input
					required
					type="text"
					name="answer_3"
					id="ansSecQ3Error"
					onChange={handleChange("answer_3")}
					value={answer_3}
				/>
				:<input
				required
				type="text"
				name="answer_3"
				id="ansSecQ3"
				onChange={handleChange("answer_3")}
				value={answer_3}
			/>

		}
			{(typeof(error) == "string" &&   error.includes("questions.q3.answer: Answer is required"))
						? 
						<div style={{ marginBottom:"-10px"}}>
						<span style={{color:"red", fontFamily:"Times New Roman"}}>&nbsp;Answer in Question 3 is required</span>
						</div>
        				: <span ></span>
					
				
			}
			</div>
			<br></br>
			<button onClick={clickSubmit} id="registerSignUp" >
				REGISTER
			</button>
			<br></br>
			<br></br>
			</div>

			</form>

			
			
		</div>

		
	);


	function AddPopup() {
		const [isOpen, setIsOpen] = useState(false);
	  
		const togglePopup = () => {
		  setIsOpen(!isOpen);
		}
	  
		return <div id="signUpMargin" >
				<p id="termsLabel">By clicking Register, you agree to our <Link onClick={togglePopup}><u id="terms">Terms and Conditions </u></Link></p>
			  {isOpen && <Popup
			   content={<>
			  <h4 id="termsTitle">Terms and Conditions</h4>
				  <p id="pTerms">1. Shipping fee is shouldered by the buyer.</p>
				  <p id="pTerms">2. PLEASE check if your size is right (we DO NOT offer return and exchange due to the COVID pandemic).</p>
				  <p id="pTerms">3. To confirm orders please send PROOF OF PAYMENT and send it via our DM (Instagram) or PM (Facebook).</p>
				  <p id="pTerms">4. Check our IG story highlight for the care labels of the garments.</p>
				  <p id="pTerms">5. Delivery: NO same day deliveries. Will be delivered the following day</p>
				  <p id="pTerms">6. Provincial deliveries 1 to 3 days. (Shipping fee shall be paid separately by the customer once we have confirmed the shipment with the courier) </p>
				  <p id="pTerms">7. We can only reserve your order/s for 1 day. We post joy reservers and bogus buyers.</p>
				  
			</>}
			  handleClose={togglePopup} 
			  />}
		  </div>
	  }

	return (
		<Layout
			title="Sign Up"
			description="Register for DLVL Studios"
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
			{signUpForm()}
			{AddPopup()}
			<div style={{marginTop:"120px", position:"relative", display:"block"}}>
			
			<p id="pBackSignIn"><Link to="/signin"><u id="backSignIn">Back to Login</u></Link></p>
			</div>
			<br></br>
			
			<Dialog isOpen={showSuccessDialog} onClose={(e) => {
				history.push('/signin')
                setShowSuccessDialog(false)
            }}>
                <p style={{textAlign:"center", fontSize:"17px", fontFamily:"Times New Roman"}}>Successfully created your account. Please Log in to continue.</p>
            </Dialog>
		</Layout>
	);
};

export default Signup;
