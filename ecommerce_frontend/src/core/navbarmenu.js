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
          <a href="#" id="sidelinesclose" onClick={this.handleClick.bind(this)}>
            
                </a>
                </div>
          <div className="d-flex justify-content-around">
            <Link to="/user/dashboard">
              <label className="accountmenu">Account</label>
            </Link>
            </div>
            <Link to="/">
            <div className="d-flex justify-content-around">
              <label className="homemenu">HOME</label>
              </div>
              </Link>   
              
              <Collapse/>

              <div className="d-flex justify-content-around">
              <Link to="/lookbook">
              <label className="lookbookmenu">LOOKBOOK</label>
              </Link>
              </div>
              <div className="d-flex justify-content-around">
              <Link to="/user/userFAQ">
              <label className="faqsmenu">FAQS</label>
              </Link>
              </div>
              <div className="d-flex justify-content-around">
              <Link to="/feedback">
              <label className="feedbackmenu">FEEDBACKS</label>
              </Link>
              </div>
              <div className="d-flex justify-content-around">
              <Link to="/ordertracker">
              <label className="ordertrackermenu">ORDER TRACKER</label>
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