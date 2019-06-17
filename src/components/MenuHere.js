import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/scss/menubar.scss';
import AddBinInfo from './AddBinInfo.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const styles = {
  exMenuL: {
    transform: 'translate(-80%, -40%)'
  },
};

export default class MenuHere extends React.Component{
  constructor (props){
    super(props);
    this.state = {modalShow: false, locLoaded: false,error: false};
    this.checkModalShow = this.checkModalShow.bind(this)
  }

  getGeoLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
      position => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        locLoaded: true
      })
      },
      error => {
        this.setState({locLoaded: true, error: true});
      }
      )
    }
    else{
      this.setState({locLoaded: true, error: true});
    }
  }
  componentDidMount() {
    this.getGeoLocation();
  }

  checkModalShow(){
    if(this.state.locLoaded)
    {
      if(!this.state.error){
        this.setState({ modalShow: true });
        document.removeEventListener('mousedown', this.props.handleClickOutside);
      }
      else{
        toast.error("Can't detect GPS");
      }
    }
    else{
      toast.error("Detecting your location...please try again in a second");
    }
  }
  render(){
    let modalClose = () => {
      this.setState({ modalShow: false });
      document.addEventListener('mousedown', this.props.handleClickOutside);
    }
    return(
      <div>
        <div
        className='extended-menu-wrap'
        style={ styles.exMenuL }
        onClick={ this.checkModalShow }
        >
          <FontAwesomeIcon
            icon='map-pin'
            className='extended-menu-icon'
          />
        <div className='extended-menu-label'>at your<br />location</div>
        </div>
        <AddBinInfo
          show={this.state.modalShow}
          onHide={modalClose}
          lat = {this.state.lat}
          lng = {this.state.lng}
          uid = {this.props.uid}
        />
      </div>
    );
  }
}
