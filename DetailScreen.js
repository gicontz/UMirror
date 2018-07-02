import React, { Component }  from 'react';
import { Alert, ActivityIndicator, AppRegistry, Animated, Text, View, StyleSheet, Button, StatusBar, WebView } from 'react-native';
import { Font } from 'expo';
import {
  createStackNavigator,
} from 'react-navigation';
import { keys } from './api';
import { styles } from './style';

class DetailsScreen extends Component {
  static navigationOptions = { 
    header: null,
    headerStyle: {
      backgroundColor: '#000000',
    },
    headerTintColor: '#fff',
  }

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://api.darksky.net/forecast/36da509268d347e6997fcb8983ced0a4/14.275078,120.996236')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          currentForecast: responseJson.currently,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.view}>
        <View style={styles.forecastContainer}>
          <Text style={styles.forecastCurrent}>
          {this.state.currentForecast.summary}</Text>
        </View>
      </View>
      );
  }
}

export default DetailsScreen;