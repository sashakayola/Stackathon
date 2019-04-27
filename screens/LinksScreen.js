import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class App extends Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 40.6980, longitude: -73.9963}},
    marker: ''
  };


  componentDidMount() {
    this._getLocationAsync();
  }

  addMarker(coordinates) {
    // console.warn(coordinates);
    this.setState({
      marker: coordinates
    })
  }

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location });
 };

// fitPadding() {
//   this.map.fitToCoordinates([{latitude: 40.6980, longitude: -73.9963}, this.state.marker], {
//     edgePadding: { top: 50, right: 50, bottom: 120, left: 50 },
//     animated: true
//   });
// }

render() {
  return (
    <View style={{flex: 1}}>
        <MapView
        ref={ref => { this.map = ref; }}
        style={styles.map}
        region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        showsUserLocation={true}
        onPress={(e) => {
          this.addMarker(e.nativeEvent.coordinate)
        }}
        >

        {this.state.marker !== '' &&
        <MapView.Marker
            coordinate={{latitude: this.state.marker.latitude,
            longitude: this.state.marker.longitude}}
            title={"Let's get food around here!"}
            // description={"description"}
            // pinColor={'aqua'}
            // pinColor={'plum'}
            // pinColor={'orange'}
            // pinColor={'tomato'}
            // pinColor={'green'}
            // pinColor={'indigo'}
            // color={'#76BBB7'}
         >
         <Icon name="silverware-fork-knife" size={40} color={"indigo"} />
        </MapView.Marker>
        }


          {this.state.marker !== '' &&
            <MapView.Circle
                    key = { (this.state.marker.latitude + this.state.marker.longitude).toString() }
                    center = { this.state.marker }
                    radius = { 450 }
                    strokeWidth = { 1 }
                    strokeColor = { '#1a66ff' }
                    fillColor = { 'rgba(230,238,255,0.5)' }
            />
          }
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  map: {
    flex: 1
  }
});
