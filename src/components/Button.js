import React from 'react'

const Button = (props) => {
    return (
        <button type="button" className={props.btnType} style={{marginRight: "15px"}} onClick={props.btnClickHandler}>
        {props.name}
    <span className="badge badge-light" style={{ marginLeft: "10px" }} >{props.count}</span>
        </button>
    )
}

export default Button
