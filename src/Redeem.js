import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import './assets/scss/redeem.scss';
import {ProductConsumer} from "./context";
import {firebase,db } from './firebase/firebase';




function Redeem() {
  return (
  	<div>           
	 	   <ProductList/>
	 </div>
  );
}

export default Redeem;

