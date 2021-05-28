import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import Card from './Card';
import {getCart, removeItem, emptyCart, saveCart, syncCarttoCatalog, itemTotal} from './cartHelpers';
import Checkout2 from './Checkout2';
import {isAuthenticated} from '../auth';
import Navbarmenu from './navbarmenu';
import search from './search.png';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);


    useEffect(() => {
        syncCarttoCatalog()
        saveCart(isAuthenticated() && isAuthenticated().user._id, isAuthenticated() && isAuthenticated().token)
        setItems(getCart());
      }, [run]);


    const showCheckoutColumn = () => {
        return (
            <span>
            <Checkout2 products = {items} setRun={setRun} run={run}/>
            </span>
        )
    };

    return (
        <Layout title = "Shopping Cart" 
        description = "Manage your Cart here"
        className = "container-fluid"
        >   <div class="pl-4">
        <Navbarmenu  />
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
                
                <div className="container">
          <div className="bottoMar"></div>
          <h2 style={{marginTop:"-60px"}} id = "shoppingname1">DELIVERY DETAILS {items.length > 0 ? showCheckoutColumn() : (
                        <h2></h2>
                    )}</h2>
          <div class="justify-content-center">
              <div class="col-4"></div>
                </div>
                </div>
                <br></br>
                <br></br>
        </Layout>
    );
    
};



export default Cart;