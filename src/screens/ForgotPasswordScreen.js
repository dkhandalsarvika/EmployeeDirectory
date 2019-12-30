import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { emailValidator } from '../core/utils';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import Button from '../components/Button';
import { sendEmailWithPassword } from "../api/auth-api";
import Toast from "../components/Toast";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ value: "", type: "" });

  const _onSendPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    setLoading(true);

    const response = await sendEmailWithPassword(email.value);

    if (response.error) {
      setToast({ type: "error", value: response.error });
      Keyboard.dismiss();
    } else {
      setToast({
        type: "success",
        value: "Email with password has been sent."
      });
    }

    setLoading(false);

    Keyboard.dismiss();

    //navigation.navigate('LoginScreen')
     setTimeout(function(){
 
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
      navigation.navigate('LoginScreen')
 
    }, 5000);
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

      <Logo />

      <Header>Restore Password</Header>

      <TextInput
        label="E-mail address"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        returnKeyType="done"
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button
        loading={loading}
        title="Send Reset Instructions"
        onPress={_onSendPressed}
        style={styles.button}
      />

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>

      <Toast
        type={toast.type}
        message={toast.value}
        onDismiss={() => setToast({ value: "", type: "" })}
      />
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 24,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

export default memo(ForgotPasswordScreen);
