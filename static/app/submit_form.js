"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var SubmitButton = React.createClass({
  displayName: "SubmitButton",

  render: function render() {
    return React.createElement("a", _extends({}, this.props, {
      href: "javascript:;",
      role: "button",
      className: (this.props.className || '') + ' btn' }));
  }
});

var SubmitForm = React.createClass({
  displayName: "SubmitForm",

  getInitialState: function getInitialState() {
    return {
      newQuoteText: ''
    };
  },

  handleChange: function handleChange(evt) {
    this.setState({
      newQuoteText: evt.target.value
    });
  },

  submit: function submit(e) {
    if (this.state.newQuoteText == "") {
      return e.preventDefault();
    }
    $('button').prop('disabled', true);
    $.ajax({
      type: 'POST',
      url: "/quote",
      data: JSON.stringify({ text: this.state.newQuoteText }),
      contentType: "application/json; charset=utf-8",
      success: function (result) {
        $('button').prop('disabled', false);
        this.setState({
          newQuoteText: ""
        });
        window.forceQuote(result.text);
        window.scrollUp();
      }.bind(this)
    });
    return e.preventDefault();
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "site-wrapper-inner-auto" },
      React.createElement(
        "div",
        { className: "cover-container submit-quote" },
        React.createElement(
          "form",
          { onSubmit: this.submit, className: "inner cover" },
          React.createElement(
            "div",
            { className: "form-group new-quote" },
            React.createElement(
              "label",
              { htmlFor: "suggestedQuote", className: "lead" },
              "Want to add a new tweet?"
            ),
            React.createElement("input", { type: "text", className: "form-control input-lg", onChange: this.handleChange,
              placeholder: " Add your tweet here",
                value: this.state.newQuoteText })
          ),
          React.createElement(
            "button",
            { onClick: this.submit, className: "btn btn-lg btn-success" },
            "Submit"
          )
        )
      )
    );
  }
});
