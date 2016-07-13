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
    subredditData: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SubredditPage subredditData={this.props.subredditData}/>
    );
  }

}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    
  };
}

export default connect(mapStateToProps)(SubredditScreen);