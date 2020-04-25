import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet,TouchableOpacity, Linking,Alert } from 'react-native';
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class EmployeeListItem extends Component {

    callNumber() {
        this.openURL('tel:' + this.props.data.phone);
    }

    showDetails() {
        this.props.navigator.push({name: 'details', data: this.props.data, title: this.props.data.firstName + " " + this.props.data.lastName});
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
        if (this.props.data) {
            const pageName = (this.props.navigator.getCurrentRoutes().length == 1) ? true : false;
            return (
                <TouchableHighlight onPress={this.showDetails.bind(this)} underlayColor={'#EEEEEE'}>
                    <View style={styles.container}>
                    <FastImage source={{uri: this.props.data.picture,priority: FastImage.priority.normal}} style={styles.picture} resizeMode={FastImage.resizeMode.cover}/>
                        <View style={styles.projectText}>
                            <Text style={styles.empNameText}>{this.props.data.firstName} {this.props.data.lastName}</Text>
                            <Text style={styles.title}>{this.props.data.title}</Text>
                        </View>
                        <View style={styles.moreContainer}>
                         {pageName ? (
                                <View style={styles.subContainer}>
                                    <TouchableOpacity onPress={this.callNumber.bind(this)} style={styles.action}>
                                        <Image source={require('./assets/call.png')} style={styles.icon} />
                                    </TouchableOpacity>
                                    <Icon name="chevron-right" size={15} style={styles.moreIcon} />
                                </View>
                            ) : (
                                <Icon name="chevron-right" size={15} style={styles.moreIcon} />
                            )
                         }
                           
                        </View>
                    </View>
                </TouchableHighlight>
            )
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        backgroundColor: '#1B2732'
    },
    picture: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8
    },
    title: {
        color: '#848484' //C7C7CC
    },
    projectText: {
        flex: 1,
        flexDirection: 'column'
    },
    empNameText: {
        color: '#00B386',
        fontWeight: 'bold',
        fontSize: 16
    },
    action: {
        marginRight: 25
    },
    icon: {
        height: 25,
        width: 25
    },
    moreIcon: {
     color: "#d6d7da"
   },
   moreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
   },
    subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
   }
});
