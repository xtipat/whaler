import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from "./Product";
import Product_pop from "./Product_pop";
import Title from "./Title";
//load the data from file
import {ProductConsumer} from "../context";
//import '../assets/scss/redeem.scss';
import AuthUserContext from '../session/authUserContext';
import {firebase,db } from '../firebase/firebase';




export class ProductList extends Component {

	render() {
		return (
			<div className='redeem-outer-wrap'>
				  	<ProductConsumer>

							{(value)=>{
						
								//value.getUserPoint_once(firebase.auth().currentUser.uid)
								return (<Title name="Redeem" title={value.user_point}/>)

							}}
					</ProductConsumer>
				
				<div className='redeem-wrap'>
					<div className='popular-wrap'>
						<div className='redeem-content-title'>Popular</div>
							<ProductConsumer>
								{(value)=>{
									return value.products.map( product => {
										if(product.popular === true)
											return <Product_pop key={product.id} product={product} />
									})
								}}
							</ProductConsumer>
					</div>
					<div className='more-wrap'>
						<div className='redeem-content-title'>More</div>
						<Row>
							<ProductConsumer>
								{(value)=>{
									return value.products.map( product => {
										return <Product key={product.id} product={product} />
									})
								}}
							</ProductConsumer>
						</Row>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductList;


