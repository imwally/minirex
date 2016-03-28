var React = require('react');
var Player = require('./Player');

var Header = React.createClass({
    render: function() {
	return (
		<div id="header">
		<Player />
		</div>
	)
    }
});

module.exports = Header;
