import React, { useState } from 'react';
import MapView, { Polygon } from 'react-native-maps';
import { getCenterOfBounds } from 'geolib';
import { Borough } from '../Models/Borough.model';
import mapStyle from '../assets/mapStyle.js';

const Map = ({ boroughs }: any) => {
  const initialRegion = {
    latitude: 51.509993,
    longitude: -0.104298,
    latitudeDelta: 0.7,
    longitudeDelta: 0.7,
  };

  const [region, setRegion] = useState(initialRegion);

  const handlePress = (borough: Borough) => {
    const centerOfBorough = getCenterOfBounds(borough.boroughCoords);
    const { longitude, latitude } = centerOfBorough;
    setRegion({
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
      latitude: latitude,
      longitude: longitude,
    });
  };

  const colors = [
    '#615e5c99',
    '#4d3c2c99',
    '#60321899',
    '#80464299',
    '#984b3199',
    '#ca673099',
    '#d7805a99',
    '#e9925299',
    '#ffa84799',
    '#ffd40099',
  ];

  return (
    <MapView
      region={region}
      style={{ flex: 2, width: '100%', height: '50%' }}
      customMapStyle={mapStyle}
    >
      {boroughs.map((borough: Borough) => {
        return (
          <Polygon
            key={borough.boroughId}
            coordinates={borough.boroughCoords}
            strokeWidth={2}
            strokeColor="whitesmoke"
            fillColor="#615e5c99"
            // fillColor={color[counterState[borough.boroughName]]}
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
