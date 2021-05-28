import React, { Component } from "react";
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";
import Menu from "./Menu"
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";
import Collapse from './collapse';



export default class navbarmenu extends Component {
    componentWillMount() {
      // sets the initial state
      this.setState({
        isMenuOpened: false
      });
  }
  
    render() {
      return (
        <OffCanvas
          width={250}
          transitionDuration={250}
          isMenuOpened={this.state.isMenuOpened}
          position={"left"}
          effect={"overlay"}

        >
          <OffCanvasBody
             className="menutext"
          >
              
            <p>
            
            <div style={{marginLeft:"auto",marginRight:"auto"}}></div>
            <div className="p-2 ml-auto">
              <a href="#" id="sidelines" onClick={this.handleClick.bind(this)}>
              </a>
              </div>
              
            </p>
           
          </OffCanvasBody>
          <OffCanvasMenu className="menubody">
          <div className="d-flex justify-content-start">
          <a href="#" id="sidelinescloseadmin" onClick={this.handleClick.bind(this)}>
            
                </a>
                </div>
          <div className="d-flex justify-content-around">
            <Link to="/admin/dashboard">
              <label className="accountmenuadmin">Account</label>
            </Link>
            </div>
            <Link to="/admin/landingpageadmin">
            <div className="d-flex justify-content-around">
              <label className="homemenu">HOME</label>
              </div>
              </Link>  
              <div className="d-flex justify-content-around">
              <Link to="/admin/products">
              <label className="items">INVENTORY</label>
              </Link>
              </div>
              <div className="d-flex justify-content-around">
              <Link to="/admin/admincollections">
              <label className="colladmin">COLLECTIONS</label>
              </Link>
              </div>
              <div className="d-flex justify-content-around">
              <Link to="/admin/FAQbuttonAdmin">
              <label className="faqsmenu">FAQs</label>
              </Link>
              </div>
              <div className="d-flex justify-content-around">
              <Link to="/admin/adminFeedback">
              <label className="feedbackmenu">FEEDBACKS</label>
              </Link>
              </div>
              <div className="d-flex justify-content-around">
              <Link to="/admin/orders">
              <label className="vieworders">VIEW ORDERS</label>
              </Link>
            </div>
            <div className="d-flex justify-content-around">
            <label className="positionsignout"><Menu/></label>
            </div>
          </OffCanvasMenu>
        </OffCanvas>
      );
    }
  
    handleClick() {
      this.setState({ isMenuOpened: !this.state.isMenuOpened });
    }
  }