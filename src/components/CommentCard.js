import React, {Component} from 'react';
import {
  View,
  Image,
  AlertIOS,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Hyperlink from 'react-native-hyperlink';

// for timestamp
import moment from 'moment';
import CustomRelativeTime from '../config/CustomRelativeTime';
moment.updateLocale('en', CustomRelativeTime);

export default class CommentCard extends Component {
  static propTypes = {
    commentData: React.PropTypes.object,
    nestingLevel: React.PropTypes.number,
  };

  static defaultProps = {
    nestingLevel: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false
    }

    this.renderReplies = this.renderReplies.bind(this);
    this.renderReply = this.renderReply.bind(this);
  }

  onArrowPress() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    })
  }

  onReportButtonPress() {
    AlertIOS.prompt(
      'What\'s wrong with it?',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Report', onPress: text => {
          AlertIOS.alert(null,'Thank you. We will report it to the mods of this subreddit.');
        }},
      ],
      'plain-text'
    );
  }

  renderReplies() {
    let repliesChildrenArr = this.props.commentData.replies.data.children;
    return (
      <View>
        {repliesChildrenArr.map(this.renderReply)}
      </View>
    )
  }

  renderReply(child) {
    return <CommentCard commentData={child.data} key={child.data.id} nestingLevel={this.props.nestingLevel + 1}/>;
  }

  render() {
    let commentBody = <Hyperlink 
                       onPress={(url) => Linking.openURL(url).catch(err => console.error('An error occurred', err))} 
                       linkStyle={{color:'#2980b9'}}
                      >
                        <Text>{this.props.commentData.body}</Text>
                      </Hyperlink>;

    let arrow = this.state.isCollapsed ? 'ios-arrow-forward' : 'ios-arrow-down';

    let cardContainerStyle = {
      marginLeft: this.props.nestingLevel * 10,
      margin: 1,
      borderLeftColor: '#d24919',
      borderLeftWidth: this.props.nestingLevel ? 1 : 0,
    }

    let reportButton = <View style={{alignItems: 'flex-end'}}>
                          <TouchableOpacity onPress={() => this.onReportButtonPress()}>
                            <Text style={{color: 'gray', fontSize: 12}}>&nbsp;Report</Text>
                          </TouchableOpacity>
                       </View>

    return (
        <View>
          <View style={cardContainerStyle}>
            <View style={styles.row}>

              <View style={styles.textContainer}>
                <Text style={{color: '#d24919'}} onPress={() => this.onArrowPress()}>
                  <Icon name={arrow} size={16} color="#d24919"/> {moment().from(this.props.commentData.created_utc*1000, true)}&nbsp;&bull;&nbsp;{this.props.commentData.author}&nbsp;&bull;&nbsp;{this.props.commentData.score}
                </Text>

                {this.state.isCollapsed ? null : commentBody}
                {this.state.isCollapsed ? null : reportButton}
              </View>
            </View>
          </View>
          {this.props.commentData.replies && !this.state.isCollapsed ? this.renderReplies() : null}
        </View>
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
