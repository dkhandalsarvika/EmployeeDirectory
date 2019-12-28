import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Linking,Alert} from 'react-native';

export default class ActionBar extends Component {

    callNumber() {
        Alert.alert(this.props.phone);
        //this.openURL('tel:' + this.props.phone);
    }

    callENumber() {
        Alert.alert(this.props.ePhone);
        //this.openURL('tel:' + this.props.ePhone);
    }

    sendMessage() {
        Alert.alert(this.props.phone);
        //this.openURL('sms:' + this.props.phone);
    }

    sendMail() {    
        Alert.alert(this.props.email);
        //this.openURL('mailto:' + this.props.email);
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