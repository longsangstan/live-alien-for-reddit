import React, {Component} from 'react';
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
import PostPage from '../components/PostPage';

// this is a traditional React component connected to the redux store
class PostScreen extends Component {
  static navigatorStyle = {
    navBarTextColor: '#d24919',
    navBarButtonColor: '#d24919',
    navBarBackgroundColor: '#ffffff',
    drawUnderNavBar: true,
    drawUnderTabBar: true,
    navBarTranslucent: true,
    tabBarHidden: true
  };

  static propTypes = { 
    postData: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PostPage postData={this.props.postData} navigator={this.props.navigator} shouldShowAd={this.props.ad.shouldShowAd}/>
      //<Text>post screen!</Text>
    );
  }

}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    ad: state.ad
  };
}

export default connect(mapStateToProps)(PostScreen);