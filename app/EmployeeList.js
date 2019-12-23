import React, {Component} from 'react';
import {View, StyleSheet,FlatList,Text,Alert} from 'react-native';
//import { List, ListItem, Avatar } from "react-native-elements";
import ListView from 'deprecated-react-native-listview';
import SearchBar from './SearchBar';
import EmployeeListItem from './EmployeeListItem';
import * as employeeService from './services/employee-service-mock';

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
                      enableEmptySections={true}
                      renderRow={(data) => <EmployeeListItem navigator={this.props.navigator} data={data} />}
                      renderSeparator={ (sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                      renderHeader={() => <SearchBar onChange={this.search.bind(this)} placeholder="Type Here..." lightTheme round />}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        marginTop: 60
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#AAAAAA',
    }
});