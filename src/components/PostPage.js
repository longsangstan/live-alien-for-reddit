import React, {Component} from 'react';
import {
  ListView,
  RefreshControl,
  Image,
  processColor,
  StyleSheet,
  Text
} from 'react-native';
import CommentCard from './CommentCard';
import LoadingIcon from './LoadingIcon';
import ErrorIcon from './ErrorIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import { AdMobInterstitial } from 'react-native-admob';
import IdleTimerManager from 'react-native-idle-timer';

const Browser = require('react-native-browser');

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

let openLinkIcon;

let commentsFetcher;
const fetchInterval = 2500; // **to confirm the rate limt is 30 or 60 per minute

export default class PostPage extends Component {
  static propTypes = { 
    postData: React.PropTypes.object,
    navigator: React.PropTypes.object,
    shouldShowAd: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      isLoading: true,
      hasNoComments: false,
    }

    this._isMounted = false;

    this.prepareAd = this.prepareAd.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.populateIcons = this.populateIcons.bind(this);
    this.setNavbarButtons = this.setNavbarButtons.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'open') { // this is the same id field from the static navigatorButtons definition
        Browser.open(this.props.postData.url, {
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
      }
    }
  }

  prepareAd() {
    AdMobInterstitial.setAdUnitID('ca-app-pub-4870542892593937/9782471201');
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    AdMobInterstitial.requestAd((error) => error && console.log(error));
    AdMobInterstitial.addEventListener('interstitialDidLoad',
      () => AdMobInterstitial.showAd((error) => error && console.log(error)));
  }

  componentWillMount() {
    this.setState({isLoading: true});

    // Show Ad?
    if(this.props.shouldShowAd) {
      if(Math.floor((Math.random() * 3) + 1) === 1) this.prepareAd(); // 1 in 3 chances
    }

    // Start fetching comments
    commentsFetcher = setInterval(() => {
      this.fetchComments()
        .then((commentsArr) => {
          if(this._isMounted) {
            this.setState({
              dataSource: ds.cloneWithRows(commentsArr),
              isLoading: false,
              hasNoComments: !commentsArr.length,
            });
          }
        });        
    }, fetchInterval);

    // Disable Dimmer
    IdleTimerManager.setIdleTimerDisabled(true);
  }

  componentDidMount() {
    this._isMounted = true;

    this.populateIcons().then(() => this.setNavbarButtons());
  }

  componentWillUnmount() {
    this._isMounted = false;

    clearInterval(commentsFetcher);

    IdleTimerManager.setIdleTimerDisabled(false);
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
    let commentsOrLoading;
    if(this.state.isLoading) {
      commentsOrLoading = <LoadingIcon />
    } else {
      commentsOrLoading = <ListView
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow}
                    />
    }
    if(this.state.hasNoComments) {
      commentsOrLoading = <ErrorIcon errorMsg={'No comments:( Retrying...'}/>
    }

    return (     
      <Image source={require('../../img/background.jpg')} style={styles.container}>
          {commentsOrLoading}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    paddingTop: 65
  },
});

