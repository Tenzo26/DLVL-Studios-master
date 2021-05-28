import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {listOrders, getStatusValues, updateOrderStatus, sendFeedbackEmail, refundQuantity} from './apiAdmin';
import moment from 'moment';
import Navbarmenuadmin from '../core/navbarmenuadmin'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setstatusValues] = useState([]);
    const [showDeliveredOrders, setshowDeliveredOrders] = useState(false);
    const [showCancelledOrders, setshowCancelledOrders] = useState(false);

    const {user, token} = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setOrders(data);
                }
            });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setstatusValues(data);
                }
            });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    },[]);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 className = "text-danger2 display-2">
                    TOTAL ORDERS: {orders.filter(c => (c.status != "Delivered" && c.status != "Cancelled")).length}
                </h1>
            );
        } 
        else {
            return (
                <h1 className = "text-danger2 display-2">
                    NO ORDERS
                </h1>
            );
        }
    };

    const showInput = (key, value) => (
        <div className = "input-group mb-2 mr-sm-2">
            <div className = "input-group-prepend">
                <div className = "input-group-text">
                    {key}
                </div>
                <input type = "text" value = {value} className = "form-control" readOnly/>
            </div>
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value)
            .then(data => {
                if (data.error) {
                    console.log('Status update failed');
                }
                else {
                    if (e.target.value == "Delivered") {
                        sendFeedbackEmail(user._id, token, orderId)
                            .then(data => {
                                console.log(JSON.stringify(data))
                                if(data.error) {
                                    alert('Email failed to send');
                                }
                                else {
                                    alert("The status has been updated");
                                }
                            })
                    }

                    else if (e.target.value == "Cancelled") {
                        alert("Cancelled Order [ID: " + orderId + "]")
                        refundQuantity(user._id, token, orderId)
                            .then(data => {
                                console.log(JSON.stringify(data))
                                if(data.error) {
                                    alert('Order failed to refund');
                                }
                                else {
                                    alert("The status has been updated");
                            }
                        })
                    }
                    loadOrders();
                }
            })
    };

    const showStatus = (o) => (
        <div className = "form-group">
            <h3 className = "mark mb-4">
                Status: {o.status}
            </h3>
                <select className = "form-control" 
                onChange = {(e) => handleStatusChange(e, o._id)}>
                    <option hidden disabled selected>Update Status</option>
                    {statusValues.map((status, index) => (
                        <option key = {index} value = {status}>
                            {status}
                        </option>
                    ))}
                </select>
                <div class="select__arrow" ></div>
        </div>
    );

    const showRefreshButton = () => (
        <div>
            <button onClick = {() => {loadOrders()}} className = "btn btn-info">
            Refresh Orders
        </button>
        </div>
    );

    const showDeliveredCancelledOrders = (orders, status) => {
        return (
            orders.filter(c => c.status == status).map((o, oIndex) => {
                return (
                    <div className = "mt-5" key = {oIndex} style ={{borderBottom: '5px dashed black', textAlign: 'center'}}>
                        <h5 className = "mb-5">
                            <span className = "bg-primary_orders">
                                Order ID: {o._id}
                            </span>
                        </h5>
                        <ul className = "list-group mb-2">
                            <li className = "list-group-item deliverbg">
                                <h3 className="DeliveredOrder">
                                    Status: {o.status}
                                </h3>
                            </li>
                            <li className = "list-group-item">
                                Amount: &#8369;{o.amount}
                            </li>
                            <li className = "list-group-item">
                                Ordered by: {o.first_name} {o.last_name}
                            </li>
                            <li className = "list-group-item">
                                Order Date: {moment(o.createdAt).fromNow()}
                            </li>
                            <li className = "list-group-item">
                                Delivery Address: {o.address}
                            </li>
                            <li className = "list-group-item">
                                Instagram Account: {o.instagram ? o.instagram : "Not Specified"}
                            </li>
                        </ul>
                        <h3 className = "mt-4 mb-4 font-italic">
                            Total Products Ordered: {o.products.length}
                        </h3>

                        <div className = "ordersGroup">
                            {o.products.map((p, pIndex) => (
                                <div className = "mb-4" key = {pIndex}>
                                    {showInput('Product ID', p._id)}
                                    {showInput('Name', p.name)}
                                    {showInput('Price', p.price)}
                                    {showInput('Size', p.size)}
                                    {showInput('Qty', p.count)}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })
        )
    }

    return (
        <Layout title = "CUSTOMER ORDERS"  description = {`${user.name}, time to manage your orders!`}>
            <div className="container-fluid">
            <div class="pl-4">
            <Navbarmenuadmin/>
            </div>
            </div>
        <h1 id="h1UserFeedback">CUSTOMER ORDERS</h1>
        <div className = "row">
            <div className = "col-md-8 offset-md-2">
                
                {showRefreshButton()}
                {showOrdersLength()}
                {orders.filter(c => (c.status != "Delivered" && c.status != "Cancelled")).map((o, oIndex) => {
                    return (
                        <div className = "mt-5" key = {oIndex} style ={{borderBottom: '5px dashed black', textAlign: 'center'}}>
                            <h5 className = "mb-5">
                                <span className = "bg-primary_orders">
                                    Order ID: {o._id}
                                </span>
                            </h5>
                            <ul className = "list-group mb-2">
                                <li className = "list-group-item">
                                    {showStatus(o)}
                                </li>
                                <li className = "list-group-item">
                                    Amount: &#8369;{o.amount}
                                </li>
                                <li className = "list-group-item">
                                    Ordered by: {o.first_name} {o.last_name}
                                </li>
                                <li className = "list-group-item">
                                    Order Date: {moment(o.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                                </li>
                                <li className = "list-group-item">
                                    Delivery Address: {o.address}
                                </li>
                                <li className = "list-group-item">
                                    Email: {o.email}
                                </li>
                                <li className = "list-group-item">
                                    Contact Number: {o.contact_number}
                                </li>
                                <li className = "list-group-item">
                                    Instagram Account: {o.instagram ? o.instagram : "Not Specified"}
                                </li>
                                <li className = "list-group-item">
                                    Mode of Payment: {o.mode_payment ? o.mode_payment : "Not Specified"}
                                </li>
                                <li className = "list-group-item">
                                    Mode of Shipment: {o.mode_shipment ? o.mode_shipment : "Not Specified"}
                                </li>
                            </ul>
                            <h3 className = "mt-4 mb-4 font-italic">
                                Total Products Ordered: {o.products.length}
                            </h3>


                            <div className = "ordersGroup">
                                {o.products.map((p, pIndex) => (
                                    <div className = "mb-4" key = {pIndex}>
                                        {showInput('Product ID', p._id)}
                                        {showInput('Name', p.name)}
                                        {showInput('Price', p.price)}         
                                        {showInput('Size', p.size)}
                                        {showInput('Qty', p.count)}
                                    </div>
                                ))}
                            </div>

                        </div>
                    );
                })}
            </div>
            <div className = "col-md-8 offset-md-2">
                <input type = "button" className = "btn btn-warning" value = "Show Delivered Orders" onClick = {() => {setshowDeliveredOrders(true)}} style = {{display: showDeliveredOrders ? 'none' : ''}}/>
            </div>
            <div className = "col-md-8 offset-md-2" style = {{display: showDeliveredOrders ? '' : 'none'}}>
            <input type = "button" className = "btn btn-warning" value = "Hide Delivered Orders" onClick = {() => {setshowDeliveredOrders(false)}}/>
            <h1 className = "text-danger2 display-2">
                DELIVERED ORDERS (TOTAL: {orders.filter(c => (c.status == "Delivered")).length})
            </h1>
                {showDeliveredCancelledOrders(orders, "Delivered")}
            </div>

            <div className = "col-md-8 offset-md-2">
                <input type = "button" className = "btn btn-warning" value = "Show Cancelled Orders" onClick = {() => {setshowCancelledOrders(true)}} style = {{display: showCancelledOrders ? 'none' : ''}}/>
            </div>
            <div className = "col-md-8 offset-md-2" style = {{display: showCancelledOrders ? '' : 'none'}}>
            <input type = "button" className = "btn btn-warning" value = "Hide Cancelled Orders" onClick = {() => {setshowCancelledOrders(false)}}/>
            <h1 className = "text-danger2 display-2">
                CANCELLED ORDERS (TOTAL: {orders.filter(c => (c.status == "Cancelled")).length})
            </h1>
                {showDeliveredCancelledOrders(orders, "Cancelled")}
            </div>
        </div>           
        </Layout>        
    );

};

export default Orders;