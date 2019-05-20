import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {db, storage} from '../firebase/firebase.js';
import MapPage from '../MapPage.js';
import '../assets/scss/modal.scss';
import { Modal, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.scss'
import Autosuggest from 'react-autosuggest';

export default class AddBinInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      tags: [],
      redirect: false,
      picExists: false,
      inputValue: '',
      imgsrc: "http://placekitten.com/270/200",
      imgfile: null,
      types: []
    };
    this.myRef = React.createRef();
    this.input = React.createRef();
    this.picHandle = this.picHandle.bind(this);
    this.typesHandle = this.typesHandle.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
    this.autocompleteRenderInput = this.autocompleteRenderInput.bind(this);
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
      this.setState({redirect: true});
      this.props.onHide();
    });
  }

  types(){
    return [
      {type: 'General waste'},
      {type: 'Plastic'},
      {type: 'Recycle'},
      {type: 'Bottle'},
    ]
  }
  autocompleteRenderInput ({addTag, ...props}) {
    const handleOnChange = (e, {newValue, method}) => {
      if (method === 'enter') {
        e.preventDefault()
      } else {
        props.onChange(e)
      }
    }

    const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
    const inputLength = inputValue.length

    let suggestions = this.types().filter((state) => {
      return state.type.toLowerCase().slice(0, inputLength) === inputValue
    })

    return (
      <Autosuggest
        ref={props.ref}
        suggestions={suggestions}
        shouldRenderSuggestions={(value) => value && value.trim().length > 0}
        getSuggestionValue={(suggestion) => suggestion.type}
        renderSuggestion={(suggestion) => <span>{suggestion.type}</span>}
        inputProps={{...props, onChange: handleOnChange}}
        onSuggestionSelected={(e, {suggestion}) => {
          addTag(suggestion.type)
        }}
        onSuggestionsClearRequested={() => {}}
        onSuggestionsFetchRequested={() => {}}
      />
    )
  }

  checkImage(){
    if(this.state.picExists){
      return(<img src={this.state.imgsrc} className="picframe" ref={this.myRef}/>);
    }
    else{
      return(
        <div style={{position: "absolute", left:"50%", top:"25%", marginLeft:"-43px"}}>
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
    }
    else
    {
      toast.error("Please fill all the information first :D");
    }
  }
  typesHandle(tags){
    this.setState({tags});
  }
  redirect(){
  	if(this.state.redirect)
  		window.location = '/';
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
              <input type="file" name="file" onChange={this.picHandle} accept="image/*" className='hidden_input' ref={this.state.inputValue}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-start'}}>Bin Types</div>
            <TagsInput renderInput={this.autocompleteRenderInput} value={this.state.tags} onChange={this.typesHandle} />
            <br></br>
            {this.redirect()}
            <Button variant="yellow" onClick={this.submitHandle}>Submit</Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
