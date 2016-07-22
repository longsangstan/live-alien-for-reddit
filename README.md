# LiveAlien: live reddit comments for mobile
A reddit client built on top of react native, currently only available on the [App Store](https://itunes.apple.com/us/app/livealien-live-comments-for/id1136285675?ls=1&mt=8).  

LiveAlien is designed for reading live comments - no need to refresh manually!

Best for reading active threads such as sports events or breaking news.  

![Alt Image Text](https://raw.githubusercontent.com/longsangstan/live-alien-for-reddit/master/Resources/preview.gif)

## UI hierarchy
```
App
-DiscoverScreen
    -DiscoverPage
        -SubredditCard
        -ErrorIcon
        -LoadingIcon
-SubredditScreen
    -SubredditPage
        -PostCard
            -ReportAlert
        -ErrorIcon
        -LoadingIcon
-PostScreen
    -PostPage
        -CommentCard
            -ReportAlert
        -ErrorIcon
        -LoadingIcon
```
## Credits
* App Icon: [Vectors Market](http://www.flaticon.com/authors/vectors-market) from [Flaticon](http://www.flaticon.com), licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/)
* Loading Icon: [/u/ReadsSmallTextWrong](https://www.reddit.com/user/ReadsSmallTextWrong)
* Error Icon: [/u/Ocouluss](https://www.reddit.com/user/Ocouluss)