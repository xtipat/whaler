import React from 'react';
import { Row, Col, View } from 'react-bootstrap';
import {ProductConsumer} from "../context";
import styled from 'styled-components';


export default function Title({name, title}){
	return(
		<TitleWrapper>
		<ProductConsumer>
			{(value)=>{
				return(
					<div className='header'>
						<Row className="row-wrap">
							<Col className='redeem-title-wrap'>
								<div className='redeem-title'>Redeem</div>
							</Col>
							<Col className='balance-wrap '>
								<div className='balance-label'>Balance:&nbsp;
									<div className='balance'> {title} points</div>
								</div>

							</Col>

						</Row>
					</div>
				)
			}}
		</ProductConsumer>
		</TitleWrapper>
		)
};
const TitleWrapper = styled.div`
.row-wrap{
	border-bottom: 1px solid #ccc
	padding: 20px;
}
`
