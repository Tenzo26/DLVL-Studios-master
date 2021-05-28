import React from "react";

const PasswordStrengthIndicator = ({ 
    validity: {minChar, number, specialChar } 
}) => {
    return(
      <div className = "password-meter text-left mb-4">
          <p  id="passwordMeter" style={{fontFamily:"Times New Roman"}} className= "text-dark"> Password must contain :</p>
          <ul id="passwordMeter" style={{fontFamily:"Times New Roman"}} className = "text-muted">
               <PasswordStrengthIndicatorItem
                isValid= {minChar} 
                text ="Have at least 8 Characters"
                />
                <PasswordStrengthIndicatorItem 
                 isValid= {number} 
                 text ="Have at least 1 number"
                 />
                <PasswordStrengthIndicatorItem 
                 isValid= {specialChar} 
                text ="Have at least 1 Special Character"
               />
            </ul>
        </div>
    );
};

const PasswordStrengthIndicatorItem = ({ isValid, text}) => {
   const highlightClass = isValid ? "text-success" : isValid !== null ? "text-danger" : ""
    return (
    <li className= {highlightClass} >{text}</li>
    )
}
export default PasswordStrengthIndicator;

