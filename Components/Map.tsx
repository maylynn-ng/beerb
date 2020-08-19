import React, { useState } from 'react';
import MapView, { Polygon } from 'react-native-maps';
import { getCenterOfBounds } from 'geolib';
import { Borough } from '../Models/Borough.model';

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

  return (
    <MapView region={region} style={{ flex: 2, width: '100%', height: '50%' }}>
      {boroughs.map((borough: Borough) => {
        return (
          <Polygon
            key={borough.boroughId}
            coordinates={borough.boroughCoords}
            strokeWidth={1}
            fillColor="rgba(0, 220, 70, 0.6)"
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
