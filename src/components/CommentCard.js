import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  processColor,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Hyperlink from 'react-native-hyperlink';
import showReportAlert from './ReportAlert';

const Browser = require('react-native-browser');
const Device = require('react-native-device');

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
    showReportAlert();
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
                       onPress={(url) => {
                          Browser.open(url, {
                            showUrlWhileLoading: true,
                            loadingBarTintColor: processColor('#d24919'),
                            navigationButtonsHidden: false,
                            showActionButton: true,
                            showDoneButton: true,
                            doneButtonTitle: 'Done',
                            showPageTitles: true,
                            disableContextualPopupMenu: false,
                            hideWebViewBoundaries: false,
                            buttonTintColor: processColor('#d24919')
                          });
                       }} 
                       linkStyle={{color:'#2980b9'}}
                      >
                        <Text>{this.props.commentData.body}</Text>
                      </Hyperlink>;

    let arrow = this.state.isCollapsed ? 'ios-arrow-forward' : 'ios-arrow-down';

    let sideMargin = Device.isIpad() ? 80 : 1;

    let cardContainerStyle = {
      marginLeft: this.props.nestingLevel * 10 + sideMargin,
      marginRight: sideMargin,
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
    backgroundColor: 'rgba(0,0,0,0)',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
});
