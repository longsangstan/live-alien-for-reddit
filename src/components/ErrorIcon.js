import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

export default ErrorIcon = (props) => {
  return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={styles.errorImg} source={require('../../img/crying_snoo.jpg')} />
          <Text style={{backgroundColor: 'transparent', color: 'black', fontWeight: 'bold'}}>{props.errorMsg}</Text>
       </View>
    );
}

ErrorIcon.propTypes = {
    errorMsg: React.PropTypes.string,
};

const styles = StyleSheet.create({
  errorImg: {
    margin: 10,
    width: 45,
    height: 53
  }
});
