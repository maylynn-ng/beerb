import React, { useState } from 'react';
import MapView, { Polygon, AnimatedRegion, MapViewAnimated, Marker } from 'react-native-maps';
import { getCenter, getCenterOfBounds } from 'geolib';
import { Borough } from '../Models/Borough.model';
import { Coordinates } from '../Models/Coordinates.model';

const Map = ({ boroughs }: any) => {
  const initialRegion = {
    latitude: 51.509993,
    longitude: -0.104298,
    latitudeDelta: 0.7,
    longitudeDelta: 0.7,
  };

  const [region, setRegion] = useState(initialRegion);
  //pass handlepress in l 6

  const handlePress = borough => {
    const coords = borough.geometry.coordinates[0].map((coords: Coordinates) => {
      return {
        latitude: coords[1],
        longitude: coords[0],
      };
    });
    const centerOfBorough = getCenterOfBounds(coords);
    const { longitude, latitude } = centerOfBorough;
    setRegion({
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
      latitude: latitude,
      longitude: longitude,
    });
  };

  return (
    <MapView
      region={region}
      mapType={'mutedStandard'}
      style={{ flex: 2, width: '100%', height: '50%' }}
    >
      {boroughs.features.map((borough: Borough) => {
        return (
          <Polygon
            key={borough.id}
            coordinates={borough.geometry.coordinates[0].map((coords: Coordinates) => {
              return {
                latitude: coords[1],
                longitude: coords[0],
              };
            })}
            strokeWidth={1}
            fillColor="#202020aa"
            tappable={true}
            onPress={() => handlePress(borough)}
          >
            {/* <Marker></Marker> */}
          </Polygon>
        );
      })}
    </MapView>
  );
};

export default Map;
