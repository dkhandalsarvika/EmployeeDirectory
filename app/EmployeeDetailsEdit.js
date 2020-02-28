import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Navigator,Platform,BackHandler, ScrollView } from 'react-native';
import ListView from 'deprecated-react-native-listview';
import EmployeeListItem from './EmployeeListItem';
import FastImage from 'react-native-fast-image'
import * as employeeServiceRest from './services/employee-service-rest';
import * as employeeServiceMock from './services/employee-service-mock';
import { CheckConnectivity } from "./util/NetworkInfo";
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../src/core/theme';

export default class EmployeeDetailsEdit extends Component {



    constructor(props) {
        super(props);

        // console.log(CheckConnectivity._55);

        this.state = {
                employee: this.props.data
            };

            if (Platform.OS === 'android'){
                this.onBackButtonPressed1 = (() => {
                console.log("constructor onBackButtonPressed1 called");
                if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1){
                    this.props.navigator.pop();
                    return true; //avoid closing the app
                }
                    return false; //close the app
                }).bind(this) //don't forget bind this, you will remember anyway.
            }  
        }

    componentDidMount() {
        if (Platform.OS === 'android'){
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed1);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android'){
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed1);
        }
    }

    validateName() {
        console.log("validateName");
    }

    updateDetails(){
     console.log("updateDetails");   
    }

    openEsslTimeTrack(){
     console.log("openEsslTimeTrack");   
        this.props.navigator.push({name: 'webview-essl', data: this.state.employee, title: 'eTime Track'});        
    }

    render() {
        if (this.state && this.state.employee) {
            let employee = this.state.employee;
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.header}>
                            <FastImage source={{uri: employee.picture,priority: FastImage.priority.normal}} style={styles.picture} resizeMode={FastImage.resizeMode.cover} />
                        </View>
                         <Input placeholder={employee.empId} label = 'Employee ID' disabled={true}
                          leftIcon={ <Icon name='id-badge' size={24} color='#A3A3A3'/> }
                          errorStyle={{ color: 'red' }}
                          // errorMessage='Please enter your Employee ID'
                          editable = {false}
                          
                        />
                        <Input placeholder={employee.firstName} label = 'First Name'
                          leftIcon={ <Icon name='user' size={24} color='#00B386'/> }
                          errorStyle={{ color: 'red' }}
                          // errorMessage='Please enter your First Name'
                        />
                        <Input placeholder={employee.lastName} label = 'Last Name'
                          leftIcon={ <Icon name='user' size={24} color='#00B386'/> }
                          errorStyle={{ color: 'red' }}
                          // errorMessage='Please enter your Last Name'
                        />
                        <Input placeholder={employee.title} label = 'Designation' disabled={true}
                          leftIcon={ <Icon name='black-tie' size={24} color='#A3A3A3'/> }
                          errorStyle={{ color: 'red' }}
                          // errorMessage='Please enter your Designation'
                          editable = {false}
                        />
                        <Input placeholder={employee.email} label = 'Email'
                          leftIcon={ <Icon name='envelope' size={24} color='#00B386'/> }
                          errorStyle={{ color: 'red' }}
                          // errorMessage='Please enter your Email'
                        />
                        <Input placeholder={employee.phone} label = 'Phone'
                          leftIcon={ <Icon name='phone' size={24} color='#00B386'/> }
                          errorStyle={{ color: 'red' }}
                          // errorMessage='Please enter your Phone'
                        />
                        <Input placeholder={employee.mobilePhone} label = 'Emergency Phone'
                          leftIcon={ <Icon name='phone' size={24} color='red'/> }
                          errorStyle={{ color: 'red' }}
                          // errorMessage='Please enter your Emergency Phone'
                        />
                        <View style={styles.buttonContainer}>
                            <Button onPress={this.updateDetails} buttonStyle={styles.button}
                              title="UPDATE" titleStyle={styles.buttonTitle}
                            />

                            <Button onPress={this.openEsslTimeTrack.bind(this)} buttonStyle={styles.button} titleStyle={styles.buttonTitle}
                              icon={ <Icon name="arrow-right" size={15} color="white" />} iconRight
                              title="eTime Track "
                            />
                            
                        </View>

                    </ScrollView>
                </View>
            );
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        backgroundColor: '#1B2732',
        flex: 1
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#FAFAFF',
        paddingBottom: 4,
        borderBottomColor: '#00B386',
        borderBottomWidth: 2//StyleSheet.hairlineWidth
    },
    manager: {
        paddingBottom: 10,
        alignItems: 'center'
    },
    picture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 10
    },
    smallPicture: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginTop: 10
    },
    mediumText: {
        fontSize: 16,
    },
    bigText: {
        fontSize: 20
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#AAAAAA',
    },
    list: {
        flex: 1
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lightText: {
        color: '#00B386' //C7C7CC
    },
    blackText: {
        color: '#333333' //C7C7CC
    },
    scrollView: {
        backgroundColor: '#FAFAFF'//'#1B2732',
    },
    button: {
        width: '100%',
        marginVertical: 10,
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.buttonBorder
    },
    buttonTitle:{
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 26
    },
    buttonContainer:{
        padding: 10
    }
});