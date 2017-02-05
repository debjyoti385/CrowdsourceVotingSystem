'use strict';

var SummaryMain = React.createClass({
  displayName: 'SummaryMain',

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
    $.get("/quote", function (result) {
      this.setState({
        quotes: result
      });
      var renderedRows = [];
      var total = _.values(result).length;
      var sortedPositiveResults = _(result).values().filter(function (row) {
        return row['score'] > 1;
      }).sortBy(function (row) {
        return -row['score'];
      }).slice(0, 15).value();
      sortedPositiveResults.forEach(function (quote) {
        var quoteRow = React.createElement(
          'tr',
          null,
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
            { 'data-value': parseInt(quote.score) },
            parseInt(quote.score)
          )
        );
        renderedRows.push(quoteRow);
      });
      this.setState({ total: total });
      this.setState({ renderedRows: renderedRows });
      Sortable.init();
    }.bind(this));
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
            { className: 'masthead clearfix' },
            React.createElement(
              'div',
              { className: 'inner' },
              React.createElement(
                'a',
                { href: '/' },
                React.createElement(
                  'h3',
                  { className: 'masthead-brand' },
                  '\u0412\u044B\u0445\u043E\u0434\u043D\u043E\u0439 \u0431\u044B!'
                )
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'inner cover' },
            React.createElement(
              'h1',
              null,
              '\u041B\u0443\u0447\u0448\u0438\u0435 \u043E\u0442\u043C\u0430\u0437\u043A\u0438'
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
                        null,
                        '\u041E\u0442\u043C\u0430\u0437\u043A\u0430'
                      ),
                      React.createElement(
                        'th',
                        null,
                        '\u0420\u0435\u0439\u0442\u0438\u043D\u0433'
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
                '\u0425\u043E\u0447\u0435\u0448\u044C \u043F\u043E\u043C\u043E\u0447\u044C \u0441\u0430\u0439\u0442\u0443? ',
                React.createElement(
                  'a',
                  { href: '/' },
                  '\u0413\u043E\u043B\u043E\u0441\u0443\u0439'
                ),
                ' \u0437\u0430 \u0445\u043E\u0440\u043E\u0448\u0438\u0435 \u043E\u0442\u043C\u0430\u0437\u043A\u0438!'
              )
            ),
            React.createElement(
              'div',
              { className: 'mastfoot clearfix' },
              React.createElement(
                'div',
                { className: 'inner' },
                React.createElement(
                  'nav',
                  null,
                  React.createElement(
                    'ul',
                    { className: 'nav mastfoot-nav pull-left' },
                    React.createElement(
                      'li',
                      null,
                      React.createElement(
                        'p',
                        null,
                        '\u0412\u0441\u0435\u0433\u043E: ',
                        this.state.total
                      )
                    )
                  ),
                  React.createElement(
                    'ul',
                    { className: 'nav mastfoot-nav pull-right' },
                    React.createElement(
                      'li',
                      null,
                      React.createElement(
                        'a',
                        { href: '/' },
                        '\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E'
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(SummaryMain, null), document.body);