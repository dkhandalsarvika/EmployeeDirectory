import React, {Component,useEffect} from 'react';
import {Text, TouchableOpacity, Image, StyleSheet,StatusBar,Platform,Alert,View,Button} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './EmployeeDetails';
import SplashScreen from 'react-native-splash-screen'
import firebase from "firebase/app";
import "firebase/auth";
import RNRestart from 'react-native-restart';

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

    //     this.state = {  
    //         data: 'www.javatpoint.com'  
    //     }  
    //     this.handleEvent = this.handleEvent.bind(this);  
    // }  

     hideSplash(){   
        console.log("hideSplash called");
        // useEffect(()=>{
            SplashScreen.hide();
        // },[]);

    }

    renderScene(route, navigator) {
        switch (route.name) {
            case 'employee-list':
                return <EmployeeList navigator={navigator} />
            case 'details':
                return <EmployeeDetails navigator={navigator} data={route.data} />
        }
    }

    onPressLogout = () => {
    console.log('onPressLogout called')
    firebase.auth().signOut();
    // Immediately reload the React Native Bundle
    // RNRestart.Restart();
    console.log(RNRestart)
    // Alert.alert(RNRestart);
    // Alert.alert('onPressLogout called');
  }

    render() {
        return (
            <>
            {this.hideSplash()}
            {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
            <Navigator
                initialRoute={{name: 'employee-list', title: 'Sarvika Employee List'}}
                renderScene={this.renderScene}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: (route, navigator, index, navState) => {
                                if (route.name === 'employee-list') {
                                    return null;
                                } else {
                                    return (
                                        <TouchableOpacity onPress={() => navigator.pop()}>
                                            <Image source={require('./assets/back.png')} style={styles.backButton} />
                                        </TouchableOpacity>
                                    );
                                }
                            },
                            RightButton: (route, navigator, index, navState) => {

                                return (
                                        <TouchableOpacity onPress={this.onPressLogout}>
                                            <Image source={require('./assets/signout.png')} style={styles.logOut} />
                                        </TouchableOpacity>
                                    );

                                ///return <Button style={styles.logOut} title="Logout" onPress={() => this._saveDetails()} />;
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
        backgroundColor: '#FAFAFF',
        height: 60,
    },
    backButton: {
        marginTop: 8,
        marginLeft: 12,
        height: 24,
        width: 24
    },
    title: {
        padding: 8,
        fontSize: 20,
        fontWeight: 'bold'
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