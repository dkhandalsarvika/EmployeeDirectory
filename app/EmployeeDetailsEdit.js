import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Navigator,Platform,BackHandler, ScrollView, Linking } from 'react-native';
import ListView from 'deprecated-react-native-listview';
import EmployeeListItem from './EmployeeListItem';
import FastImage from 'react-native-fast-image'
import * as employeeService from './services/employee-service-rest';
import { CheckConnectivity } from "./util/NetworkInfo";
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../src/core/theme';
import * as ConstantsClass from './util/Constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { emailValidator,fnameValidator,lnameValidator,phoneValidator,ephoneValidator } from '../src/core/utils';
import { Snackbar } from "react-native-paper";

export default class EmployeeDetailsEdit extends Component {

    constructor(props) {
        super(props);
        // console.log(this.props.data);

        this.updateFormField = this.updateFormField.bind(this)
        this.updateDetails = this.updateDetails.bind(this)

        this.state = {
                spinner: false,
                snackbarvisible: false,
                messagesnackbar: '',
                typesnackbar: "error",
                employee: this.props.data,
                id: this.props.data.id,
                empId: this.props.data.empId,
                firstName: this.props.data.firstName,
                lastName: this.props.data.lastName,
                title: this.props.data.title,
                email: this.props.data.email,
                phone: this.props.data.phone,
                mobilePhone: this.props.data.mobilePhone
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



    updateFormField (fieldName) {
        return (event) => {
          this.setState({
            [fieldName]: event.nativeEvent.text ? event.nativeEvent.text : this.props.data[fieldName],
          })
        }
    }

    validateFields(id,empId,firstName,lastName,title,email,phone,mobilePhone) {
        // console.log("validateFields");

        const firstNameError = fnameValidator(firstName);
        const lastNameError = lnameValidator(lastName);
        const emailError = emailValidator(email);
        const phoneError = phoneValidator(phone);
        const mobilePhoneError = ephoneValidator(mobilePhone);

        var errorMsg = "";
        if(firstNameError){
            errorMsg = firstNameError;
        }else if(lastNameError){
            errorMsg = lastNameError;
        }else if(emailError){
            errorMsg = emailError;
        }else if(phoneError){
            errorMsg = phoneError;
        }else if(mobilePhoneError){
            errorMsg = mobilePhoneError;
        }

        if (errorMsg.length > 0) {
            this.setState({
                messagesnackbar: errorMsg,
                typesnackbar: 'error',
                snackbarvisible: !this.state.snackbarvisible
            });
          return false;
        }
        return true;
    }

    updateDetails(){
     console.log("updateDetails");

     if(!CheckConnectivity._55){
        this.setState({
            messagesnackbar: "Please connect to network to update details.",
            typesnackbar: 'error',
            snackbarvisible: !this.state.snackbarvisible
        });
        return;
     }

        const {
              id,empId,firstName,lastName,title,email,phone,mobilePhone
            } = this.state

        //validate field code will come here
        if(!this.validateFields(id,empId,firstName,lastName,title,email,phone,mobilePhone)){
            return;
        }

        console.log("Came after validate");

        this.setState({
            spinner: !this.state.spinner
        });

         this.updateEmpDetails(id,empId,firstName,lastName,title,email,phone,mobilePhone);   
    }

    openEsslTimeTrack(){
     console.log("openEsslTimeTrack");   
        // this.props.navigator.push({name: 'webview-essl', data: this.state.employee, title: 'eTime Track'});        
        this.openURL(ConstantsClass.ESSL_TIME_TRACK_URL);
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

    updateEmpDetails(id,empId,firstName,lastName,title,email,phone,mobilePhone) {
        console.log(id);
        console.log(empId);
        console.log(firstName);
        console.log(lastName);
        console.log(title);
        console.log(email);
        console.log(phone);
        console.log(mobilePhone);

        // setTimeout(() => {
        //   this.setState({
        //     spinner: !this.state.spinner
        //   });
        // }, 2000);

        employeeService.updateById(id,empId,firstName,lastName,title,email,phone,mobilePhone)
        .then(employeedetail => {
            this.setState({
                spinner: !this.state.spinner,
                employee: employeedetail,
                messagesnackbar: "Details updated successfully.",
                typesnackbar: 'success',
                snackbarvisible: !this.state.snackbarvisible
            });
        })
        .catch((error) => {
          console.error(error);
            this.setState({
                spinner: !this.state.spinner,
                employee: this.props.data,
                messagesnackbar: "There is some error while updating.",
                typesnackbar: 'error',
                snackbarvisible: !this.state.snackbarvisible
            });
        });        
    }

    render() {
        if (this.state && this.state.employee) {
            let employee = this.state.employee;
            let messagesnackbar = this.state.messagesnackbar;
            let typesnackbar = this.state.typesnackbar;
            return (
                <View style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <Spinner
                          visible={this.state.spinner}
                          textContent={'Updating...'}
                          textStyle={styles.spinnerTextStyle}
                        />
                        <Snackbar
                          visible={this.state.snackbarvisible}
                          duration={3000}
                          onDismiss={() => this.setState({ snackbarvisible: !this.state.snackbarvisible })}
                          style={{
                            backgroundColor:
                              typesnackbar === "error" ? theme.colors.error : theme.colors.success
                          }}
                        >
                          <Text style={styles.snackbarcontent}>{messagesnackbar}</Text>
                        </Snackbar>
                        
                        <View style={styles.header}>
                            <FastImage source={{uri: employee.picture,priority: FastImage.priority.normal}} style={styles.picture} resizeMode={FastImage.resizeMode.cover} />
                        </View>
                         <Input placeholder={employee.empId} label = 'Employee ID' disabled={true}
                          leftIcon={ <Icon name='id-badge' size={24} color='#A3A3A3'/> }
                          errorStyle={{ color: 'red' }}
                          // errorMessage='Please enter your Employee ID'
                          editable = {false}
                          
                        />
                        <Input placeholder={employee.firstName} label = 'First Name' onChange={this.updateFormField('firstName')}
                          leftIcon={ <Icon name='user' size={24} color='#00B386'/> }
                          errorStyle={{ color: 'red' }}
                          // errorMessage='Please enter your First Name'
                        />
                        <Input placeholder={employee.lastName} label = 'Last Name' onChange={this.updateFormField('lastName')}
                          leftIcon={ <Icon name='user' size={24} color='#00B386'/> }
                          errorStyle={{ color: 'red' }}
                          // errorMessage='Please enter your Last Name'
                        />
                        <Input placeholder={employee.title} label = 'Designation' disabled={true} onChange={this.updateFormField('title')}
                          leftIcon={ <Icon name='black-tie' size={24} color='#A3A3A3'/> }
                          errorStyle={{ color: 'red' }}
                          // errorMessage='Please enter your Designation'
                          editable = {false}
                        />
                        <Input placeholder={employee.email} label = 'Email' onChange={this.updateFormField('email')}
                          leftIcon={ <Icon name='envelope' size={24} color='#00B386'/> }
                          errorStyle={{ color: 'red' }}
                          // errorMessage='Please enter your Email'
                        />
                        <Input placeholder={employee.phone} label = 'Phone' onChange={this.updateFormField('phone')} keyboardType='phone-pad'
                          leftIcon={ <Icon name='phone' size={24} color='#00B386'/> }
                          errorStyle={{ color: 'red' }}
                          // errorMessage='Please enter your Phone'
                        />
                        <Input placeholder={employee.mobilePhone} label = 'Emergency Phone' onChange={this.updateFormField('mobilePhone')} keyboardType='phone-pad'
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
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    snackbarcontent: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
        fontWeight: '500'
    },
    snackbarViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 60
    }
});