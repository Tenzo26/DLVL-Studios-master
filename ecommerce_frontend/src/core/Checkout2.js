import React, {useState, useEffect} from 'react';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {createOrder, getPaymentValues, getShipmentValues} from './apiCore';
import {emptyCart, updateSize} from './cartHelpers';
import Dialog from './Dialog'

const Checkout = ({products,setRun = f => f, run = undefined}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: '',
        address: '',
        first_name: '',
        last_name: '',
        email: '',
        mode_payment: '',
        mode_shipment: '',
        instagram: '',
        contact_number: ''
    });

    const {
        first_name,
        last_name,
        email,
        mode_payment,
        mode_shipment,
        instagram,
        contact_number,
        address
    } = data;

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const [modePayment, setModePayment] = useState([]);
    const [modeShipping, setModeShippping] = useState([]);

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [orderId, showOrderId] = useState();

    const loadModePayment = (userId, token) => {
        getPaymentValues(userId, token)
            .then(data => {
                if (data.error) {
                    setData({
                        ...data,
                        error: data.error
                    })
                }
                else {
                    setModePayment(data)
                }
            })
    }

    const loadModeShipping = (userId, token) => {
        getShipmentValues(userId, token)
            .then(data => {
                if (data.error) {
                    setData({
                        ...data,
                        error: data.error
                    })
                }
                else {
                    setModeShippping(data)
                }
            })
    }

    useEffect( () => {
        setData({
            ...data,
            email: isAuthenticated().user.email
        });
        loadModePayment(userId, token)
        loadModeShipping(userId, token)
    },[]);

    const handleChange = (name) => event => {
        const value = event.target.value;
        setData({...data, error: false, [name]: value});
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + (nextValue.count * nextValue.price);
        },0);
    };

    const submitOrder = (event) => {
        event.preventDefault();
            setData({
                loading: true
            });
                
                
        {/**first_name,
        last_name,
        email,
        mode_payment,
        mode_shipment,
        instagram,
        contact_number,
        address 
    var commonHtml = my name is ${a} from ${b};
*/}
            if (
                (first_name == null)||(last_name == null)||(email == null)||
                (mode_payment == null)||(mode_shipment == null)||(contact_number == null)||
                (address == null)||(first_name == "")||(last_name == "")||(email == "")||
                (mode_payment == "")||(mode_shipment == "")||(contact_number == "")||
                (address == "")
            )

            {
                if ((first_name == "") || (first_name == null)){
                    var fnError="First name is required"
                }else{
                    var fnError=""
                }
                if ((last_name=="") || (last_name == null)){
                    var lnError="Last name is required"
                }else{
                    var lnError=""
                }
                if ((email=="") || (email == null)){
                    var emailError="Email is required"
                }else{
                    var emailError=""
                }
                if ((mode_payment=="") || (mode_payment == null)){
                    var payError="Mode of Payment is required"
                }else{
                    var payError=""
                }
                if ((mode_shipment=="") || (mode_shipment == null)){
                    var shipError="Mode of Shipment is required"
                }else{
                    var shipError=""
                }
                if ((contact_number=="") || (contact_number == null)){
                    var contactError="Contact Number is required"
                }else{
                    var contactError=""
                }
                if ((address=="") || (address == null)){
                    var addressError="Address is required"
                }else{
                    var addressError=""
                }
                var errorWhole=fnError+lnError+emailError+payError+shipError+contactError+addressError
                setData({
                    ...data,
                    loading: false,
                    error: errorWhole,
   
                });
               
            }else{
        let proceed = true
        let errormessage = ""
        products.map((product, i) => {
                
            if (
                product.size == "Small" && (product.quantitySmall < product.count) ||
                product.size == "Medium" && (product.quantityMed < product.count) ||
                product.size == "Large" && (product.quantityLarge < product.count) ||
                product.size == "Free Size" && (product.quantityFree < product.count)
            )
                {
                    if (product.size == "Small") {
                        errormessage += "We only have " + product.quantitySmall + "x left for " + product.name + "\n"
                    }
                    else if (product.size == "Medium") {
                        errormessage += "We only have " + product.quantityMed + "x left for " + product.name + "\n"
                    }
                    else if (product.size == "Large") {
                        errormessage += "We only have " + product.quantityLarge + "x left for " + product.name + "\n"
                    }
                    else if (product.size == "Free Size") {
                        errormessage += "We only have " + product.quantityFree + "x left for " + product.name + "\n"
                    }
                    proceed = false;
                }
        });

        if (proceed==true) {
            const amount = getTotal();
            const createOrderData = {
                products: products,
                email: email,
                amount: amount,
                address: address,
                first_name: first_name,
                last_name: last_name,
                contact_number: contact_number,
                mode_payment: mode_payment,
                mode_shipment: mode_shipment,
                instagram: instagram
            };
            
            createOrder(userId, token, createOrderData)
                .then(data2 => {
                    if (data2.error) {
                        setData({...data, error: data2.error});
                        alert(data2.error)
                    }
 
                    else {
                        showOrderId(data2)
                        setShowSuccessDialog(true)
                        //alert("Order has been successfully placed with the ID [" + data2 + "] Please check your mail to confirm your order. Make sure to keep in touch with us for the transaction!");
                    }               
                });
        }

        else {
            setData({
                ...data,
                loading: false,
                error: errormessage
            });
            alert(errormessage)
        }
    }
    };

    const showError = error => (
        <div 
        style={{ display: error ? "" : "none", backgroundColor:"transparent", marginRight:"auto", marginLeft:"auto", marginTop:"-75px"}} className="errororder">
            <div>
            <form onSubmit = {submitOrder}>
            <div className = "form-group">
                {(typeof(error) == "string" &&  error.includes("First name is required"))
					? <input type = "text" onChange = {handleChange('first_name')}
                    className = "cartfirstnameError"
                    value = {data.first_name} placeholder = "First Name"
                   />
					:<input type = "text" onChange = {handleChange('first_name')}
                    className = "cartfirstname"
                    value = {data.first_name}
                    placeholder = "First Name"
                />
				}
                 {(typeof(error) == "string" &&  error.includes("First name is required"))
                ?<span id="spanFN" style={{color:"red", fontFamily:"Times New Roman",fontWeight:"100", fontSize:"14px", position:"absolute" }}>&nbsp;First Name is required</span>
                :<span></span>
            }

                {(typeof(error) == "string" &&  error.includes("Last name is required"))
                    ? <input type = "text" onChange = {handleChange('last_name')}
                    className = "cartlastnameError"
                    value = {data.last_name}
                    placeholder = "Last Name"/>
                    :<input type = "text" onChange = {handleChange('last_name')}
                        className = "cartlastname"
                        value = {data.last_name}
                        placeholder = "Last Name"
                        
                    />
                }
                 {(typeof(error) == "string" &&  error.includes("Last name is required"))
                ?<span id="spanLN" style={{color:"red", fontFamily:"Times New Roman",fontWeight:"100", fontSize:"14px", position:"absolute" }}>&nbsp;Last Name is required</span>
                :<span></span>
            }
                </div>



                <div className = "form-group">
                {(typeof(error) == "string" &&  error.includes("Address is required"))
                ? <input type="text" onChange = {handleChange('address')}
                    className = "cartaddressError"
                    value = {data.address}
                    placeholder = "Delivery Address"
                    
                />
                :<input type="text" onChange = {handleChange('address')}
                className = "cartaddress"
                value = {data.address}
                placeholder = "Delivery Address"/>
                }
                 {(typeof(error) == "string" &&  error.includes("Address is required"))
                 ?<span id="spanAdd" style={{color:"red", fontFamily:"Times New Roman",fontWeight:"100", fontSize:"14px", position:"absolute" }}>&nbsp;Delivery Address is required</span>
                 :<span></span>
            }
            </div>

            <div className = "form-group">
               
                {(typeof(error) == "string" &&  error.includes("Contact Number is required"))
                    ? <input type = "tel" onChange = {handleChange('contact_number')}
                        className = "cartcontactnumError"
                        value = {data.contact_number}
                        placeholder = "Contact Number"
                        pattern = "{11}"
                        
                    />
                    :<input type = "tel" onChange = {handleChange('contact_number')}
                    className = "cartcontactnum"
                    value = {data.contact_number}
                    placeholder = "Contact Number"
                    pattern = "{11}"
                    
                />
                
            }
             {(typeof(error) == "string" &&  error.includes("Contact Number is required"))
            ? <span id="spanCont" style={{color:"red", fontFamily:"Times New Roman",fontWeight:"100", fontSize:"14px", position:"absolute" }}>&nbsp;Contact Number is required</span>
            :<span></span>
        }

                {(typeof(error) == "string" &&  error.includes("Email is required"))
                    ? <input type = "email" onChange = {handleChange('email')}
                        className = "cartemailError"
                        value = {data.email}
                        placeholder = "E-mail Address"
                    />
                    
                    : <input type = "email" onChange = {handleChange('email')}
                    className = "cartemail"
                    value = {data.email}
                    placeholder = "E-mail Address"
                    /> 
                }
                {(typeof(error) == "string" &&  error.includes("Email is required"))
                 ?<span id="spanEmail" style={{color:"red", fontFamily:"Times New Roman",fontWeight:"100", fontSize:"14px", position:"absolute" }}>&nbsp;Email Address is required</span>
                 :<span></span>
            }
                  
               
            </div>
            <div className = "form-group">
             
                {(typeof(error) == "string" &&  error.includes("Mode of Payment is required"))
                    ?<select className = "select_paymentError"  onChange = {handleChange('mode_payment')}>
                        <option hidden disabled selected value = "">Mode of payment</option>
                        {modePayment && modePayment.map((c, i) => (
                            <option key = {i} value = {c}>{c}</option>
                        ))}
                    </select>
                    : <select className = "select_payment"  onChange = {handleChange('mode_payment')}>
                    <option hidden disabled selected value = "">Mode of payment</option>
                    {modePayment && modePayment.map((c, i) => (
                        <option key = {i} value = {c}>{c}</option>
                    ))}
                    </select>
                    }
                     {(typeof(error) == "string" &&  error.includes("Mode of Payment is required"))
                     ?<span id="spanPay" style={{color:"red", fontFamily:"Times New Roman",fontWeight:"100", fontSize:"14px", position:"absolute" }}>&nbsp;Mode of Payment is required</span>
                     :<span></span>
                     }

  
                {(typeof(error) == "string" &&  error.includes("Mode of Shipment is required"))
                    ? <select className = "select_shipmentError"  onChange = {handleChange('mode_shipment')}>
                        <option hidden disabled selected value = "">Mode of Shipment</option>
                        {modeShipping && modeShipping.map((c, i) => (
                            <option key = {i} value = {c}>{c}</option>
                        ))}
                    </select>
                    : <select className = "select_shipment"  onChange = {handleChange('mode_shipment')}>
                    <option hidden disabled selected value = "">Mode of Shipment</option>
                    {modeShipping && modeShipping.map((c, i) => (
                        <option key = {i} value = {c}>{c}</option>
                    ))}
                </select>
                }
                 {(typeof(error) == "string" &&  error.includes("Mode of Shipment is required"))
                 ?<span id="spanShip" style={{color:"red", fontFamily:"Times New Roman",fontWeight:"100", fontSize:"14px", position:"absolute" }}>&nbsp;Mode of Shipment is required</span>
                :<span></span>
            }
              
            </div>

                 <div className = "form-group">
            
                    <input type = "text" onChange = {handleChange('instagram')}
                        className = "cartigName"
                        value = {data.instagram}
                        placeholder = "Instagram Account (Optional)"
                    />
            </div>

            <div className="d-flex justify-content-around">
            <button type = "submit" style={{marginTop:"30px", marginBottom:"30px", marginLeft:"0in"}} id = "cartplace_order1" >PLACE ORDER</button>
            </div>
           
            </form>
            </div>
            <br></br>
            </div>
    );

    const showSuccess = success => (
        <div className = "alert alert-success" 
        style = {{display: success ? '' : 'none'}}>
            
        </div>
    );

    const showLoading = (loading) => (
        loading && <h2>Loading</h2>
    )

    //onBlur = {() => setData({...data, error: ''})}

    const handleSize = (productId) => (event) => {
		updateSize(productId, event.target.value)
        setRun(!run)
	};

    const showSummaryBreakdown = () => {
        return (
            <div>
            <form onSubmit = {submitOrder}  style={{ display: data.error ? "none" : "block", marginTop:"-30px" }}>
            <div className = "form-group">
                    <input type = "text" onChange = {handleChange('first_name')}
                        className = "cartfirstname"
                        value = {data.first_name}
                        placeholder = "First Name"
                        
                    />
           
           
         
                    <input type = "text" onChange = {handleChange('last_name')}
                        className = "cartlastname"
                        value = {data.last_name}
                        placeholder = "Last Name"
                        
                    />
                </div>
        
            <div className = "form-group">
                <input type="text" onChange = {handleChange('address')}
                    className = "cartaddress"
                    value = {data.address}
                    placeholder = "Delivery Address"
                    
                />
            </div>

            <div className = "form-group">
             
                    <input type = "tel" onChange = {handleChange('contact_number')}
                        className = "cartcontactnum"
                        value = {data.contact_number}
                        placeholder = "Contact Number"
                        
                    />
            
         
                    <input type = "email" onChange = {handleChange('email')}
                        className = "cartemail"
                        value = {data.email}
                        placeholder = "E-mail Address"
                        
                    />
         
            </div>

            <div className = "form-group">
   
                    <select className = "select_payment"  onChange = {handleChange('mode_payment')}>
                        <option hidden disabled selected value = "">Mode of payment</option>
                        {modePayment && modePayment.map((c, i) => (
                            <option key = {i} value = {c}>{c}</option>
                        ))}
                    </select>
             
                    <select className = "select_shipment"  onChange = {handleChange('mode_shipment')}>
                        <option hidden disabled selected value = "">Mode of Shipment</option>
                        {modeShipping && modeShipping.map((c, i) => (
                            <option key = {i} value = {c}>{c}</option>
                        ))}
                    </select>
                </div>
           

            <div className = "form-group">
           
                    <input type = "text" onChange = {handleChange('instagram')}
                        className = "cartigName"
                        value = {data.instagram}
                        placeholder = "Instagram Account (Optional)"
                    />
                </div>
        
            <div className="d-flex justify-content-around">
            <button type = "submit" style={{marginTop:"30px", marginBottom:"30px", marginLeft:"0in"}} id = "cartplace_order1" >PLACE ORDER</button>
            </div>

            </form>
            <br></br>
            </div>
            
        )
      
    };

    return (
        <div>
            {products.length > 0 ? showSummaryBreakdown() : null}
            {showLoading(data.loading)}
            {showError(data.error)}
            <div className="dialogmob">
            <Dialog isOpen={showSuccessDialog} onClose={(e) => {

                <div style={{backgroundColor: 'black', width: '800px', height: '100%'}}></div>
                setShowSuccessDialog(false)
                setRun(!run);
                        emptyCart(userId, token, () => {
                                setData({
                                    loading: false,
                                    success: true
                                });
                        });

            }}><label id="receipt">RECEIPT</label>
               <label id="popconfirm">Make your payment directly to our bank account.
Kindly check your email for our bank account details.
Please Use your Order Number (given below) as the payment reference.
Your order will not be shipped until the funds have cleared in our account.
You can check for your product's update via Order Status. <br/><br/><b>ORDER ID: {orderId ? orderId : "MISSING ORDER ID"}</b> </label>
            </Dialog>
            </div>
            {orderId}
            {showSuccess(data.success)}
        </div>
    )
};

export default Checkout;



