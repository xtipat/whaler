import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from "./Product";
import Product_pop from "./Product_pop";
import Title from "./Title";
//load the data from file
import {ProductConsumer} from "../context";
import '../assets/scss/redeem.scss';
import AuthUserContext from '../session/authUserContext';
import {firebase,usersRef } from '../firebase/firebase';







export class ProductList extends Component {

	render() {
		return (
			<div className='redeem-outer-wrap'>
					<AuthUserContext.Consumer>
						
						{(authUser)=>{
							console.log(usersRef)
							console.log(authUser.uid)
							var myCurValue = ""
							const temp = usersRef.on('value', function(snapshot) {
								const myValue = snapshot.val();
								const keyList = Object.keys(myValue);
								var myCurValue = ""
								console.log(keyList)

								//find the key
								for(var i=0;i<keyList.length;i++) {
      								const myKey = keyList[i];
      								//console.log(myKey)
      								//console.log(myValue[myKey])
      								if(myKey === authUser.uid){
      									myCurValue = myValue[myKey]
      								}
      								
   	 							}
   	 							return myCurValue
   	 							
							});
							console.log(temp)
							console.log(myCurValue)
							return (<Title name="Redeem" title="100"/>)

						}}
					</AuthUserContext.Consumer>
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

