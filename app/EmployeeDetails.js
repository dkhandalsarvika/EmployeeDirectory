import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Navigator,Platform,BackHandler, Alert, AsyncStorage } from 'react-native';
import ListView from 'deprecated-react-native-listview';
import ActionBar from './ActionBar';
import EmployeeListItem from './EmployeeListItem';
import FastImage from 'react-native-fast-image'
import * as employeeServiceRest from './services/employee-service-rest';
import * as employeeServiceMock from './services/employee-service-mock';
import { CheckConnectivity } from "./util/NetworkInfo";
import * as ConstantsClass from './util/Constants';
var employeeService;

export default class EmployeeDetails extends Component {

    constructor(props) {
        super(props);

        if(CheckConnectivity._55){
            console.log("Device online EmployeeList");
            employeeService = employeeServiceRest;
        }else{
            console.log("Device not online EmployeeList");
            employeeService = employeeServiceMock;
        }
        this.state = {dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})};
        employeeService.findById(this.props.data.id).then(employee => {
            this.setState({
                employee: employee,
                dataSource: this.state.dataSource.cloneWithRows(employee.reports)
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

        getData = async ()=>{
          try {
            console.log('Getting user from AsyncStorage');
            let user = await AsyncStorage.getItem('user')
            let parsedUser = JSON.parse(user); 
            console.log(parsedUser.email);
            console.log(this.state.employee.email)
            if(user !== null){
              // value previously stored
              if(parsedUser.email === this.state.employee.email){ // || parsedUser.email === ConstantsClass.ADMIN_EMAIL
                this.props.navigator.push({name: 'details-employee', data: this.props.data,title: this.state.employee.firstName + " " +this.state.employee.lastName});        
              }
              else if(parsedUser.email !== this.state.employee.email){
                // console.log(this.state.employee.isAdmin);
                var isAdmin = false;
                if(this.state.employee.isAdmin === undefined || this.state.employee.isAdmin === null){
                    isAdmin = false;
                }else{
                    isAdmin = this.state.employee.isAdmin === true ? true : false;
                }

                // if user has admin permission then will able to edit other details also
                if(isAdmin){
                    this.props.navigator.push({name: 'details-employee', data: this.props.data,title: this.state.employee.firstName + " " +this.state.employee.lastName});        
                }else{
                    // if another user come to edit then prompt alert message
                   Alert.alert(
                      //title
                      'Edit Details',
                      //body
                      'You do not have privilege to edit other details.',
                      [
                        {text: 'OK', onPress: () => console.log('Cancelled while edit other details'), style: 'cancel'},
                      ],
                      { cancelable: false }
                      //clicking out side of alert will not cancel
                    );
                }

 
              }else{
                Alert.alert(
                  //title
                  'Edit Details',
                  //body
                  'Please login again to edit your details.',
                  [
                    {text: 'OK', onPress: () => console.log('Cancelled while need to edit details'), style: 'cancel'},
                  ],
                  { cancelable: false }
                  //clicking out side of alert will not cancel
                );
              }
            }else{
                console.log('user not found');
            }
          } catch(e) {
            // error reading value
            console.log('error reading value useremail');
          }
        } 

    openManager() {
        this.props.navigator.push({name: 'details', data: this.state.employee.manager,title: this.state.employee.manager.firstName + " " +this.state.employee.manager.lastName});
    }

    openEmployee() {
        console.log('came into openEmployee');
        // let userEmail = AsyncStorage.getItem('useremail')
        // console.log(userEmail);
        // console.log('came into openEmployee post');
        this.getData();

        
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

    render() {
        if (this.state && this.state.employee) {
            let employee = this.state.employee;
            let manager;
            if (employee.manager) {
                manager = <TouchableOpacity style={styles.manager} onPress={this.openManager.bind(this)}>
                            <FastImage source={{uri: employee.manager.picture,priority: FastImage.priority.normal}} style={styles.smallPicture} resizeMode={FastImage.resizeMode.cover}/>
                            <Text style={styles.blackText}>{employee.manager.firstName} {employee.manager.lastName}</Text>
                            <Text style={styles.lightText}>{employee.manager.title}</Text>
                          </TouchableOpacity>;
            }
            let directReports;
            if (employee.reports && employee.reports.length > 0) {
                directReports =
                    <ListView style={styles.list}
                              dataSource={this.state.dataSource}
                              enableEmptySections={true}
                              renderRow={(data) => <EmployeeListItem navigator={this.props.navigator} data={data} />}
                              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    />;
            } else {
                directReports = <View style={styles.emptyList}><Text style={styles.lightText}>No direct reports</Text></View>;
            }
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        {manager}
                        <TouchableOpacity style={styles.manager} onPress={this.openEmployee.bind(this)}>
                            <FastImage source={{uri: employee.picture,priority: FastImage.priority.normal}} style={styles.picture} resizeMode={FastImage.resizeMode.cover} />
                            <Text style={styles.bigText}>{employee.firstName} {employee.lastName}</Text>
                            <Text style={[styles.mediumText, styles.lightText]}>{employee.title}</Text>
                        </TouchableOpacity>
                        <ActionBar phone={employee.phone} ePhone={employee.mobilePhone} email={employee.email} />
                    </View>
                    {directReports}
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
        borderBottomWidth: 5//StyleSheet.hairlineWidth
    },
    manager: {
        paddingBottom: 10,
        alignItems: 'center'
    },
    picture: {
        width: 100,
        height: 100,
        borderRadius: 50,
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
    }
});