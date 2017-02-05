"use strict";

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var Main = React.createClass({
  displayName: "Main",

  componentDidMount: function componentDidMount() {
    window.scrollUp = this.scrollUp;
    window.scrollDown = this.scrollDown;
  },

  scrollUp: function scrollUp(e) {
    if (e) {
      e.preventDefault();
    }
    $('html, body').animate({
      scrollTop: 0,
      scrollLeft: 0
    }, 400);
  },

  scrollDown: function scrollDown(e) {
    if (e) {
      e.preventDefault();
    }
    $('html, body').animate({
      scrollTop: document.body.scrollHeight,
      scrollLeft: 0
    }, 400);
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "site-wrapper" },
      React.createElement(Quotes, null),
      React.createElement(SubmitForm, null),
      React.createElement(
        "p",
        { className: "ack" },
        "Original ",
        React.createElement(
          "a",
          {
            href: "http://getbootstrap.com/examples/cover/", target: "_blank" },
          "Cover"
        ),
        " template for ",
        React.createElement(
          "a",
          {
            href: "http://getbootstrap.com", target: "_blank" },
          "Bootstrap"
        ),
        " created by ",
        React.createElement(
          "a",
          {
            href: "https://twitter.com/mdo", target: "_blank" },
          "@mdo"
        ),
        "."
      ),
      React.createElement(
        "div",
        { className: "mastfoot clearfix" },
        React.createElement(
          "div",
          { className: "inner" },
          React.createElement(
            "nav",
            null,
            React.createElement(
              "ul",
              { className: "hide nav mastfoot-nav pull-left" },
              React.createElement(
                "li",
                null,
                React.createElement(
                  "p",
                  null,
                  "Total: "
                )
              )
            ),
            React.createElement(
              "ul",
              { className: "nav mastfoot-nav pull-right" },
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { href: "#" },
                  React.createElement(
                    "div",
                    { onClick: this.scrollDown },
                    "Add"
                  )
                )
              ),
              React.createElement(
                "li",
                null,
                React.createElement(
                  "a",
                  { href: "/summary" },
                  "Top"
                )
              )
            )
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(Main, null), document.body);
