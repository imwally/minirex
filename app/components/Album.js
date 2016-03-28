var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var AlbumArt = require('./AlbumArt');
var $ = require('jquery');

var Album = React.createClass({
    loadTracks: function() {
	$.ajax({
	    url: 'http://127.0.0.1:8080/tracks?album='.concat(encodeURIComponent(this.props.name)),
	    dataType: 'json',
	    cache: true,
	    success: function(data) {
		this.setState({tracks: data, track1: data[0]});
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.error(xhr, status, err.toString());
	    }.bind(this)
	});
    },
    
    getInitialState: function() {
	return {
	    tracks: [],
	    track1: {}
	};
    },

    componentDidMount: function() {
	this.loadTracks();
    },

    
    render: function() {
	var track1 = this.state.track1;
	var artist = track1.Artist;
	var getArtist = this.state.tracks.map(function(track) {
	    if (track.Artist != track1.Artist) {
		artist = "Various Artists";
	    }
	});
	return (
	        <Link to={'/album/' + this.props.name}>
		<div className="album-box">
		<AlbumArt path={this.state.track1.Path} />
		<div className="album-title">
		{this.props.name}
	        </div>
		<div className="album-artist">
		{artist}
	        </div>
		</div>
		</Link>
	);
    }
});

module.exports = Album;
