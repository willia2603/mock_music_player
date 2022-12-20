// TODO: 1. add time left, 2. use real duration of track as duration (see stack overflow), 3. change img of cover when no song is playing 4. rifai con eyeD3?
/**
This file is used to setup the music player.
 */
"use strict";
let track_list;

let isPlaying = false
let curr_track = document.createElement('audio');

let track_cover = document.querySelector(".player-cover");
let track_name = document.querySelector(".player-song-name");
let track_album = document.querySelector(".player-album");
let track_artist = document.querySelector(".player-artist");
let track_slider = document.querySelector(".player-slider")

let playpause_btn = document.querySelector(".play-btn");
let next_btn = document.querySelector(".next-btn");
let prev_btn = document.querySelector(".prev-btn");


let seek_slider = document.querySelector(".player-slider");
let volume_slider = document.querySelector(".player-volume");

let updateTimer;

/**
 * Takes a list of tracks and sets the global variable `track_list` to that list
 * @param list - the list of tracks to be played
 */
function set_track_list(list) {
    track_list = list
    console.log('track list loaded')
        // return track_list
}

/**
 * Loads the track, updates the track info, and starts playing the track
 * @param track - the track object that contains all the information about the track
 */
function loadTrack(track) {
    console.log('track loaded')
    clearInterval(updateTimer);
    // OK
    restSlider()

    curr_track.src = track.file
    curr_track.id = track.id
    curr_track.load()

    track_name.innerHTML = '<u>Track name:</u><br> ' + track.name
    track_album.innerHTML = '<u>Album name:</u> <br> ' + track.album.name
    track_artist.innerHTML = '<u>Artist name:</u> <br> ' + track.artists.map(artist => artist.name).join(', ')
    track_cover.src = track.album.img_cover

    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    curr_track.addEventListener("ended", playNext);
    playTrack()

}

/**
 * Resets the slider to 0
 */
function restSlider() {
    track_slider.value = 0
}

/**
 * It sets the current track position to the calculated seek position
 */
function setSlider() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    let seekto = curr_track.duration * (seek_slider.value / 100);

    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
}

/**
 * The seekUpdate function is called every 250 milliseconds to update the seek slider's value to the
 * current time of the track
 */
function seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        //   // Calculate the time left and the total duration
        //   let currentMinutes = Math.floor(curr_track.currentTime / 60);
        //   let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        //   let durationMinutes = Math.floor(curr_track.duration / 60);
        //   let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        //   // Add a zero to the single digit time values
        //   if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        //   if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        //   if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        //   if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    }
}

/**
 * It sets the volume of the current track to the value of the volume slider
 */
function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

/**
 * It pauses the currently loaded track
 */
function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;

    playpause_btn.innerHTML = 'Play'
}

/**
 * It plays the currently loaded track
 */
function playTrack() {
    // Play the loaded track
    if (curr_track != null)
        curr_track.play();
    isPlaying = true;

    playpause_btn.innerHTML = 'Pause'
}

/**
 * If the track is playing, pause it, otherwise play it
 */
function playPause() {
    if (isPlaying) {
        console.log('pausing track')
        pauseTrack()
    } else {
        console.log('playing track')
        playTrack()
    }
}

/**
 * If the current track is the last track in the track list, load the first track in the track list,
 * otherwise load the next track in the track list
 */
function playNext() {
    if (track_list[track_list.length - 1]['id'] == curr_track.id) {
        // loadTrack(track_list[0])
        console.log('last track, go to first')
        loadTrack(track_list[0])
    } else {
        console.log('go to next track')
        let curr_idx = track_list.findIndex(track => track.id == curr_track.id)
        loadTrack(track_list[curr_idx + 1])
    }
    // playTrack();
}

/**
 * If the current track is the first track in the track list, load the last track in the track list.
 * Otherwise, load the previous track in the track list
 */
function playPrevious() {
    if (track_list[0]['id'] == curr_track.id) {
        // loadTrack(track_list[0])
        console.log('first track, got to last one')
        loadTrack(track_list[track_list.length - 1])
    } else {
        console.log('go to previous track')
        let curr_idx = track_list.findIndex(track => track.id == curr_track.id)
        loadTrack(track_list[curr_idx - 1])
    }
    // playTrack();
}