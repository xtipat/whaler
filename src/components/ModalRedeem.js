import React, { Component } from 'react';
import styled from 'styled-components';
import {ProductConsumer} from '../context';
import {Link} from 'react-router-dom'
import { Modal, Nav, Tab, Button, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class ModalRedeem extends Component {
	render() {
		return (
			<ProductConsumer>
				{(value) => {
					const {modalOpen, closeModal, closeModal_cancel} = value;
					const {img, title, price} = value.modalProduct
					const user_point= value.user_point

					if(!modalOpen){
						//already open
						return null;
					}
					else{
						return(
							<ModalContainer>
								<div className='row'>
									<div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5">
										<h5>Confirm</h5>
										<img src={img} className="img-fluid" alt="product"/>
										<h5>{title}</h5>
										<h5 className="text-muted">available point : {user_point} points</h5>
										<h5 className="text-muted">price : {price} points</h5>
										<div style={{textAlign: 'center'}}>
										<Link to='/redeem' className="redeem_link">
										        <Button variant="yellow"
										        		cart onClick={()=>closeModal((user_point - price),price,title)}>
										        	<FontAwesomeIcon icon='check-circle'/> Confirm
										        </Button>
									    </Link>
											<div className='divider' />
							        	<Link to='/details' className='redeem_link'>
									        <Button variant="black"
									        		onClick={()=>closeModal_cancel(user_point)}>
									        	<FontAwesomeIcon icon='times-circle'/> Cancel
									        </Button>
									    </Link>

									    </div>
									</div>
								</div>
							</ModalContainer>
						)
					}
				}}
			</ProductConsumer>
		);
	}
}

const ModalContainer = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background:rgba(0,0,0,0.3);
display: flex;
align-items: center;
justify-content: center;
#modal {
	background: var(--mainWhite )
}
.redeem_link:hover{
	text-decoration: none; 
   background: none;
}
`
