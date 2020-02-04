import React, {Component} from 'react';
import {View, StyleSheet,FlatList,Text,Alert} from 'react-native';
//import { List, ListItem, Avatar } from "react-native-elements";
import ListView from 'deprecated-react-native-listview';
import SearchBar from './SearchBar';
import EmployeeListItem from './EmployeeListItem';
import * as employeeServiceRest from './services/employee-service-rest';
import * as employeeServiceMock from './services/employee-service-mock';
import { CheckConnectivity } from "./util/NetworkInfo";
var employeeService;

export default class EmployeeList extends Component {

    constructor() {
        super();        

        console.log(CheckConnectivity._55);

        this.serviceCall();
    }

    serviceCall(){
        if(!CheckConnectivity._55){
             Alert.alert(
              //title
              'Network not accessible',
              //body
              'Employee list showing from local.',
              [
                {text: 'OK', onPress: () => console.log('Cancelled showing details from locally'), style: 'cancel'},
              ],
              { cancelable: false }
              //clicking out side of alert will not cancel
            );
        }

        if(CheckConnectivity._55){
            console.log("DKS online EmployeeList");
            employeeService = employeeServiceRest;
        }else{
            console.log("DKS not online EmployeeList");
            employeeService = employeeServiceMock;
        }

        this.state = {
                        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
                    };
        employeeService.findAll().then(employees => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(employees)
            });
        });
    }

    search(key) {
        employeeService.findByName(key).then(employees => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(employees)
            });
        });        
    }

    render() {
        return (
                <ListView style={styles.container}
                          dataSource={this.state.dataSource}
                          stickyHeaderIndices={[0]}
                          enableEmptySections={true}
                          renderRow={(data) => <EmployeeListItem navigator={this.props.navigator} data={data} />}
                          renderSeparator={ (sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                          renderHeader={() => <SearchBar onChange={this.search.bind(this)} />}
                />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1B2732',
        marginTop: 50
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#AAAAAA'
    },
    whiteText: {
        color: '#FFFFFF',
        fontSize: 20
    }
});