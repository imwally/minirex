var React = require('react');
var $ = require('jquery');
var Album = require('./Album');
var AlbumArt = require('./AlbumArt');
var Events = require('./Events');

var AlbumTracks = React.createClass({
    loadTracks: function() {
	$.ajax({
	    url: 'http://127.0.0.1:8080/tracks?album='.concat(encodeURIComponent(this.props.params.title)),
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
	var playTrack = function(tracks, index) {
	    Events.emitEvent('playTrack', [tracks, index])
	};
	var tracks = this.state.tracks;
	return (
		<div>
		<div className="col-md-4">
		<AlbumArt path={this.state.track1.Path} />
		<h2>{this.state.track1.Album}</h2>
		<h3>{this.state.track1.Artist}</h3>
		</div>
		<div className="col-md-8">
          	<div className="track-list">
		{this.state.tracks.map(function(track, index) {
		    return (
			    <div key={index} onClick={playTrack.bind(this, tracks, index)} className="track-item">
			    <a>{track.TrackNumber}.  {track.Title}</a>
			    </div>
		    );
		})}
	    </div>
		</div>
		</div>
		
	);
    }
});

module.exports = AlbumTracks;
