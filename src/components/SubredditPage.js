import React, {Component} from 'react';
import {
  View,
  ListView,
  RefreshControl,
  Image,
  StyleSheet,
} from 'react-native';
import PostCard from './PostCard';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class SubredditPage extends Component {
  static propTypes = { 
    id: React.PropTypes.string,
    display_name: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([]),
      isLoading: true,
      refreshing: false,
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
    }));
  }

  fetchPosts() {
    return fetch('https://www.reddit.com/r/' + this.props.display_name + '.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let postsArr = [];

        let children = responseJson.data.children;
        for (var i = 0; i < children.length; i++) {
          let postData = children[i].data;
          postsArr.push(postData);
        }
  
        return postsArr;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.fetchPosts()
    .then((postsArr) => this.setState({
      dataSource: ds.cloneWithRows(postsArr),
      refreshing: false
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
      postsList = <View style={{marginTop: 65}}>
                      <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={styles.loadingImg} source={{uri: 'http://i.imgur.com/OxBJ2jQ.gif'}} />
                      </View>
                  </View>
    } else {
      postsList = <ListView
                    style={styles.scrollViewContainer}
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

    return (     
      <Image source={require('../../img/background3.jpg')} style={styles.container}>
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
  },
  scrollViewContainer: {
    marginTop: 65,
    marginBottom: 50
  },
  loadingImg: {
    margin: 10,
    width: 45,
    height: 69,
  },
});
