import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview';
import * as ConstantsClass from './util/Constants';

const screenHeight = Math.round(Dimensions.get('window').height);

export default class WebViewEssl extends Component {

    constructor(props) {
        super(props);

            this.state = {
                employee: this.props.data,
                visible: true
            };

            if (Platform.OS === 'android'){
                this.onBackButtonPressed1 = (() => {
                console.log("constructor onBackButtonPressed1 called");
                if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1){
                    this.props.navigator.pop();
                    return true; //avoid closing the app
                }
                    return false; //close the app
                }).bind(this) //don't forget bind this, you will remember anyway.
            } 
     }

     showSpinner() {
       console.log('Show Spinner');
       this.setState({ visible: true });
     }

     hideSpinner() {
       console.log('Hide Spinner');
       this.setState({ visible: false });
     }

     displaySpinner() {
        return (
               <ActivityIndicator
                 color="#00B386"
                 size="large"
                 style={styles.ActivityIndicatorStyle}
               />
            
        );
      }

   render() {
         return (
            <WebView style={styles.WebViewStyle} startInLoadingState={true}
                     source = {{ uri: ConstantsClass.ESSL_TIME_TRACK_URL }} 
                     javaScriptEnabled={true} 
                     domStorageEnabled={true}
                     renderLoading={this.displaySpinner}
            />
         );
   }
}

const styles = StyleSheet.create({
   container: {
      height: screenHeight,
   },
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 60,
  },
  ActivityIndicatorStyle: {
    height: screenHeight,
    justifyContent: 'center',
    backgroundColor: '#1B2732'
  }
});