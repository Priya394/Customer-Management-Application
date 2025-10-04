import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

function Homepage() {
    return (
        <div className='homepage'>
            <h1>Welcome to the Customer Management App</h1>
            <p className="intro">Easily manage your customers' details and transactions digitally.</p>

            <div className="button-group">
                <Link to="/AddCustomer">
                    <button className="homepage-button">Add New Customer</button>
                </Link>
                <Link to="/Customer">
                    <button className="homepage-button">View Customers</button>
                </Link>
                <Link to="/Transaction">
                <button className="homepage-button">Manage Transactions</button>
                </Link>
                <Link to="/GenerateBill"><button className="homepage-button">Generate Bill</button></Link>

            </div>

           
        </div>
    );
}

export default Homepage;

