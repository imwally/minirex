var React = require('react');
var AlbumArt = require('./AlbumArt');
var TimeStats = require('./TimeStats');
var Event = require('./Events');

var Player = React.createClass({
    getInitialState: function() {
	return {
	    playIcon: 'glyphicon glyphicon-play',
	    playing: false,
	    duration: 0,
	    currentTime: 0,
	    tracks: [],
	    trackNumber: 0,
	    currentTrack: {},
	}
    },

    componentDidMount: function() {
	var self = this;
	self.audio = document.createElement('audio');
	
	Event.addListener('playTrack', this.playTrack);
	this.audio.addEventListener('loadedmetadata', this.setDuration);
	this.audio.addEventListener('timeupdate', this.updateCurrentTime);
	this.audio.addEventListener('ended', this.next);
	this.audio.addEventListener('error', this.next);
    },
    
    componentWillUnmount: function() {
	Event.removeListeners('playTrack')
    },
    
    setDuration: function() {
	this.setState({
	    duration: this.formatTime(this.audio.duration)
	});
    },
    
    updateCurrentTime: function() {
	this.setState({
	    currentTime: this.formatTime(this.audio.currentTime)
	});
    },

    formatTime: function(timeSeconds) {
	var minutes = Math.floor(timeSeconds / 60);
	var seconds = Math.floor(timeSeconds - minutes * 60);
	var seconds = (seconds < 10 ? "0"+seconds : seconds);
	var fullTime = minutes+":"+seconds;
	return fullTime;
    },

    playTrack: function(tracks, i) {
	var track = tracks[i];
	this.audio.src = 'http://127.0.0.1:8080/file/' + track.Path,
	this.play();
	this.setState({
	    playing: true,
	    tracks: tracks,
	    trackNumber: i,
	    currentTrack: track,
	})
    },

    togglePlay: function() {
	(this.state.playing) ? this.pause() : this.play();
    },

    play: function() {
	this.setState({
	    playing: true,
	    playIcon: 'glyphicon glyphicon-pause',
	})
	this.audio.play();
    },
    
    pause: function() {
	this.setState({
	    playing: false,
	    playIcon: 'glyphicon glyphicon-play',
	})
	this.audio.pause();
    },

    next: function() {
	var trackNumber = this.state.trackNumber;
	if (trackNumber != this.state.tracks.length-1) {
	    this.playTrack(this.state.tracks, trackNumber+1);
	} else {
	    this.clearInfo();
	}
    },

    back: function() {
	var trackNumber = this.state.trackNumber;
	if (trackNumber != 0) {
	    this.playTrack(this.state.tracks, trackNumber-1);
	} else {
	    this.playTrack(this.state.tracks, 0);
	}
    },

    clearInfo: function() {
	this.pause();
	this.setState({
	    tracks: [],
	    currentTrack: {},
	    currentTime: 0,
	    duration: 0,
	})
    },
    
    render: function() {
	return (
	       <div id="player">
		<div onClick={this.back} className="button">
		<span className="glyphicon glyphicon-backward"></span>
		</div>
		<div onClick={this.togglePlay} className="button">
		<span className={this.state.playIcon}></span>
		</div>
		<div onClick={this.next} className="button">
		<span className="glyphicon glyphicon-forward"></span>
		</div>
		<div id="player-info">
		<AlbumArt path={this.state.currentTrack.Path} />
		<b>{this.state.currentTrack.Title}</b><br/>
		{this.state.currentTrack.Artist}<br/>
		<TimeStats currentTime={this.state.currentTime}
	                   duration={this.state.duration} />
	        </div>
		</div>
	);
    }

});

module.exports = Player;
