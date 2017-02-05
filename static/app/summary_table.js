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
        return row['democrat'] > 1 || row['republican'] > 1 ;
      }).sortBy(function (row) {
        return -row['democrat'] + row['republican'];
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
            { 'data-value': parseInt(quote.non_political) },
            parseInt(quote.non_political)
          ),
          React.createElement(
            'td',
            { 'data-value': parseInt(quote.democrat) },
            parseInt(quote.democrat)
          ),
          React.createElement(
            'td',
            { 'data-value': parseInt(quote.republican) },
            parseInt(quote.republican)
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
                  'Summary '
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
              'Tweets'
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
                        'Tweet'
                      ),
                      React.createElement(
                        'th',
                        null,
                        'Non-Political'
                      ),
                      React.createElement(
                        'th',
                        null,
                        'Democrat'
                      ),
                      React.createElement(
                        'th',
                        null,
                        'Republican'
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
                'You want to help us? ',
                React.createElement(
                  'a',
                  { href: '/' },
                  'Vote'
                ),
                ' for classification of the tweets!'
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
                        'Total: ',
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
                        'Back Home'
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
