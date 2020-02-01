/**
 * @format
 */



// import {AppRegistry} from 'react-native';
 
// import SarvikaEDApp from './app/SarvikaEDApp';
 
// AppRegistry.registerComponent('SarvikaED', () => SarvikaEDApp);

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
