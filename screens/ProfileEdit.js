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
  Text,Alert,
  Button,
  View,ImageBackground,Image,TextInput,ScrollView,TouchableHighlight,Dimensions,AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import ReactNative from 'react-native';

import {
  findNodeHandle,
 
} from 'react-native';
import SleekLoadingIndicator from '../components/SleekLoadingIndicator';
import AppConstants from '../AppConstants';
type Props = {};

var orgFirstname ='',orgLastName='',orgEmail='',orgContact='',orgAddress='',orgCity='',orgState='',orgCountry='',orgZipcode='';
export default class Profile extends Component<Props> {

state= {
    editMode:false,
    updateMode:true,
    loading:false,
    firstname:'',
    lastname:'',
    lastname:'',
    contact:'',
    address:'',
    city:'',
    stateVal:'',
    country:'',
    zipcode:'',
    showDialog:false,
     oldpassword:'',
   newpassword:'',
   confirmpassword:'',
  };

static navigationOptions = ({ navigation }) => ({
  
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
Edit Profile
</Text></View>

),



headerRight:( <Text style={{padding:10,color:'transparent'}} ></Text> ),
    
  });

   componentWillMount() {
 this._getData();
   }


   _getData = async () => {
    
  var value;
    try {
      var obj = await AsyncStorage.getItem('userObj');
      var value = JSON.parse(obj);
      if (value !== null){
      console.log("AsyncStorage userObj==>"+obj);
      this.setState({firstname: value.result.data.users[0].first_name,lastname:value.result.data.users[0].last_name,email:value.result.data.users[0].user_email,
        contact:value.result.data.users[0].billing_phone,
        address:value.result.data.users[0].billing_address_1,
        city:value.result.data.users[0].billing_city,
        stateVal:value.result.data.users[0].billing_state,
        country:value.result.data.users[0].billing_country,
        zipcode:value.result.data.users[0].billing_postcode});
      this.setState({loggedIn: true});
  }

  else
  {
     this.getUserId();
  }
    } catch (error) {
     console.log("AsyncStorage"+error);
    }
  }


   async getUserId() {
  var sta = await AsyncStorage.getItem('loginObj').then((value) => {
       console.log("AsyncStorage loginObj="+value);
      var obj = JSON.parse(value);
      this.getProfileData(obj.result.data.id);
}); 
  }


  getProfileData(id)
  {
       console.log("profile id=>"+id);
       this.setState({loading: true});
        var details = {
          ID : id
      };
    var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
          let resp =  fetch(AppConstants.BASE_URL+'users/list', {
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
          // this.setState({loggedIn:true});
         if(responseJSON.result.status_code == 200)
         {
           if(responseJSON.result.success == false)
           {
               Alert.alert(responseJSON.result.message);
           }
           else
           {
               AsyncStorage.setItem('userObj', JSON.stringify(responseJSON));  
               this.setState({firstname: responseJSON.result.data.users[0].first_name,
                lastname:responseJSON.result.data.users[0].last_name,
                email:responseJSON.result.data.users[0].user_email,
                contact:responseJSON.result.data.users[0].billing_phone,
                address:responseJSON.result.data.users[0].billing_address_1,
                city:responseJSON.result.data.users[0].billing_city,
                stateVal:responseJSON.result.data.users[0].billing_state,
                country:responseJSON.result.data.users[0].billing_country,
                zipcode:responseJSON.result.data.users[0].billing_postcode});
               orgFirstname = responseJSON.result.data.users[0].first_name;
               orgLastName = responseJSON.result.data.users[0].last_name;
               orgEmail = responseJSON.result.data.users[0].user_email;
               orgContact = responseJSON.result.data.users[0].billing_phone;
               orgAddress = responseJSON.result.data.users[0].billing_address_1;
               orgCity = responseJSON.result.data.users[0].billing_city;
               orgState = responseJSON.result.data.users[0].billing_state;
               orgCountry = responseJSON.result.data.users[0].billing_country;
               orgZipcode = responseJSON.result.data.users[0].billing_postcode;
           }
         }
         else
         {
           Alert.alert("Profile Details Failed");
         }
      })
      .done();
       
  }

   updateProfile()
  {
    var sd_capabilitiesData = '';
    var profile_url = '';
    var sta =  AsyncStorage.getItem('userObj').then((value) => {
      var obj = JSON.parse(value);
      sd_capabilitiesData = obj.result.data.users[0].sd_capabilities;
      profile_url = obj.result.data.users[0].user_profile_url;
   });
     
    

     var sta =  AsyncStorage.getItem('loginObj').then((value) => {
       console.log("AsyncStorage loginObj="+value);
      var obj = JSON.parse(value);
        console.log("profile id update=>"+obj.result.data.id);
       this.setState({loading: true});
        var details = {
          ID : obj.result.data.id,
          Billing_city:this.state.city,
          Billing_country:this.state.country,
          billing_state:this.state.stateVal,
          first_name:this.state.firstname,
          last_name:this.state.lastname,
          sd_capabilities:sd_capabilitiesData,
          user_profile_url:profile_url
      };
        console.log("profile update call =>"+JSON.stringify(details));
    var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
          let resp =  fetch(AppConstants.BASE_URL+'users/save', {
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
         console.log('update profile resp == '+JSON.stringify(responseJSON));
          // this.setState({loggedIn:true});
         if(responseJSON.result.status_code == 200)
         {
           if(responseJSON.result.success == false)
           {
               Alert.alert(responseJSON.result.message);
            console.log('update profile fail');
           }
           else
           {
              Alert.alert(responseJSON.result.message);
                console.log('update profile success');
           }
         }
         else
         {
           Alert.alert("Profile Details Failed");
         }
      })
      .done();
}); 
  }
  



  



state= {
    editMode:false,
    updateMode:true,
    loading:false,
    firstname:'',
    lastname:'',
    contact:'',
    address:'',
    city:'',
    stateVal:'',
    country:'',
    zipcode:'',
    showDialog:false,
     oldpassword:'',
   newpassword:'',
   confirmpassword:'',
  };



  render() {
    const window = Dimensions.get('window');
    var screenTop = (window.height / 2) - 100;

    if(this.state.loading == true){

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
    else{


   
       return (
       <View
          style={{
            flex: 1,
            backgroundColor:"white"
          }}>
       <ScrollView
       ref='scroll'
          style={{
            flex: 1,
            backgroundColor:"white"
          }}>

          <View style={{padding:10,alignItems:'center'}}>

          <Image style={{marginTop:10,height:150,resizeMode:'contain',alignItems:'center'}} source={require('../images/react-navigation.png')}/>

          </View>

 <View style={{marginTop:10,backgroundColor:'#e5e5e5'}}>
          <Text style={{marginLeft:10,padding:5,color:'white'}}>Personal Details</Text>
          </View>

          <View style={{alignItems:'flex-start'}}>
 <Text style={{marginLeft:10,padding:5,color:'black'}}>First Name</Text>
                <TextInput
                    style={{ 
    borderWidth: 1,
    marginLeft:10,
    width:'90%',
    borderColor: '#e6e6e6',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 13,
    padding: 10,}}
              placeholder={"First Name"}
              underlineColorAndroid={'transparent'}
              value={this.state.firstname}
              onChangeText={(text) => this.setState({firstname:text})}
                returnKeyType = {"next"}
                blurOnSubmit={ false }
                onSubmitEditing={(event) => { 
                this.refs.lnameinput.focus(); }}  
                onFocus={() => {
     
   this.refs.scroll.scrollTo({x: 0, y: 100, animated: true})
    }}


                />

              </View>

                <View style={{alignItems:'flex-start'}}>
 <Text style={{marginLeft:10,padding:5,color:'black'}}>Last Name</Text>
                <TextInput
                    style={{ 
    borderWidth: 1,
    marginLeft:10,
    width:'90%',
    borderColor: '#e6e6e6',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 13,
    padding: 10,}}
        
              placeholder={"Last Name"}
              underlineColorAndroid={'transparent'}
              value={this.state.lastname}
                onChangeText={(text) => this.setState({lastname:text})}
               ref='lnameinput' 
               returnKeyType = {"next"}
                blurOnSubmit={ false }
                onSubmitEditing={(event) => { 
                this.refs.contact.focus(); }}
                onFocus={() => {
     
   this.refs.scroll.scrollTo({x: 0, y: 100, animated: true})
    }} 
                />

              </View>

               <View style={{alignItems:'flex-start'}}>
 <Text style={{marginLeft:10,padding:5,color:'black'}}>Email</Text>
                <TextInput
                    style={{ 
    borderWidth: 1,
    marginLeft:10,
    width:'90%',
    borderColor: '#e6e6e6',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 13,
    padding: 10,}}
              placeholder={"Email"}
              underlineColorAndroid={'transparent'}
              value={this.state.email}
               editable = {false} 
                 
                />

              </View>

               <View style={{alignItems:'flex-start'}}>
 <Text style={{marginLeft:10,padding:5,color:'black'}}>Contact</Text>
                <TextInput
                    style={{ 
    borderWidth: 1,
    marginLeft:10,
    width:'90%',
    borderColor: '#e6e6e6',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 13,
    padding: 10,}}
              placeholder={"Contact"}
              underlineColorAndroid={'transparent'}
              value={this.state.contact}
               onChangeText={(text) => this.setState({contact:text})}
              ref='contact' 
               returnKeyType = {"next"}
                blurOnSubmit={ false }
                    onFocus={() => {
     
   this.refs.scroll.scrollTo({x: 0, y: 200, animated: true})
    }} 

                onSubmitEditing={(event) => { 
                this.refs.address.focus(); }}
                />

              </View>

              <View style={{marginTop:10,backgroundColor:'#e5e5e5'}}>
          <Text style={{marginLeft:10,padding:5,color:'white'}}>Address</Text>
          </View>

          <View style={{alignItems:'flex-start'}}>
 <Text style={{marginLeft:10,padding:5,color:'black'}}>Address</Text>
                <TextInput
                    style={{ 
    borderWidth: 1,
    marginLeft:10,
    width:'90%',
    borderColor: '#e6e6e6',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 13,
    padding: 10,}}
              placeholder={"Address"}
              underlineColorAndroid={'transparent'}
              value={this.state.address}
               onFocus={() => {
     
   this.refs.scroll.scrollTo({x: 0, y: 400, animated: true})
    }} 
               onChangeText={(text) => this.setState({address:text})}
          ref='address' 
           returnKeyType = {"next"}
                blurOnSubmit={ false }
                onSubmitEditing={(event) => { 
                this.refs.city.focus(); }}
                />

              </View>

              <View style={{alignItems:'flex-start'}}>
 <Text style={{marginLeft:10,padding:5,color:'black'}}>City</Text>
                <TextInput
                    style={{ 
    borderWidth: 1,
    marginLeft:10,
    width:'90%',
    borderColor: '#e6e6e6',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 13,
    padding: 10,}}
              placeholder={"City"}
              underlineColorAndroid={'transparent'}
              value={this.state.city}
                ref='city' 
                returnKeyType = {"next"}
                blurOnSubmit={ false }
               
                onSubmitEditing={(event) => { 
                this.refs.stateVal.focus(); }}
              onChangeText={(text) => this.setState({city:text})}
                             />

              </View>

              <View style={{alignItems:'flex-start'}}>
 <Text style={{marginLeft:10,padding:5,color:'black'}}>State</Text>
                <TextInput
                    style={{ 
    borderWidth: 1,
    marginLeft:10,
    width:'90%',
    borderColor: '#e6e6e6',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 13,
    padding: 10,}}
              placeholder={"State"}
              underlineColorAndroid={'transparent'}
              value={this.state.stateVal}
             
               onChangeText={(text) => this.setState({stateVal:text})}
              ref='stateVal' 
               returnKeyType = {"next"}
                blurOnSubmit={ false }
                onSubmitEditing={(event) => { 
                this.refs.country.focus(); }}
                />

              </View>

              <View style={{alignItems:'flex-start'}}>
 <Text style={{marginLeft:10,padding:5,color:'black'}}>Country</Text>
                <TextInput
                    style={{ 
    borderWidth: 1,
    marginLeft:10,
    width:'90%',
    borderColor: '#e6e6e6',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 13,
    padding: 10,}}
              placeholder={"Country"}
              underlineColorAndroid={'transparent'}
              value={this.state.country}
               onFocus={() => {
     
   this.refs.scroll.scrollTo({x: 0, y: 500, animated: true})
    }} 
                onChangeText={(text) => this.setState({country:text})}
              ref='country' 
              returnKeyType = {"next"}
                blurOnSubmit={ false }
                onSubmitEditing={(event) => { 
                this.refs.zip.focus(); }}
                />

              </View>

              <View style={{alignItems:'flex-start'}}>
 <Text style={{marginLeft:10,padding:5,color:'black'}}>Zip</Text>
                <TextInput
                    style={{ 
    borderWidth: 1,
    marginLeft:10,
    width:'90%',
    borderColor: '#e6e6e6',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 13,
    padding: 10,}}
              placeholder={"Zip"}
              underlineColorAndroid={'transparent'}
              value={this.state.zip}
               onFocus={() => {
     
   this.refs.scroll.scrollTo({x: 0, y: 650, animated: true})
    }} 
              onChangeText={(text) => this.setState({zip:text})}
       ref='zip' 
                />

              </View>

            


            



                <View style={{marginBottom:30,flexDirection:'row',justifyContent:'flex-end',marginTop:20,backgroundColor:'#fff',alignItems:'flex-end'}}>
 <TouchableHighlight  underlayColor="transparent" onPress={() => {
                 this.props.navigation.goBack();
                }}><Text style={{marginRight:10,padding:5,color:'black',alignSelf:'flex-end'}}>Cancel</Text></TouchableHighlight>




                <TouchableHighlight  style={{ width:100,marginRight:30,backgroundColor: '#F58700'}} underlayColor="transparent" onPress={() => {
                 this.updateProfile();
                }}>
 <Text style={{padding:5,color:'white',alignSelf:'center'}}>Save</Text></TouchableHighlight>
 </View>





            
     
            </ScrollView>


 </View>
    );
  }
    
   
  }
}

const styles = StyleSheet.create({

profileContainer: {
    flex: 1,
    backgroundColor:'#fff',

  },


  bgPic: {
    justifyContent: 'center',
    alignItems: 'center',
flex:1,
    backgroundColor:'#fff',
  
  },


  profilePic: {
  aspectRatio: 1,
  justifyContent: 'center',
  alignItems: 'center',
  resizeMode: 'center',
  height:'50%',
  width:'50%',
  },



  detailscardView: {
   marginLeft:30,
    marginTop:30,
    marginRight:10,
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
    marginBottom:30,
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
