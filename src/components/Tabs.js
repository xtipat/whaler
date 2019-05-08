import Tabs from 'react-bootstrap/Button';
import React, { Component } from 'react';

class binDetails extends Component{
  render(){
    return(
      <Tabs defaultActiveKey='location' transition={false}>
        <Tab eventKey='location' title='Location'>
        </Tab>
        <Tab eventKey='details' title='Details'>
        </Tab>
        <Tab eventKey='result' title='Results'>
        </Tab>
      </Tabs>
    )
  }

}
