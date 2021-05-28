import React from "react";

const Popup = props => {
  return (
    <div  style={{borderRadius:"0px"}} className="popup-box">
      <div className="box">
        <button className="close-icon" onClick={props.handleClose}></button>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;