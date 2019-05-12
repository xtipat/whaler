import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {db, storage} from '../firebase/firebase.js';
import ProgressBar from 'react-bootstrap/ProgressBar'
import MapPage from '../MapPage.js';
import '../assets/scss/modal.scss';
import { Modal, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TagInput from './TagInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class AddBinInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      picExists: false,
      imgsrc: "http://placekitten.com/270/200",
      imgfile: null,
      types: []
    };
    this.myRef = React.createRef();
    this.picHandle = this.picHandle.bind(this);
    this.typesHandle = this.typesHandle.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
  };
  writeToDatabase() {
    var newRef = db.ref('/bins/').push();
    newRef.set(
    {
      'detailAccept': 0,
      'detailReject': 0,
      'location': {'lat': this.props.lat, 'lng': this.props.lng},
      'locationAccept': 0,
      'locationReject': 0,
      'types': this.state.types
    });
    var strRef = storage.ref().child(newRef.key);
    strRef.put(this.state.imgfile).then((snapshot) => {
      console.log("Uploaded Pic",newRef.key);
      this.props.onHide();
    });
  }
  checkImage(){
    if(this.state.picExists){
      return(<img src={this.state.imgsrc} style={{width:'100%',height:'100%'}} ref={this.myRef}/>);
    }
    else{
      return(
        <div>
          <FontAwesomeIcon icon='plus-circle' size="2x"/>
          <br/>
          Attach a Photo
        </div>
      );
    }
  }
  picHandle(event){
    if (event.target.files && event.target.files[0]) {
      this.setState({picExists: true, imgsrc: URL.createObjectURL(event.target.files[0]), imgfile: event.target.files[0]});
    }
  }
  submitHandle(){
    if(this.state.picExists && this.state.types.length>0)
    {
      this.writeToDatabase();
      window.location = '/';
    }
    else
    {
      toast.error("Please fill all the information first :D");
    }
  }
  typesHandle(items){
    this.setState({types:items});
  }

  render(){
    return(
      <Modal
        size="sm"
        {...this.props}
        centered
      >
        <Modal.Header closeButton>
          Add a New Bin:
        </Modal.Header>
        <Modal.Body>
          <div style={{textAlign: 'center'}}>
            <div class="add-photo">
              {this.checkImage()}
              <input type="file" name="file" onChange={this.picHandle} accept="image/*" className='hidden_input'/>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-start'}}>Bin Types</div>
            <TagInput typesHandle={this.typesHandle}/>
            <br></br>
            <Button variant="yellow" onClick={this.submitHandle}>Submit</Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
