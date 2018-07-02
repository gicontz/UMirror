import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  view: {
    backgroundColor: '#000000',
    flex: 1,
    position: 'relative'
  },
  container: {
    position: 'absolute',
    flex: 1,
    top: '50%',
    marginTop: -42,
    left: 0,
    width: '100%',
    padding: 10
  },
  title: {
    fontFamily: 'HelveticaNeue-UltraLight',
    color: '#ffffff',
    fontSize: 40,
    width: '100%',
    textAlign: 'center'
  },
  getstarted:{
    fontFamily: 'HelveticaNeue-UltraLight',
    color: '#ffffff',
    fontSize: 20,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderStyle: 'solid',
    textAlign: 'center',
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  fadinview: {
    backgroundColor: 'transparent',
    flex: 1,
    margin: 50
  },
  forecastContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10,
    width: 220
  },
  forecastCurrent: {
    fontSize: 15,
    color: '#ffffff',
    fontFamily: 'HelveticaNeue-UltraLight',
    textAlign: 'right',
    width: '100%'
  },
  weatherIcon: {
    width: 50,
    height: 50
  },
  temperature: {
    fontFamily: 'HelveticaNeue-UltraLight',
    fontSize: 40,
    color: '#ffffff',
    width: 150,
    height: 50,
    paddingLeft: 10
  },
  dailyInfo: {
    fontFamily: 'HelveticaNeue-UltraLight',
    fontSize: 16,
    color: '#ffffff',
    width: 120,
    height: 30,
    textAlign: 'right',
  },
  dailyIcons: {
    width: 20,
    height: 20
  },
  digitalclock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 300,
    padding: 5
  },
  digits: {
    fontFamily: 'HelveticaNeue-UltraLight',
    fontSize: 40,
    color: '#ffffff',
    marginBottom: -15
  },
  day: {
    fontFamily: 'HelveticaNeue-UltraLight',
    fontSize: 20,
    color: '#ffffff',   
  },
  greetings: {
    fontFamily: 'HelveticaNeue-UltraLight',
    fontSize: 50,
    color: '#ffffff',
    width: '100%',
    textAlign: 'center'
  },
  iheard: {
    fontFamily: 'HelveticaNeue-UltraLight',
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center'    
  },
  button: {
    width: 50,
    height: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});