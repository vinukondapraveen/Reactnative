import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

class SleekLoadingIndicator  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Loading...',
      loading: true
    };
  }
  render() {
    if (this.props.loading) {
      return (
        <View style={styles.container}>
          <LoadingIndicator text={this.props.text} />
        </View>
      );
    } else {
      return null;
    }
  }
}

class LoadingIndicator  extends Component {
  render() {
    return (
      <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>{this.props.text}</Text>
            <View style={styles.spinnerContainer}>
              <ActivityIndicator
               animating={true}
               size='large'
               color="#fff"
              />
            </View>
         </View>
    );
  }
}

const styles = StyleSheet.create({
   loadingContainer: {
     padding: 12,
     backgroundColor: '#000',
     borderRadius: 8,
     opacity: .8,
     justifyContent: 'center',
     alignItems: 'center'
   },

   loadingText: {
     fontWeight: 'bold',
     color: '#fff',
     textAlign: 'center',
     fontSize: 22,
   },

   spinnerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      marginTop: 4,
   },
});

export default SleekLoadingIndicator
