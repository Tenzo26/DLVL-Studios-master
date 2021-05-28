import React, {useState, useEffect, Fragment} from 'react';

const RadioBox = ({prices, handleFilters}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return prices.map((p,i) => (
        <div key = {i}>
            <label className="newRadio"> 
                <input name = {p} onChange = {handleChange} value = {`${p._id}`} type = "radio" className = "mr-2 ml-4"/>
                <span className="rCheckmark"></span>
            </label>
            <label className = "form-check-label filRadioLabel">{p.name}</label>
        </div>
    ));
};

export default RadioBox;