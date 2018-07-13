import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  uri,
  Button,
  TouchableHighlight,
  Navigator,TextInput,AsyncStorage,Alert
} from 'react-native';
import PropTypes from 'prop-types';
import prompt from 'react-native-prompt-android';
import { EventRegister } from 'react-native-event-listeners'
import { ConfirmDialog ,Dialog } from 'react-native-simple-dialogs';

import AppConstants from '../AppConstants';
import SleekLoadingIndicator from '../components/SleekLoadingIndicator';
var items;
var itemObj;
export default class SafeDetails extends Component<{}> {

constructor(props) {
    super(props);
  
    
    this.state = {
      showDialog:false,
      decodeDialog:false,
      loading:false,
      decodenumber:''
    };
  }

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

     async callDecodeApi(code) {
  var sta = await AsyncStorage.getItem('loginObj').then((value) => {
       console.log("AsyncStorage loginObj="+value);
       var obj = JSON.parse(value);
       this.setState({loading:true});
    var details = {
         // openCode : code,
         // safeSerailNumber : itemObj.safe_serail_number,
         // safeid  : itemObj.safeid,
         // user_id:obj.result.data.id

           openCode : 1234,
          safeSerailNumber : 255977,
          safeid  : 88888888,
          user_id:14
      };

      console.log("params="+JSON.stringify(details));
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
             // AsyncStorage.setItem('userinfo', JSON.stringify(responseJSON));  
              //navigate('SafeUserHome', { user: 'SafeUserHome' });
              //this.setState({loggedIn:true});

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

    callDecodeApi1(code){

    this.setState({loading:true});
    var details = {
          openCode : code,
          safeSerailNumber : itemObj.safe_serail_number,
          safeid  : itemObj.safeid,
          user_id:14
      };
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
             console.log("i am ggg");
             // AsyncStorage.setItem('userinfo', JSON.stringify(responseJSON));  
              //navigate('SafeUserHome', { user: 'SafeUserHome' });
              //this.setState({loggedIn:true});

              /*this.setState({
             loading: false,
             dataSource: responseJSON.result.data.safes
           })*/


           }
           else
           {
             console.log("i am msg");
             Alert.alert(responseJSON.result.message);
             //navigate('SafeUserHome', { user: 'SafeUserHome' });
           }
         }
         else
         {
           console.log("i am fa");
          // Alert.alert("Login Failed");
          // navigate('SafeUserHome', { user: 'SafeUserHome' });
         }
      })
      .done();

       console.log("i am here");
      // this.setState({loading: false});
  }


  static navigationOptions = ({ navigation }) => ({
   // items = navigation.state.params.item,
    title: `${navigation.state.params.name.facility_name}`,
    
  });
  
    
	alertWithTextField(decodeData) {
		
			prompt(
			  decodeData,
			  'Enter your password to decode your safe.',
			  [
				{ text: 'OK', onPress: password => {console.log('OK Pressed, password: ' + password);this.callDecodeApi(password); }},
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
        const { params } = this.props.navigation.state;
   const item = params ? params.name : null;
   itemObj = item;
   var  icon = require('../images/1.jpg');
   console.log("item details == "+JSON.stringify(item));   
   
   const list = [
    {
      name: 'ASSA ABLOY Zenith Drawer 15',
      icon: icon,
      serial: 2314242
    }]
    console.log("item details == "+list.icon);   
    if(this.state.loading == true){

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
    else{


    return (
      <View style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
        <View style={styles.imageHoldView}>
          <Image
            // source={require('../images/zenith-drawer.jpg')}
            source={icon}
           // source={require(item.detailIcon)}

           // source={require('../images/zenith-drawer.jpg')}

            style={styles.Imagecontainer}>
          </Image>
        </View>
        <View style={styles.textHoldView}>
          <View style={styles.textContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize:13,fontWeight: 'bold' , color: 'lightgray'}}>{'Location:'}
              </Text>
              <Text style={{ left: 12, fontSize:14,color: 'gray' }}>
                {item.safe_serail_number}
              </Text>
            </View>
            <View style={{ flexDirection: 'row',marginTop:10 }}>
              <Text style={{fontSize:13, fontWeight: 'bold' , color: 'lightgray'}}>{'Serial No:'}
              </Text>
            

              <Text style={{ left: 10,fontSize:14, color: 'gray' }}>
                {item.safe_serail_number}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonHoldStyle}>

          <TouchableHighlight underlayColor='rgba(245,135,0,0.9)' style={styles.submit} onPress={this.alertWithTextField.bind(this,'Decode Safe')}>
            <Text style={styles.submitText}>Decode</Text>
          </TouchableHighlight>

        </View>




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
  updateIndex(selectedIndex) {
  }

}

const styles = StyleSheet.create({
  submit: {
    height: 50,
    width: 180,
    backgroundColor: '#F58700',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,

  },
  shadowStyle:{
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,

  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
  Imagecontainer: {
    //   flex: 1,
    //position: 'absolute',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,

    flexGrow: 1,
    height: null,
    width: null,
    alignItems: 'center',
    justifyContent: 'center',


  },
  imageHoldView: {
    flex: .6,
    marginTop: 64,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,

  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    left: 50,
    flex: 1,
    marginRight:50,
    backgroundColor: '#FFFFFF',

  },
  textHoldView: {
    // flex: .2,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flex: .2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,

  },
  buttonHoldStyle: {
    margin: 50,
    //width: 160,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFF00',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
