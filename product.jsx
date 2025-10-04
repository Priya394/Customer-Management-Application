import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './product.css';

const Product = () => {
    const [products, setProducts] = useState([
        { product_id: 1, product_name: 'Rice (1 kg)', product_category: 'Grains', product_price: 50, product_quantity: 100 },
        { product_id: 2, product_name: 'Wheat Flour (1 kg)', product_category: 'Grains', product_price: 40, product_quantity: 150 },
        { product_id: 3, product_name: 'Milk (1 liter)', product_category: 'Dairy', product_price: 25, product_quantity: 200 },
        { product_id: 4, product_name: 'Eggs (12 pack)', product_category: 'Dairy', product_price: 60, product_quantity: 50 },
        { product_id: 5, product_name: 'Apple (1 kg)', product_category: 'Fruits', product_price: 120, product_quantity: 70 },
    ]);

    const [editingProduct, setEditingProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Remove product
    const handleRemove = (id) => {
        const productToRemove = products.find((product) => product.product_id === id);
        setProducts(products.filter((product) => product.product_id !== id));
        alert(`Removed: ${productToRemove.product_name}`);
    };

    // Open update modal
    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowModal(true);
    };

    // Update product details
    const handleUpdate = () => {
        setProducts(products.map((product) =>
            product.product_id === editingProduct.product_id ? editingProduct : product
        ));
        setShowModal(false);
        alert(`Updated: ${editingProduct.product_name}`);
    };

    // Handle change in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct({ ...editingProduct, [name]: value });
    };

    // Add new product
    const handleAddNewProduct = () => {
        const newProductName = prompt('Enter Product Name:');
        const newProductCategory = prompt('Enter Product Category:');
        const newProductPrice = prompt('Enter Product Price (INR):');
        const newProductQuantity = prompt('Enter Product Quantity:');

        if (newProductName && newProductCategory && newProductPrice && newProductQuantity) {
            const newProduct = {
                product_id: products.length + 1, // Incrementing the ID
                product_name: newProductName,
                product_category: newProductCategory,
                product_price: Number(newProductPrice),
                product_quantity: Number(newProductQuantity),
            };

            setProducts([...products, newProduct]);
            alert(`Added: ${newProductName}`);
        } else {
            alert('All fields are required to add a new product.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Product Inventory</h2>
            <button className="btn btn-success mb-3" onClick={handleAddNewProduct}>
                Add New Product
            </button>
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price (INR)</th>
                        <th>Quantity Available</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.product_id}>
                            <td>{product.product_id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.product_category}</td>
                            <td>{product.product_price}</td>
                            <td>{product.product_quantity}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm mr-2"
                                    onClick={() => handleRemove(product.product_id)}
                                >
                                    Remove
                                </button>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleEdit(product)}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Update Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Product</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="product_name" className="form-label">Product Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="product_name"
                                            name="product_name"
                                            value={editingProduct.product_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="product_category" className="form-label">Category</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="product_category"
                                            name="product_category"
                                            value={editingProduct.product_category}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="product_price" className="form-label">Price (INR)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="product_price"
                                            name="product_price"
                                            value={editingProduct.product_price}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="product_quantity" className="form-label">Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="product_quantity"
                                            name="product_quantity"
                                            value={editingProduct.product_quantity}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleUpdate}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
