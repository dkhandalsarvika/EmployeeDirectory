import React, {Component,useEffect} from 'react';
import {Text, TouchableOpacity, Image, StyleSheet,StatusBar,Platform,Alert,View,Button,BackHandler} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';
import EmployeeDetailsEdit from './EmployeeDetailsEdit';
import WebViewEssl from './WebViewEssl';
// import SplashScreen from 'react-native-splash-screen'
import { logoutUser } from "../src/api/auth-api";
import DeviceInfo from 'react-native-device-info';
let appVersion = DeviceInfo.getVersion();
let navigatorEDA = null;

// import firebase from "firebase/app";
// import "firebase/auth";
// import RNRestart from 'react-native-restart';

// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

// import HomeScreen from './HomeScreen';
// import LoginScreen from './LoginScreen';

// const RootStack = createStackNavigator(
//     {
//       Home: {
//         screen: HomeScreen,//HomeScreen,
//       },
//       Login: {
//         screen: LoginScreen,//LoginScreen,
//       },
//     },
//      {
//        initialRouteName: 'Login',
//      }
//   );

// const EmployeeDirectoryApp = createAppContainer(RootStack);

// export default EmployeeDirectoryApp;


export default class EmployeeDirectoryApp extends Component {


    // render() {
    //     return <RootStack />; 
    //   }

    // constructor(props){  
    //     super(props);  

    //     // this.state = {  
    //     //     data: 'www.javatpoint.com'  
    //     // }  
    //     // this.handleEvent = this.handleEvent.bind(this);  
    // }  

    componentDidMount() {
        if (Platform.OS === 'android'){
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android'){
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
        }
    }

    onBackButtonPressed() {
        console.log("onBackButtonPressed called while logout");

        console.log(navigatorEDA.getCurrentRoutes()[0].name);
        if(navigatorEDA.getCurrentRoutes()[0].name === 'employee-list'){
        //function to make three option alert
            Alert.alert(
              //title
              'LOGOUT/EXIT',
              //body
              'Do you want to logout or exit ?',
              [
                {text: 'Exit', onPress: () => BackHandler.exitApp()},
                {text: 'Logout', onPress: () => logoutUser()},
                {text: 'No', onPress: () => console.log('No Pressed of logout/exit'), style: 'cancel'},
              ],
              { cancelable: false }
              //clicking out side of alert will not cancel
            );
        
            return true;
        }
        else{
            return false;
        }
    }

    //  hideSplash(){   
    //     console.log("hideSplash called");
    //     // useEffect(()=>{
    //         SplashScreen.hide();
    //     // },[]);

    // }

    renderScene(route, navigator) {
        navigatorEDA = navigator;
        switch (route.name) {
            case 'employee-list':
                return <EmployeeList navigator={navigator} />
            case 'details':
                return <EmployeeDetails navigator={navigator} data={route.data} />
            case 'details-employee':
                return <EmployeeDetailsEdit navigator={navigator} data={route.data} />
            case 'webview-essl':
                return <WebViewEssl navigator={navigator} data={route.data} />
        }
    }


// {this.hideSplash()}

    render() {
        return (
            <>
            
            <View
              //To set the background color in IOS Status Bar also
              style={{
                backgroundColor: '#1B2732',
                height: Platform.OS === 'ios' ? 40 : 0,//StatusBar.currentHeight
              }}>
              <StatusBar
                barStyle="light-content"
                // dark-content, light-content and default
                hidden={false}
                //To hide statusBar
                backgroundColor="#1B2732"
                //Background color of statusBar
                translucent={false}
                //allowing light, but not detailed shapes
                networkActivityIndicatorVisible={true}
          />
        </View>
            
            <Navigator
                initialRoute={{name: 'employee-list', title: 'Sarvika Employee List'}}
                renderScene={this.renderScene}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: (route, navigator, index, navState) => {
                                if (route.name === 'employee-list') {
                                    return (<Text style={styles.titleVersion}>v{appVersion}</Text>);
                                } else {
                                    return (
                                        <TouchableOpacity onPress={() => navigator.pop()}>
                                            <Image source={require('./assets/back.png') } style={styles.backButton} />
                                        </TouchableOpacity>
                                    );
                                }
                            },
                            RightButton: (route, navigator, index, navState) => {
                                return null;
                                /// if (route.name === 'employee-list') {
                                //     return (
                                //         <TouchableOpacity onPress={this.onBackButtonPressed}>
                                //             <Image source={require('./assets/signout.png')} style={styles.logOut} />
                                //         </TouchableOpacity>
                                //     );
                                // } else {
                                //     return null;
                                // }
                            },
                            Title: (route, navigator, index, navState) => {
                                return (<Text style={styles.title}>{route.title}</Text>);
                            },
                        }}
                        style={styles.navBar}
                    />
                }
            />
            </>
        )
    }
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#00B386',
        height: 60
    },
    backButton: {
        marginLeft: 12,
        marginTop: 5,
        height: 30,
        width: 30,
        backgroundColor: '#1B2732',
        borderRadius: 15
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    titleVersion: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: 8,
        marginTop: 6
    },
    logOut: {
        marginTop: 10,
        marginRight: 15,
        height: 30,
        width: 30
    },
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});