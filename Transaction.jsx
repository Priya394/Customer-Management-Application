import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();

    const getTransactions = () => {
        axios.get('http://localhost:3001/api/shopkeeper')
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    };

    useEffect(() => {
        getTransactions();
    }, [refresh]);

    const deleteTransaction = (id) => {
        const payload = { "customer_id": id };
        axios.delete('http://localhost:3001/api/shopkeeper', { data: payload })
            .then(response => {
                alert("Transaction deleted successfully");
                setRefresh(refresh + 1);
            })
            .catch(error => {
                console.error('Error deleting transaction:', error);
            });
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Transaction Management</h2>
            </div>
            <table className="table table-hover">
                <thead className="thead-light">
                    <tr>
                        <th>Date</th>
                        <th>Customer id</th>
                        <th>Payment id</th>
                        <th>Customer Name</th>
                        <th>Customer Mobile</th>
                        <th>Total Amount</th>
                        <th>Paid Amount</th>
                        <th>Balance Amount</th>    
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((item, index) => (
                        <tr key={index}>
                            <td>{item.Date}</td>
                            <td>{item.customer_id}</td>
                            <td>{item.Payment_id}</td>
                            <td>{item.customer_name}</td>
                            <td>{item.customer_mobile}</td>
                            <td>{item.Total_amt}</td> {/* Total Amount with Rupee symbol */}
                            <td>{item.Paid_amt}</td>   {/* Paid Amount with Rupee symbol */}
                            <td>{item.Balance_amt}</td> {/* Balance Amount with Rupee symbol */}
                            <td>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transaction;
