import React, {useState} from 'react';

const Checkbox = ({categories, handleFilters, type}) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked]
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        }
        else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };

    const listCheckbox = () => {
        if (type == "category" || type == "collection") {
            return (
                categories.map((c,i) => (
                    <li key = {i} className = "list-unstyled">
                        <label className="newCheckbox">
                            <input onChange = {handleToggle(c)} value = {checked.indexOf(c === -1)} type = "checkbox" className = "form-check-input"/>
                            <span className="checkmark"></span>
                        </label>
                        <label className = "form-check-label filLabel">{c.name}</label>
                    </li>
                ))
            )
        }

        else if (type == "gender") {
            return (
                categories.map((c,i) => (
                    <li key = {i} className = "list-unstyled">
                        <label className="newCheckbox">
                            <input onChange = {handleToggle(c)} value = {checked.indexOf(c === -1)} type = "checkbox" className = "form-check-input"/>
                            <span className="checkmark"></span>
                        </label>
                         <label className = "form-check-label filLabel">{c}</label> 
                    </li>
                ))
            )
        }
    }

    return (
        <span>{listCheckbox()}</span>
    )
};

export default Checkbox;

