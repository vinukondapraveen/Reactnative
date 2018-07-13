import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView, Alert, AsyncStorage, AppRegistry, Text, View, Navigator, ProgressBar, ActivityIndicator, Platform, StyleSheet, Image, ViewPagerAndroid, TouchableOpacity, TouchableNativeFeedback, TextInput } from 'react-native';
import PayPal from 'react-native-paypal-wrapper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { EventRegister } from 'react-native-event-listeners'

export default class ProfileScreen extends React.Component {
state= {
    editMode:false,
  };
  componentWillMount() {
   
    /* PayPal.initialize(PayPal.SANDBOX, "Ab7FPjyNHTB6jTNGumfkQLtEcUhS7B9LZIrKc2dI-gaT25bfX9dmN-lWCkoDkBL231mDsoKMss74LZhj");
     PayPal.pay({
       price: '40.70',
       currency: 'USD',
       description: 'Your description goes here',
     }).then(confirm => console.log('TEST', confirm))
       .catch(error => console.log(error));
     Profile: navigationOptions = {
       header: null
     };*/
    this.listener = EventRegister.addEventListener('myCustomEvent', (data) => {
      this.setState({
         editMode:data,
      });
       console.log("myCustomEvent loaded in profile::"+data);
    })
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener)
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Welcome',
    }
  };


  render() {
     console.log("component render in profile = "+this.state.editMode);
    return (
      //   if(this.state.data){
      //   console.log(this.state.data),
      // }

      //{/*<KeyboardAwareScrollView style={{ backgroundColor: '#fff' }}>*/}

         <ScrollView style={{
        flex: 1,
        backgroundColor: '#efefef',
      }}> 
        <View
          style={{
            flex: 1,
          }}>


          <View
            style={
              styles.mainView
            }>
            <View
              style={
                styles.profilecardView
              }>
              <View
                style={
                  styles.bgPicOuter
                }>

              <Image style={styles.bgPic} source={require('../images/profilebg.png')} ></Image> 
              </View>
              <View
                style={
                  styles.profilePicOuter
                }>

                <Image style={styles.profilePic} source={require('../images/react-navigation.png')} ></Image>
              </View>
            </View>

            <View
              style={
                styles.detailscardView
              }>
              <View style={styles.detailRow}>
                <View style={styles.RowLabelView}>
                  <Text style={styles.detailRowLabel}>First Name : </Text>
                </View>

                <TextInput returnKeyType = {"next"}
                blurOnSubmit={ false }
                 onSubmitEditing={(event) => { 
                  this.refs.lnameinput.focus(); 
                }}  ref='fnameinput' editable = {this.state.editMode} style={styles.detailRowInput} value={"React"} underlineColorAndroid={'#e7e7e7'}
                />

              </View>


              <View
                style={
                  styles.detailRow
                }>
                <View style={
                  styles.RowLabelView
                }>
                  <Text style={styles.detailRowLabel}>Last Name : </Text>
                </View>

                <TextInput
                returnKeyType = {"next"}
                blurOnSubmit={ false }
                 onSubmitEditing={(event) => { 
                  this.refs.emailinput.focus(); 
                }}
                 ref='lnameinput'
                editable = {this.state.editMode} 
                  style={styles.detailRowInput}
                  value={"Native"}
                  underlineColorAndroid={'#e7e7e7'}
                />

              </View>


              <View
                style={
                  styles.detailRow
                }>
                <View style={
                  styles.RowLabelView
                }>
                  <Text style={styles.detailRowLabel}>Email : </Text>
                </View>

                <TextInput
                returnKeyType = {"next"}
                blurOnSubmit={ false }
                 onSubmitEditing={(event) => { 
                  this.refs.contactinput.focus(); 
                }}
                ref='emailinput'
                editable = {this.state.editMode} 
                  style={styles.detailRowInput}
                  underlineColorAndroid={'#e7e7e7'}
                  value={"reactnative@facebook.com"}
                />

              </View>

              <View
                style={
                  styles.detailRow
                }>
                <View style={
                  styles.RowLabelView
                }>
                  <Text   style={styles.detailRowLabel}>Contact : </Text>
                </View>

                <TextInput
                ref='contactinput'
                editable = {this.state.editMode} 
                  style={styles.detailRowInput}
                  underlineColorAndroid={'#e7e7e7'}
                  value={"9876543210"}
                />

              </View>
            </View>
          </View>
        </View>
         </ScrollView> 

     // {/*</KeyboardAwareScrollView> */ }
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainView: {
    flex: 11,
    backgroundColor: '#fff',
    bottom: 0,
  },
  profilecardView: {
    justifyContent: 'center',
    alignItems: 'center',
    //margin:15,
    height: '50%',
    backgroundColor: '#fff',
    
  },
  bgPicOuter: {
    flex:1,
    
    // height: '50%',
    position: 'absolute',
    backgroundColor:'#fff',
    
  },
  bgPic: {
    // flex:0.5,
    // resizeMode: 'center',
    resizeMode: 'stretch',
   // resizeMode: 'contain',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  //  resizeMode: 'center',
  height:200,
flex:3,
  },
  profilePicOuter: {
    // flex:0.2,
    aspectRatio: 1,
    // height:100,
    //borderRadius: 50,
    height:'50%',
    width:'50%',
    borderRadius:100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  profilePic: {
    justifyContent: 'center',
    alignItems: 'center',
   // resizeMode: 'center',
   height:'80%',
   width:'80%',

  },

  detailscardView: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: 50,
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 30,
  },
  detailRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,

  },
  RowLabelView:
  {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  RowLabelInputView:
  {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  detailRowLabel:
  {
    marginLeft: 10,
    flex: 1,
    color: '#959da7',
    fontSize: 13,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  detailRowLabelEnd:
  {
    marginLeft: 20,
    marginTop: 20,
    flex: 1,
    color: '#959da7',
    fontSize: 13,
    backgroundColor: 'transparent',
  },
  detailRowInput:
  {
    flex: 2,
    color: '#8d8d8d',
    fontSize: 14,
    marginLeft: 5,
    alignItems: 'center',
    marginBottom: 0

  },



});