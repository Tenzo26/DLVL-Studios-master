import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import Card2 from './Card2';
import {getCart, removeItem, emptyCart, saveCart, syncCarttoCatalog, itemTotal} from './cartHelpers';
import Checkout from './Checkout';
import {isAuthenticated} from '../auth';
import search from './search.png';
import Navbarmenu from './navbarmenu';
import Emptybag from './emptycart.png';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);


    useEffect(() => {
        syncCarttoCatalog()
        saveCart(isAuthenticated() && isAuthenticated().user._id, isAuthenticated() && isAuthenticated().token)
        setItems(getCart());
      }, [run]);

    const showItems = items => {
        
        return (
            <div>
                <h2 id="shoppingname">SHOPPING BAG</h2>
                    <div className="trylang">
                    <div className = "row">
                    {items.map((product, i) => (
                        <div key={i} className="col-xl-4 mb-3">
                            <Card2  
                            product={product} 
                            showAddToCartButton = {false} 
                            cartUpdate = {true}
                            showRemoveProductButton = {true}
                            setRun={setRun}
                            run={run}
                            />
                        </div>
                         
                    ))}
                    </div>
                    </div>
                    <hr style={{border:"3px solid black"}}/>
            </div>
            
        );
    }

    const noItemsMessage = () => (
        <h2>
            <div  className = "d-flex justify-content-center">
            <img id="empbag" src={Emptybag}/>
           </div>
           <div  className = "d-flex justify-content-center">
           <label id="emplabel">YOUR CART IS EMPTY.</label>
           </div>
           <div  className = "d-flex justify-content-center">
           <Link to="/shop" id="backtoshop" >Back to shop</Link>
           </div>

        
        </h2>
    );

    const showCheckoutColumn = () => {
        return (
            <span>
            <Checkout products = {items} setRun={setRun} run={run}/>
            </span>
        )
    };

    return (
        <Layout title = "Shopping Cart" 
        description = "Manage your Cart here"
        className = "container-fluid">
              <div class="pl-4">
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

            <div className = "d-flex justify-content-around row">
                <div className = "col-10 mb-3">
                    {items.length > 0 ? 
                        showItems(items) :
                        noItemsMessage()}
                </div>

                <div style={{marginRight:"auto", marginLeft:"auto", width:"80%" , flexFlow:"wrap"}} className = "col-md-10 mb-3">
                    {items.length > 0 ? showCheckoutColumn() : (
                        <h2></h2>
                    )}
                </div>
            </div>
            </div>
            <br></br>
            
        </Layout>
    );
    
};



export default Cart;