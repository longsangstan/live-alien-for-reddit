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
import Icon from 'react-native-vector-icons/Ionicons';
import ExampleComponent from '../components/ExampleComponent';

// this is a traditional React component connected to the redux store
class ExampleScreen extends Component {
  static navigatorStyle = {
    navBarTextColor: '#d24919',
    navBarBackgroundColor: '#ffffff',
    drawUnderNavBar: true,
    drawUnderTabBar: true,
    navBarTranslucent: true
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ExampleComponent />
    );
  }

}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    
  };
}

export default connect(mapStateToProps)(ExampleScreen);
