import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Navigator,Platform,BackHandler, ScrollView, Linking, Dimensions } from 'react-native';
import ListView from 'deprecated-react-native-listview';
import EmployeeListItem from './EmployeeListItem';
import FastImage from 'react-native-fast-image';
import * as employeeService from './services/employee-service-rest';
import { CheckConnectivity } from "./util/NetworkInfo";
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../src/core/theme';
import * as ConstantsClass from './util/Constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { emailValidator,fnameValidator,lnameValidator,phoneValidator,ephoneValidator } from '../src/core/utils';
import { Snackbar } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";


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
                isDatePickerVisibleDOB:false,
                isDatePickerVisibleDOJ:false
            };

              employeeService.findById(this.props.data.id).then(employee => {
                  this.setState({
                      employee: employee,
                      id: employee.id,
                      empId: employee.empId,
                      firstName: employee.firstName,
                      lastName: employee.lastName,
                      title: employee.title,
                      email: employee.email,
                      phone: employee.phone,
                      mobilePhone: employee.mobilePhone,
                      picture: employee.picture,
                      dob: new Date(employee.dob),
                      doj: new Date(employee.doj),
                      bloodGrp: employee.bloodGrp,
                      passportNo: employee.passportNo                      
                  });
              });

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

     showDatePickerDOB = () => {
        this.setState({
            isDatePickerVisibleDOB: true
        });
      };
     
    hideDatePickerDOB = () => {
        this.setState({
            isDatePickerVisibleDOB: false
        });
      };
     
    handleConfirmDOB = date => {
        console.log("A DOB has been picked: ", date);
        this.state.dob = date;
        this.hideDatePickerDOB();
      };   

     showDatePickerDOJ = () => {
        this.setState({
            isDatePickerVisibleDOJ: true
        });
      };
     
    hideDatePickerDOJ = () => {
        this.setState({
            isDatePickerVisibleDOJ: false
        });
      };
     
    handleConfirmDOJ = date => {
        console.log("A DOJ has been picked: ", date);
        this.state.doj = date;
        this.hideDatePickerDOJ();
      };       

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
              id,empId,firstName,lastName,title,email,phone,mobilePhone,picture,dob,doj,bloodGrp,passportNo
            } = this.state

        //validate field code will come here
        if(!this.validateFields(id,empId,firstName,lastName,title,email,phone,mobilePhone)){
            return;
        }

        console.log("Came after validate");

        this.setState({
            spinner: !this.state.spinner
        });

         this.updateEmpDetails(id,empId,firstName,lastName,title,email,phone,mobilePhone,picture,dob,doj,bloodGrp,passportNo);   
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

    updateEmpDetails(id,empId,firstName,lastName,title,email,phone,mobilePhone,picture,dob,doj,bloodGrp,passportNo) {
        console.log(id);
        console.log(empId);
        console.log(firstName);
        console.log(lastName);
        console.log(title);
        console.log(email);
        console.log(phone);
        console.log(mobilePhone);
        console.log(picture);
        console.log(dob);
        console.log(doj);
        console.log(bloodGrp);
        console.log(passportNo);

        // setTimeout(() => {
        //   this.setState({
        //     spinner: !this.state.spinner
        //   });
        // }, 2000);

        employeeService.updateById(id,empId,firstName,lastName,title,email,phone,mobilePhone,picture,dob,doj,bloodGrp,passportNo)
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
            let screenHeight = Math.round(Dimensions.get('window').height);

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
                            marginBottom: screenHeight/2,
                            backgroundColor:
                              typesnackbar === "error" ? theme.colors.error : theme.colors.success
                          }}
                        >
                          <Text style={styles.snackbarcontent}>{messagesnackbar}</Text>
                        </Snackbar>
                        
                        <View style={styles.header}>
                            <FastImage source={{uri: employee.picture,priority: FastImage.priority.normal}} style={styles.picture} resizeMode={FastImage.resizeMode.cover} />
                        </View>

                        <View style={styles.containerMiddle}>
                            <View style={{flex:1}}>
                                 <Input placeholder={employee.empId} label = 'Employee ID' disabled={true}
                                  leftIcon={ <Icon name='id-badge' size={24} color='#A3A3A3' style={{justifyContent: 'flex-start'}}/> }
                                  errorStyle={{ color: 'red' }}
                                  // errorMessage='Please enter your Employee ID'
                                  editable = {false}
                                  
                                />
                            </View>
                            <View style={{flex:2}}>
                                <Input placeholder={employee.title} label = 'Designation' disabled={true} onChange={this.updateFormField('title')}
                                  leftIcon={ <Icon name='black-tie' size={24} color='#A3A3A3' style={{justifyContent: 'flex-end'}}/> }
                                  errorStyle={{ color: 'red' }}
                                  // errorMessage='Please enter your Designation'
                                  editable = {false}
                                />
                            </View>
                        </View>
                        
                        <Input placeholder={employee.email} label = 'Email' onChange={this.updateFormField('email')} disabled={true}
                          leftIcon={ <Icon name='envelope' size={24} color='#00B386'/> }
                          errorStyle={{ color: 'red' }}
                          // errorMessage='Please enter your Email'
                        /> 

                        <View style={styles.containerMiddle}>
                            <View style={{flex:1}}>
                                <Input placeholder={employee.firstName} label = 'First Name' onChange={this.updateFormField('firstName')}
                                  leftIcon={ <Icon name='user' size={24} color='#00B386' style={{justifyContent: 'flex-start'}}/> }
                                  errorStyle={{ color: 'red' }}
                                  // errorMessage='Please enter your First Name'
                                />
                            </View>
                            <View style={{flex:1}}>
                                  <Input placeholder={employee.lastName} label = 'Last Name' onChange={this.updateFormField('lastName')}
                                    leftIcon={ <Icon name='user' size={24} color='#00B386' style={{justifyContent: 'flex-end'}}/> }
                                    errorStyle={{ color: 'red' }}
                                    // errorMessage='Please enter your Last Name'
                                  />
                            </View>
                        </View>
                        
                        <View style={styles.containerMiddle}>
                            <View style={{flex:1}}>
                                <Input placeholder={employee.phone} label = 'Phone' onChange={this.updateFormField('phone')} keyboardType='phone-pad'
                                  leftIcon={ <Icon name='phone' size={24} color='#00B386' style={{justifyContent: 'flex-start'}}/> }
                                  errorStyle={{ color: 'red' }}
                                  // errorMessage='Please enter your Phone'
                                />
                            </View>
                            <View style={{flex:1}}>
                                <Input placeholder={employee.mobilePhone} label = 'Emergency Phone' onChange={this.updateFormField('mobilePhone')} keyboardType='phone-pad'
                                  leftIcon={ <Icon name='phone' size={24} color='red' style={{justifyContent: 'flex-end'}}/> }
                                  errorStyle={{ color: 'red' }}
                                  // errorMessage='Please enter your Emergency Phone'
                                />
                            </View>
                        </View>

                        <View style={styles.containerMiddle}>
                            <View style={{flex:1}}>
                                <Input placeholder={employee.bloodGrp} label = 'Blood Group' onChange={this.updateFormField('bloodGrp')}
                                  leftIcon={ <Icon name='tint' size={24} color='#00B386' style={{justifyContent: 'flex-start'}}/> }
                                  errorStyle={{ color: 'red' }}
                                  // errorMessage='Please enter your First Name'
                                />
                            </View>
                            <View style={{flex:1}}>
                                <Input placeholder={employee.passportNo} label = 'Passport Number' onChange={this.updateFormField('passportNo')}
                                  leftIcon={ <Icon name='address-card' size={24} color='#00B386' style={{justifyContent: 'flex-end'}}/> }
                                  errorStyle={{ color: 'red' }}
                                  // errorMessage='Please enter your First Name'
                                />
                            </View>
                        </View>                        
                                             
                        <View style={styles.containerDatePicker}>
                            <Text style={styles.datesText}>
                              Date Of Birth:
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                              <Text>
                                {this.state.dob.toString().substr(4, 12)}
                              </Text>           
                              <View>
                                  <Icon.Button name="calendar" onPress={this.showDatePickerDOB} size={24} color="#00B386" backgroundColor="#FAFAFF"/>
                              </View>
                            </View>                

                        </View>
                        <DateTimePickerModal
                            isVisible={this.state.isDatePickerVisibleDOB}
                            date={this.state.dob}
                            minimumDate={new Date(1920, 1, 1)}
                            maximumDate={new Date()}
                            mode="date"
                            onConfirm={this.handleConfirmDOB}
                            onCancel={this.hideDatePickerDOB}
                          />
                        <View style={styles.horizontalLine} />
                        <View style={styles.containerDatePicker}>
                            <Text style={styles.datesText}>
                              Date Of Joining:
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                              <Text>
                                {this.state.doj.toString().substr(4, 12)}
                              </Text>                                      
                              <View>
                                  <Icon.Button name="calendar" onPress={this.showDatePickerDOJ} size={24} color="#00B386" backgroundColor="#FAFAFF"/>
                              </View>
                            </View>                  

                        </View>                        
                        <DateTimePickerModal
                            isVisible={this.state.isDatePickerVisibleDOJ}
                            date={this.state.doj}
                            minimumDate={new Date(1920, 1, 1)}
                            maximumDate={new Date()}
                            mode="date"
                            onConfirm={this.handleConfirmDOJ}
                            onCancel={this.hideDatePickerDOJ}
                          />
                        <View style={styles.horizontalLine} />   

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
    },
    containerDatePicker: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    datesText: {
        fontSize: 16,
        color: '#87949F',
        fontWeight: 'bold'
    },
    containerMiddle: {
        flexDirection: 'row'
    },
    horizontalLine:{
      width:'95%',
      height:1,
      backgroundColor:'#A3A3A3',
      margin:10
    }
});