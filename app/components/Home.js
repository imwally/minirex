var React = require('react');
var AlbumGrid = require('./AlbumGrid');

var Home = React.createClass({
    render: function() {
	return (
		<div id="album-grid">
		<AlbumGrid url="http://127.0.0.1:8080/albums" artist="" />
		</div>
	)
    }
});

module.exports = Home;
