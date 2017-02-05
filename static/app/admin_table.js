'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var FormButton = React.createClass({
  displayName: 'FormButton',

  render: function render() {
    return React.createElement('button', _extends({}, this.props, {
      role: 'button',
      className: (this.props.className || '') + ' form-button' }));
  }
});

var AdminMain = React.createClass({
  displayName: 'AdminMain',

  getInitialState: function getInitialState() {
    return {
      quoteText: '',
      quotes: [],
      index: -1
    };
  },

  componentDidMount: function componentDidMount() {
    this.loadQuotes();
  },

  loadQuotes: function loadQuotes() {
    $.get("/quote?all=true", function (result) {
      this.setState({
        quotes: result
      });
      var renderedRows = [];
      var padZeroes = function padZeroes(input) {
        // pad 1 digit to 2 digits
        return ("0" + input).slice(-2);
      };
      Object.keys(result).forEach(function (key) {
        var quote = result[key];
        var date = new Date(quote.date_created);
        var formattedDate = date.getFullYear() + "-" + padZeroes(date.getMonth() + 1) + "-" + padZeroes(date.getDate()) + " " + padZeroes(date.getHours()) + ":" + padZeroes(date.getMinutes()) + ":" + padZeroes(date.getSeconds());
        var quoteRow = React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            { className: 'checkbox-align', 'data-sortable': 'false' },
            React.createElement('input', { type: 'checkbox', name: 'checkbox', id: "checkbox" + quote.id, value: quote.id })
          ),
          React.createElement(
            'td',
            { 'data-sortable-type': 'numeric' },
            parseInt(quote.id)
          ),
          React.createElement(
            'td',
            null,
            React.createElement(
              'a',
              { href: "/?quoteId=" + quote.id },
              ' ',
              quote.text
            )
          ),
          React.createElement(
            'td',
            { className: 'text-nowrap' },
            React.createElement('span', { className: "glyphicon glyphicon-eye-" + (quote.active ? "open" : "close") }),
            ' ',
            quote.active ? "Active" : "Inactive"
          ),
          React.createElement(
            'td',
            null,
            formattedDate
          ),
          React.createElement(
            'td',
            { 'data-sortable-type': 'numeric' },
            parseInt(quote.score)
          )
        );
        renderedRows.push(quoteRow);
      });
      this.setState({ renderedRows: renderedRows });
      Sortable.init();
    }.bind(this));
  },

  approve: function approve() {
    return function () {
      var checkboxes = document.getElementsByName('checkbox');
      var promises = [];
      for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
          // approve it
          var request = $.ajax({
            type: 'PUT',
            url: "/quote/" + checkboxes[i].value + '/approve',
            contentType: "application/json; charset=utf-8"
          });
          promises.push(request);
          checkboxes[i].checked = false;
        }
      }
      $.when.apply(null, promises).done(this.loadQuotes.bind(this));
    }.bind(this);
  },

  reject: function reject() {
    return function () {
      var checkboxes = document.getElementsByName('checkbox');
      var promises = [];
      for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
          // reject it
          var request = $.ajax({
            type: 'PUT',
            url: "/quote/" + checkboxes[i].value + '/reject',
            contentType: "application/json; charset=utf-8"
          });
        }
        promises.push(request);
        checkboxes[i].checked = false;
      }
      $.when.apply(null, promises).done(this.loadQuotes.bind(this));
    }.bind(this);
  },

  delete: function _delete() {
    return function () {
      if (!confirm('Are you sure? This action is irreversible!')) {
        return;
      }
      var checkboxes = document.getElementsByName('checkbox');
      for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
          // delete it
          var request = $.ajax({
            type: 'DELETE',
            url: "/quote/" + checkboxes[i].value,
            contentType: "application/json; charset=utf-8",
            async: false
          });
          promises.push(request);
          checkboxes[i].checked = false;
        }
      }
      this.loadQuotes();
    }.bind(this);
  },

  selectAll: function selectAll(f) {
    var checkboxes = document.getElementsByName('checkbox');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
      checkboxes[i].checked = f.target.checked;
    }
  },

  logOut: function logOut() {
    return function () {
      $.ajax({
        type: 'GET',
        url: "/logout",
        contentType: "application/json; charset=utf-8"
      });
    }.bind(this);
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'site-wrapper' },
      React.createElement(
        'div',
        { className: 'site-wrapper-inner' },
        React.createElement(
          'div',
          { className: 'cover-container' },
          React.createElement(
            'div',
            { className: 'inner cover' },
            React.createElement(
              'div',
              { className: 'logout' },
              React.createElement(
                'a',
                { href: '/logout' },
                ' Exit '
              )
            ),
            React.createElement(
              'h1',
              null,
              ' Admin Panel '
            ),
            React.createElement(
              'form',
              null,
              React.createElement(
                'div',
                { className: 'table-responsive' },
                React.createElement(
                  'table',
                  { className: 'table table-bordered', 'data-sortable': true },
                  React.createElement(
                    'thead',
                    null,
                    React.createElement(
                      'tr',
                      { className: 'table-header' },
                      React.createElement(
                        'th',
                        { className: 'checkbox-align' },
                        React.createElement('input', { type: 'checkbox', onClick: this.selectAll })
                      ),
                      React.createElement(
                        'th',
                        null,
                        'ID'
                      ),
                      React.createElement(
                        'th',
                        null,
                        'Excuse'
                      ),
                      React.createElement(
                        'th',
                        null,
                        'Status'
                      ),
                      React.createElement(
                        'th',
                        null,
                        'Created At'
                      ),
                      React.createElement(
                        'th',
                        null,
                        'Rating'
                      )
                    )
                  ),
                  React.createElement(
                    'tbody',
                    null,
                    this.state.renderedRows
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'admin-buttons' },
                React.createElement(
                  FormButton,
                  { onClick: this.reject(), className: 'btn btn-warning btn-lg' },
                  React.createElement('span', { className: 'glyphicon glyphicon-ban-circle' }),
                  ' Reject '
                ),
                React.createElement(
                  FormButton,
                  { onClick: this.approve(), className: 'btn btn-success btn-lg' },
                  React.createElement('span', { className: 'glyphicon glyphicon-ok-circle' }),
                  ' Approve '
                ),
                React.createElement('br', null),
                React.createElement(
                  FormButton,
                  { onClick: this.delete(), className: 'btn btn-danger btn-sm' },
                  React.createElement('span', { className: 'glyphicon glyphicon-trash' }),
                  ' Delete '
                )
              )
            )
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(AdminMain, null), document.body);
