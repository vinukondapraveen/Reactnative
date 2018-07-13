import React, {Component} from 'react';
import {ScrollView,KeyboardAvoidingView,Alert,AsyncStorage,AppRegistry, Text, View, Navigator,ProgressBar,ActivityIndicator,Platform,StyleSheet,Image,ViewPagerAndroid,TouchableOpacity,TouchableNativeFeedback,TextInput} from 'react-native';
import PayPal from 'react-native-paypal-wrapper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { EventRegister } from 'react-native-event-listeners'
export default class ProfileScreen extends React.Component {
  
  componentWillMount() {
    console.log("cocomponentWillMountnfirm");
/*PayPal.initialize(PayPal.NO_NETWORK, "AbyfNDFV53djg6w4yYgiug_JaDfBSUiYI7o6NM9HE1CQ_qk9XxbUX0nwcPXXQHaNAWYtDfphQtWB3q4R");
PayPal.pay({
  price: '40.70',
  currency: 'MYR',
  description: 'Your description goes here',
}).then(confirm => console.log(confirm))
  .catch(error => console.log(error));*/

  this.listener = EventRegister.addEventListener('myCustomEvent', (data) => {
      this.setState({
         editMode:data,
      });
       console.log("myCustomEvent loaded in profile::"+data);
    })
  }

   state= {
    editMode:false,
  };

   componentWillUnmount() {
    EventRegister.removeEventListener(this.listener)
  }

  
  render() {
    return(
        <ScrollView style={{ flex:1,backgroundColor: '#fff',}}>
     <View
      style={{
        flex:1,
      }}> 

      <View 
      style={
        styles.bgPicOuter
      }> 
       
        <Image  style = {{flex:1,position:'absolute'}} source={require('../images/profilebg.png')} ></Image>
        <Image style={{flex:1,height:100,width:100,marginTop:-210}} source={require('../images/react-navigation.png')} ></Image>
      </View>

      
       </View>
      </ScrollView>
    	);
    }
  }

  const styles = StyleSheet.create({
    container:{
        flex: 1,
         backgroundColor: '#fff',
    },
   mainView: {
    flex: 11,
    backgroundColor: '#fff',
    bottom:0,
  },
  profilecardView: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   bgPicOuter : {
    flex:1,
      backgroundColor: '#fff',
     justifyContent: 'center',
     alignItems: 'center',
  },
   bgPic : {
     justifyContent: 'center',
     alignItems: 'center'
  },
   profilePicOuter1: {
      marginTop:-160,
    borderRadius:50,
    flex:1,
     justifyContent: 'center',
     alignItems: 'center',
     height:100,
     width:100
  },
  profilePic1: {
 position:'absolute',
    width:100,height:100,
    //marginTop: 20,
      backgroundColor: '#fff',
     justifyContent: 'center',
     alignItems: 'center'
  },
  profilePicOuter: {
   // position:'absolute',
    // flex:0.2,
    // height:100,
    //borderRadius: 50,
    height:'50%',
    width:'50%',
    borderRadius:100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'gray',
    marginTop:'-80%'
  },
  profilePic: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',

  },
 
  detailscardView: {
    flex:3,
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop:'30%',
    alignItems: 'center',
    marginRight:15,
    marginLeft:15,
    //marginBottom:30,
  },
  detailRow: {
    flex:1,
    flexDirection: 'row',
     alignItems: 'center',
    justifyContent:'center'
  },
  RowLabelView:
  {
     flex:1,
   justifyContent : 'flex-end',
   alignItems: 'flex-end',
  },
   RowLabelInputView:
  {
     flex:1,
   justifyContent : 'space-between',
   alignItems: 'flex-start',
  },
  
  detailRowLabel:
  {
    marginLeft:10,
    marginTop:20,
     flex:1,
    color:'#959da7',
    fontSize: 13,
    alignItems: 'center',
    backgroundColor:'transparent',
  },
  detailRowLabelEnd:
  {
    marginLeft:20,
    marginTop:20,
     flex:1,
    color:'#959da7',
    fontSize: 13,
    backgroundColor:'transparent',
  },
  detailRowInput:
  {
     flex:2,
    color:'#8d8d8d',
    fontSize: 14,
    marginLeft:5,
     alignItems: 'center',
     marginTop:7,
     marginBottom:0
    
  },
 


});