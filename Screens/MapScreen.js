import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';


const MapScreen = ({ navigation, route }) => {

  const [coordinates, setCoordinates] = useState(null);
  const { colonyName } = route.params;
  const handleFindLocation = async () => {
    try {
      // Perform geocoding to convert colony name to coordinates
      const response = await Geocoder.from(colonyName);
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
      setCoordinates({ latitude: lat, longitude: lng });
    } catch (error) {
      console.error('Error finding location:', error);
    }
  };


  useEffect(() => {
    handleFindLocation();
  }, [])

  // console.log(coordinates);
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825, // Default location (e.g., city center)
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {coordinates && (
          <Marker coordinate={coordinates} />
        )}
      </MapView>
      {/* <Button
        title="Find Location"
        onPress={() => handleFindLocation('Colony Name')}
      /> */}
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})