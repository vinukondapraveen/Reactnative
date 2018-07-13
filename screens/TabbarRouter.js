import React from 'react';
import { TabNavigator,createStackNavigator, StackNavigator } from 'react-navigation';
//import { Icon } from 'react-native-elements';
import {
  Platform,
  StyleSheet,
  Image,
  View
} from 'react-native';
//import Machines from '../Screens/MachinesPage';
import SafeList from '../screens/SafeList';
import SafeDetails from '../screens/SafeDetails';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
import ProfileEdit from '../screens/ProfileEdit';
import ChangePassword from '../screens/ChangePassword';
import OrdersDetail from '../screens/OrdersDetail';

import { SafeAreaView, createBottomTabNavigator } from 'react-navigation';


 /* export const SimpleTabs = createBottomTabNavigator({
    Machines: {
      screen: Machines,
       navigationOptions: { 
          tabBarLabel: 'Machines',
          tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
        },
    },
    Profile: {
      screen: Profile,
       navigationOptions: { 
          tabBarLabel: 'Profile',
          tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
        },
    },
    Favorites: {
      screen: Favorites,
       navigationOptions: {
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
        },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#000',
       style: {
    backgroundColor: '#e5e5e5',
  },
    },
  });*/

  const ListStack = createStackNavigator({
  SafeList: {
    screen: SafeList,
    path: '/',
   
  },
   SafeDetails: {
    screen: SafeDetails,
    path: '/',
    navigationOptions: {
      title: 'SafeDetails',
    },
  }
});

   const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    path: '/',
    
  },
  ProfileEdit: {
    screen: ProfileEdit,
    path: '/',
   
  },
  ChangePassword: {
    screen: ChangePassword,
    path: '/',
   
  }
});

    const FavoritesStack = createStackNavigator({
  Favorites: {
    screen: Favorites,
    path: '/',
    navigationOptions: {
      title: 'Favorites',
    },
  },

  OrdersDetail: {
    screen: OrdersDetail,
    path: '/',
    navigationOptions: {
      title: 'Orders Details',
    },
  }
});

  

  
export  const  StacksInTabs = createBottomTabNavigator(
  {
    ListStack: {
      screen: ListStack,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Safe List',
        tabBarIcon: ({ tintColor, focused }) => (

           <Image
              style={[genericStyles.tabIcon, { tintColor }]}
             source={require('../images/list.png')}
             />
        ),
      },
    },
     FavoritesStack: {
      screen: FavoritesStack,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Orders',
        tabBarIcon: ({ tintColor, focused }) => (
         <Image
              style={[genericStyles.tabIcon, { tintColor }]}
             source={require('../images/Orders.png')}
             />
        ),
      },
    },

    ProfileStack: {
      screen: ProfileStack,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor, focused }) => (
        <Image
              style={[genericStyles.tabIcon, { tintColor }]}
             source={require('../images/profile.png')}
             />
        ),
      },
    },

  },
  {
    tabBarOptions: {
      showLabel: true,
       labelStyle: {
         top:3,
    fontSize: 13,
  },
        style: {

padding:5,
    backgroundColor: '#1b2531',

  },
          activeTintColor: '#ec8102',
          inactiveTintColor:'#9a9b9d'
    },
  }
);

const genericStyles = StyleSheet.create({
  tabIcon: {
  
  height:20, width:20
  }
  }
);



/*const Root = StackNavigator(
 {
   SimpleTabs: SimpleTabs,
 },
 {
   navigationOptions: {
 //  title:'Hello ',
 //headerMode:'none',
           //  header: null
   },
 }
);*/