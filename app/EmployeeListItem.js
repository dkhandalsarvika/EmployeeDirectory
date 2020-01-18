import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image'

export default class EmployeeListItem extends Component {

    showDetails() {
        this.props.navigator.push({name: 'details', data: this.props.data, title: this.props.data.firstName + " " + this.props.data.lastName});
    }

    render() {
        return (
            <TouchableHighlight onPress={this.showDetails.bind(this)} underlayColor={'#EEEEEE'}>
                <View style={styles.container}>
                <FastImage source={{uri: this.props.data.picture,priority: FastImage.priority.normal}} style={styles.picture} resizeMode={FastImage.resizeMode.cover}/>
                    <View>
                        <Text style={styles.empNameText}>{this.props.data.firstName} {this.props.data.lastName}</Text>
                        <Text style={styles.title}>{this.props.data.title}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
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
    empNameText: {
        color: '#00B386',
        fontWeight: 'bold',
        fontSize: 16
    }
});
