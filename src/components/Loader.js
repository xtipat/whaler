import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/scss/_base.scss';

class Loader extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    var color = '#17181F';
    if (this.props.white) color = 'white';
    if (this.props.primary) color = '#FEC93F';

    return(
      <div className='vertical-center-wrap'>
        <FontAwesomeIcon icon='circle-notch' spin
          size='3x'className='loader' color={color} />
      </div>
    )
  }
}

export default Loader;
