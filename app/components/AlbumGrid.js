var React = require('react');
var $ = require('jquery');
var Album = require('./Album');

var AlbumGrid = React.createClass({
    loadAlbumsFromServer: function() {
	if (this.props.artist) {
	    var URL = this.props.url + '?artist=' + this.props.artist;
	} else {
	    var URL = this.props.url;
	}
	$.ajax({
	    url: URL,
	    dataType: 'json',
	    cache: true,
	    success: function(data) {
		this.setState({albums: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.error(this.props.url, status, err.toString());
	    }.bind(this)
	});
    },
    
    getInitialState: function() {
	return {
	    albums: [],
	    toRender: 30
	    
	};
    },

    componentDidMount: function() {
	this.loadAlbumsFromServer();
    },

    more: function() {
	this.setState({toRender: this.state.toRender + 20});
    },
    
    render: function() {
	return (
		<div>
		<div id="album-grid">
		{this.state.albums.slice(0, this.state.toRender).map(function(album, index) {
		    return (
			    <div key={index}>
			    <div className="col-md-2 col-xs-6">
			    <Album name={album}></Album>
			    </div>
			    </div>
		    );
		})}

	    </div>
		<button onClick={this.more}>Load More</button>
		</div>
	);
    }
});

module.exports = AlbumGrid;
