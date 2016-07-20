import React, {Component, PropTypes} from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import * as adActions from '../reducers/ad/actions';

import Icon from 'react-native-vector-icons/Ionicons';
import DiscoverPage from '../components/DiscoverPage';


// this is a traditional React component connected to the redux store
class DiscoverScreen extends Component {
  static navigatorStyle = {
    navBarTextColor: '#d24919',
    navBarBackgroundColor: '#ffffff',
    navBarButtonColor: '#d24919',
    drawUnderNavBar: true,
    drawUnderTabBar: true,
    navBarTranslucent: true
  };

  constructor(props) {
    super(props);

    this.disableAd = this.disableAd.bind(this);
  }

  disableAd() {
    this.props.dispatch(adActions.disableAd());
    Alert.alert(
      null,
      'I hear you. Ad disabled.',
      null
    )
  }

  render() {
    return (
      <DiscoverPage navigator={this.props.navigator} disableAd={this.disableAd}/>
    );
  }

}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    
  };
}

export default connect(mapStateToProps)(DiscoverScreen);
