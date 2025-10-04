import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Homepage from './homepage';
import Menubar from './menubar';
import About from './about';
import Transaction from './Transaction';
import AddCustomer from './AddCustomer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from './Customer';
import Product from './product';
import GenerateBill from './GenerateBill';



import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Menubar />

        <Routes>
        <Route path="/Transaction" element={<Transaction />} />  
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/About" element={<About />} /> 
          <Route path="/AddCustomer" element={<AddCustomer />} /> 
          <Route path="/Transaction" element={<Transaction />} /> 
          <Route path="/product" element={<Product />} /> 
          <Route path="/" element={<Transaction />} />
          <Route path="/GenerateBill" element={<GenerateBill />} />




        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;  