import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

export default class LoadingIcon extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image style={styles.loadingImg} source={require('../../img/loading_snoo.gif')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingImg: {
    margin: 10,
    width: 45,
    height: 69,
  }
});
