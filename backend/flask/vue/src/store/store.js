import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            curr_track: null,
            track_list: null,
            isPlaying: false,
            playerSlider: null,
            updateInterval: null,
        }
    },

    mutations: {

        setTrackList(state, tracks) {
            state.track_list = tracks
        },
        /**
         * Load the track and play it
         * @param state - the state object
         * @param state - the state object
         */
        loadTrack(state, track) {
            if (state.isPlaying) {
                state.curr_track.pause()
            }

            // reset slider 
            clearInterval(state.updateInterval);
            this.commit('resetSlider')

            // get track info
            state.curr_track = new Audio()
            console.log(state.curr_track.preload)
            state.curr_track.id = track.id
            state.curr_track.src = track.file
            state.curr_track.name = track.name
            state.curr_track.artists = track.artists
            state.curr_track.album_name = track.album.name
            state.curr_track.album_cover = track.album.img_cover

            // load track
            try {
                state.curr_track.load()
            } catch {
                alert('This is a dummy file, please choose another one')
            }

            // Set an interval of 1000 milliseconds
            // for updating the seek slider
            state.updateInterval = setInterval(function() {
                this.commit('seekUpdate')
            }.bind(this), 1000);

            // play track
            this.commit('playTrack')

            // make next track play when current track ends
            state.curr_track.addEventListener("ended", function() {
                this.commit('pauseTrack')
                this.commit('playNext')
            }.bind(this))
        },
        playTrack(state) {
            // play loaded track
            if (state.curr_track != null) {
                state.curr_track.play();
                state.isPlaying = true;
            } else {
                alert('Please select a track first')
            }
        },
        pauseTrack(state) {
            // Pause the loaded track
            state.curr_track.pause();
            state.isPlaying = false;
        },
        setVolume(state, value) {
            // Set the volume
            state.curr_track.volume = value
        },
        initSlider(state, slider) {
            state.playerSlider = slider
            console.log(state.playerSlider)
        },
        // setSlider
        setSlider(state) {
            // Calculate the seek position by the
            // percentage of the seek slider
            // and get the relative duration to the track
            let seekto = state.curr_track.duration * (state.playerSlider.value / 100);

            // Set the current track position to the calculated seek position
            state.curr_track.currentTime = seekto;
        },
        resetSlider(state) {
            console.log(state.playerSlider.value, 'sliderrrrrr')
            state.playerSlider.value = 0
        },
        seekUpdate(state) {
            let seekPosition = 0;

            if (!isNaN(state.curr_track.duration)) {
                seekPosition = state.curr_track.currentTime * (100 / state.curr_track.duration);
                console.log(seekPosition)
                state.playerSlider.value = seekPosition;

            }
        },

        /**
         * Play the next track: if the current track is the last track in the track list, then load the first track in the
         * track list. Otherwise, load the next track in the track list
         * @param state - the state object
         */
        playNext(state) {
            if (state.track_list == null) {
                alert('Please select a track first')
                return []
            }
            if (state.track_list[state.track_list.length - 1]['id'] == state.curr_track.id) {
                console.log('last track, go to first')
                this.commit('loadTrack', state.track_list[0])
                this.commit('playTrack')
            } else {
                console.log('go to next track')
                let curr_idx = state.track_list.findIndex(track => track.id == state.curr_track.id)
                this.commit('loadTrack', state.track_list[curr_idx + 1])
                this.commit('playTrack')
            }
        },

        /**
         * Play the previous track: if the current track is the first track in the track list, then load the last track in the
         * track list. Otherwise, load the previous track in the track list
         * @param state - the state object
         */
        playPrevious(state) {
            if (state.track_list[0]['id'] == state.curr_track.id) {
                console.log('first track, got to last one')
                this.commit('loadTrack', state.track_list[state.track_list.length - 1])
            } else {
                console.log('go to previous track')
                let curr_idx = state.track_list.findIndex(track => track.id == state.curr_track.id)
                this.commit('loadTrack', state.track_list[curr_idx - 1])
            }
        },

    },
    getters: {
        getIsPlaying(state) {
            return state.isPlaying
        },
        getCurrTrack(state) {
            return state.curr_track
        }

    },
    actions: {


    }
})

export default store