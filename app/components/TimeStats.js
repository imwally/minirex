var React = require('react');

var TimeStats = React.createClass({
    render: function() {
	if (this.props.duration == 0) {
	    return null;
	} else {
	    return <div id="timer-stats">{this.props.currentTime} / {this.props.duration}</div>;
	}
    }
});

module.exports = TimeStats;
