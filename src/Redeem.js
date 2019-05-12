import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

import ProductList from './components/ProductList'
import Details from './components/Details'
//import ModalRedeem from './components/ModalRedeem'


function Redeem() {
  return (
     <React.Fragment>
     	<ProductList/>
     </React.Fragment>
  );
}

export default Redeem;