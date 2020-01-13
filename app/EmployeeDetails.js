import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ListView from 'deprecated-react-native-listview';
import ActionBar from './ActionBar';
import EmployeeListItem from './EmployeeListItem';
import * as employeeService from './services/employee-service-mock';
import FastImage from 'react-native-fast-image'

export default class EmployeeDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})};
        employeeService.findById(this.props.data.id).then(employee => {
            this.setState({
                employee: employee,
                dataSource: this.state.dataSource.cloneWithRows(employee.reports)
            });
        });
    }

    openManager() {
        this.props.navigator.push({name: 'details', data: this.state.employee.manager});
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
                        <FastImage source={{uri: employee.picture,priority: FastImage.priority.normal}} style={styles.picture} resizeMode={FastImage.resizeMode.cover}/>
                        <Text style={styles.bigText}>{employee.firstName} {employee.lastName}</Text>
                        <Text style={[styles.mediumText, styles.lightText]}>{employee.title}</Text>
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