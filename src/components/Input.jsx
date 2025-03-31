import React from "react";

const Input = ({type,placeholder }) =>{
    return(
        <div>
            <input 
            type={type} placeholder={placeholder} className="input-field" required/>
        </div>
    )
}
export default Input