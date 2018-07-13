import React, { Component } from 'react';
import {ScrollView, Button, FlatList, Alert, AsyncStorage, AppRegistry, TouchableHighlight, Text, View, Navigator, ProgressBar, ActivityIndicator, Platform, StyleSheet, Image, ViewPagerAndroid, TouchableOpacity, TouchableNativeFeedback, TextInput } from 'react-native';
import SafeUserHome from './SafeUserHome';
import SleekLoadingIndicator from '../components/SleekLoadingIndicator'

export default class LoginScreen extends React.Component {
// this.props.navigation.navigate('SafeUserHome');
 constructor(props) {
      super(props);
      this.state = {username: '',password:'',loading:false};
    }

    signIn()
  {
    // navigate('SafeUserHome', { user: 'SafeUserHome' });
      /*const { navigate } = this.props.navigation;
     const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     if(this.state.username === '')
     {
      Alert.alert( "Please enter your email id");
     }
     else if(this.state.password === '')
     {
      Alert.alert( "Please enter your password");
     }
    else if (!reg.test(this.state.username))
    {
      Alert.alert( "Please enter valid email eddress");
    }
    else
    {
        this.setState({loading: true})
        console.log(this.state.username);
        console.log(this.state.password);
        var details = {
          deviceToken : 'fl8kFrL6ugs:APA91bF4DnI7QPF4P9DlC7dvqcP5bii63nR_xQi53cfxvvJcdSimlisNII8alsDR2vhjFXDqEn7bkwwc4xrXNQ1k4wEYKL9i38IexN3DRcIbaSHYr_p5XK-830rrDlT3ZVhiUqEZ4cUN',
          os_type : 'android',
          client_secret : '4arCxUpofTFYZDwL2sKtRIgDcMHluWlw',
          password : this.state.password,
          client_id : 'b1fAmfcyULdc61el',
          username : this.state.username,
          grant_type : 'password'
      };
    var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
          let resp =  fetch('https://staging.mintmesh.com/v1/ent/user/login', {
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
         console.log('resp == '+JSON.stringify(responseJSON));
         if(responseJSON.hasOwnProperty('status_code'))
         {
           if(responseJSON.status_code == 200)
           {
             // AsyncStorage.setItem('userinfo', JSON.stringify(responseJSON));  
              navigate('SafeUserHome', { user: 'SafeUserHome' });
           }
           else
           {
            Alert.alert(responseJSON.message.msg[0]);
           }
         }
         else
         {
          Alert.alert("Login Failed");
         }
      })
      .done();
    }*/
  }


  ///*<Image source={require('../images/loginbg.png')} style={styles.backgroundImage}/> */
  render() {
     const { navigate } = this.props.navigation;

     if(this.state.loading)
     {
        return 
        (
              <View style={{ flex: 1,
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
      </View>
        );
     }
     else
     {
    return (
 <ScrollView style={{
        flex:1,
         backgroundColor: '#efefef',
      }}>
      <View style={styles.container}>
        <Image source={require('../images/loginbg.png')} style={styles.backgroundImage} />

        <View style={styles.ImageMainView}>
          <Image style={styles.Logo} source={require('../images/splash_logo.png')} />
        </View>

        <View style={styles.FieldMainViewContainer}>
          <View style={styles.FieldMainView}>

            <TextInput
              style={styles.detailRowInput}
              placeholder={"Username"}
              underlineColorAndroid={'transparent'}
               onChangeText={(username) => this.setState({username})}
            />

          </View>
          <View style={styles.FieldMainView}>

            <TextInput
              style={styles.detailRowInput}
              placeholder={"Password"}
              underlineColorAndroid={'transparent'}
               onChangeText={(password) => this.setState({password})}
            />
          </View>
          <View style={styles.ButtonInnerView}>
            <TouchableHighlight underlayColor='rgba(245,135,0,0.9)' style={styles.submit} onPress={this.signIn.bind(this)}
            >
           
              <Text style={styles.submitText}>LOGIN</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.forgotView}>
            <TouchableHighlight  underlayColor="transparent" style={styles.forgotButton} onPress={() => {
              //this.props.navigation.navigate('SafeUserHome');
            }}>
           
           
              <Text style={styles.submitText}>Forgot Password?</Text>
            </TouchableHighlight>
          </View>


        </View>

      </View>
      </ScrollView>

    );
  }
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    // alignItems:'center',
    // justifyContent:'center',
    // resizeMode: 'contain',
    resizeMode: 'stretch', // or 'stretch'
   // alignSelf: 'stretch'
    
  },
  Logo: {
    //height: 120,
    //width:160,
    
  },
  loginMainView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

  },
  ImageMainView: {
    //flex: 1,
    height:120,
    alignItems: 'center',
  },
  FieldMainViewContainer:
  {
    width: '100%',
    flex: 1,
    top: 150,
    height: 180,
    // left: 30,
    // right: 30,

    // backgroundColor: 'gray'
  },
  FieldMainView: {
    marginTop: 10,
    height: 46,
    marginLeft: 30,
    marginRight: 30,

  },
  detailRowInput:
  {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#e6e6e6',
    fontSize: 13,
    padding: 10,
  },
  ButtonMainView:
  {
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
  },
  ButtonInnerView:
  {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    height: 50,

  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  submit: {
    flex: 1,
    backgroundColor: '#F58700',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',

  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },

  forgotView: {
    // marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    marginBottom:50,
    height: 50,
flex:1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  forgotButton: {
    width: 200,
    height: 40,
    // backgroundColor: '#F58700',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',

  },


});