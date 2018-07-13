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
  View,Image,
  TouchableOpacity,BackAndroid
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners'
import { StackNavigator } from 'react-navigation';
import TabNavigator from 'react-native-tab-navigator';
import SafeList from './SafeList';
import Profile from './Profile';
import SafeDetails from './SafeDetails';
import ChangePassword from './ChangePassword';
//import RNExitApp from 'react-native-exit-app';
//import Profile from './Profile_org_bk_2';

  let head =  <Image style={{alignItems:'center',alignSelf:'center'}}  source={require('../images/header-logo-small.png')} />;
   let headRight =  null;
class SafeUserHomeScreen extends Component{
  

  constructor(props) {
      super(props);
       this.state = {selectedTab: 'safelist',  stateVal:1,
   editMode:false,signOutFlag:false
    }
  }
 componentWillMount() {
   const {setParams} = this.props.navigation;
   this.listener = EventRegister.addEventListener('signOutEvent', () => {
     
       this.changeTitle('safelist', false) ;
       console.log("signOutEvent loaded in home::");
    })

   this.listener = EventRegister.addEventListener('tabState', (data) => {
       console.log("tabState loaded in profile::"+data);
       if(data == true)
        this.goTotab();
    })
 }

 componentDidUpdate(){
 
 }


 static navigationOptions = ({ navigation }) => ({




   headerLeft:null,
        headerTitle: head,

       headerRight: headRight,
  }
  );


 goTotab(){
this.changeTitle('safelist',true)
//this.setState({ editMode:false});
 }

 

changeTitle(tabname,flag) {
   console.log('changeTitle '+tabname);
 /* if(tabname == 'safelist' && flag == false){
    EventRegister.emit('tabchange', true);
     console.log('inside return '+tabname);
    return;
  }*/

  let stateVal = this.state.stateVal;
  stateVal = stateVal+1;
   this.setState({selectedTab: tabname,stateVal:stateVal})
    this.setState({selectedTab: tabname})
 
    const {setParams} = this.props.navigation;

    if(tabname == 'empty')
    {
        setParams({ headerMode: 'none', navigationOptions: {
      header: null,
    } });
    }

    if(tabname == 'profile')
    {
      console.log('changeTitle else '+tabname);
    setParams({ headerTitle: 'Profile',
     headerStyle: {
        color: '#fefefe',
        fontSize:'11',
        justifyContent: 'space-between',
        textAlign: 'center'
      },
       headerLeft: null,  });
    
    }
    else
    {
      console.log('changeTitle else '+tabname);
       setParams({  headerLeft:null,
        headerRight:null,
        headerTitle: (
      <Image style={{ alignItems:'center'
      ,
      alignSelf:'center',
      //marginleft:windowHalf
    }}  source={require('../images/header-logo-small.png')}/>
  ),headerMode: 'none',
   mode: 'modal', });
       // console.warn('in else '+tabname);
    }

    if(tabname == 'profile')
    {
      head = 'Profile';
      headRight =  <TouchableOpacity activeOpacity = { 1 } onPress={ this.callFun }>
      <Image style={{marginRight:10,width:20,height:20,alignItems:'center'}}  source={require('../images/edit_32.png')} />                
     </TouchableOpacity>;
    }
    else
    {
       headRight =  null;
        head = <Image style={{alignItems:'center',alignSelf:'center'}}  source={require('../images/header-logo-small.png')} />;
    }


   }
   callFun = () =>
   {
    const {setParams} = this.props.navigation;
   
    if(this.state.editMode)
    {
       headRight =  <TouchableOpacity activeOpacity = { 1 } onPress={ this.callFun }>
      <Image style={{marginRight:10,width:20,height:20,alignItems:'center'}}  source={require('../images/edit_32.png')} />                
     </TouchableOpacity>;

     setParams({ headerTitle: 'Profile',
     headerStyle: {
        color: '#fefefe',
        fontSize:'11',
        justifyContent: 'space-between',
        textAlign: 'center'
      },
       headerLeft: null,headerRight:headRight  });
     this.setState({editMode: false}) ;     
    }
    else
    {
      headRight =   <View style={{ flexDirection: 'row'}}><TouchableOpacity activeOpacity = { 1 } onPress={ this.fireUpdateEvent.bind(this) }>
      <Image style={{marginRight:10,width:20,height:20,alignItems:'center'}}  source={require('../images/checked.png')} /> 
     </TouchableOpacity></View>;

     setParams({ headerTitle: 'Profile',
     headerStyle: {
        color: '#fefefe',
        fontSize:'11',
        justifyContent: 'space-between',
        textAlign: 'center'
      },
       headerLeft: null,headerRight:headRight  });
      this.setState({editMode: true}) ;  
    }


   


     EventRegister.emit('myCustomEvent', !this.state.editMode);


   

   }

   fireUpdateEvent(){
    this.callFun();
     EventRegister.emit('fireUpdateEvent', 'ok');
   }
 
  render() {
     const {setParams} = this.props.navigation;
  if(this.state.signOutFlag == true)
  {
    //RNExitApp.exitApp();
    return (null);
    //return (<App/>);
  }
  else
  {
    return (
<View style={{flex:1}}>
   
   
   <TabNavigator    tabBarStyle={{ height:55,backgroundColor: '#1b2531' }}
  sceneStyle={{  }} >
        <TabNavigator.Item
          selected={this.state.selectedTab === 'safelist'}
          title="Safe List"
          titleStyle = {{fontSize:11,padding:1,color:'#9a9b9d'}}
          selectedTitleStyle={{fontSize:11,padding:1,color: "#ec8102"}}
          renderIcon={() => <Image style={{padding:0,height:25,width:25}} source={require('../images/list.png')} /> }
          renderSelectedIcon={() => <Image style={{paddingTop:0,height:25,width:25}} source={require('../images/list.png')} />}
          badgeText=""
          onPress={() => 
            this.changeTitle('safelist', false) 
           
        }>
          
          <SafeList navigation = {this.props.navigation}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
            titleStyle = {{fontSize:11,padding:1,color:'#9a9b9d'}}
          selectedTitleStyle={{fontSize:11,padding:1,color: "#ec8102"}}
          renderIcon={() => <Image style={{padding:0,height:25,width:25}} source={require('../images/profile.png')} /> }
          renderSelectedIcon={() => <Image style={{paddingTop:0,height:25,width:25}} source={require('../images/profile.png')} />}
          onPress={() => 
            this.changeTitle('profile', false)
          }>
          <Profile navigation = {this.props.navigation} />
        </TabNavigator.Item>
      </TabNavigator>
  
    </View>
    );
  }

    
  }
}

const SafeUserHome = StackNavigator({
  HomeScreen: {
    screen: SafeUserHomeScreen, headerMode: 'none', navigationOptions: {
      headerLeft:null,
     headerMode: 'none',
 mode: 'modal',},

    //   headerTitle: (
    //     <Image source={require('./images/header-logo-small.png')}/>
    // ),headerMode: 'none',
    //   mode: 'modal',    
  },
  SafeDetails: {
    screen: SafeDetails, headerMode: 'none', navigationOptions: {
      //header: null,
    },
},
ChangePassword: {
    screen: ChangePassword, headerMode: 'none', navigationOptions: {
      //header: null,
    },
}


})

export default SafeUserHome;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tab: {
  
    backgroundColor: '#1b2531',
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
});