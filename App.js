/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Image,
  Alert,
  Dimensions, AsyncStorage,Animated, Button, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TextInput,StatusBar,ScrollView
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import TabNavigator from 'react-native-tab-navigator';
import LoginScreen from './screens/LoginScreen';
import SafeDetails from './screens/SafeDetails';
import SafeList from './screens/SafeList';
import prompt from 'react-native-prompt-android';
import Profile from './screens/Profile';
import SleekLoadingIndicator from './components/SleekLoadingIndicator';
import { EventRegister } from 'react-native-event-listeners'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import AppConstants from './AppConstants';

import { StacksInTabs } from './screens/TabbarRouter';

export default class HomeScreen extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),
    fadeAnim2: new Animated.Value(0),
    fadeAnim3: new Animated.Value(0),  // Initial value for opacity: 0
    splash: true,
    loggedIn:false,
    username: 'praveeni@enterpi.com',
    password:'12345678',
    loading:false
  }

   static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      headerMode: 'none'
    }
  };

 _storeData = async (inputRange) => {
   console.log("inputRange _storeData="+inputRange);
    try {
      await AsyncStorage.setItem('loginStatus', 'true');
      console.log("AsyncStorage stored");
    } catch (error) {
     console.log("AsyncStorage"+error);
    }
  }

  _getData = async () => {
  var value;
    try {
      var value = await AsyncStorage.getItem('loginObj');
      if (value !== null){
    // We have data!!
    console.log("AsyncStorage=="+value);
      this.setState({loggedIn: true})
  }

  else{
      console.log("AsyncStorage loginObj null");
  }
    } catch (error) {
     console.log("AsyncStorage"+error);
    }
  }

  async myfunction() {
    const sta = await AsyncStorage.getItem('loginObj');
    console.log("AsyncStorage myfunction="+sta);
  }

  componentWillUnmount(){
  	  EventRegister.removeEventListener(this.listener)
  }

   componentWillMount(){
    this._getData()
    this.myfunction()
    this.listener = EventRegister.addEventListener('signOutEvent', (data) => {
    	  console.warn("signOutEvent app js=");

        AsyncStorage.removeItem('userObj');
  AsyncStorage.removeItem('loginObj').then(
  () => {
    console.log('resolved')
    this.setState({
         loading: false,fadeAnim:1,loggedIn:false
      });
  },
  () => {
    console.log('rejected')
  }
)


     
       console.log("myCustomEvent loaded in profile::");//fadeAnim:1 or new Animated.Value(0)
    })
  }
  componentDidMount() {

        // console.log("let value="+value);
      console.log("loading"+this.state.loading);
        console.log("loggedIn"+this.state.loggedIn);
    let { fadeAnim } = this.state;
    let { fadeAnim2 } = this.state;
    let { fadeAnim3 } = this.state;
    StatusBar.setHidden(true);
    
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,
        delay: 1700,
        duration: 1000,          // Animate to opacity: 1 (opaque)             // Make it take a while
        useNativeDriver: true,
      }
    ).start();
    Animated.timing(                  // Animate over time
      this.state.fadeAnim2,            // The animated value to drive
      {
        toValue: 1,
        delay: 1000,
        duration: 1000,            // Animate to opacity: 1 (opaque)             // Make it take a while
        useNativeDriver: true,
      }
    ).start();
    Animated.timing(                  // Animate over time
      this.state.fadeAnim3,            // The animated value to drive
      {
        toValue: 1,
        delay: 1000,
        duration: 1500,            // Animate to opacity: 1 (opaque)        4000     // Make it take a while
        useNativeDriver: true,
      }
    ).start();                  // Starts the animation

  }

  componentWillUnmount(){
    StatusBar.setHidden(false);
    
  }


  forgotPassWord(email_address)
  {

    this.setState({loading: true})
        /*setTimeout(() => 
        {
        this.setState({loading: false})
        }, 3000);*/


       // console.log(this.state.username);
      //  console.log(this.state.password);
        var details = {
          email : email_address,
      };
    var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
          let resp =  fetch(AppConstants.BASE_URL+'forgotPassword', {
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
         this.setState({loading: false,fadeAnim:1});

         console.log('resp == '+JSON.stringify(responseJSON));
          // this.setState({loggedIn:true});
         if(responseJSON.result.status_code == 200)
         {
           if(responseJSON.result.success == false)
           {
              Alert.alert(responseJSON.result.message);
           }
           else
           {
                Alert.alert(responseJSON.result.message);
           }
         }
         else
         {
           Alert.alert("Forgot Password Failed");
         }
      })
      .done();


  }

  alertWithTextField(decodeData) {
     const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        prompt(
          decodeData,
          'Please enter your email id to reset your password',
          [
            { text: 'OK', onPress: password => {if (!reg.test(password))
    {
      Alert.alert( "Please enter a valid email address");
    }
    else
    {
      this.forgotPassWord(password);
    }
     }},
          ],
          {
            type: 'email-address',
            cancelable: false,
            defaultValue: '',
            placeholder: 'email'
          }
        );
    
      }

      skipSignIn()
  {
    this.signIn();
    /* const { navigate } = this.props.navigation;
	console.log("signIn"+this.state.username);
        console.log("signIn"+this.state.password);
     if(this.state.username.toLowerCase() === 'test' && this.state.password.toLowerCase() === 'test')
     {
      this.setState({loading: true})
      setTimeout(() => 
        {
          //this._storeData('flag data')
            this.setState({loading: false,loggedIn: true})
        }, 3000);
        //navigate('SafeUserHome', { user: 'SafeUserHome' });
     }

     else
     {
       Alert.alert( "Please enter your username and password");
     }*/
 
  }
    signIn()
  {
        console.log("signIn username->"+this.state.username);
        console.log("signIn password->"+this.state.password);
        //const { navigate } = this.props.navigation;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     if(this.state.username === '')
     {
      Alert.alert( "Please enter your username");
     }
  
    else if (!reg.test(this.state.username))
    {
      Alert.alert( "Please enter valid email address");
    }
     else if(this.state.password === '')
     {
      Alert.alert( "Please enter your password");
     }
    else
    {
        this.setState({loading: true})
        /*setTimeout(() => 
        {
        this.setState({loading: false})
        }, 3000);*/


       // console.log(this.state.username);
      //  console.log(this.state.password);
        var details = {
          username : this.state.username,
          password : this.state.password,
          is_mobile :1,
          Remember : true
      };
    var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
          let resp =  fetch(AppConstants.BASE_URL+'getLogin', {
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
           //console.log('resp Og== '+responseJSON);
         console.log('login resp == '+JSON.stringify(responseJSON));
          // this.setState({loggedIn:true});
         if(responseJSON.result.status_code == 200)
         {
           if(responseJSON.result.success == false)
           {
              Alert.alert(responseJSON.result.message);
               this.setState({loading: false,fadeAnim:1});
           }
           else
           {
               console.log('loginObj id == '+responseJSON.result.data.id);
               AsyncStorage.setItem('loginObj', JSON.stringify(responseJSON));
              //navigate('SafeUserHome', { user: 'SafeUserHome' });
             this.setState({loggedIn:true});
           }
         }
         else
         {
           Alert.alert("Login Failed");
           this.setState({loading: false,fadeAnim:1});
          // navigate('SafeUserHome', { user: 'SafeUserHome' });
         }
      })
      .done();
    }
  }


  render() {
    const window = Dimensions.get('window');
    let { fadeAnim } = this.state;
    let { fadeAnim2 } = this.state;
    let { fadeAnim3 } = this.state;
    var screenTop = (window.height / 2) - 100;
    console.disableYellowBox = true;
    
      if(this.state.loading === true)
       {
         console.log('got  loader == '+this.state.loading);
         return ( <View style={{ flex: 1,
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
       else if(this.state.loggedIn === true)
       {
       
          return (<StacksInTabs   />);
       }
       else
       {
    
    return (
    //  <ScrollView style={{backgroundColor:'transparent',flex:1}}>
      // <KeyboardAwareScrollView style={{backgroundColor:'#fff'}}>
      <View style={styles.containerP}>

        <View style={{ alignItems: 'center' }}>

          <Animated.Image onLayout={(event) => {
            screenTop = event.nativeEvent.layout.height;

          }} style={{
            marginTop: screenTop,  alignSelf: 'center',
            alignItems: 'center', resizeMode: 'contain',justifyContent: 'center', position: 'absolute',   height: 160,
            width:'80%',backgroundColor: '#fff', transform: [{
              translateY: this.state.fadeAnim2.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -screenTop]
              }),
            }, { perspective: 1000 },],
          }} source={require('./images/New_Logo.png')} />
        </View>


        <Animated.View style={{
          opacity: fadeAnim,
          flex: 1,
        }}>
          <Image source={require('./images/loginbg.png')} style={styles.backgroundImage} />

          <View style={styles.container}>

            <View style={styles.ImageMainView}>
              <Image style={styles.Logo} source={require('./images/New_Logo.png')} />
            </View>

            <View style={styles.FieldMainViewContainer}>
              <View style={styles.FieldMainView}>

                <TextInput
                    style={styles.detailRowInput}
              placeholder={"Username"}
              underlineColorAndroid={'transparent'}
              value={this.state.username}
               onChangeText={(username) => this.setState({username})}
                returnKeyType = {"next"}
                blurOnSubmit={ false }
                 onSubmitEditing={(event) => { 
                  this.refs.SecondInput.focus(); 
                }}
                />

              </View>
              <View style={styles.FieldMainView}>

                <TextInput
                 ref='SecondInput'
                   style={styles.detailRowInput}
              placeholder={"Password"}
              underlineColorAndroid={'transparent'}
               value={this.state.password}
               onChangeText={(password) => this.setState({password})}
               secureTextEntry={true}
                />
              </View>
              <View style={styles.ButtonInnerView}>
                <TouchableHighlight underlayColor='rgba(245,135,0,0.9)' style={styles.submit} onPress={this.skipSignIn.bind(this)}>
                  <Text style={styles.submitText}>LOGIN</Text>
                </TouchableHighlight>
              </View>

              <View style={styles.forgotView}>
                <TouchableHighlight underlayColor="transparent" style={styles.forgotButton} onPress={() => {
                  this.alertWithTextField('Forgot Password')
                }}>
                  <Text style={styles.submitText}>Forgot Password?</Text>
                </TouchableHighlight>
              </View>


            </View>

          </View>
        </Animated.View>
      </View>
      // </KeyboardAwareScrollView>

    );
  }
  }
}

/*const SafeDecisionsApp = StackNavigator({
  HomeScreen: {
    screen: HomeScreen, headerMode: 'none', navigationOptions: {
      header: null,
    },
  },

})

export default SafeDecisionsApp;*/



const styles = StyleSheet.create({
  container: {

    flex: 1,

  },
  containerP: {
    backgroundColor: '#fff',
    flex: 1,


  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    // alignItems:'center',
    // justifyContent:'center',
   // resizeMode: 'contain',
    resizeMode: 'stretch', // or 'stretch'
    //alignSelf: 'stretch'

  },
  Logo: {
    height: '100%',
    width:'80%',
    alignSelf: 'center',
    alignItems: 'center', resizeMode: 'contain',justifyContent: 'center',

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
    height: 160,
    alignItems: 'center',
  },
  FieldMainViewContainer:
  {
    width: '100%',
    flex: 0.5,
    top: 150,
    //height: 130,
    // left: 30,
    // right: 30,

    //backgroundColor: 'gray'
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
    color: '#000',
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
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    //marginBottom:10,
    height: 50,
    flex: 1,
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
