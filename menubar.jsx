import React from 'react';
import './menubar.css';
import { Link } from "react-router-dom";

function Menubar() {
    return (
        <>
            <ul className='menubar'>
                <li><Link to="/homepage">Homepage</Link></li>
                <li><Link to="/Customer">Customers</Link></li>
                <li><Link to="/Transaction">Trasaction</Link></li>
                <li><Link to="/product">Product</Link></li>
                <li><Link to="/About">About</Link></li>
            </ul>
        </>
    );
}

export default Menubar;

