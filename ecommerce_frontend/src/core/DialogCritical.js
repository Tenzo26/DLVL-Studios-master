import React, { Component } from 'react';
import { Link } from "react-router-dom";



class DialogCritical extends Component {
    render() {
        let dialog = (
            <div style={{borderRadius:"0px"}}className="popup-box">
            <div className="dialogcritical">
                <div>{this.props.children}</div>
                <div>
                <Link to={this.props.redirect}>
                    <button className="dialogcriticalclose" style={{marginRight:"0.3in"}} onClick={this.props.onClose}>{this.props.redirectButton}</button>
                </Link>
                <Link to={this.props.cancel} style = {{display: this.props.showCancelButton == "no" ? "none" : ''}}>
                    <button className="dialogcriticalclose" onClick={this.props.onClose}>{this.props.cancelButton}</button>
                </Link> 
                </div>
            </div>
            </div>
        );

        if (! this.props.isOpen) {
            dialog = null;
        }
        return (
            <div>
            {dialog}
            </div>
              
        );
    }
}

export default DialogCritical;