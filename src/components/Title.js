import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../assets/scss/redeem.scss';
import {ProductConsumer} from "../context";


export default function Title({name, title}){
	return(
		<ProductConsumer>
			{(value)=>{
				return(
					<div className='header-wrap'>
						<Row>
							<Col className='redeem-title-wrap'>
								<div className='redeem-title'>Redeem</div>
							</Col>
							<Col className='balance-wrap'>
								<div className='balance-label'>balance: </div>
								<div className='balance'>{title} points</div>
							</Col>
							<div className='horizontal-line'></div>
						</Row>
					</div>
				)
			}}
		</ProductConsumer>
		)
};

