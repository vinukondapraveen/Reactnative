
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  View, Text, ImageBackground, TouchableHighlight, TouchableOpacity, Alert, Button
} from 'react-native';


type Props = {};


export default class OrdersDetail extends Component<Props> {



  render() {

    return (
<View style={styles.container}>
<Text style={{height:20,fontSize:20}}>Order details</Text>
<View>



    
</View>


</View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
