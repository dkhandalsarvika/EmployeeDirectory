import React, { Component } from "react";
import { Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";


export const CheckConnectivity = NetInfo.fetch().then(state => {
			  console.log("Connection type:", state.type);
			  console.log("Is connected?:", state.isConnected);
			  console.log("Is isInternetReachable?:", state.isInternetReachable);
			  if(state.isConnected && state.isInternetReachable){
			  	return true;
			  }else{
			  	return false;
			  }
		});

 //  function CheckConnectivity(){
 //  	var isAvailable = false;
	// NetInfo.fetch().then(state => {
	// 	  console.log("Connection type:", state.type);
	// 	  console.log("Is connected?:", state.isConnected);
	// 	  console.log("Is isInternetReachable?:", state.isInternetReachable);
	// 	  if(state.isConnected ){
	// 	  	isAvailable = true;
	// 	  }else{
	// 	  	isAvailable = false;
	// 	  }
	// });
	// return isAvailable;
 //  } 

 //  export {
 //   CheckConnectivity
 //  };

// export default class NetworkInfo extends Component {

//   // constructor(props) {
//   //   super(props);
//   //   // this.state = {};
//   // }

//   export const CheckConnectivity=()=>{
//   	var isAvailable = false;
// 	NetInfo.fetch().then(state => {
// 		  console.log("Connection type:", state.type);
// 		  console.log("Is connected?:", state.isConnected);
// 		  console.log("Is isInternetReachable?:", state.isInternetReachable);
// 		  if(state.isConnected && state.isInternetReachable){
// 		  	isAvailable = true;
// 		  }else{
// 		  	isAvailable = false;
// 		  }
// 	});
// 	return isAvailable;
//   } 


// }

// export const CheckConnectivity = NetInfo.fetch().then(state => {
// 			  console.log("Connection type:", state.type);
// 			  console.log("Is connected?:", state.isConnected);
// 			  console.log("Is isInternetReachable?:", state.isInternetReachable);
// 			  if(state.isConnected && state.isInternetReachable){
// 			  	return true;
// 			  }else{
// 			  	return false;
// 			  }
// 		});

// export const CheckConnectivity = () =>  {
//     // For Android devices
//     if (Platform.OS === "android") {
//       NetInfo.isConnected.fetch().then(isConnected => {
//         if (isConnected) {
//           console.log("You are online!");
//           return true;
//         } else {
//           console.log("You are offline!");
//           return false;
//         }
//       });
//     } else {
//       // For iOS devices
//       NetInfo.isConnected.addEventListener(
//         "connectionChange",
//         this.handleFirstConnectivityChange
//       );
//     }
// };

//   handleFirstConnectivityChange = isConnected => {
//     NetInfo.isConnected.removeEventListener(
//       "connectionChange",
//       this.handleFirstConnectivityChange
//     );

//     if (isConnected === false) {
//       console.log("You are offline!");
//       return true;
//     } else {
//       console.log("You are online!");
//       return false;
//     }
//   };

// export default class NetworkInfo extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {};
//   }



// }
