import * as turf from '@turf/turf';

const TurfFunctions = class {

  calculateCenterOfMap(areas) {
    let turfPoints;
    let features;
    let center;

    turfPoints = areas.map(area =>
      turf.point([area[0].lat, area[0].lng])
    );
    features = turf.featureCollection(turfPoints);

    center = turf.center(features);
    return {
      lat: center.geometry.coordinates[0],
      lng: center.geometry.coordinates[1]
    }
  }

}
export default TurfFunctions;