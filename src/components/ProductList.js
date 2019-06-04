import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import Product from "./Product";
import Product_slide from "./Product_slide";
import Title from "./Title";
import {ProductConsumer} from "../context";
import styled from 'styled-components';


export class ProductList extends Component {

	render() {
		return (
			<ProductWrapper>
			<div className='redeem-outer-wrap mb-5'>
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
									return  <Product_slide products={value.products} />
									}
								}
							</ProductConsumer>
					</div>
					<div className='more-wrap'>
						<div className='redeem-content-title'>More</div>
						<Row >
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
			</ProductWrapper>
		);
	}
}

const ProductWrapper = styled.div`
.redeem-outer-wrap{
  height: 100 px;
  max-width: 100%;
  padding: 0 0 60px 0;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color:'white';
}
.redeem-wrap{
   background-color:'white';
}
.more-wrap{
	background-color:'white';
}
.redeem-content-title{
  padding: 10px 0px 0px 0px;
}

`

export default ProductList;
