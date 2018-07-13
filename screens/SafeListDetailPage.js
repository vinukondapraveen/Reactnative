import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  uri,
  Button,
  TouchableHighlight,
  Navigator
} from 'react-native';


export default class SafeListDetailPage extends Component<{}> {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
        <View style={styles.imageHoldView}>
          <Image
            source={require('./Images/zenith.jpg')}
            style={styles.Imagecontainer}>
          </Image>
        </View>
        <View style={styles.textHoldView}>
          <View style={styles.textContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize:13,fontWeight: 'bold' , color: 'lightgray'}}>{'Location:'}
              </Text>
              <Text style={{ left: 12, fontSize:14,color: 'gray' }}>
                {'Begumpet, Hyderabad'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row',marginTop:10 }}>
              <Text style={{fontSize:13, fontWeight: 'bold' , color: 'lightgray'}}>{'Serial No:'}
              </Text>
            

              <Text style={{ left: 10,fontSize:14, color: 'gray' }}>
                {'121318987'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonHoldStyle}>
          <TouchableHighlight style={styles.submit} onPress={() => this.submitSuggestion(this.props)}>
            <Text style={styles.submitText}>Decode</Text>
          </TouchableHighlight>

        </View>

      </View>
    );
  }
  updateIndex(selectedIndex) {
  }

}

const styles = StyleSheet.create({
  submit: {
    height: 50,
    width: 180,
    backgroundColor: '#F58700',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,

  },
  shadowStyle:{
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,

  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
  Imagecontainer: {
    //   flex: 1,
    //position: 'absolute',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,

    flexGrow: 1,
    height: null,
    width: null,
    alignItems: 'center',
    justifyContent: 'center',


  },
  imageHoldView: {
    flex: .6,
    marginTop: 64,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,

  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    left: 50,
    flex: 1,
    marginRight:50,
    backgroundColor: '#FFFFFF',

  },
  textHoldView: {
    // flex: .2,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flex: .2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,

  },
  buttonHoldStyle: {
    margin: 50,
    //width: 160,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFF00',
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
