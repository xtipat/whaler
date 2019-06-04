import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/scss/searchBox.scss';

export default class SearchBox extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func
  }
  render() {
    return (
      <div className="active-orange">
        <FontAwesomeIcon className="search-box-logo" icon="search"/>
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search for places" aria-label="Search" ref="input" {...this.props} />
      </div>
    );
  }
  onPlacesChanged = () => {
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    }
  }
  componentDidMount() {
    var input = ReactDOM.findDOMNode(this.refs.input);
    this.searchBox = new window.google.maps.places.SearchBox(input);
    this.searchBoxListener = this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }
  componentWillUnmount() {
    this.searchBoxListener.remove();
  }
}
