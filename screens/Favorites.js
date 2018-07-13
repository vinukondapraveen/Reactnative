import React, { Component } from 'react';
import {
  FlatList, Alert, AsyncStorage, AppRegistry,
  Text, View, Navigator, ProgressBar, ActivityIndicator, Platform, StyleSheet,
  Image, ViewPagerAndroid, TouchableOpacity, TouchableNativeFeedback, Button, TouchableHighlight, TextInput, NavigatorIOS, SafeListDetailPage, StatusBar
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
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';
import moment from 'moment';

var userID;


let head = <Image style={{ flex: 1, resizeMode: 'contain', alignItems: 'center', alignSelf: 'center', height: 44, width: 130 }} source={require('../images/header-logo.png')} />;
export default class SafeList extends React.Component {


  generateKey() {
    this.setState({ showDialog: false, decodeDialog: true });
    setTimeout(() => { this.setState({ decodeDialog: false }) }, 4000);
  }

  callTimer() {
    this.setState({ decodeDialog: false });
  }

  showDialog() {
    this.setState({ showDialog: true });
  }

  static navigationOptions = {




    headerLeft: null,
    headerTitle: head,

    headerRight: null,
    headerMode: 'none',
    mode: 'modal',
  }

  componentDidMount() {


    StatusBar.setHidden(false);


    this.callApi();
  }


  callApi() {
    var obj;
    var sta = AsyncStorage.getItem('loginObj').then((value) => {
      obj = JSON.parse(value);
      userID = obj.result.data.id;
      console.log("AsyncStorage loginObj=" + userID);

      var details = {
        user_id: userID,
      };


      console.log("list params=" + JSON.stringify(this.details));
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      let resp = fetch(AppConstants.BASE_URL + 'orders/list', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          //this.setState({loading: false});
          console.log('list resp == ' + JSON.stringify(responseJSON));
          // this.setState({loggedIn:true});
          if (responseJSON.result.hasOwnProperty('success')) {
            if (responseJSON.result.success == true) {
              // AsyncStorage.setItem('userinfo', JSON.stringify(responseJSON));  
              //navigate('SafeUserHome', { user: 'SafeUserHome' });
              //this.setState({loggedIn:true});
              //console.log('size'+responseJSON.result.data.safes.length);
              if (responseJSON.result.data.orders.length == 0) {
                this.setState({
                  loading: false,
                  safeListEmpty: true
                });
              }
              else {
                this.setState({
                  loading: false,
                  dataSource: responseJSON.result.data.orders
                })
              }




            }
            else {
              //Alert.alert(responseJSON.message.msg[0]);
              //navigate('SafeUserHome', { user: 'SafeUserHome' });
            }
          }
          else {
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
        showDialog: false,
        loading: true,
        decodeDialog: false,
        decodenumber: '',
        safeListEmpty: false
      };
  }

  async callDecodeApi(item, code) {
    var sta = await AsyncStorage.getItem('loginObj').then((value) => {
      console.log("AsyncStorage loginObj=" + value);
      var obj = JSON.parse(value);
      this.setState({ loading: true });
      var details = {
        // openCode : code,
        // safeSerailNumber : item.safe_serail_number,
        // safeid  : item.safeid,
        // user_id:obj.result.data.id

        openCode: 1234,
        safeSerailNumber: 255977,
        safeid: 88888888,
        user_id: userID
      };

      console.log("decode params=" + JSON.stringify(details));
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      let resp = fetch(AppConstants.BASE_URL + 'safes/decodeSafes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          this.setState({ loading: false });
          console.log('decode resp == ' + JSON.stringify(responseJSON));
          // this.setState({loggedIn:true});
          if (responseJSON.result.hasOwnProperty('success')) {
            if (responseJSON.result.success == true) {

              this.setState({
                decodenumber: responseJSON.result.data.decodeNumber,
                decodeDialog: true
              })


            }
            else {
              Alert.alert(responseJSON.result.message);
              //navigate('SafeUserHome', { user: 'SafeUserHome' });
            }
          }
          else {
            Alert.alert("Decode Failed");
            // navigate('SafeUserHome', { user: 'SafeUserHome' });
          }
        })
        .done();

      console.log("i am here");
    });
  }


  callDecodeApi1(item, code) {


    // this.setState({loading: false});
  }




  redirectToDetailPage(item) {
    this.props.navigation.navigate('OrdersDetail', { name: item });
  }
  alertWithTextField(decodeData) {

    prompt(
      decodeData.facility_name,
      'Enter your password to decode your safe.',
      [
        { text: 'OK', onPress: password => { console.log('OK Pressed, password: ' + password); this.callDecodeApi(decodeData, password) } },
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
    if (this.state.loading == true) {
      return (<View style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <SleekLoadingIndicator style={{ backgroundColor: 'transparent' }} text="Loading..." loading={this.state.loading} />
      </View>);
    }

    else if (this.state.safeListEmpty == true) {
      return (
        <View style={{
          flex: 1, alignItems: 'center',
          justifyContent: 'center', backgroundColor: '#F0F0F0'
        }}>
          <Text style={{
            fontSize: 18,
            padding: 10,
            textAlign: 'center', fontWeight: 'bold', color: 'gray'
          }}>No Safes Found
                  </Text>
        </View>
      );
    }
    else {
      return (

        <View style={{ backgroundColor: '#F0F0F0' }}>
          <View style={{ flexDirection: 'row', height: 30, alignItems: 'center', backgroundColor: '#ECEFF1' }}>

            <Text style={{ width: '22%', marginLeft: 10, justifyContent: 'center', alignItems: 'center', fontSize: 14, color: '#59646A' }}>
              {"ID"}
            </Text>

            <Text style={{
              marginLeft: 15,
              marginRight: 15,
              width: '33%', justifyContent: 'center', alignItems: 'center', fontSize: 14, color: '#59646A',
            }}>
              {"Facility Name"}
            </Text>

            <Text style={{ left: 15, width: '33%', textAlign: 'center', fontSize: 14, color: '#59646A' }}>
              {"Status"}
            </Text>
          </View>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (

              <TouchableOpacity onPress={this.redirectToDetailPage.bind(this, item)}>

                <View style={{

                  backgroundColor: '#FFFFFF', flexDirection: 'row', shadowColor: '#000',
                  shadowOffset: { width: 0, height: 0.5 },
                  shadowOpacity: 0.3,
                  shadowRadius: 1,

                }}>
                  <View style={{ width: '22%', marginLeft: 10, marginTop: 10 }}><Text style={{ color: '#3B4449', fontSize: 14 }}>{item.ID}</Text> </View>
                  <View style={styles.textContainer}>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#3B4449' }}>{item.firstname}
                    </Text>
                    <View style={{
                       flexDirection: 'row', height: 'auto', marginTop: 10
                    }}>
                      <Text style={{ marginTop: 5, fontSize: 12, color: '#59646A' }}>
                        {"Date : "}
                      </Text>
                      <Text style={{ marginTop: 5, fontSize: 14, color: '#3B4449' }}>
                        {moment(item.date).format('MMM d, YYYY')}
                      </Text>

                    </View>
                    <View style={{
                       flexDirection: 'row',marginBottom: 10
                    }}>
                      <Text style={{ marginTop: 5, fontSize: 12, color: '#59646A' }}>
                        {"Total : "}
                      </Text>
                      <Text style={{ marginTop: 5, fontSize: 14, color: '#3B4449' }}>
                        {'$'+item.price}
                      </Text>

                    </View>

         


                  </View>
                  <View style={{
                    marginTop: 10, marginLeft: 10
                  }}>
                    <Text style={{
                      fontSize: 14, color: '#6C7B83',
                    }}>
                      {item.status}
                    </Text>

                  </View>

                  <View style={{ marginRight: 10 }} >
                    <Image source={require('../images/right_arrow.png')} style={styles.rightArrowImage}></Image>

                  </View>
                </View>
              </TouchableOpacity>
            )}

          />
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
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10

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
  },
  rightArrowImage: {
    // right: -40,

    // right: 5,
    flex: 1,

    height: 10,
    width: 10,
    resizeMode: "contain",
    alignItems: 'center',
    justifyContent: 'center',
    // top: '10%'

  },



});


