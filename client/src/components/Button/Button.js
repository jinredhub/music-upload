import React from 'react';
import './Button.css';

const button = (props) =>{
    let btnClass = '';

    if(props.color === 'primary'){
        btnClass = 'btn btn-primary';
    }
    else if(props.color === 'danger'){
        btnClass = 'btn danger';
    }
    else{
        btnClass = 'btn';
    }

    return (
        <div className = 'Button'>
            <button disabled={props.disabled} className={btnClass} {...props}>{props.children}</button>
        </div>
    )
}

export default button;