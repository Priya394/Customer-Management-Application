import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
    const { id } = useParams(); // Get the customer ID from the URL
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [gst, setGst] = useState('');

    // Fetch customer details by ID
    useEffect(() => {
        axios.get(`http://localhost:3001/api/customers/${id}`)
            .then((response) => {
                const customer = response.data;
                setName(customer.customer_name);
                setEmail(customer.customer_email);
                setMobile(customer.customer_mobile);
                setAddress(customer.customer_address);
                setGst(customer.customer_gst);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    // Update customer
    const handleUpdate = () => {
        const payload = {
            customer_id: id,
            customer_name: name,
            customer_email: email,
            customer_mobile: mobile,
            customer_address: address,
            customer_gst: gst,
        };

        axios.patch('http://localhost:3001/api/customers', payload)
            .then((response) => {
                alert('Updated successfully');
                navigate('/'); // Navigate back to the customer list
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="container mt-4">
            <h3>Update Customer</h3>
            <form>
                <div className="form-group">
                    <label>Customer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div className="form-group">
                    <label>Customer Email</label>
                    <input
                        type="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="form-group">
                    <label>Customer Mobile</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setMobile(e.target.value)}
                        value={mobile}
                    />
                </div>
                <div className="form-group">
                    <label>Customer Address</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                    />
                </div>
                <div className="form-group">
                    <label>Customer GST</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setGst(e.target.value)}
                        value={gst}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-outline-success mr-2"
                    onClick={handleUpdate}
                >
                    Update
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/')}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default Update;
