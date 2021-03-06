import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

export default LoadingIcon = (props) => {
  return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image style={styles.loadingImg} source={require('../../img/loading_snoo.gif')} />
      </View>
    );
}

const styles = StyleSheet.create({
  loadingImg: {
    margin: 10,
    width: 45,
    height: 69,
  }
});
