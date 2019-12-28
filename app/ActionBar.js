import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Linking,Alert} from 'react-native';

var isAlertBoxRequired = true;

export default class ActionBar extends Component {

    

    callNumber() {

        if(isAlertBoxRequired == true){
            //function to make two option alert
            Alert.alert(
              //title
              'Call on personal number',
              //body
              'Do you want to call ?',
              [
                {text: 'Yes', onPress: () => this.openURL('tel:' + this.props.phone)},
                {text: 'No', onPress: () => console.log('No Pressed personal number'), style: 'cancel'},
              ],
              { cancelable: false }
              //clicking out side of alert will not cancel
            );
        }else{
            this.openURL('tel:' + this.props.phone);
        }

        
    }

    callENumber() {
        if(isAlertBoxRequired == true){
            //function to make two option alert
            Alert.alert(
              //title
              'Call on emergency number',
              //body
              'Do you want to call ?',
              [
                {text: 'Yes', onPress: () => this.openURL('tel:' + this.props.ePhone)},
                {text: 'No', onPress: () => console.log('No Pressed emergency number'), style: 'cancel'},
              ],
              { cancelable: false }
              //clicking out side of alert will not cancel
            );
        }else{
            this.openURL('tel:' + this.props.ePhone);
        }

        
    }

    sendMessage() {
        if(isAlertBoxRequired == true){
            //function to make two option alert
            Alert.alert(
              //title
              'Send message',
              //body
              'Do you want to send message ?',
              [
                {text: 'Yes', onPress: () => this.openURL('sms:' + this.props.phone)},
                {text: 'No', onPress: () => console.log('No Pressed send message'), style: 'cancel'},
              ],
              { cancelable: false }
              //clicking out side of alert will not cancel
            );
        }else{
            this.openURL('sms:' + this.props.phone);
        }

    }

    sendMail() {    
        if(isAlertBoxRequired == true){
            //function to make two option alert
            Alert.alert(
              //title
              'Send email',
              //body
              'Do you want to send email ?',
              [
                {text: 'Yes', onPress: () => this.openURL('mailto:' + this.props.email)},
                {text: 'No', onPress: () => console.log('No Pressed email'), style: 'cancel'},
              ],
              { cancelable: false }
              //clicking out side of alert will not cancel
            );
        }else{
            this.openURL('mailto:' + this.props.email);
        }

    }

    openURL(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.sendMail.bind(this)} style={styles.action}>
                    <Image source={require('./assets/email.png')} style={styles.icon} />
                    <Text style={styles.actionText}>email</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.callNumber.bind(this)} style={styles.action}>
                    <Image source={require('./assets/call.png')} style={styles.icon} />
                    <Text style={styles.actionText}>call</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.callENumber.bind(this)} style={styles.action}>
                    <Image source={require('./assets/ecall.png')} style={styles.icon} />
                    <Text style={styles.actionText}>e-call</Text>
                </TouchableOpacity>                
                <TouchableOpacity onPress={this.sendMessage.bind(this)} style={styles.action}>
                    <Image source={require('./assets/sms.png')} style={styles.icon} />
                    <Text style={styles.actionText}>message</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FAFAFF',
        paddingVertical: 8
    },
    action: {
        flex: 1,
        alignItems: 'center'
    },
    actionText: {
        color: '#007AFF'
    },
    icon: {
        height: 20,
        width: 20
    }
});