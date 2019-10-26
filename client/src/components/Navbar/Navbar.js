import React from 'react';
import './Navbar.css';

const navbar = (props) =>{
    return (
        <div className = 'Navbar'>
            {props.children}
        </div>
    )
}

export default navbar;