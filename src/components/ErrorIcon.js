import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

export default class ErrorIcon extends Component {
  static propTypes = {
    errorMsg: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={styles.errorImg} source={require('../../img/crying_snoo.jpg')} />
          <Text style={{backgroundColor: 'transparent', color: 'black', fontWeight: 'bold'}}>{this.props.errorMsg}</Text>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  errorImg: {
    margin: 10,
    width: 45,
    height: 53
  }
});
