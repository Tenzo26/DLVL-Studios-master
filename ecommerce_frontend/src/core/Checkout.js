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
        setData({...data, [name]: value});
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + (nextValue.count * nextValue.price);
        },0);
    };

    

    const submitOrder = (e) => {
        e.preventDefault();
            setData({
                loading: true
            });
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

        if (proceed) {
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
            return false
        }
    };

    const showError = error => (
        <div className = "alert alert-danger" 
        style = {{display: error ? '' : 'none'}}>
            {error}
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
            
            <form onSubmit = {submitOrder}>
           <div className="trylang1">
                <div style={{marginRight:"auto", marginLeft:"auto" , flexFlow:"wrap"}} class="d-flex justify-content-center">
                <table style={{width:"100%", border:"1px solid black", marginRight:"auto", marginLeft:"auto", flexFlow:"wrap", marginBottom:"0.3in"}} className = "table">
            <thead style={{flexFlow:"wrap"}} className = "thead-dark">
                <tr className="tablename">
                <th scope="col"  >Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">S</th>
                <th scope="col">M</th>
                <th scope="col">L</th>
                <th scope="col">Free Size</th>
                </tr>
            </thead>
            <tbody style={{ border:"1px solid black", margin:"0 auto", flexFlow:"wrap"}}>
            {products.map((product, i) => (
                <tr key = {i}>
                    <td className="tablename">
                        {product.name}
                    </td>
                    <td className="tablename">
                        <b>{product.count}</b>
                    </td>
                    <td className="tablename">
                        &#8369;{product.count * product.price}
                    </td>
                    <td>
                        {product.sizeSmall && product.quantitySmall > 0 ? 
                            <label className="cartRadioBtn">
                                <input value = "Small" onChange = {handleSize(product._id)}  name = {i} checked = {product.size == "Small" && product.quantitySmall > 0} type = "radio"  required/>
                                <span className="checkmarkCart"></span>
                            </label>
                            : "N/A"}
                    </td>
                    <td>
                        {product.sizeMed && product.quantityMed > 0 ? 
                            <label className="cartRadioBtn">
                                <input value = "Medium" onChange = {handleSize(product._id)}  name = {i} checked = {product.size == "Medium" && product.quantityMed > 0} type = "radio"  required/>
                                <span className="checkmarkCart"></span>
                            </label>
                            : "N/A"}
                    </td>
                    <td>
                        {product.sizeLarge && product.quantityLarge > 0  ? 
                            <label className="cartRadioBtn">
                                 <input value = "Large" onChange = {handleSize(product._id)}  name = {i} checked = {product.size == "Large" && product.quantityLarge > 0} type = "radio"  required/>
                                 <span className="checkmarkCart"></span>
                            </label>
                            : "N/A"}
                    </td>
                    <td>
                        {product.sizeFree && product.quantityFree > 0  ? 
                            <label className="cartRadioBtn">
                                <input value = "Free Size" onChange = {handleSize(product._id)}  name = {i} checked = {product.size == "Free Size" && product.quantityFree > 0} type = "radio"  required/>
                                <span className="checkmarkCart"></span>
                            </label>
                            : "N/A"}
                    </td>
                </tr>
                
            ))}
              
                
          
            </tbody>
            </table>
           
            </div>
            </div>
          <div className="form-group">
             
            <label className = "totalprice">Total: <b>PHP {getTotal().toLocaleString()}.00&nbsp;&nbsp;</b> 
            </label>
            <Link to="/cart2">
            <button type = "submit" id = "cartplace_order" >GO TO CHECKOUT</button>
            </Link>  
         
            </div>
        
            </form>
         
        )
        
      
    };

    return (
        <div>
            {products.length > 0 ? showSummaryBreakdown() : null}
            {showLoading(data.loading)}
            {showError(data.error)}
            {showSuccess(data.success)}
            <Dialog isOpen={showSuccessDialog} onClose={(e) => {
                setShowSuccessDialog(false)
                setRun(!run);
                        emptyCart(userId, token, () => {
                                setData({
                                    loading: false,
                                    success: true
                                });
                        });
            }}>
                Order has been successfully placed with the ID <b>{orderId ? orderId : "MISSING ORDER ID"}</b>. 
                Please check your mail to confirm your order. Make sure to keep in touch with us for the transaction!
            </Dialog>
            {orderId}
        </div>
    )
};

export default Checkout;