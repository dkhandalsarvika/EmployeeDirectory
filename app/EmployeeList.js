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

// export default class EmployeeList extends Component {  



//     constructor(props) {
//         super(props);


//         this.state = {
//                 data: [] 
//             }

//         employeeService.findAll().then(employees => {
//             // data = employees;
//             // // Alert.alert(data[0].email); 
//             // console.log(data[0].email);
//             this.setState({
//                 data: employees
//             });
//         });
//     }

//     renderSeparator = () => {  
//         return (  
//             <View  
//                 style={{  
//                     height: 1,  
//                     width: "100%",  
//                     backgroundColor: "#000",  
//                 }}  
//             />  
//         );  
//     };  

//     renderHeader = () => {
//         return <SearchBar placeholder="Type Here..." lightTheme round />;
//     };

//     //handling onPress action  
//     getListViewItem = (item) => {  
//         Alert.alert(item.email);  
//     }  
    
//   renderSeparator = () => {
//     return (
//         <View
//             style={{
//             height: 1,
//             width: "86%",
//             backgroundColor: "#CED0CE",
//             marginLeft: "14%"
//             }}
//         />
//         );
//     };
  
//     render() {  
//         return (  
//             // <View style={styles.container}>  
//                 <FlatList  
//                     data={
//                         this.state.data
//                     } 
//                      renderItem={({ item }) => (
//                         <ListItem
//                         leftAvatar={{
//                             title: item.firstName[0],
//                             source: { uri: item.picture }
//                         }}
//                         title={`${item.firstName} ${item.lastName}`} //{item.firstName + " " + item.lastName}
//                         subtitle={item.email}
//                         //onPress={this.getListViewItem.bind(this, item)}
//                         chevron
//                         />
//                     )}
//                     keyExtractor={item => item.email}

//                     ItemSeparatorComponent={this.renderSeparator}
//                     ListHeaderComponent={this.renderHeader}
//                     stickyHeaderIndices={[0]}
//                 />  
//         //    </View>  
//         );  
//     }  
// } 

// const styles = StyleSheet.create({  
//     container: {  
//         flex: 1,  
//     },  
//     item: {  
//         padding: 10,  
//         fontSize: 18,  
//         height: 44,  
//     }
// });  

export default class EmployeeList extends Component {
 


    constructor() {
        super();        

        console.log(CheckConnectivity._55);

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
        if(!CheckConnectivity._55){
            return (
            <View style={styles.viewDataLocal}>
              <Text style={styles.whiteText}>Showing details from local</Text>
            </View>,
                <ListView style={styles.container}
                          dataSource={this.state.dataSource}
                          stickyHeaderIndices={[0]}
                          enableEmptySections={true}
                          renderRow={(data) => <EmployeeListItem navigator={this.props.navigator} data={data} />}
                          renderSeparator={ (sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                          renderHeader={() => <SearchBar onChange={this.search.bind(this)} />}
                />
        );
        }else{
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
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1B2732',
        marginTop: CheckConnectivity._55 ? 50 : 100
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#AAAAAA'
    },
    viewDataLocal: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: CheckConnectivity._55 ? 0 : 60,
        height: CheckConnectivity._55 ? 0 : 40,
        backgroundColor: '#AAAAAA'

    },
    whiteText: {
        color: '#FFFFFF',
        fontSize: 20
    }
});