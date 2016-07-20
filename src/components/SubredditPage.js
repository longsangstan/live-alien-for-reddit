import React, {Component} from 'react';
import {
  View,
  ListView,
  RefreshControl,
  Image,
  StyleSheet,
} from 'react-native';
import PostCard from './PostCard';
import LoadingIcon from './LoadingIcon';
import ErrorIcon from './ErrorIcon';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class SubredditPage extends Component {
  static propTypes = { 
    subredditData: React.PropTypes.object,
    navigator: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      isLoading: true,
      refreshing: false,
      hasNoResults: false
    }

    this.fetchPosts = this.fetchPosts.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    this.setState({isLoading: true});
    this.fetchPosts()
    .then((postsArr) => this.setState({
      dataSource: ds.cloneWithRows(postsArr),
      isLoading: false,
      hasNoResults: !postsArr.length
    }));
  }

  fetchPosts() {
    return fetch('https://www.reddit.com/r/' + this.props.subredditData.display_name + '.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let postsArr = [];

        let children = responseJson.data.children;
        for (var i = 0; i < children.length; i++) {
          let postData = children[i].data;
          if(postData.over_18 === true) continue;
          postsArr.push(postData);
        }
  
        return postsArr;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.fetchPosts()
    .then((postsArr) => this.setState({
      dataSource: ds.cloneWithRows(postsArr),
      refreshing: false,
      hasNoResults: !postsArr.length
    }));
  }

  renderRow(rowData) {
    return (
      <PostCard 
        postData={rowData}
        navigator={this.props.navigator}
      />
    )
  }

  render() {
    let postsList;
    if(this.state.isLoading) {
      postsList = <LoadingIcon />
    } else {
      postsList = <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh.bind(this)}
                        tintColor={'#d24919'}
                      />
                    }
                  />
    }
    if(this.state.hasNoResults) {
      postsList = <ErrorIcon errorMsg={'Can\'t find anything:( Try again.'}/>
    }

    return (     
      <Image source={require('../../img/background.jpg')} style={styles.container}>
          {postsList}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    paddingTop: 65,
  }
});
