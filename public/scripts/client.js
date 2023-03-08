/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * 
 */
$(document).ready(function () {
  // ..........................................................................................loadTweets
  const loadTweets = function () {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: (tweets) => {
        renderTweets(tweets);
      }
    })
  };
  loadTweets();
  // ..........................................................................................renderTweets
  const tweeconainer = $("#tweets-container");
  const renderTweets = (tweets) => {
    $('#tweet-text').val("");
    $('.counter').val("140");
    for (let data in tweets) {
      const $tweet = createTweetElement(tweets[data]);
      tweeconainer.prepend($tweet);
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
    console.log("tweetData", tweetData);
    const diffDays = timeago.format(new Date(tweetData.created_at));
    const $tweet = (`<article class = "border">` +
      `<header>` +
      `<img class="avatar" src="${tweetData.user.avatars}">` +
      `<h2 class="username">${tweetData.user.name}</h2>` +
      `<span class="handle">${tweetData.user.handle}</span>` +
      `</header>` +
      `<div id ="text-second">${escape(tweetData.content.text)}</div>` +
      `<footer>` +
      `<span class="dayago">${diffDays}</span>` +
      `<div class="icons">` +
      `<span class="flag"><i class="fa fa-flag" aria-hidden="true"></i></span>` +
      `<span class="rotate"><i class="fa fa-retweet" aria-hidden="true"></i></span>` +
      `<span class="heart""><i class="fa fa-heart" aria-hidden="true"></i></span>` +
      `</div>` +
      `</footer>` +
      `</article>`);
    return $tweet;
  };

  // ..........................................................................................POST req

  $('form').on("submit", (event) => {
    event.preventDefault();
    $("#book").slideUp();
    $("#book1").slideUp();
    const tweetData = event.target[0].value;
    if (tweetData === "" || tweetData === null) {
      return $("#book").slideDown('slow');
    }
    if (tweetData.length > 140) {
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



