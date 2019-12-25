import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Sarvika Login</Header>

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
