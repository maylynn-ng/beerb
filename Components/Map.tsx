import React, { useState } from 'react';
import { View, Image } from 'react-native';
import MapView, { Polygon, Marker } from 'react-native-maps';
import { getCenterOfBounds } from 'geolib';
import { Borough } from '../Models/Borough.model';
import mapStyle from '../assets/mapStyle.js';

const Map = ({ boroughs, boroughCounter, location, user }: any) => {
  const initialRegion = {
    latitude: 51.36, //51.509993,
    longitude: -0.104298,
    latitudeDelta: 0.8,
    longitudeDelta: 0.8,
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

  const [showMarkers, setShowMarkers] = useState(false);
  const toggleMarkers = () => {
    setShowMarkers(!showMarkers);
  };

  const colors = [
    '#615e5cbb',
    '#4d3c2cbb',
    '#603218bb',
    '#804642bb',
    '#984b31bb',
    '#ca6730bb',
    '#d7805abb',
    '#e99252bb',
    '#ffa847bb',
    '#ffd400bb',
    '#ffd400',
  ];

  const color10 = (counter: number): number => (counter >= 10 ? 10 : counter);

  return (
    <MapView
      region={region}
      style={{ flex: 3, width: '100%', height: '50%' }}
      customMapStyle={mapStyle}
    >
      {boroughs.map((borough: Borough) => {
        return (
          <Polygon
            key={borough.boroughId}
            coordinates={borough.boroughCoords}
            strokeWidth={2}
            strokeColor="whitesmoke"
            fillColor={colors[color10([boroughCounter[borough.boroughName]])] || colors[0]}
            tappable={true}
            onPress={() => {
              handlePress(borough);
              toggleMarkers();
            }}
          ></Polygon>
        );
      })}
      {showMarkers &&
        user.Locations.map((loc: object) => {
          return (
            <Marker
              coordinate={{ latitude: +loc.latitude, longitude: +loc.longitude }}
              title={loc.placeName}
            >
              <Image
                source={require('../assets/pintMarker.png')}
                style={{ height: 30, width: 30 }}
              />
            </Marker>
          );
        })}
      <Marker coordinate={location} title="Your location">
        <Image source={require('../assets/pinRed.png')} style={{ height: 30, width: 30 }} />
      </Marker>
    </MapView>
  );
};

export default Map;
