import React, { Component } from 'react';
import {
  FlatList, Alert, AsyncStorage, AppRegistry,
  Text, View, Navigator, ProgressBar, ActivityIndicator, Platform, StyleSheet,
  Image, ViewPagerAndroid, TouchableOpacity, TouchableNativeFeedback, Button, TouchableHighlight, TextInput,NavigatorIOS,SafeListDetailPage
} from 'react-native';
import { ListItem } from "react-native-elements";
// import Prompt from 'react-native-prompt'
import PropTypes from 'prop-types';
import prompt from 'react-native-prompt-android';
import SafeDetails from './SafeDetails';
import {
  StackNavigator,
} from 'react-navigation';


const list = [
  {
    name: 'ASSA ABLOU Infinity',
    icon: 'av-timer',
    serial: 2314242,
    key: 1,
  },
  {

    name: 'ASSA ABLOU Sentinel',
    icon: 'flight-takeoff',
    serial: 72398149861,
    key: 2,
  },
  {
    name: 'ASSA ABLOU Zenth',
    icon: 'flight-takeoff',
    serial: 8209183098,
    key: 3,
  },
  {
    name: 'ASSA ABLOU Aeyri',
    icon: 'flight-takeoff',
    serial: 88809183098,
    key: 4,
  },
  {
    name: 'ASSA ABLOU dahdjkh',
    icon: 'flight-takeoff',
    serial: 99209145098,
    key: 5,
  }, {
    name: 'ASSA ABLOU Infinity',
    icon: 'av-timer',
    serial: 2314242,
    key: 6,
  },
  {
    name: 'ASSA ABLOU Sentinel',
    icon: 'flight-takeoff',
    serial: 72398149861,
    key: 7,
  },
  {
    name: 'ASSA ABLOU Zenth',
    icon: 'flight-takeoff',
    serial: 8209183098,
    key: 8,
  },
  {
    name: 'ASSA ABLOU Aeyri',
    icon: 'flight-takeoff',
    serial: 88809183098,
    key: 9,
  },
  {
    name: 'ASSA ABLOU dahdjkh',
    icon: 'flight-takeoff',
    serial: 99209145098,
    key: 10,
  }, {
    name: 'ASSA ABLOU Infinity',
    icon: 'av-timer',
    serial: 2314242,
    key: 11,
  },
  {
    name: 'ASSA ABLOU Sentinel',
    icon: 'flight-takeoff',
    serial: 72398149861,
    key: 12,
  },
  {
    name: 'ASSA ABLOU Zenth',
    icon: 'flight-takeoff',
    serial: 8209183098,
    key: 13,
  },
  {
    name: 'ASSA ABLOU Aeyri',
    icon: 'flight-takeoff',
    serial: 88809183098,
    key: 14,
  },
  {
    name: 'ASSA ABLOU dahdjkh',
    icon: 'flight-takeoff',
    serial: 99209145098,
    key: 15,
  }
]

export default class SafeList extends React.Component {
  

  
  constructor(props) {
    super(props);
    navigate = props.navigation,
    
    this.state = {
      message: '',
      promptVisible: false
    };
  }

  
  redirectToDetailPage(item){
    this.props.navigation.navigate('SafeDetails', {name: item});
    
    // this.props.navigator.push('SafeDetails');
    //this.props.navigation('SafeDetails');
  }
  alertWithTextField(decodeData) {

    prompt(
      decodeData,
      'Enter your password to claim your $1.5B in lottery winnings',
      [
        { text: 'OK', onPress: password => console.log('OK Pressed, password: ' + password) },
      ],
      {
        type: 'secure-text',
        cancelable: false,
        defaultValue: 'test',
        placeholder: 'placeholder'
      }
    );

  }
  
  render() {
    
    return (

      <View style={{ backgroundColor: '#F0F0F0' }}>
       

        <FlatList
          data={list}
          renderItem={({ item }) => (  
            <TouchableOpacity onPress={this.redirectToDetailPage.bind(this,item)}>

              <View style={{
                backgroundColor: '#FFFFFF', marginLeft: 10, marginRight: 10, marginTop: 10, flexDirection: 'row', shadowColor: '#000',
                shadowOffset: { width: 0, height: 0.5 },
                shadowOpacity: 0.2,
                shadowRadius: 1,

              }}>

                <Image source={require('../images/zenith.jpg')} style={styles.Imagecontainer}></Image>

                <View style={styles.textContainer}>
                  <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'gray' }}>{item.name}
                  </Text>
                  <Text style={{ marginTop: 5, fontSize: 14, color: 'lightgray' }}>
                    {item.serial}
                  </Text>
                </View>
                <View style={styles.buttonHoldStyle}>

                  <TouchableHighlight underlayColor='rgba(245,135,0,0.9)' style={styles.submit} onPress={this.alertWithTextField.bind(this, item.name)}>
                    <Text style={styles.submitText}>Decode</Text>
                  </TouchableHighlight>

                </View>



              </View>
            </TouchableOpacity>


          )}

        />
        {/* <Prompt title="Say something"  placeholder="Start typing"  defaultValue="Hello"  visible={this.state.promptVisible} onCancel={() => this.setState({ promptVisible: false, message: "You cancelled" })}
            onSubmit={(value) => this.setState({ promptVisible: false, message: `You said "${value}"` })}/>  */}
      </View>
 
    );
  }
}

const SampleApp = StackNavigator({
  Home:{screen:SafeList},
  SafeDetails:{screen: SafeDetails}
});
 
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
    marginLeft: 20,

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

});


