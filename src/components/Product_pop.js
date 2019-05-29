import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';



export class Product_pop extends Component {
	render() {
		const {id, title, img, price, inCart, popular} = this.props.product;

			return (
				<ProductWrapper className="col-12 mx-auto">
					<ProductConsumer>
						{(value)=>(
							<div className="card"
								onClick={() =>
									value.handleDetail(id)
								}
							>
								<Link className="product_link" to="/details">
									<div className='reward-wrap'>
										<div
											className="img-container p-6"
													
										>
											<img src={img} alt="product" className="card-img-top"/>
												
										</div>
											

										{/*card footer */}
										<div className="card-footer d-flex justify-content-between">
											<p className="align-self-center mb-0 text-capitalize">
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

.img-container:hover .cart-btn{
	transform: translate(0,0);
}
.product_link, .product_link:hover {
   text-decoration: none; 
   background: rgba(247, 247, 247);
   color: black;


}

`
export default Product_pop;
