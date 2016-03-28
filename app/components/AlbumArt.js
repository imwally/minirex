var React = require('react');

var AlbumArt = React.createClass({
    getInitialState: function() {
	return {
	    errored: false,
	}
    },

    handleError: function(event) {
	this.setState({
	    errored: true,
	});
    },
        
    render: function() {
	var src = 'http://127.0.0.1:8080/artwork?track=' + this.props.path;
	if (this.state.errored) {
	    return (
		<div className="no-artwork">No Album Art</div>
	    );
	} else {
	    return (
		    <div className="album-artwork">
		    <img src={src} onError={this.handleError} />
		    </div>
	    );
	}
    }
});

module.exports = AlbumArt;
