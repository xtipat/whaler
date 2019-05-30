import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';

export class Product extends Component {
	render() {
		const {id, title, img, price, inCart} = this.props.product;
		return (

			<ProductWrapper className="col-6 ">
				<ProductConsumer>
					{(value)=>(
						<div className="card mb-2"  
							onClick={() =>
							value.handleDetail(id)
							}
						>
							<Link className="product_link"  to="/details" >

								<div className='reward-wrap'>
									<div
										//this is for making the image bigger
										className="img-container p-6"
									>	
										<img src={img} alt="product" className="card-img-top img-thumbnail img-responsive " />
									</div>
									{/*card footer */}
									{/*card-footer from boostrap card*/}
									<div className="card-footer d-flex justify-content-between ">
										<p className="align-self-center mb-0 text-capitalize">
											{title}
										</p>
										<h5 className="text-gold mb-0">
											{price} points
										</h5>
									</div>
								</div>
							</Link>
							
						</div>
					)}
				</ProductConsumer>
			</ProductWrapper>
		);
	}
}
/*This is the css for above classes*/
const ProductWrapper = styled.div`
.card{
	border-color:transparent;

}
.card-footer{
	background: transparent;
	border-top: transparent;
}
&:hover{
	.card{
		border: 0.04rem solid rgba(0,0,0,0.2);
		box-shadow:2px 2px 5px 0px rgba(0,0,0, 0.2);
	}
	.card-footer {
		background: rgba(247, 247, 247);
	}
}
.img-container{
	overflow: hidden;
}
.card-img-top{
	transition: all 0.5s linear;
}


.img-container:hover .cart-btn{
	transform: translate(0,0);
}
.product_link, .product_link:hover {
   text-decoration: none; 
   background: rgba(247, 247, 247);
   color: black;


}


`

export default Product;
