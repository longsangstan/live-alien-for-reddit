import {
  AlertIOS,
} from 'react-native';

export default function showReportAlert() {
    AlertIOS.prompt(
    'What\'s wrong with it?',
    null,
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Report', onPress: text => {
        AlertIOS.alert(null,'Thank you. It will be reported to the mods of this subreddit.');
      }},
    ],
    'plain-text'
  );
}
