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

export default class CommentCard extends Component {
  static propTypes = {
    commentData: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false
    }
  }

  onArrowPress() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    })
  }

  render() {
    let commentBody = this.state.isCollapsed ? null : <Text>{this.props.commentData.body}</Text>;
    let arrow = this.state.isCollapsed ? 'ios-arrow-forward' : 'ios-arrow-down';

    return (
      <TouchableHighlight style={styles.cardContainer}>
        <View>
          <View style={styles.row}>

            <View style={styles.textContainer}>
              <Text style={{color: 'gray'}}>
                <Icon name={arrow} size={16} color="#d24919" onPress={() => this.onArrowPress()}/> {moment().from(this.props.commentData.created_utc*1000, true)} &bull; {this.props.commentData.author} &bull; {this.props.commentData.score}
              </Text>

              {commentBody}
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
  cardContainer: {
    margin: 1,
  }
});
