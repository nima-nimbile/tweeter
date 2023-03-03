/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * 
 */
$(document).ready(function () {
// ..........................................................................................tweetData Object

// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// };
// ..........................................................................................loadTweets
const loadTweets = function() {
  $.ajax({
    type: 'GET',
    url: '/tweets',
    success: (tweets) => {
      //  console.log("tweets",tweets);
       renderTweets(tweets);
      }
  })
};
loadTweets();
// ..........................................................................................renderTweets
const $tweeconainer = $("#tweets-container");
const renderTweets = (tweets) => {
      $tweeconainer.empty();
      for (let data in tweets) {
        const $tweet = createTweetElement(tweets[data]);
        $tweeconainer.prepend($tweet);
      }
    };
// ..........................................................................................escape = function (str)
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
// ..........................................................................................createTweetElement = (tweetData)
const createTweetElement = (tweetData) => {
  console.log("tweetData",tweetData);
  const dateCreated = new Date(tweetData.created_at);
  const dateToday = new Date();
  const timeDiff = Math.abs(dateToday.getTime() - dateCreated.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  const $tweet = (`<article>` +
    `<header>` +
    `<img class="avatar" src="${tweetData.user.avatar}">` +
    `<h2 class="avatar">${tweetData.user.name}</h2>` +
    `<span class="handle">${tweetData.user.handle}</span>` +
    `</header>` +
    `<div id ="text-second">${escape(tweetData.content.text)}</div>` +
    `<footer>` +
    `<span class="dayago">${diffDays} days ago</span>` +
    `<div class="icons">` +
    `<span class="flag"><i class="fa fa-flag" aria-hidden="true"></i></span>` +
    `<span class="rotate"><i class="fa fa-retweet" aria-hidden="true"></i></span>` +
    `<span class="heart""><i class="fa fa-heart" aria-hidden="true"></i></span>` +
    `</div>` +
    `</footer>` +
    `</article>`);
    console.log("$tweet", $tweet);

  return $tweet;

};
// ..........................................................................................POST req

$('form').on("submit", (event) => {
  console.log("$('form'),", $('form'))
  event.preventDefault();
  $("#book").slideUp();
    $("#book1").slideUp();
  const tweetData = event.target[0].value
  console.log("tweetData1111", tweetData);
  if (tweetData === "" || tweetData === null){
   return  $("#book").slideDown('slow');
  }
  if(tweetData.length > 140){
    return $("#book1").slideDown('slow');
    } 
  const urlEncode = $('form').serialize();
  $.ajax({
    method: 'POST',
    url: "/tweets",
    data: urlEncode,
    success: (response) => {
      console.log("response1", response);
      loadTweets();
    }
  })

})

});



