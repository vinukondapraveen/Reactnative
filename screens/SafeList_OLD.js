import React, { Component } from 'react';
import {
  FlatList, Alert, AsyncStorage, AppRegistry,
  Text, View, Navigator, ProgressBar, ActivityIndicator, Platform, StyleSheet,
  Image, ViewPagerAndroid, TouchableOpacity, TouchableNativeFeedback, Button, TouchableHighlight, TextInput,NavigatorIOS,SafeListDetailPage,StatusBar
} from 'react-native';
import { ListItem } from "react-native-elements";
import { EventRegister } from 'react-native-event-listeners'
import SleekLoadingIndicator from '../components/SleekLoadingIndicator';
// import Prompt from 'react-native-prompt'
import PropTypes from 'prop-types';
import prompt from 'react-native-prompt-android';
import SafeDetails from './SafeDetails';
import {
  StackNavigator,
} from 'react-navigation';
import AppConstants from '../AppConstants';
import { ConfirmDialog ,Dialog } from 'react-native-simple-dialogs';
var userID;
const list = [
  {
    name: 'ASSA ABLOY Zenith Drawer 15',
    icon: require('../images/1.jpg'),
    detailIcon: '1.jpg',
    
    serial: 2314242
  },
  {

    name: 'ASSA ABLOY Sentinel II 25',
    icon: require('../images/sentinel.jpg'),
    detailIcon: '../images/1.jpg',
    
    serial: 72398149861
  },
  {
    name: 'ASSA ABLOY Zenith Floor',
    icon: require('../images/zenith-floor.jpg'),
    detailIcon: '../images/1.jpg',
    
    serial: 8209183098
  },
  {
    name: 'ASSA ABLOU Aeyri',
    icon: require('../images/zenith.jpg'),
    serial: 88809183098
  },
  {
    name: 'ASSA ABLOU in-wall',
    icon: require('../images/zenith-in-wall.jpg'),
    serial: 99209145098
  }, {
    name: 'ASSA ABLOU Infinity',
    icon: require('../images/zenith-floor.jpg'),
    serial: 2314242
  },
  {
    name: 'ASSA ABLOU Sentinel',
    icon: require('../images/sentinel.jpg'),
    detailIcon: '../images/1.jpg',
    
    serial: 72398149861
  },
  {
    name: 'ASSA ABLOU Zenth',
    icon: require('../images/1.jpg'),
    serial: 8209183098
  },
  {
    name: 'ASSA ABLOU Aeyri',
    icon: require('../images/sentinel.jpg'),
    serial: 88809183098
  },
  {
    name: 'ASSA ABLOU dahdjkh',
    icon: require('../images/zenith-floor.jpg'),
    serial: 99209145098
  }, {
    name: 'ASSA ABLOU Infinity',
    icon: require('../images/zenith-in-wall.jpg'),
    serial: 2314242
  },
  {
    name: 'ASSA ABLOU Sentinel',
    icon: require('../images/1.jpg'),
    serial: 72398149861
  },
  {
    name: 'ASSA ABLOU Zenth',
    icon:  require('../images/sentinel.jpg'),
    serial: 8209183098
  },
  {
    name: 'ASSA ABLOU Aeyri',
    icon: require('../images/zenith-in-wall.jpg'),
    serial: 88809183098
  },
  {
    name: 'ASSA ABLOU dahdjkh',
    icon: require('../images/zenith-floor.jpg'),
    serial: 99209145098
  }
]

export default class SafeList extends React.Component {


   generateKey() {
        this.setState({ showDialog: false, decodeDialog:true });
         setTimeout(() => {this.setState({decodeDialog: false})}, 4000);
    }

    callTimer()
    {
      this.setState({decodeDialog: false});
    }

     showDialog() {
        this.setState({ showDialog: true  });
    }

  static navigationOptions = {
    title: 'Welcome',
  };

  componentDidMount() {
    SafeList: navigationOptions = {
      header: null
      };

  StatusBar.setHidden(false);


  this.callApi();
  }


  callApi()
  {
    var obj;
    var sta =  AsyncStorage.getItem('loginObj').then((value) => {
        obj = JSON.parse(value);
        userID = obj.result.data.id;
        console.log("AsyncStorage loginObj="+userID);
        
        var details = {
          user_id : userID,
           page : '0',
           perPage : 10,
           sort  : 'DESC',
       };
      

       console.log("list params="+JSON.stringify(this.details));
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
          let resp =  fetch(AppConstants.BASE_URL+'safes/list', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      })
      .then((response) => response.json())
      .then((responseJSON) => 
      { 
         //this.setState({loading: false});
         console.log('list resp == '+JSON.stringify(responseJSON));
          // this.setState({loggedIn:true});
         if(responseJSON.result.hasOwnProperty('success'))
         {
           if(responseJSON.result.success == true)
           {
             // AsyncStorage.setItem('userinfo', JSON.stringify(responseJSON));  
              //navigate('SafeUserHome', { user: 'SafeUserHome' });
              //this.setState({loggedIn:true});
              //console.log('size'+responseJSON.result.data.safes.length);
              if(responseJSON.result.data.safes.length == 0){
				this.setState({
             loading: false,
             safeListEmpty: true
           });
              }
              else{
              	this.setState({
             loading: false,
             dataSource: responseJSON.result.data.safes
           })
              }

              


           }
           else
           {
             //Alert.alert(responseJSON.message.msg[0]);
             //navigate('SafeUserHome', { user: 'SafeUserHome' });
           }
         }
         else
         {
          // Alert.alert("Login Failed");
          // navigate('SafeUserHome', { user: 'SafeUserHome' });
         }
      })
      .done();

       console.log("i am here");
      });
      
      // this.setState({loading: false});
  }
  
  constructor(props) {
    super(props);
    navigate = props.navigation,
    
    this.state = {
      message: '',
      promptVisible: false,
      showDialog:false,
       loading:true,
      decodeDialog:false,
      decodenumber:'',
      safeListEmpty:false
    };
  }

   async callDecodeApi(item,code) {
  var sta = await AsyncStorage.getItem('loginObj').then((value) => {
       console.log("AsyncStorage loginObj="+value);
       var obj = JSON.parse(value);
       this.setState({loading:true});
    var details = {
         // openCode : code,
         // safeSerailNumber : item.safe_serail_number,
         // safeid  : item.safeid,
         // user_id:obj.result.data.id

           openCode : 1234,
          safeSerailNumber : 255977,
          safeid  : 88888888,
          user_id:userID
      };

      console.log("decode params="+JSON.stringify(details));
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
          let resp =  fetch(AppConstants.BASE_URL+'safes/decodeSafes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      })
      .then((response) => response.json())
      .then((responseJSON) => 
      { 
         this.setState({loading: false});
         console.log('decode resp == '+JSON.stringify(responseJSON));
          // this.setState({loggedIn:true});
         if(responseJSON.result.hasOwnProperty('success'))
         {
           if(responseJSON.result.success == true)
           {

               this.setState({
                decodenumber:responseJSON.result.data.decodeNumber,
             decodeDialog: true
           })


           }
           else
           {
             Alert.alert(responseJSON.result.message);
             //navigate('SafeUserHome', { user: 'SafeUserHome' });
           }
         }
         else
         {
           Alert.alert("Decode Failed");
          // navigate('SafeUserHome', { user: 'SafeUserHome' });
         }
      })
      .done();

       console.log("i am here");
}); 
  }


  callDecodeApi1(item,code){

   
      // this.setState({loading: false});
  }



  
  redirectToDetailPage(item){
    this.props.navigation.navigate('SafeDetails', {name: item});
  }
  alertWithTextField(decodeData) {

    prompt(
      decodeData.facility_name,
      'Enter your password to decode your safe.',
      [
        { text: 'OK', onPress: password => {console.log('OK Pressed, password: ' + password); this.callDecodeApi(decodeData,password) }},
      ],
      {
        type: 'secure-text',
        cancelable: false,
        defaultValue: '',
        placeholder: 'password'
      }
    );

  }
  
  render() {
    var icon = require('../images/1.jpg');
    if(this.state.loading == true)
    {
        return(<View style={{ flex: 1,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
     backgroundColor:'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      }}>
        <SleekLoadingIndicator style = {{backgroundColor:'transparent'}} text="Loading..." loading={this.state.loading} />
      </View>);
    }

    else if(this.state.safeListEmpty == true){
    	 return (
 <View style={{  flex: 1,alignItems: 'center',   
    justifyContent: 'center',backgroundColor: '#F0F0F0' }}>
 <Text style={{     fontSize: 18,
 	padding:10,
    textAlign: 'center',fontWeight: 'bold', color: 'gray' }}>No Safes Found
                  </Text>
 </View>
 );
    }
    else
    {
      return (
      
      <View style={{ backgroundColor: '#F0F0F0' }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (  
                
            <TouchableOpacity onPress={this.redirectToDetailPage.bind(this,item)}>
            
            <View style={{
                
                backgroundColor: '#FFFFFF', marginLeft: 10, marginRight: 10, marginTop: 10, flexDirection: 'row', shadowColor: '#000',
                shadowOffset: { width: 0, height: 0.5 },
                shadowOpacity: 0.2,
                shadowRadius: 1,

              }}>
               <Image source={icon} style={styles.Imagecontainer}></Image>
                <View style={styles.textContainer}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'gray' }}>{item.facility_name}
                  </Text>
                  <Text style={{ marginTop: 5, fontSize: 14, color: 'lightgray' }}>
                    {item.safe_serail_number}
                  </Text>
                </View>
                <View style={styles.buttonHoldStyle}>

                  <TouchableHighlight underlayColor='rgba(245,135,0,0.9)' style={styles.submit} onPress={this.alertWithTextField.bind(this, item)}>
                    <Text style={styles.submitText}>Decode</Text>
                  </TouchableHighlight>

                </View>



              </View>
            </TouchableOpacity>


          )}

        />
        {/* <Prompt title="Say something"  placeholder="Start typing"  defaultValue="Hello"  visible={this.state.promptVisible} onCancel={() => this.setState({ promptVisible: false, message: "You cancelled" })}
            onSubmit={(value) => this.setState({ promptVisible: false, message: `You said "${value}"` })}/>  */}


                <Dialog
                    visible={this.state.showDialog}
                    title=""
                    onTouchOutside={() => this.setState({showDialog:false})}
                    contentStyle={{ justifyContent: 'center', alignItems: 'flex-start', }}
                    animationType="fade">
                    <View>

                        <View style={styles.detailRow}>

                          <View >
                          <Text >Serial No: </Text>
                          </View>


                          <TextInput 
                          editable={false}
                          returnKeyType = {"next"}
                          blurOnSubmit={ false }
                           onSubmitEditing={(event) => { 
                            this.refs.portinput.focus(); 
                          }}  
                          ref='serialno' 
                          style={styles.detailRowInput} 
                          placeholder={"Serial No"} 
                          underlineColorAndroid={'#e7e7e7'}
                          />


                          </View>


                            <View style={styles.detailRow}>
                              <View >
                              <Text >Port Number : </Text>
                              </View>
                              <TextInput 
                              ref='portinput' 
                              style={styles.detailRowInput} 
                              placeholder={"Port Number"} 
                              underlineColorAndroid={'#e7e7e7'}
                              />
                            </View>
                    <Button   color="rgba(245,135,0,0.9)" onPress={() => this.generateKey()} style={{ marginTop: 10 }} title="Decode" />
                 </View>
                </Dialog>

                  <Dialog
                    visible={this.state.decodeDialog}
                    title=""
                  
                    contentStyle={{ justifyContent: 'center', alignItems: 'center', }}
                    animationType="fade">
                      <View>
                        <Text >Decode Number : {this.state.decodenumber}</Text>
                         <Button   color="rgba(245,135,0,0.9)" onPress={() => this.setState({decodeDialog:false})} style={{ marginTop: 10 }} title="OK" />
                      </View>
                  </Dialog>
              




      </View>
 
    );
    }
    
  }
}
 
const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },

  Imagecontainer: {
    //   flex: 1,
    //position: 'absolute',
    marginTop: 10,
    marginLeft: 5,
    marginBottom: 10,

    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'lightgray',
    borderRadius: 5,
    borderWidth: 0.5,


  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: 15,
    marginRight:15,

  },
  submit: {

    height: 32,
    width: 70,
    right: 10,
    backgroundColor: '#F58700',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,1)',
    alignItems: 'center',
    justifyContent: 'center',

  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },

  buttonHoldStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F58700',

  },

   detailscardView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },


  detailRow: {
    
    flexDirection: 'row',
     alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  detailRowLabel:
  {
  
  
    color: '#959da7',
    fontSize: 14,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  detailRowInput:
  {
     alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    color: '#8d8d8d',
    fontSize: 14,
  }

});


