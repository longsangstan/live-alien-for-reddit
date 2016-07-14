import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
  }

  onPress() {
    this.props.navigator.push({
      title: this.props.postData.title,
      screen: "example.PostScreen",
      passProps: {
        postData: this.props.postData
      }
    });
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.onPress()} style={styles.cardContainer}>
        <View>
          <View style={styles.row}>

            <View style={styles.textContainer}>
              <Text style={{color: '#d24919'}}>
                {moment().from(this.props.postData.created_utc*1000, true)} &bull; {this.props.postData.domain} &bull; {this.props.postData.author}
              </Text>

              <Text style={styles.title}>
                {this.props.postData.title}
              </Text>

              <Text style={{color: 'gray'}}>
                {this.props.postData.score + ' points'} &bull; {this.props.postData.num_comments + ' comments'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
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
  }
});
