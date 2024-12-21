import React from "react";

import "./styles/FlagsInput.css";

const FlagsInput=({children, filterName,filterValue, onToggleFilterInput, isRadio,checked})=>{
    return(
      <div className="input__container">
      <input
        onChange={() => onToggleFilterInput(filterValue)}
        type={isRadio ? "radio" : "checkbox"}
        value={filterValue}
        name={filterName}
        checked={checked}
        className={isRadio ? "radio__input" : "checkbox__input"}
        id={filterValue}
      />
      <label htmlFor={filterValue} className={isRadio ? "radio__label":"checkbox__label"}>
        {children}
      </label>
    </div>
    )
} 
 export default  React.memo(FlagsInput);

