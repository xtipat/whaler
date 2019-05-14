import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Product from "./Product";
import Product_pop from "./Product_pop";
import Title from "./Title";
//load the data from file
import {ProductConsumer} from "../context";



export class ProductList extends Component {

	render() {
		return (
				<div className='wrap '>
					<div style={{ overflowY: 'scroll', height: '90vh'}}>
						<ProductConsumer>
							{(value)=>{
								return (<Title name="Redeem" title={value.user_point}/>)
								
							}}
						</ProductConsumer>
						<div className="row my-2">
							<h4 className="col-11 mx-auto my-3 text-left font-weight-bold">Popular</h4>
							<ProductConsumer>
								{(value)=>{
									return value.products.map( product => {
										if(product.popular === true)
											return <Product_pop key={product.id} product={product} />
									})
								}}
							</ProductConsumer>
							<h4 className="col-11 mx-auto my-2 text-left font-weight-bold">more</h4>
							<ProductConsumer>
								{(value)=>{
									return value.products.map( product => {
										return <Product key={product.id} product={product} />
									})
								}}
							</ProductConsumer>
						</div>
					</div>

				</div>
		);
	}
}

export default ProductList;

