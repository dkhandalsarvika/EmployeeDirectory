import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import DeviceInfo from 'react-native-device-info';

let appVersion = DeviceInfo.getVersion();
let appName = DeviceInfo.getApplicationName();

console.log(appVersion);

if (__DEV__) {
    console.log('I am in debug');
    appVersion = appVersion + "\n" + appName
}

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Version {appVersion}</Header>
    

    <Paragraph>
      Authorize to get Sarvika Employee Directory
    </Paragraph>
    <Button title="Login" onPress={() => navigation.navigate('LoginScreen')} />
    <Button
      bordered
      title="Sign Up"
      onPress={() => navigation.navigate('RegisterScreen')}
    />
  </Background>
);

export default memo(HomeScreen);
