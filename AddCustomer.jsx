import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddCustomer.css';
import { Link } from 'react-router-dom';

const AddCustomer = ({ onBack }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [gst, setGst] = useState('');

    const handleSubmit = () => {
        const payload = {
            customer_name: name,
            customer_email: email,
            customer_mobile: mobile,
            customer_address: address,
            customer_gst: gst
        };

        axios.post('http://localhost:3001/api/customers', payload)
            .then(response => {
                alert("Customer added successfully");
                clearForm();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const clearForm = () => {
        setName('');
        setEmail('');
        setMobile('');
        setAddress('');
        setGst('');
    };

    return (
        <div className="container mt-4">
            <h2>Add New Customer</h2>
            <Link to="/homepage">
            <button className="btn btn-outline-primary mb-3" onClick={onBack}>Back to Homepage</button>
            </Link>
            <form>
                <div className="form-group">
                    <label>Customer Name</label>
                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div className="form-group">
                    <label>Customer Email</label>
                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="form-group">
                    <label>Customer Mobile</label>
                    <input type="text" className="form-control" onChange={(e) => setMobile(e.target.value)} value={mobile} />
                </div>
                <div className="form-group">
                    <label>Customer Address</label>
                    <input type="text" className="form-control" onChange={(e) => setAddress(e.target.value)} value={address} />
                </div>
                <div className="form-group">
                    <label>Customer GST</label>
                    <input type="text" className="form-control" onChange={(e) => setGst(e.target.value)} value={gst} />
                </div>
                <button type="button" className="btn btn-outline-success" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddCustomer;
