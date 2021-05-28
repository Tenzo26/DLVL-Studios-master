import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {orderbyEmail} from './apiCore';
import Card_info from './Card_info';
import { Table } from 'antd';
import Navbarmenuusers from './navbarmenuusers';
import { itemTotal } from "./cartHelpers";
import search from './search.png';
import { Link } from "react-router-dom";

const Product = () => {  

    const [data, setData] = useState({
        id: '',
        email: '',
        loading: false,
        error: false,
        success: false,
        info: ''
    });

    const {
        id,
        email,
        result,
        info
    } = data;

    const handleChange = (name) => event => {
        const value = event.target.value;
        setData({...data, [name]: value});
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setData({
            loading: true
        });

        if (!(id == ""|| email == "")) {
            orderbyEmail(id, email)
            .then(data => {
                if (data.error) {
                    setData({
                        loading: false,
                        error: true,
                        success: false,
                        id,
                        email,
                    });
                }

                else {
                    setData({
                        loading: false,
                        error: false,
                        id: '',
                        email: '',
                        success: true,
                        info: data
                    });
                }
            });
        }

        else {
            setData({
                id,
                email,
                loading: false,
                error: true,
                success: false
            });
        }  


    }

    const showError = () => (
        <div>
            <form  style={{ display: data.error==true ? "" : "none", backgroundColor:"transparent", width:"100%",marginRight:"auto", marginLeft:"auto", marginTop:"-10px"}} >
            <h1 id="trackerLabel">ORDER TRACKER</h1>
                <div className = "form-group">
                        <input type = "text" onChange = {handleChange("id")}
                            className = "form-control"
                            value = {id}
                            id="orderIDError"
                            placeholder = "Order ID"
                            
                        />
                        <div id="containerOrder">
                        <span style={{color:"red", marginLeft:"-170px", fontFamily:"Times New Roman"}}>Please check your Order ID</span>

                        </div>
                </div>
                <div className = "form-group">
                        <input type = "email" onChange = {handleChange("email")}
                            className = "form-control"
                            value = {email}
                            id="emailTrackerError"
                            placeholder = "Email"
                            
                        />
                        <div id="containerOrder">
                        <span style={{color:"red", marginLeft:"-190px", fontFamily:"Times New Roman"}}>Please check your email</span>
                        </div>
                </div>
                
                <button id="trackBtn" onClick = {handleSubmit}  >TRACK ORDER</button>
                <br></br>
                <br></br>
                <br></br>
            </form>
        </div>
	
    );

    const inputTracker = () => (
        <div>
            <form  style={{ display: data.error==true ? "none" : "block" }} >
            <h1 id="trackerLabel">ORDER TRACKER</h1>
                <div className = "form-group">
                        <input type = "text" onChange = {handleChange('id')}
                            className = "form-control"
                            value = {id}
                            id="orderID"
                            placeholder = "Order ID"
                            
                        />
                        
                </div>
                <div className = "form-group">
                        <input type = "email" onChange = {handleChange('email')}
                            className = "form-control"
                            value = {email}
                            id="emailTracker"
                            placeholder = "Email"
                            
                        />
                </div>
                
                <button onClick = {handleSubmit}  id="trackBtn" >TRACK ORDER</button>
                <br></br>
                <br></br>
                <br></br>
            </form>
        </div>
    );

    const showResults = (success, info) => {
        return (
            <div style = {{display: data.success===true ? '' : 'none'}}>
                <div>
                    <table style={{width:"60%", border:"1px solid black", marginRight:"auto", marginLeft:"auto"}}className = "table">
                    <tbody  style={{ border:"1px solid black"}}>
                        <tr>
                    
                            <th style={{fontFamily:"Times New Roman", backgroundColor:"black", color:"white", textAlign:"center", fontSize:"22px"}} colSpan="3">Order ID</th>
                        </tr>

                        <tr>
                    
                            <th style={{fontFamily:"Times New Roman", fontWeight:"400", backgroundColor:"white", color:"black", textAlign:"center", fontSize:"22px"}} colSpan="3">{info ? info.order._id : ""}</th>
                        </tr>

                        
                        <tr>
                            <th style={{fontFamily:"Times New Roman", fontWeight:"400", backgroundColor:"black", color:"white", textAlign:"center", fontSize:"19px"}}>Amount</th>
                            <th style={{fontFamily:"Times New Roman", fontWeight:"400", backgroundColor:"black", color:"white", textAlign:"center", fontSize:"19px"}}>Mode of Payment</th>
                            <th style={{fontFamily:"Times New Roman", fontWeight:"400", backgroundColor:"black", color:"white", textAlign:"center", fontSize:"19px"}}>Mode of Shipment</th>
                        </tr>
                    
                        <tr>
                            <td style={{fontFamily:"Times New Roman", backgroundColor:"white", color:"black", textAlign:"center", fontSize:"19px"}}>Php {info ? info.order.amount : ""}.00</td>
                            <td style={{fontFamily:"Times New Roman", backgroundColor:"white", color:"black", textAlign:"center", fontSize:"19px"}}>{info ? info.order.mode_payment : ""}</td>
                            <td style={{fontFamily:"Times New Roman", backgroundColor:"white", color:"black", textAlign:"center", fontSize:"19px"}}>{info ? info.order.mode_shipment : ""}</td>
                        </tr>

                        <tr>
                    
                            <th style={{fontFamily:"Times New Roman", fontWeight:"400", backgroundColor:"black", color:"white", textAlign:"center", fontSize:"19px"}} colSpan="3">Status</th>
                        </tr>

                        <tr>
                            <td colSpan="3" style={{fontFamily:"Times New Roman", backgroundColor:"white", color:"black", textAlign:"center", border:"1px solid black"}}>
               
                                {info ? (info.order.status==("Delivered") 
                                ? <div id="containerOrder">

                                 <div style={{marginLeft:"-270px", marginBottom:"20px", marginTop:"-50px"}}>
                                    <div>
                                        <p style={{backgroundColor:"black"}} id="dot1"></p>
                                        <p style={{color:"black"}} id="vl1"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"black", position:"absolute", marginLeft:"100px", marginTop:"-132px"}}>Order Processed</p>
                                    </div>

                                    <div>
                                        <p style={{backgroundColor:"black"}} id="dot2"></p>
                                        <p style={{color:"black"}} id="vl2"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"black", position:"absolute", marginLeft:"100px", marginTop:"-132px"}}>Order Paid</p>
                                    </div>

                                    <div>
                                        <p style={{backgroundColor:"black"}} id="dot3"></p>
                                        <p style={{color:"black"}} id="vl3"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"black", position:"absolute", marginLeft:"100px", marginTop:"-132px"}}>Order Shipped</p>
                                    </div>

                                    <div>
                                        <p style={{backgroundColor:"black"}} id="dot4"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"black", position:"absolute", marginLeft:"100px", marginTop:"-40px"}}>Order Delivered</p>
                                    </div>

                                    </div>
                                 </div>
                
                                : info.order.status==("Processing") ?  
                                <div id="containerOrder">

                                 <div style={{marginLeft:"-270px", marginBottom:"20px", marginTop:"-50px"}}>
                                    <div>
                                        <p style={{backgroundColor:"black"}} id="dot1"></p>
                                        <p style={{color:"gray"}} id="vl1"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"black", position:"absolute", marginLeft:"100px", marginTop:"-132px"}}>Order Processed</p>
                                    </div>

                                    <div>
                                        <p style={{backgroundColor:"gray"}} id="dot2"></p>
                                        <p style={{color:"gray"}} id="vl2"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"gray", position:"absolute", marginLeft:"100px", marginTop:"-132px"}}>Order Paid</p>
                                    </div>

                                    <div>
                                        <p style={{backgroundColor:"gray"}} id="dot3"></p>
                                        <p style={{color:"gray"}} id="vl3"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"gray", position:"absolute", marginLeft:"100px", marginTop:"-132px"}}>Order Shipped</p>
                                    </div>

                                    <div>
                                        <p style={{backgroundColor:"gray"}} id="dot4"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"gray", position:"absolute", marginLeft:"100px", marginTop:"-40px"}}>Order Delivered</p>
                                    </div>

                                    </div>
                                 </div>
                                
                                : info.order.status==("Paid") ?  
                                <div id="containerOrder">

                                 <div style={{marginLeft:"-270px", marginBottom:"20px", marginTop:"-50px"}}>
                                    <div>
                                        <p style={{backgroundColor:"black"}} id="dot1"></p>
                                        <p style={{color:"black"}} id="vl1"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"black", position:"absolute", marginLeft:"100px", marginTop:"-132px"}}>Order Processed</p>
                                    </div>

                                    <div>
                                        <p style={{backgroundColor:"black"}} id="dot2"></p>
                                        <p style={{color:"gray"}} id="vl2"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"black", position:"absolute", marginLeft:"100px", marginTop:"-132px"}}>Order Paid</p>
                                    </div>

                                    <div>
                                        <p style={{backgroundColor:"gray"}} id="dot3"></p>
                                        <p style={{color:"gray"}} id="vl3"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"gray", position:"absolute", marginLeft:"100px", marginTop:"-132px"}}>Order Shipped</p>
                                    </div>

                                    <div>
                                        <p style={{backgroundColor:"gray"}} id="dot4"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"gray", position:"absolute", marginLeft:"100px", marginTop:"-40px"}}>Order Delivered</p>
                                    </div>

                                    </div>
                                 </div>

                                : info.order.status==("Shipped") ?  
                                <div id="containerOrder">

                                 <div style={{marginLeft:"-270px", marginBottom:"20px", marginTop:"-50px"}}>
                                    <div>
                                        <p style={{backgroundColor:"black"}} id="dot1"></p>
                                        <p style={{color:"black"}} id="vl1"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"black", position:"absolute", marginLeft:"100px", marginTop:"-132px"}}>Order Processed</p>
                                    </div>

                                    <div>
                                        <p style={{backgroundColor:"black"}} id="dot2"></p>
                                        <p style={{color:"black"}} id="vl2"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"black", position:"absolute", marginLeft:"100px", marginTop:"-132px"}}>Order Paid</p>
                                    </div>

                                    <div>
                                        <p style={{backgroundColor:"black"}} id="dot3"></p>
                                        <p style={{color:"gray"}} id="vl3"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"black", position:"absolute", marginLeft:"100px", marginTop:"-132px"}}>Order Shipped</p>
                                    </div>

                                    <div>
                                        <p style={{backgroundColor:"gray"}} id="dot4"></p>
                                        <p style={{fontSize:"22px", fontFamily:"Times New Roman", color:"gray", position:"absolute", marginLeft:"100px", marginTop:"-40px"}}>Order Delivered</p>
                                    </div>

                                    </div>
                                 </div>
                                : info.order.status==("Cancelled") ?  
                                <p style={{fontFamily:"Times New Roman", backgroundColor:"white", color:"black", textAlign:"center", fontSize:"19px", marginBottom:"2px"}}>We regret to inform you that your order was cancelled.</p>
                                :<span></span>
                                ):<span></span>}
                            </td>
                        </tr>
                        <tr>
                    
                            <th style={{fontFamily:"Times New Roman",fontWeight:"400", backgroundColor:"black", color:"white", textAlign:"center", fontSize:"19px"}} colSpan="3">Products</th>
                        </tr>

                        <tr>

                            <th colSpan="3" style={{fontFamily:"Times New Roman", backgroundColor:"white", color:"black", textAlign:"center", border:"1px solid black"}}>

                                <h1 style={{fontFamily:"Times New Roman"}}>{info ? info.order.products.map((product) => (
                                <div  style={{marginTop:"25px", marginBottom:"-40px"}}id="cardDiv">
                                    <Card_info product = {product}/>
                                </div>               
                                )) : ""}</h1>
                            </th>
                        </tr>

                    </tbody>
                </table>
            </div>
            <br></br>


            </div>
        );   
    };
    const showLoading = () =>
		data.loading && (
			<div style={{ border:"0",fontFamily: "Times New Roman", width:"50%", display:"block",marginRight:"auto", marginLeft:"auto" }} className="alert alert-dark w-75">
			<h4 style={{fontFamily: "Times New Roman"}}>Loading...</h4>

		
		</div>
	);

    return (
        <Layout  className = "container-fluid">
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
							 <div className="bpos">
							<small className="cart-badge">{itemTotal()}</small>
                            </div>
						</sup>)}{" "}</Link>
				</div>

				<div style={{paddingRight:"20px"}}></div>
			</div>
            {showLoading()}
            {showError()}
            {inputTracker()}
            {showResults(data.success, info)} 
          
        </Layout>
    );

};

export default Product;