
import React, { Component, createRef } from 'react'

import TurfFunctions from './TurfFunctions';
import Resources from './Resources'

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const resources = new Resources();
const turfFunctions = new TurfFunctions();

export default class GoogleMap extends Component {
  googleMapRef = createRef()

  componentDidMount() {
    const googleMapScript = document.createElement('script')
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=drawing,geometry`
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      let areas = resources.getAreas();

      let center = turfFunctions.calculateCenterOfMap(areas);
      
      this.googleMap = this.createGoogleMap(center.lat, center.lng)
      this.marker = this.createMarker()
      this.createDrawingManager();

      areas.map(area => {
        this.createPolygon(area);
      })
    })
  }

  createGoogleMap = (lat, lng) => 
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 14,
      center: {
        lat: lat, 
        lng: lng,
      },
      disableDefaultUI: false,
      streetViewControl: false,
      mapTypeId: 'hybrid',
    })

    createDrawingManager = () => {
      let drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: false,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['polygon']
        },
        markerOptions: { icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' },
        polygonOptions: {
          fillColor: '#F00',
          fillOpacity: 0.5,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          clickable: false,
          editable: true,
          zIndex: 1
        }
      });
      drawingManager.setMap(this.googleMap);
      
      window.google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
        let path = polygon.getPath()
        let coordinates = [];

        for (let i = 0; i < path.length; i++) {
          coordinates.push({
            lat: path.getAt(i).lat(),
            lng: path.getAt(i).lng()
          });
        }
        console.log(coordinates);
      });
  }

  createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: -28.517173, lng: -54.133272 },
      map: this.googleMap,
    })

  createPolygon = (coordinates) => {
      
    let polygon = new window.google.maps.Polygon({
      paths: coordinates,
      fillColor: '#F00',
      fillOpacity: 0.5,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      map: this.googleMap 
    });

    let area = window.google.maps.geometry.spherical.computeArea(polygon.getPath());
    let areaInHa = area/10000;

    console.log("Area total:", areaInHa.toFixed(2), "ha")
  }


  render() {
    return (
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: '100%', height: '100vh' }}
      />
    )
  }
}