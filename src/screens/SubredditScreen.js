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
import SubredditPage from '../components/SubredditPage';

// this is a traditional React component connected to the redux store
class SubredditScreen extends Component {
  static navigatorStyle = {
    navBarTextColor: '#d24919',
    navBarButtonColor: '#d24919',
    navBarBackgroundColor: '#ffffff',
    drawUnderNavBar: true,
    drawUnderTabBar: true,
    navBarTranslucent: true
  };

  static propTypes = { 
    id: React.PropTypes.string,
    display_name: React.PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SubredditPage id={this.props.id} display_name={this.props.display_name}/>
    );
  }

}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    
  };
}

export default connect(mapStateToProps)(SubredditScreen);