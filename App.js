import React, { Component }  from 'react';
import { 
  Alert, 
  ActivityIndicator, 
  AppRegistry, 
  Animated, 
  Text, 
  View, 
  StyleSheet,
  ToastAndroid,
  Button, 
  StatusBar, 
  WebView, 
  Image,
  Platform,
  TouchableHighlight,
  PermissionsAndroid,
  Linking } from 'react-native';
import {
  createStackNavigator, } from 'react-navigation';
import { keys } from './api';
import { weather_talks } from './dialogsFlow';
import { styles } from './style';
import { weatherIcons } from './weatherIcons';
import moment from 'moment';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';


var thismoment = require('moment');


let __time = thismoment().format('hh:mm A');
let __date = thismoment().format('ddd, MMM DD, YYYY');

let weatherSum = "";

class MirrorTalk extends Component {

  constructor(props){
    super(props);
    this.state = {
      recognized: '',
      pitch: '',
      error: '',
      end: '',
      started: '',
      results: [],
      partialResults: [],
      showText: null,
      isWeather: false
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    Voice.onSpeechError = this.onSpeechError.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
    Voice.destroy().then(Voice.removeAllListeners);
  }
  
  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  }

  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  }

  onSpeechEnd(e) {
    this.setState({
      end: '√',
    });
  }

  onSpeechError(e) {
    this.setState({
      error: JSON.stringify(e.error),
    });
  }

  onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
    this.executeCommand(this.state.results[0]);
  }

  onSpeechPartialResults(e) {
    this.setState({
      partialResults: e.value,
      isWeather: e.value == "weather"
    });
  }

  async executeCommand(msg){
    const ACCESS_TOKEN = '68f7a1e684fb43dbb2b0d6a960d71f86';

    try {
       const response = await fetch(`https://api.dialogflow.com/v1/query?v=20170712`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: msg,
          lang: 'EN',
          sessionId: 'somerandomthing'
        })
      })
      let responseJson = await response.json();
      this.setState({
        showText: responseJson.result.fulfillment.speech,
      });
    } catch(error) {
      //console.error(error);
    }

    let wholeSummarry = "";
    for(var i = 0; i < weather_talks.length; i++){
      if (this.state.showText == weather_talks[i]) { wholeSummarry = " " + weatherSum; break; }
    }

    Tts.speak(this.state.showText + wholeSummarry);
    Alert.alert(this.state.showText + wholeSummarry);
    this.state.showText = "";
  }

  onSpeechVolumeChanged(e) {
    this.setState({
      pitch: e.value,
    });
  }

  async _startRecognizing(e) {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
      invoker: 'start'
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }

  async _stopRecognizing(e) {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }  
  }

  async _cancelRecognizing(e) {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  }

  async _destroyRecognizer(e) {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  }

  render() {
    return (
      <View>
        {this.state.partialResults.map((result, index) => {
          return (
            <Text
              key={`partial-result-${index}`}
              style={styles.iheard}>
              {result}
            </Text>
          )
        })}
      </View>
    );
  }
}

class DigitalTime extends Component {

  async componentWillMount() {
    this.setState({
      currentTime: __time,
      currentDate: __date,
      lastPress: 0
    });
  }

  componentDidMount() {
    setInterval(() => { 
        __time = thismoment().format('hh:mm A'); 
        __date = thismoment().format('ddd, MMM DD, YYYY'); 
        this.setState({
        currentTime: __time,
        currentDate: __date
      });
    }, 1000);
  }

  render() {

    return (
      <View style={styles.digitalclock}> 
        <Text style={styles.digits}>{this.state.currentTime}</Text>
        <Text style={styles.day}> 
        {this.state.currentDate}        
        <Text style={styles.iheard} onPress={() => Linking.openURL('https://gicontz.github.io')}>by gicontz</Text>
        </Text>
      </View>
    );
  }
}

class Greetings extends Component {
  state = {
    greetings: ["Hi Master!", "What's Up?", "Good Day!", "Have a Good Day!", "Nice day ahead!", "Hi Sexy!"]
  }

  async componentWillMount() {
    this.setState({
      greet: this.state.greetings[Math.floor(Math.random() * this.state.greetings.length)]
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        greet: this.state.greetings[Math.floor(Math.random() * this.state.greetings.length)]
      });
    }, 5000);
  }

  DoubleTap = () => {
    const time = new Date().getTime();
    const delta = time - this.lastPress;

    const DOUBLE_PRESS_DELAY = 400;
    const TRIPLE_PRESS_DELAY = 600;

    if (delta < DOUBLE_PRESS_DELAY) {
      this.child._startRecognizing();  
    this.lastPress = 0;
    }else if(delta < TRIPLE_PRESS_DELAY){
      this.child._destroyRecognizer(); 
    this.lastPress = 0;
    } else{
      this.child._stopRecognizing(); 
    this.lastPress = 0;
    }
    this.lastPress = time;
  }

  render() {
    return(
      <View style={{top: '50%', backgroundColor: 'transparent', zIndex: 99}}>
        <TouchableHighlight>
          <Text style={styles.greetings} onPress={this.DoubleTap}>
            {this.state.greet}
          </Text>
        </TouchableHighlight>
        <MirrorTalk onRef={ref => (this.child = ref)} />
      </View>
      );  
  }

}

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
    this.state ={ 
      isLoading: true,
      latitude: 14.275078, //14.275078
      longitude: 120.996236, //120.996236
    };
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchId);
  }

  _getTemprature(daily_temp) {
    return (((daily_temp - 32) * 5) / 9).toFixed(2);
  }

  componentDidMount(){

     this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );

    setInterval(() => { fetch('https://api.darksky.net/forecast/'+ keys.forecast + '/'+ this.state.latitude +','+ this.state.latitude)
      .then((response) => response.json())
      .then((responseJson) => {
        weatherSum = responseJson.hourly.summary;
        this.setState({
          isLoading: false,
          currentForecast: responseJson.currently,
          summaryForecast: responseJson.hourly.summary,
          icon: weatherIcons[responseJson.currently.icon],
          dailyForecast: responseJson.daily.data,
        }, function(){

        });


      })
      .catch((error) =>{
        // return ( <NoNetwork/> )
        // console.error(error);
      });
    }, 1000);


  }

  render() {

    let alldailyForecast = this.state.dailyForecast;
    if(this.state.isLoading){
      return(
        <View style={styles.view}>
          <ActivityIndicator style={styles.view}/>
        </View>
      )
    }

    var ind = 0;

    return (
      <View style={styles.view}>
        <View style={styles.forecastContainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Image source={this.state.icon} style={styles.weatherIcon} />
            <Text style={styles.temperature}>{String(this._getTemprature(this.state.currentForecast.temperature))}&deg;C</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row',}}>
            <Text style={styles.forecastCurrent}>
              {this.state.summaryForecast}
            </Text>
          </View>


          <View style={{flex: 1, flexDirection: 'column', width: 200}}>
            {alldailyForecast.map((prop, key) => {
              var wicon = weatherIcons[prop.icon];
              if(key > 0 && key < 7 ){
                return (
                  <View key={key} style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style={styles.dailyInfo}>{moment.unix(prop.time).format('ddd')} </Text>
                  <Image source={wicon} style={styles.dailyIcons}/>
                  <Text style={styles.dailyInfo}>{String(this._getTemprature(prop.temperatureLow))}&deg;C - {String(this._getTemprature(prop.temperatureHigh))}&deg;C</Text>
                  </View>
                  );
              }
              ind++;
            })}
          </View>

        </View>
          <Greetings/>
          <DigitalTime/>
      </View>
      );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = { 
    header: null,
    color: "#000000"
  }

  render() {
    return (      
      <View style={styles.view}>
         <StatusBar hidden={true} />
      <View style={styles.container}>
      <FadeInView delay="0" style={{width: '100%', backgroundColor: 'transparent'}}>
        <Text style={styles.title}>UMirror</Text>
        <Text style={styles.iheard} onPress={() => Linking.openURL('https://gicontz.github.io')}>by gicontz</Text>
      </FadeInView>

      <FadeInView delay="2000" style={{width: '100%', backgroundColor: 'transparent'}}>
        <Text style={styles.getstarted} onPress={() => this.props.navigation.navigate('Details')}>Get Started</Text>
      </FadeInView>
      </View>
      </View>
      );
  }

  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
}


const RootStack = createStackNavigator(
{
  Home: HomeScreen,
  Details: DetailsScreen,
},
{
  initialRouteName: 'Home',
}
);

class FadeInView extends Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 3000,              // Make it take a while
        delay: parseFloat(this.props.delay)
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
      style={{
        ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
        >
        {this.props.children}
        </Animated.View>
        );
  }
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default class App extends Component {
  render() {
    return <RootStack />;
  } 
}



AppRegistry.registerComponent('UMirror', () => App);