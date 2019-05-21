import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import './assets/scss/redeem.scss';


function Redeem() {
  return (
  	<div>
	 	   <ProductList/>
	 </div>
  );
}

export default Redeem;
