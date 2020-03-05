import React, {Component} from 'react';
import {View, StyleSheet,FlatList,Text,Alert,ActivityIndicator,RefreshControl} from 'react-native';
//import { List, ListItem, Avatar } from "react-native-elements";
import ListView from 'deprecated-react-native-listview';
import SearchBar from './SearchBar';
import EmployeeListItem from './EmployeeListItem';
import * as employeeServiceRest from './services/employee-service-rest';
import * as employeeServiceMock from './services/employee-service-mock';
import { CheckConnectivity } from "./util/NetworkInfo";
import Spinner from 'react-native-loading-spinner-overlay';
var employeeService;

export default class EmployeeList extends Component {

    constructor() {
        super();        

        this.state = {
          spinner: true,
          isLoading: true,
          refreshing: false,
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };

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
            console.log("Device online EmployeeList");
            employeeService = employeeServiceRest;
        }else{
            console.log("Device not online EmployeeList");
            employeeService = employeeServiceMock;
        }


        employeeService.findAll().then(employees => {
              setTimeout(() => {
                this.setState({
                  spinner: !this.state.spinner,
                  isLoading: false,
                  refreshing:false,
                  dataSource: this.state.dataSource.cloneWithRows(employees)
                });
              }, 1000);
        });
    }

    onRefresh() {

        this.setState({
            spinner: !this.state.spinner
        });
 
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     
        this.setState({dataSource : ds.cloneWithRows([ ])})
     
        this.serviceCall();
      
      }

    search(key) {
        employeeService.findByName(key).then(employees => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(employees)
            });
        });        
    }

    render() {
          if (this.state.isLoading) {
              return (
                <View style={styles.container}>
                  <View style={{flex: 1, paddingTop: 100}}>
                    <ActivityIndicator />
                  </View>
                  <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                  />
                </View>
              );
        }
        return (
            <View style={styles.container}>
                <Spinner
                  visible={this.state.spinner}
                  textContent={'Loading...'}
                  textStyle={styles.spinnerTextStyle}
                />
                <ListView
                          dataSource={this.state.dataSource}
                          stickyHeaderIndices={[0]}
                          enableEmptySections={true}
                          renderRow={(data) => <EmployeeListItem navigator={this.props.navigator} data={data} />}
                          renderSeparator={ (sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                          renderHeader={() => <SearchBar onChange={this.search.bind(this)} />}

                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1B2732',
        marginTop: 50,
        flex: 1
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#AAAAAA'
    },
    whiteText: {
        color: '#FFFFFF',
        fontSize: 20
    },
    spinnerTextStyle: {
        color: '#FFF'
    }
});