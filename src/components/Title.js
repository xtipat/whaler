import React from 'react';



export default function Title({name, title}){
	return(
		<div className='row border-bottom border-dark'>
			<div className="col-6 mx-auto my-3  l-3">
				<h2 className="text-capitalize font-weight-bold">
					{name} 
				</h2>
			</div>
			<div className="col-6 mx-auto my-4 r-3">
				<h5>
					balance: 
					<strong className="text-gold">
						{title} points
					</strong>
				</h5>
			</div>
		<hr/>
		</div>
		)
};