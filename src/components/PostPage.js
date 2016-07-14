import React, {Component} from 'react';
import {
  View,
  ListView,
  RefreshControl,
  Image,
  StyleSheet,
  Text
} from 'react-native';
import CommentCard from './CommentCard';
import LoadingIcon from './LoadingIcon';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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
    }

    this.fetchComments = this.fetchComments.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    this.setState({isLoading: true});

    //setInterval(()=>{ 
      this.fetchComments()
      .then((commentsArr) => this.setState({
        dataSource: ds.cloneWithRows(commentsArr),
        isLoading: false,
      }));
    //}, 2000);
    
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

        console.log(commentsArr);
  
        return commentsArr;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderRow(rowData) {
    
    return (
      <CommentCard 
        commentData={rowData}
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

