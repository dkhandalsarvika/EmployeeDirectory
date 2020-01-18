import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import EmployeeDirectoryApp from '../../app/EmployeeDirectoryApp';
import {StyleSheet,View,Alert,BackHandler} from 'react-native';
// import firebase from "firebase/app";
// import "firebase/auth";
import { logoutUser } from "../api/auth-api";



const Dashboard = ({ navigation }) => (

  onPressLogoutSendHome  = () => {
    logoutUser();
    navigation.navigate('HomeScreen');

  },

    onPressLogout  = () => {
      console.log('onPressLogout called');

        Alert.alert(
          //title
          'LOGOUT/EXIT',
          //body
          'Do you want to logout or exit ?',
          [
            {text: 'Exit', onPress: () => BackHandler.exitApp()},
            {text: 'Logout', onPress: () => this.onPressLogoutSendHome()},
            {text: 'No', onPress: () => console.log('No Pressed of logout/exit'), style: 'cancel'},
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
      // firebase.auth().signOut();
      // navigation.navigate('HomeScreen')
    },

   <View style={{
      flex: 1,
      width: '100%',
       backgroundColor: '#1B2732',
       borderBottomColor: 'red'
        }}>
   
      <EmployeeDirectoryApp />

     <Button
       title="Logout"
       bordered
       onPress={(this != null && this != undefined) ? this.onPressLogout : () => logoutUser()} //() => navigation.navigate('HomeScreen')
     />
     </View>
  );

export default memo(Dashboard);