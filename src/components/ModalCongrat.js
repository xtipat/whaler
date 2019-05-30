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
					const {modalOpenCongrat, closeModalCongrat} = value;
					const {img, title, price} = value.modalProduct

					if(!modalOpenCongrat){
						//already open
						return null;
					}
					else{
						return(
					
						<ModalContainer>
							<div className='row'>
								<div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5">
									<div>
										<FontAwesomeIcon className="icon-check fa-3x"
														 icon='check-circle'
										/>
										<h1>Success</h1>
										<h6>Thank you for Redeem the reward.</h6>
										<Link to='/redeem' className="redeem_link">
										        <Button variant="black"
										        		onClick={()=>closeModalCongrat()}>
										        	<FontAwesomeIcon icon='check-circle'/> Confirm
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
		)
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
	background: var(--mainWhite );
	width: 90vw;
	max-width: 90vw;
}
.redeem_link:hover{
	text-decoration: none; 
   background: none;
}
.icon-check{
	color: green;
	size: 10px
}
`
