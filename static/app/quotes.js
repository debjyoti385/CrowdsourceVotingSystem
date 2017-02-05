"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var VoteButton = React.createClass({
  displayName: "VoteButton",

  render: function render() {
    return React.createElement("button", _extends({}, this.props, {
      role: "button",
      className: (this.props.className || '') + ' vote-button' }));
  }
});

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
var shuffleArray = function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i -= 1) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
  return array;
};

var Quotes = React.createClass({
  displayName: "Quotes",

  getInitialState: function getInitialState() {
    return {
      quoteText: '',
      quotes: [],
      index: -1
    };
  },

  componentDidMount: function componentDidMount() {
    var self = this;
    window.onpopstate = function (event) {
      self.setState({ index: event.state.index });
      self.loadNextQuote(true);
    };

    VK.init({ apiId: 5443383, onlyWidgets: true });
    VK.Widgets.Like("vk-like", {
      type: "button",
      height: 20,
      pageTitle: "Crowdsource tweets classifier",
      pageDescription: "Crowdsource tweets classifier"
    });

    $.get("/quote", function (result) {
      if (this.isMounted()) {
        var quoteIds = _.keys(result);
        quoteIds = shuffleArray(quoteIds);

        var specificQuoteId = getParameterByName('quoteId');
        if (specificQuoteId != "") {
          //quoteIds = _.without(quoteIds, specificQuoteId);
          var index = _.indexOf(quoteIds, specificQuoteId);
          while (index > 0) {
            quoteIds.splice(index, 1);
            index = _.indexOf(quoteIds, specificQuoteId, index - 1);
          }
          quoteIds.unshift(specificQuoteId);
        }

        this.setState({
          quotes: quoteIds
        });

        this.loadNextQuote();
      }
    }.bind(this));
    window.forceQuote = this.forceQuote;
  },

  forceQuote: function forceQuote(quoteText) {
    if (this.isMounted()) {
      this.setState({
        quoteText: quoteText + '*',
        quoteScore: 1,
          quoteScoreDem: 0,
          quoteScoreRep: 0,
          quoteScoreNon: 0,
        index: this.state.quotes.length // force invalid index to restart it again
      });
      $('.vote-button').attr('disabled', false);
      $('.moder-notice').removeClass('hide');
    }
  },

/*  updateTwitterButton: function updateTwitterButton() {
    // remove any previous clone
    $('#twitter-share-button-div').empty();

    // create a clone of the twitter share button template
    var clone = $('.twitter-share-button-template').clone();

    // fix up our clone
    clone.removeAttr("style"); // unhide the clone
    clone.attr("data-url", window.location.toString());
    clone.attr("class", "twitter-share-button");

    // copy cloned button into div that we can clear later
    $('#twitter-share-button-div').append(clone);

    // reload twitter scripts to force them to run, converting a to iframe
    $.getScript("https://platform.twitter.com/widgets.js");
  },
*/
  loadNextQuote: function loadNextQuote(doNotPushState) {
    if (this.state.index >= this.state.quotes.length - 1) {
      var quoteIds = shuffleArray(this.state.quotes);
      this.setState({
        index: -1,
        quotes: quoteIds
      });
      this.state.index = -1;
    }

    $('.moder-notice').addClass('hide');

    var quoteId = this.state.quotes[this.state.index + 1];

    $.get("/quote/" + quoteId, function (result) {
      if (this.isMounted()) {
        if (!doNotPushState) {
          history.pushState({ index: this.state.index }, result.text, '/?quoteId=' + quoteId);
        }
        this.setState({
          quoteText: result.text,
          index: this.state.index + 1,
          quoteScoreDem: result.democrat,
          quoteScoreRep: result.republican,
          quoteScoreNon: result.non_political
        });

        //this.updateTwitterButton();

        $('.vote-button').attr('disabled', false);
      }
    }.bind(this));
  },

  vote: function vote(value) {
    return function () {
      $('.vote-button').attr('disabled', true);
      $('.moder-notice').addClass('hide');
      var quoteId = this.state.quotes[this.state.index];
      if (!quoteId) {
        return this.loadNextQuote();
      }
      $.ajax({
        type: 'POST',
        url: "/quote/" + quoteId + '/vote',
        data: JSON.stringify({ value: value }),
        contentType: "application/json; charset=utf-8",
        success: function () {
          this.loadNextQuote();
        }.bind(this)
      });
    }.bind(this);
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "site-wrapper-inner" },
      React.createElement(
        "div",
        { className: "cover-container" },
        React.createElement(
          "div",
          { className: "masthead clearfix" },
//          React.createElement(
//            "a",
//            { href: "https://github.com/naXa777/wfh-ninja", target: "_blank" },
//            React.createElement("img", { style: { position: 'absolute', top: 0, right: 0, border: 0 },
//              src: "https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67",
//              alt: "Fork me on GitHub",
//              "data-canonical-src": "https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" })
//          ),
          React.createElement(
            "div",
            { className: "inner" },
            React.createElement(
              "a",
              { href: "#" },
              React.createElement(
                "h3",
                { className: "masthead-brand" },
                "Help us classifying the tweet!"
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "inner cover" },
          React.createElement(
            "p",
            { className: "lead" },
            "Tweet"
          ),
          React.createElement(
            "h1",
            null,
            this.state.quoteText,
            " ",
            React.createElement(
              "span",
              { className: "badge white" },
              this.state.quoteScoreNon
            ),
            React.createElement(
              "span",
              { className: "badge blue" },
              this.state.quoteScoreDem
            ),
             React.createElement(
              "span",
              { className: "badge red" },
              this.state.quoteScoreRep
            )
          ),
          React.createElement(
            "p",
            { className: "lead" },
            React.createElement(
              VoteButton,
              { onClick: this.vote('n'), className: "btn btn-lg btn-default" },
              React.createElement("span", { className: "glyphicon glyphicon-flag" }),
              " Non Political"
            ),
            React.createElement(
              VoteButton,
              { onClick: this.vote('d'), className: "btn btn-lg btn-primary" },
              React.createElement("span", { className: "glyphicon glyphicon-triangle-right" }),
              " Democrat!"
            ),
            React.createElement(
              VoteButton,
              {onClick: this.vote('r'), className: "btn btn-lg btn-danger"},
              React.createElement("span",{className:"glyphicon glyphicon-registration-mark"}),
                      "  Republican!"
            )
          ),
/*          React.createElement(
            "div",
            { className: "text-center" },
            React.createElement(
              "ul",
              { className: "list-inline" },
              React.createElement(
                "li",
                null,
                React.createElement(
                  "p",
                  { className: "twitter-wrapper", style: { height: '20px' } },
                  React.createElement(
                    "a",
                    { href: "https://twitter.com/share", "data-text": " I have a day off today because ...",
                      className: "twitter-share-button-template", "data-via": "naXa_by", "data-related": "bencxr",
                      "data-count": "none", "data-hashtags": "vyhodnoy.by"},
                    React.createElement("div", { id: "twitter-share-button-div" })
                  )
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement("div", { id: "vk-like" })
              )
            )
          ),*/
          React.createElement(
            "div",
            { className: "moder-notice hide" },
            React.createElement(
              "i",
              null,
              "* Your input will soon be reviewed and added to the site." 
            )
          )
        )
      )
    );
  }
});
