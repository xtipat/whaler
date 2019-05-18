import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

export default class SearchBox extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onPlacesChanged: PropTypes.func
  }
  render() {
    return (
        <input class="form-control form-control-sm" type="text" placeholder="Search" aria-label="Search" ref="input" {...this.props} />
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