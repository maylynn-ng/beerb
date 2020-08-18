import React from 'react';
import MapView, { Polygon } from 'react-native-maps';
import { Borough } from '../Models/Borough.model';
import { Coordinates } from '../Models/Coordinates.model';

const Map = ({ handlePress, boroughs }: any) => {
  return (
    <MapView
      initialRegion={{
        latitude: 51.509993,
        longitude: -0.104298,
        latitudeDelta: 0.6,
        longitudeDelta: 0.6,
      }}
      style={{ width: '100%', height: '50%' }}
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
            fillColor="rgba(0, 250, 70, 0.6)"
            tappable={true}
            onPress={() => handlePress(borough.properties.name)}
          />
        );
      })}
    </MapView>
  );
};

export default Map;
