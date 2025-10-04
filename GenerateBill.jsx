import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GenerateBill = () => {
    const [customerName, setCustomerName] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [paidAmount, setPaidAmount] = useState(0);
    const [bill, setBill] = useState(null);

    const products = [
        { product_id: 1, product_name: 'Milk', product_price: 60 },       // 1 litre
        { product_id: 2, product_name: 'Bread', product_price: 40 },     // 1 loaf
        { product_id: 3, product_name: 'Eggs', product_price: 6 },       // 1 egg
        { product_id: 4, product_name: 'Apples', product_price: 180 },   // 1 kg
        { product_id: 5, product_name: 'Rice', product_price: 50 },      // 1 kg
        { product_id: 6, product_name: 'Potatoes', product_price: 25 },  // 1 kg
        { product_id: 7, product_name: 'Tomatoes', product_price: 40 },  // 1 kg
        { product_id: 8, product_name: 'Onions', product_price: 35 },    // 1 kg
        { product_id: 9, product_name: 'Sugar', product_price: 45 },     // 1 kg
        { product_id: 10, product_name: 'Salt', product_price: 20 }      // 1 kg
    ];

    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleProductSelection = (product) => {
        const existingProduct = selectedProducts.find(p => p.product_id === product.product_id);

        if (existingProduct) {
            // Increment quantity if product already exists
            const updatedProducts = selectedProducts.map(p =>
                p.product_id === product.product_id
                    ? { ...p, quantity: p.quantity + 1 }
                    : p
            );
            setSelectedProducts(updatedProducts);
        } else {
            // Add new product with quantity 1
            setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
        }

        alert(`${product.product_name} added!`);
    };

    const calculateTotalAmount = () => {
        return selectedProducts.reduce(
            (total, product) => total + product.product_price * product.quantity,
            0
        );
    };

    const handleGenerateBill = () => {
        const totalAmount = calculateTotalAmount();
        const balance = totalAmount - paidAmount;
        setBill({
            customerName,
            customerId,
            products: selectedProducts,
            totalAmount,
            paidAmount,
            balance,
            date: new Date().toLocaleDateString()
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Generate Bill</h2>
            <div className="mb-4">
                <label>Customer Name:</label>
                <input type="text" className="form-control" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                <label>Customer ID:</label>
                <input type="text" className="form-control" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
                <label>Paid Amount ():</label>
                <input type="number" className="form-control" value={paidAmount} onChange={(e) => setPaidAmount(Number(e.target.value))} />
            </div>
            <h5>Select Products:</h5>
            <ul className="list-group mb-4">
                {products.map((product) => (
                    <li key={product.product_id} className="list-group-item d-flex justify-content-between align-items-center">
                        {product.product_name} - {product.product_price}
                        <button className="btn btn-primary" onClick={() => handleProductSelection(product)}>Add</button>
                    </li>
                ))}
            </ul>
            <button className="btn btn-success mb-4" onClick={handleGenerateBill}>Generate Bill</button>
            {bill && (
                <div className="bill-details mt-5">
                    <h3 className="text-center">Bill Summary</h3>
                    <table className="table table-bordered mt-3">
                        <tbody>
                            <tr><th>Customer Name</th><td>{bill.customerName}</td></tr>
                            <tr><th>Customer ID</th><td>{bill.customerId}</td></tr>
                            <tr><th>Date</th><td>{bill.date}</td></tr>
                            <tr>
                                <th>Products</th>
                                <td>
                                    <ul>
                                        {bill.products.map((product, index) => (
                                            <li key={index}>
                                                {product.product_name} - {product.product_price} x {product.quantity} = {product.product_price * product.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                            <tr><th>Total Amount</th><td>{bill.totalAmount}</td></tr>
                            <tr><th>Paid Amount</th><td>{bill.paidAmount}</td></tr>
                            <tr><th>Balance</th><td>{bill.balance}</td></tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default GenerateBill;
