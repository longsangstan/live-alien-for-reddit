import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import qs from 'shitty-qs';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  connectWithInstagram() {
    /*
    // TODO: break it down
    Linking.openURL('https://api.instagram.com/oauth/authorize/?client_id=ff389570a00d4956bb80c81b052ac74d&redirect_uri=igmagictools://foo&response_type=token');

    Linking.addEventListener('url', handleUrl);

    function handleUrl (event) {
      console.log(event.url)
      let [, query_string] = event.url.match(/\#(.*)/);
      let query = qs(query_string);
      console.log('at: ' + query.access_token);
      Linking.removeEventListener('url', handleUrl)
    }
    console.log('connect with ig');
    */
  }

  render() {
    return (
      <Image source={require('../../img/background.jpg')} style={styles.container}>
        <Icon.Button name="logo-reddit" backgroundColor="#d24919" borderRadius={100} iconStyle={{marginLeft: 5}} onPress={this.connectWithInstagram}>
          <Text style={{marginRight: 5, fontSize: 15, color:'white', fontWeight: 'bold'}}>Log In With Reddit</Text>
        </Icon.Button>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  }
});
