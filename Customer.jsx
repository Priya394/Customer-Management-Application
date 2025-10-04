import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './customer.css';
const Customer = () => {
    const [Customer, setCustomer] = useState([]);

    // State variables
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [gst, setGst] = useState('');
    const [idToUpdate, setidToUpdate] = useState();
    const [refresh, setRefresh] = useState(0);

    // Load customer details into the form
    const loadCustomerInForm = (id) => {
        const customerToEdit = Customer.find(x => x.customer_id === id);
        setidToUpdate(customerToEdit.customer_id);
        setName(customerToEdit.customer_name);
        setEmail(customerToEdit.customer_email);
        setMobile(customerToEdit.customer_mobile);
        setAddress(customerToEdit.customer_address);
        setGst(customerToEdit.customer_gst);
    };

    // Fetch customers
    const getCustomer = () => {
        axios.get('http://localhost:3001/api/customers')
            .then(response => {
                setCustomer(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(getCustomer, [refresh]);

    // Delete customer
    const deleteCustomer = (id) => {
        const payload = { "customer_id": id };
        axios.delete('http://localhost:3001/api/customers', { data: payload })
            .then(response => {
                alert("Deleted successfully");
                setRefresh(refresh + 1);
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Add or update customer
    const handleSubmit = () => {
        const payload = {
            customer_name: name,
            customer_email: email,
            customer_address: address,
            customer_gst: gst,
            customer_mobile: mobile
        };

        if (idToUpdate) {
            payload.customer_id = idToUpdate;
            axios.patch('http://localhost:3001/api/customers', payload)
                .then(response => {
                    alert("Updated successfully");
                    setRefresh(refresh + 1);
                    clearForm();
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            axios.post('http://localhost:3001/api/customers', payload)
                .then(response => {
                    alert("Added successfully");
                    setRefresh(refresh + 1);
                    clearForm();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    // Clear form fields
    const clearForm = () => {
        setidToUpdate('');
        setName('');
        setEmail('');
        setMobile('');
        setAddress('');
        setGst('');
    };

    return (
        <div className="container mt-4">
            <h2>Customer Management</h2>
            <table className="table table-hover">
                <thead className="thead-light">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>GST</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Customer.map((item, index) => (
                        <tr key={index}>
                            <td>{item.customer_id}</td>
                            <td>{item.customer_name}</td>
                            <td>{item.customer_mobile}</td>
                            <td>{item.customer_email}</td>
                            <td>{item.customer_gst}</td>
                            <td>{item.customer_address}</td>
                            <td>
                                <button className="btn btn-outline-danger btn-sm mr-2" onClick={() => deleteCustomer(item.customer_id)}>Delete</button>
                                <button className="btn btn-outline-secondary btn-sm" onClick={() => loadCustomerInForm(item.customer_id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="card mt-4">
                <div className="card-body">
                    /* <h3>{idToUpdate ? "Update Customer" : "Add New Customer"}</h3>
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
                        <button type="button" className="btn btn-outline-success mr-2" onClick={handleSubmit}>
                            {idToUpdate ? "Update" : "Submit"}
                        </button>
                        <button type="button" className="btn btn-outline-secondary" onClick={clearForm}>Clear</button>
                    </form> 
                </div>
            </div>
        </div>
    );
};

export default Customer;