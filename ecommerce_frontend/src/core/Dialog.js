import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Dialog extends Component {
    render() {
        let dialog = (
            <div style={{borderRadius:"0px"}}className="popup-box">
            <div className="dialogStyles">
                <div>{this.props.children}</div>
                <Link to="/cart">
                <button className="dialogCloseButtonStyles" onClick={this.props.onClose}>GOT IT!</button>
                </Link>
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

export default Dialog;