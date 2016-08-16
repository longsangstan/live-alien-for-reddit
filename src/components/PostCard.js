import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  ActionSheetIOS,
  StyleSheet,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import showReportAlert from './ReportAlert';

const Device = require('react-native-device');

// for timestamp
import moment from 'moment';
import CustomRelativeTime from '../config/CustomRelativeTime';
moment.updateLocale('en', CustomRelativeTime);

export default class PostCard extends Component {
  static propTypes = {
    postData: React.PropTypes.object, // reference: https://github.com/reddit/reddit/wiki/JSON#link-implements-votable--created
    navigator: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
    }
  }

  pushToPostPage() {
    this.props.navigator.push({
      title: this.props.postData.title,
      screen: "example.PostScreen",
      passProps: {
        postData: this.props.postData
      }
    });
  }

  onDotsPress() {
    let BUTTONS = [
      'Hide',
      'Report',
      'Cancel',
    ];
    let CANCEL_INDEX = 2;

    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
      if(buttonIndex === 0) this.setState({isHidden: true});
      if(buttonIndex === 1) this.onReportButtonPress();
    });
  }

  onReportButtonPress() {
    showReportAlert();
  }

  render() {
    if(this.state.isHidden === true) return null;

    return (
        <View style={styles.cardContainer}>
          <View style={styles.row}>

            <View style={styles.textContainer}>
              <TouchableOpacity onPress={() => this.pushToPostPage()}>
                <Text style={{color: '#d24919'}}>
                  {moment().from(this.props.postData.created_utc*1000, true)}
                  &nbsp;&bull;&nbsp;
                  {this.props.postData.domain}
                  &nbsp;&bull;&nbsp;
                  {this.props.postData.author}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.pushToPostPage()}>
                <Text style={styles.title}>
                  {this.props.postData.title}
                </Text>
              </TouchableOpacity>

              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.pushToPostPage()}>
                  <Text style={{color: 'gray'}}>
                    {this.props.postData.score + ' points'}&nbsp;&bull;&nbsp;{this.props.postData.num_comments + ' comments'}
                  </Text>
                </TouchableOpacity>

                <View style={{ flex: 1}}></View>

                <TouchableOpacity onPress={() => this.onDotsPress()}>
                  <Icon name="ios-more" size={20} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
    );
  }
}

let sideMargin = Device.isIpad() ? 80 : 1;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    fontWeight: 'bold'
  },
  cardContainer: {
    margin: 1,
    marginLeft: sideMargin,
    marginRight: sideMargin,
  }
});
