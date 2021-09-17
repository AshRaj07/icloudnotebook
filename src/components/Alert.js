import React from "react";

function Alert(props) {
    const captalize = (word) => {
        let alertWord = word ;
        if(alertWord ==="danger"){
            alertWord = "error"
        }
        return (alertWord.charAt(0).toUpperCase() + alertWord.slice(1))
    }
  return (
    <div style={{height:"50px"}}>
    {props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{"✔ "+captalize(props.alert.type)+" "}</strong> 
        {props.alert.message}
      </div>
    )}
    </div>
  );
}

export default Alert;
