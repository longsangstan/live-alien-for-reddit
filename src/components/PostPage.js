import React, {Component} from 'react';
import {
  View,
  ListView,
  RefreshControl,
  Image,
  StyleSheet,
  Linking,
  Text
} from 'react-native';
import CommentCard from './CommentCard';
import LoadingIcon from './LoadingIcon';
import ErrorIcon from './ErrorIcon';
import Icon from 'react-native-vector-icons/Ionicons';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

let openLinkIcon;

let commentsFetcher;
const fetchInterval = 2500; // **to confirm the rate limt is 30 or 60 per minute

export default class PostPage extends Component {
  static propTypes = { 
    postData: React.PropTypes.object,
    navigator: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      isLoading: true,
      hasNoComments: false,
    }

    this.fetchComments = this.fetchComments.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.populateIcons = this.populateIcons.bind(this);
    this.setNavbarButtons = this.setNavbarButtons.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'open') { // this is the same id field from the static navigatorButtons definition
        Linking.openURL(this.props.postData.url).catch(err => console.error('An error occurred', err));
      }
    }
  }

  componentWillMount() {
    this.setState({isLoading: true});

    commentsFetcher = setInterval(() => {
      console.log('fetching comments for: ' + this.props.postData.title);
      this.fetchComments()
      .then((commentsArr) => this.setState({
        dataSource: ds.cloneWithRows(commentsArr),
        isLoading: false,
        hasNoComments: !commentsArr.length,
      }));
    }, fetchInterval);
  }

  componentDidMount() {
    this.populateIcons().then(() => this.setNavbarButtons());
  }

  componentWillUnmount() {
    clearInterval(commentsFetcher);
  }

  populateIcons() {
    return Icon.getImageSource('md-open', 25).then((source) => openLinkIcon = source);
  }

  setNavbarButtons() {
    this.props.navigator.setButtons({
      rightButtons: [{
        id: 'open', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        icon: openLinkIcon,
        //disabled: true, // optional, used to disable the button (appears faded and doesn't interact)
      }], // see "Adding buttons to the navigator" below for format (optional)
      animated: true // does the change have transition animation or does it happen immediately (optional)
    });
  }

  fetchComments() {
    return fetch('https://www.reddit.com/r/' + this.props.postData.subreddit + '/comments/' + this.props.postData.id + '/.json?sort=new')
      .then((response) => response.json())
      .then((responseJson) => {
        let commentsArr = [];

        let children = responseJson[1].data.children;
        for (var i = 0; i < children.length; i++) {
          if(children[i].kind === 't1') {
            let commentData = children[i].data;
            commentsArr.push(commentData);
          }
        }
  
        return commentsArr;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  renderRow(rowData) {
    return (
      <CommentCard 
        commentData={rowData}
        key={rowData.id}
      />
    )
  }

  render() {
    let commentsList;
    if(this.state.isLoading) {
      commentsList = <View style={{marginTop: 65}}>
                      <LoadingIcon />
                     </View>
    } else {
      commentsList = <ListView
                      style={styles.scrollViewContainer}
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow}
                    />
    }
    if(this.state.hasNoComments) {
      commentsList = <View style={{marginTop: 65}}><ErrorIcon errorMsg={'No comments:( Retrying...'}/></View>
    }

    return (     
      <Image source={require('../../img/background.jpg')} style={styles.container}>
          {commentsList}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  scrollViewContainer: {
    marginTop: 65,
    //marginBottom: 50
  }
});

