import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import EmployeeDirectoryApp from '../../app/EmployeeDirectoryApp';
import {StyleSheet,View} from 'react-native';
// import firebase from "firebase/app";
// import "firebase/auth";
import { logoutUser } from "../api/auth-api";



const Dashboard = ({ navigation }) => (

    // onPressLogout  = () => {
    //   console.log('onPressLogout called')
    //   firebase.auth().signOut();
    //   navigation.navigate('HomeScreen')
    // },

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
       onPress={() => logoutUser()}
       //onPress={(this != null && this != undefined) ? this.onPressLogout : () => navigation.navigate('HomeScreen')} //() => navigation.navigate('HomeScreen')
     />
     </View>
  );

export default memo(Dashboard);