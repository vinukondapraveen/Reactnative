/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow


 /*<View style={styles.forgotView}>
                <TouchableHighlight style={styles.forgotButton} underlayColor="transparent" disabled={this.state.updateMode} onPress={() => {
                  this.updateProfile()
                }}>
                  <Text style={styles.submitText} >Update Profile</Text>
                </TouchableHighlight>
              </View>
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text, Alert,
  Button,
  View, ImageBackground, Image, TextInput, ScrollView, TouchableHighlight, Dimensions, AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import ReactNative from 'react-native';
import SleekLoadingIndicator from '../components/SleekLoadingIndicator';
import AppConstants from '../AppConstants';
import { EventRegister } from 'react-native-event-listeners';
import {
  findNodeHandle,

} from 'react-native';
type Props = {};

var orgFirstname = '', orgLastName = '', orgEmail = '', orgContact = '', orgAddress = '', orgCity = '', orgState = '', orgCountry = '', orgZipcode = '';

//let left =  ;
let center = <Image style={{ alignItems: 'center', alignSelf: 'center' }} source={require('../images/header-logo-small.png')} />;
let right = <Image style={{ alignItems: 'center', alignSelf: 'center' }} source={require('../images/header-logo-small.png')} />;

export default class Profile extends Component<Props> {

  state = {
    editMode: false,
    updateMode: true,
    loading: false,
    firstname: '',
    lastname: '',
    contact: '',
    address: '',
    city: '',
    stateVal: '',
    country: '',
    zipcode: '',
    showDialog: false,
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  };


  signOut() {
    const { goBack } = this.props.navigation;
    AsyncStorage.removeItem('userObj');
    AsyncStorage.removeItem('loginObj').then(
      () => {
        console.log('resolved')
        EventRegister.emit('signOutEvent');
      },
      () => {
        console.log('rejected')
      }
    )

    /* return this.props
                   .navigation
                   .dispatch(NavigationActions.reset(
                     {
                        index: 0,
                        actions: [
                          NavigationActions.navigate({ routeName: 'HomeScreen'})
                        ]
                      }));*/


  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener)
  }


  static navigationOptions = ({ navigation }) => ({

    headerTitle: (
      <View style={{
        flex: 1,
        flexDirection: 'row',
      }}>
        <Text style={{
          flex: 1,
          fontSize: 18,
          fontWeight: '700',
          color: 'black',
          textAlign: 'center'
        }}>
          Profile
</Text></View>

    ),

    headerLeft: (<TouchableHighlight underlayColor="transparent" onPress={() => {
      navigation.navigate('ProfileEdit');
    }}>
      <Text style={{ padding: 10, color: '#f39427' }} >Edit</Text>
    </TouchableHighlight>),
    headerRight: (<TouchableHighlight underlayColor="transparent" onPress={() => {
      EventRegister.emit('signOutEvent');
    }}>
      <Text style={{ padding: 10, color: 'black' }} >Logout</Text>
    </TouchableHighlight>),







  });



  /* static navigationOptions = ({ navigation }) => {
      return {
        title: 'Welcome',
      }
    };
  
  
  
     static navigationOptions = {
  
  
      headerTitle: (
  <View style={{
  flex: 1,
  flexDirection: 'row',
  backgroundColor:'white',
  }}>
  <Text style={{
  flex:1,
  fontSize: 18,
  fontWeight: '700',
  color: 'black',
  textAlign:'center'
  }}>
  Profile
  </Text></View>
  
  ),
  
  headerLeft:(<TouchableHighlight  underlayColor="transparent" onPress={() => {
                   navigation.navigate('ProfileEdit');
                  }}>
                    <Text style={{padding:10,color:'#f39427'}} >Edit</Text>
                  </TouchableHighlight>),
  headerRight:(<TouchableHighlight  underlayColor="transparent" onPress={() => {
                   navigation.navigate('ProfileEdit');
                  }}>
                    <Text style={{padding:10,color:'black'}} >Logout</Text>
                  </TouchableHighlight>),
  
    }*/


  componentWillMount() {
    this.props.navigation.setParams({
      handleSignout: this.signOut.bind(this)
    });
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
    //AsyncStorage.removeItem('userObj');
    //this._getData();
    console.log("componentWillMount loaded in profile::");
    this.getUserId();
    // this.getProfileData(27);
    /* this.listener = EventRegister.addEventListener('myCustomEvent', (data) => {
       this.setState({
          editMode:data,
          updateMode:!data
       });
        console.log("myCustomEvent loaded in profile::"+data);
     })
 
     this.listener = EventRegister.addEventListener('fireUpdateEvent', (data) => {
        console.log("fireUpdateEvent loaded in profile::"+data);
        if(data == 'ok')this.updateProfile();
     })
 
      this.listener = EventRegister.addEventListener('tabchange', (data) => {
        console.log("tabchange loaded in profile::"+data);
        if(data == true)
         this.onTabchange();
     })*/
  }

  async getUserId() {
    var sta = await AsyncStorage.getItem('loginObj').then((value) => {
      console.log("AsyncStorage loginObj=" + value);
      var obj = JSON.parse(value);
      this.getProfileData(obj.result.data.id);
    });
  }


  getProfileData(id) {
    console.log("profile id=>" + id);
    this.setState({ loading: true });
    var details = {
      ID: id
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    let resp = fetch(AppConstants.BASE_URL + 'users/list', {
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
        console.log('resp == ' + JSON.stringify(responseJSON));
        // this.setState({loggedIn:true});
        if (responseJSON.result.status_code == 200) {
          if (responseJSON.result.success == false) {
            Alert.alert(responseJSON.result.message);
          }
          else {
            AsyncStorage.setItem('userObj', JSON.stringify(responseJSON));
            this.setState({
              firstname: responseJSON.result.data.users[0].first_name,
              lastname: responseJSON.result.data.users[0].last_name,
              email: responseJSON.result.data.users[0].user_email,
              contact: responseJSON.result.data.users[0].billing_phone,
              address: responseJSON.result.data.users[0].billing_address_1,
              city: responseJSON.result.data.users[0].billing_city,
              stateVal: responseJSON.result.data.users[0].billing_state,
              country: responseJSON.result.data.users[0].billing_country,
              zipcode: responseJSON.result.data.users[0].billing_postcode
            });
            /*orgFirstname = responseJSON.result.data.users[0].first_name;
            orgLastName = responseJSON.result.data.users[0].last_name;
            orgEmail = responseJSON.result.data.users[0].user_email;
            orgContact = responseJSON.result.data.users[0].billing_phone;
            orgAddress = responseJSON.result.data.users[0].billing_address_1;
            orgCity = responseJSON.result.data.users[0].billing_city;
            orgState = responseJSON.result.data.users[0].billing_state;
            orgCountry = responseJSON.result.data.users[0].billing_country;
            orgZipcode = responseJSON.result.data.users[0].billing_postcode;*/
          }
        }
        else {
          Alert.alert("Profile Details Failed");
        }
      })
      .done();

  }








  render() {
    const window = Dimensions.get('window');
    var screenTop = (window.height / 2) - 100;
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
    else {


      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "white"
          }}>
          <ScrollView
            ref='scroll'
            style={{
              flex: 1,
              backgroundColor: "white"
            }}>

            <View style={{ padding: 10, alignItems: 'center' }}>

              <Image style={{ marginTop: 10, height: 150, resizeMode: 'contain', alignItems: 'center' }} source={require('../images/react-navigation.png')} />

            </View>

            <View style={{ marginTop: 10, backgroundColor: '#ECEFF1' }}>
              <Text style={{ marginLeft: 10, padding: 5, color: '#59646A' }}>Personal Details</Text>
            </View>

            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ marginLeft: 10, padding: 5, marginTop: 10, color: 'black' }}>First Name</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  marginLeft: 10,
                  width: '90%',
                  borderColor: '#e6e6e6',
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  color: '#000',
                  fontSize: 13,
                  padding: 10,
                }}
                placeholder={"First Name"}
                underlineColorAndroid={'transparent'}
                value={this.state.firstname}
                editable={false}
              />

            </View>

            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ marginLeft: 10, padding: 5, color: 'black' }}>Last Name</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  marginLeft: 10,
                  width: '90%',
                  borderColor: '#e6e6e6',
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  color: '#000',
                  fontSize: 13,
                  padding: 10,
                }}
                placeholder={"Last Name"}
                underlineColorAndroid={'transparent'}
                value={this.state.lastname}
                editable={false}
                onFocus={() => {

                  this.refs.scroll.scrollTo({ x: 0, y: 50, animated: true })
                }}
              />

            </View>

            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ marginLeft: 10, padding: 5, color: 'black' }}>Email</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  marginLeft: 10,
                  width: '90%',
                  borderColor: '#e6e6e6',
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  color: '#000',
                  fontSize: 13,
                  padding: 10,
                }}
                placeholder={"Email"}
                underlineColorAndroid={'transparent'}
                value={this.state.email}
                editable={false}
              />

            </View>

            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ marginLeft: 10, padding: 5, color: 'black' }}>Contact</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  marginLeft: 10,
                  width: '90%',
                  borderColor: '#e6e6e6',
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  color: '#000',
                  fontSize: 13,
                  padding: 10,
                }}
                placeholder={"Contact"}
                underlineColorAndroid={'transparent'}
                value={this.state.contact}
                editable={false}
              />

            </View>

            <View style={{ marginTop: 10, backgroundColor: '#ECEFF1' }}>
              <Text style={{ marginLeft: 10, padding: 5, color: '#59646A' }}>Address</Text>
            </View>

            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ marginLeft: 10, padding: 5, marginTop: 10, color: 'black' }}>Address</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  marginLeft: 10,
                  width: '90%',
                  borderColor: '#e6e6e6',
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  color: '#000',
                  fontSize: 13,
                  padding: 10,
                }}
                placeholder={"Address"}
                underlineColorAndroid={'transparent'}
                value={this.state.address}
                editable={false}
              />

            </View>

            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ marginLeft: 10, padding: 5, color: 'black' }}>City</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  marginLeft: 10,
                  width: '90%',
                  borderColor: '#e6e6e6',
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  color: '#000',
                  fontSize: 13,
                  padding: 10,
                }}
                placeholder={"City"}
                underlineColorAndroid={'transparent'}
                value={this.state.city}
                editable={false}
              />

            </View>

            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ marginLeft: 10, padding: 5, color: 'black' }}>State</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  marginLeft: 10,
                  width: '90%',
                  borderColor: '#e6e6e6',
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  color: '#000',
                  fontSize: 13,
                  padding: 10,
                }}
                placeholder={"State"}
                underlineColorAndroid={'transparent'}
                value={this.state.stateVal}
                editable={false}
              />

            </View>

            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ marginLeft: 10, padding: 5, color: 'black' }}>Country</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  marginLeft: 10,
                  width: '90%',
                  borderColor: '#e6e6e6',
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  color: '#000',
                  fontSize: 13,
                  padding: 10,
                }}
                placeholder={"Country"}
                underlineColorAndroid={'transparent'}
                value={this.state.country}
                editable={false}
              />

            </View>

            <View style={{ alignItems: 'flex-start' }}>
              <Text style={{ marginLeft: 10, padding: 5, color: 'black' }}>Zip</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  marginLeft: 10,
                  width: '90%',
                  borderColor: '#e6e6e6',
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  color: '#000',
                  fontSize: 13,
                  padding: 10,
                }}
                placeholder={"Zip"}
                underlineColorAndroid={'transparent'}
                value={this.state.zip}
                editable={false}
              />

            </View>

            <View style={{ alignItems: 'flex-start', flex: 1 }}>


              <View style={{ marginTop: 10, backgroundColor: '#ECEFF1', width: '100%' }}>
                <Text style={{ marginLeft: 10, padding: 5, color: '#59646A' }}>Security</Text>
              </View>


              <TouchableHighlight underlayColor="transparent" onPress={() => {
                this.props.navigation.navigate('ChangePassword');
              }}>
                <View
                  style={{
                    borderWidth: 1,

                    width: '100%',
                    flex: 1,
                    borderColor: '#e6e6e6',
                    backgroundColor: '#fff',
                    color: '#000',
                    flexDirection: 'row',
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}>
                  <Text style={{ fontSize: 16, flex: 1, marginLeft: 10, padding: 5, color: '#f39427' }}>Change Password</Text>
                  <Image style={{ marginRight: 10, resizeMode: "contain", top: 10, width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }} source={require('../images/right_arrow.png')} />
                </View>

              </TouchableHighlight>


            </View>





          </ScrollView>


        </View>

      );
    }


  }
}

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
    height: 120,
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

  profileContainer: {
    flex: 1,
    backgroundColor: '#fff',

  },


  bgPic: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',

  },


  profilePic: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'center',
    height: '50%',
    width: '50%',
  },



  detailscardView: {
    marginLeft: 30,
    marginTop: 30,
    marginRight: 10,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },


  detailRow: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  detailRowLabel:
  {

    flex: 1,
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
  forgotView: {
    marginBottom: 30,
    //height: 50,
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  forgotButton: {
    color: '#fff',
    width: 200,
    height: 40,
    backgroundColor: '#F58700',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',

  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },

  detailRowD: {

    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  detailRowLabelD:
  {


    color: '#959da7',
    fontSize: 14,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  detailRowInputD:
  {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    color: '#8d8d8d',
    fontSize: 14,
  }

});
