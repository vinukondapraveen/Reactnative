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


 /* 

 <TouchableHighlight  underlayColor="transparent" onPress={() => {
                 this.props.navigation.goBack();
                }}><Text style={{marginRight:10,padding:5,color:'black',alignSelf:'flex-end'}}></Text></TouchableHighlight>


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
export default class ChangePassword extends Component<Props> {


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
Change Password
</Text></View>

),



headerRight:( <Text style={{padding:10,color:'transparent'}} ></Text> ),
    
  });

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


  validate(){

    if(this.state.oldpassword == '')
    {
     Alert.alert("Please enter Old Password");
    }
    else if(this.state.newpassword == '')
    {
     Alert.alert("Please enter New Password");
    }

    else if(this.state.confirmpassword == '')
    {
     Alert.alert("Please enter Confirm Password");
    }

    else if(this.state.newpassword != this.state.confirmpassword )
    {
    Alert.alert("New Passwords do not match");
    }


    else
    {
      this.changePassword();
    }

  }

  changePassword(){

      this.setState({loading: true})

      /*var old_password = '';
      var sta =  AsyncStorage.getItem('userObj').then((value) => {
      var obj = JSON.parse(value);
      old_password = obj.result.data.users[0].user_pass;
   });*/

        var sta =  AsyncStorage.getItem('loginObj').then((value) => {
        console.log("AsyncStorage loginObj="+value);
        var obj = JSON.parse(value);
        console.log("chnage password update=>"+obj.result.data.id);
       this.setState({loading: true});
       var details = {
         confirmPassword:this.state.confirmpassword,
          id : obj.result.data.id,
          oldPassword:this.state.oldpassword,
          newPassword:this.state.newpassword,
         
      };
        console.log("changePassword call =>"+JSON.stringify(details));
    var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
          let resp =  fetch(AppConstants.BASE_URL+'changePassword', {
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
         
           if(responseJSON.result.success == false)
           {
               Alert.alert(responseJSON.result.message);
               console.log('changePassword fail');
           }
           else
           {
              Alert.alert(responseJSON.result.message);
                console.log('changePassword success');
           }

           if(responseJSON.result.status_code == 200)
           {
                Alert.alert(responseJSON.result.message);
                this.setState({showDialog: false});
                EventRegister.emit('signOutEvent');
           }
      })
      .done();
}); 

       
  }



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

         



          

               

               

             

              


             


             

               <View style={{marginBottom:10,marginTop:0,backgroundColor:'#e5e5e5',alignItems:'flex-start'}}>
 <Text style={{marginLeft:10,padding:10,color:'black'}}>Security</Text>
 </View>

<View style={{alignItems:'flex-start'}}>
 <Text style={{marginLeft:10,padding:5,color:'black'}}>Old Password</Text>
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
              placeholder={"Old Password"}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({oldpassword:text})}
              value={this.state.oldpassword}
              secureTextEntry={true}
               returnKeyType = {"next"}
                blurOnSubmit={ false }
                 onSubmitEditing={(event) => { 
                  this.refs.newPassword.focus(); 
                }}  
            
             
                />

              </View>

              <View style={{alignItems:'flex-start'}}>
 <Text style={{marginLeft:10,padding:5,color:'black'}}>New Password</Text>
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
              placeholder={"New Password"}
              returnKeyType = {"next"}
                blurOnSubmit={ false }
                 onSubmitEditing={(event) => { 
                  this.refs.confirmPassword.focus(); 
                }}  
              ref='newPassword'
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({newpassword:text})}
              value={this.state.newpassword}
              secureTextEntry={true}
              
    
                />

              </View>

              <View style={{alignItems:'flex-start'}}>
 <Text style={{marginLeft:10,padding:5,color:'black'}}>Confirm Password</Text>
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
              placeholder={"Confirm Password"}
               ref='confirmPassword'
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({confirmpassword:text})}
              value={this.state.confirmpassword}
              secureTextEntry={true}
             
              
                />

              </View>


                <View style={{marginBottom:30,flexDirection:'row',justifyContent:'flex-end',marginTop:20,backgroundColor:'#fff',alignItems:'flex-end'}}>





                <TouchableHighlight  style={{ width:100,marginRight:30,backgroundColor: '#F58700'}} underlayColor="transparent" onPress={() => {
                 this.validate();
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
