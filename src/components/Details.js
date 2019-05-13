import React, { Component } from 'react';
import {ProductConsumer} from "../context"
import {Link} from "react-router-dom"
import Title from "./Title";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Nav, Tab, Button, ProgressBar } from 'react-bootstrap';



export class Details extends Component {
	render() {
		return (
			<ProductConsumer >
				{(value) =>{
					const {
						id, 
						company, 
						img, 
						info,
						price, 
						title,
						inCart
					} = value.detailProduct;
					const user_point = value.user_point
					return(
						<div className="container py-5" style={{ overflowY: 'scroll', height: '90vh' }}>
							<ProductConsumer>
							{(value)=>{
								return (<Title name="Redeem" title={value.user_point}/>)
								
							}}
							</ProductConsumer>
				
							{/*product info*/}
							<div className="row">
								<div className="col-10 mx-auto col-md-10 my-3">
									<img src={img} className="img-fluid" alt="product"/>
								</div>
								{/* product text */}
								<div className="col-12 mx-auto col-md-12 my-3 text-capitalize">
									<h2>{title}</h2>
									<h4 className="text-title text-uppercase text-mutate mt-3 mb-2">
										by : <span className="text-uppercase">{company}</span> 
									</h4>
									<h4 className="text-gold">
										<strong>
										 {price} points
										</strong>
									</h4>
									<p className="text-capitalize font-weight-bold mt-3 mb-0">
										information
									</p>
									<p className="text-muted lead">{info}</p>
								{/*button*/}
								<div>
									
									<div style={{textAlign: 'right'}}>
          								<Button cart="true" 
          										variant="yellow" 
          										disabled={(user_point < price)? true:false} 
          										onClick={()=>{
															value.openModal(id);
												}}>
												<FontAwesomeIcon icon='check-circle'/> {(user_point < price)?'Not Enough Point': "Redeem"}

          								</Button>
          								<Link to='/redeem'>
          									<Button variant="black"><FontAwesomeIcon icon='times-circle'/> Go Back</Button>
        								</Link>
        							</div>
								
								</div>

									
								</div>
							</div>
						</div>
						)
				}}
				
			</ProductConsumer>
		);
	}
}

export default Details;







