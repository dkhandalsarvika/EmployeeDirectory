import React,{ useEffect }  from "react";
import { Provider } from "react-native-paper";
import App from "./src";
import { theme } from "./src/core/theme";
import SplashScreen from 'react-native-splash-screen'

const Main = () => (
  useEffect(()=>{
    SplashScreen.hide();
    console.log('App.js useEffect SplashScreen called')
  },[]),
  <Provider theme={theme}>
    <App />
  </Provider>
);

export default Main;