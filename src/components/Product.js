import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';

export class Product extends Component {
	render() {
		const {id, title, img, price, inCart} = this.props.product;
		return (

			<ProductWrapper className="col-6">
			<ProductConsumer>
				{(value)=>(
					<div className="card" 
						onClick={() =>
						value.handleDetail(id)
						}
					>
						<Link to="/details">
						<div className='reward-wrap'>
							
								
									<div
										//this is for making the image bigger
										className="img-container p-6"
										//onClick={() =>
										//	value.handleDetail(id)
										//}
									>
										
											<img src={img} alt="product" className="card-img-top img-thumbnail img-responsive" />
										

									</div>
								

							
							{/*card footer */}
							<div className="card-footer d-flex justify-content-between ">
								<p className="align-self-left mb-2 text-capitalize">
									{title}
								</p>
								<h5 className="text-gold font-italic mb-0">
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
	transition:all 1s linear;

}
.card-footer{
	background: transparent;
	border-top: transparent;
	transition: all 1s linear;
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
	position: relative;
	overflow: hidden;
}
.card-img-top{
	transition: all 1s linear;
}
.img-container:hover .card-img-top{
	transform: scale(1.2)
}
.cart-btn{
	position: absolute;
	bottom:0;
	right:0;
	padding:0.2rem 0.4rem;
	background:var(--lightBlue);
	border: none;
	color: var(--mainWhite);
	font-size:1.4rem;
	border-radius: 0.5rem 0 0 0;
	transform: translate(100%,100%);
	transition: all 1s linear;
}
.img-container:hover .cart-btn{
	transform: translate(0,0);
}
.cart-btn:hover {
	color:var(--mainBlue);
	cursor: pointer;
}

`


export default Product;
