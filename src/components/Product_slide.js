import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';
//sliding part
import { Row, Col , Carousel as RBCarousel} from 'react-bootstrap';



const styles = { height: 250, width: "100%" };


export class Product_slide  extends React.PureComponent {
	constructor(props) {
	    super(props);
	    this.state = {
	      autoplay: true
	    };
  	}
	  onSelect = (active, direction) => {
	    console.log(`active=${active} && direction=${direction}`);
	  };
	  visiableOnSelect = active => {
	    console.log(`visiable onSelect active=${active}`);
	  };
	  slideNext = () => {
	    this.slider.slideNext();
	  };
	  slidePrev = () => {
	    this.slider.slidePrev();
	  };
	  goToSlide = () => {
	    this.slider.goToSlide(4);
	  };
	  autoplay = () => {
	    this.setState({ autoplay: !this.state.autoplay });
	  };
	  _changeIcon = () => {
	    let { leftIcon, rightIcon } = this.state;
	    leftIcon = leftIcon ? undefined : <span className="fa fa-glass" />;
	    rightIcon = rightIcon ? undefined : <span className="fa fa-music" />;
	    this.setState({ leftIcon, rightIcon });
	  };

	render() {
			const products = this.props.products

			return (

			<SlideContainer>

				<div className="container-fluid">
			        <Row>
			          <Col className="col-12 mx-auto" style={{ marginTop: 20 }}>
			            <ProductConsumer>
						{(value)=>(
			            <RBCarousel
			              version={4}
			              autoplay={this.state.autoplay}
			              pauseOnVisibility={true}
			              onSelect={this.visiableOnSelect}
			              slideshowSpeed={2500}
			            >
				              <div style={{ ...styles}}
									onClick={() =>
											value.handleDetail(products[0].id)
										}
				              >
				         		<Link className="product_link" to="/details">
					              	<img src={products[0].img}
						              	 className="img-fluid "
						              	 alt="product"

						            />
						        </Link>
					          </div>
					      	  {/*second element*/}
					          <div style={{ ...styles}}
						          	onClick={() =>
												value.handleDetail(products[1].id)
											}
					          >
					          	<Link className="product_link" to="/details">
					              	<img src={products[1].img}
						              	 className="img-fluid " alt="product"
						            />
						        </Link>
					          </div>

			            </RBCarousel>
			            )}
	      				</ProductConsumer>
			          </Col>

		        </Row>
		      </div>

	      </SlideContainer>
			);
	}
}

export default Product_slide;

const SlideContainer = styled.div`
.img-fluid {
  max-width: 100%;
  max-height: 100%;
  height: auto;
  vertical-align: middle;
}
.container-fluid{
  background-color:#E9E8E9;
}


`
