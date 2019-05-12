import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

import ProductList from './components/ProductList'
import Details from './components/Details'


function Redeem() {
  return (
  	<div>
	 	<ProductList/>
	 </div>
  );
}

export default Redeem;