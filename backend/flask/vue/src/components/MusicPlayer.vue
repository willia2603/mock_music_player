<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import {onBeforeMount, ref, computed, watch} from 'vue'
import { useStore } from 'vuex'
const store = useStore()

// computed propriety to have it up to date and react accordingly
const isPlaying = computed(() => store.getters.getIsPlaying)
const curr_track = computed(() => store.getters.getCurrTrack)

const playerCover = ref(null)
const playerSongName= ref(null)
const playerAlbum = ref(null)
const playerArtist = ref(null)
const playerSlider = ref(null)
const playerVolume = ref(null)

// 'watch' to change descr. when track changes
watch(curr_track, (newValue, oldValue) => {
    setupTrackInfos()
});

// HELPERS
function setupTrackInfos(){
    if (curr_track != null) {
        playerCover.value.src = curr_track.value.album_cover        
        playerSongName.value.innerHTML = "<u>Track Name:</u><br> " + curr_track.value.name
        playerAlbum.value.innerHTML = "<u>Album Name:</u><br> " + curr_track.value.album_name
        playerArtist.value.innerHTML = "<u>Artist Name:</u><br> " + curr_track.value.artists.map(artist => artist.name).join(', ')
    } 
}

// ACTUAL PLAYER MODIFIERS
function play() {
    store.commit('playTrack')
}

function pause() {
    store.commit('pauseTrack')
}
function playNext() {
    store.commit('playNext')
}
function playPrevious() {
    store.commit('playPrevious')
}

function setVolume() {
    store.commit('setVolume', playerVolume.value.value / 100)
}

function initSlider() {
    store.commit('initSlider',playerSlider)
}
function setSlider(){
    store.commit('setSlider')
}
initSlider()
console.log('rendering again')
</script>

<template>
    <div class="music-player">
        <div >
            <button class='prev-btn' @click="playPrevious">Previous</button>
            <button v-if="isPlaying" class='play-btn' @click="pause">Pause</button>
            <button v-else class='play-btn' @click="play">Play</button>
            <button class='next-btn' @click="playNext">Next</button>
        </div>
        <div class="player-img">
            <img ref='playerCover' src="/static/images/music-placeholder.png" alt="album cover">
        </div>
        <div>
            <span ref="playerSongName"> No song is playing</span>
            <br>
            <span ref="playerAlbum"></span>
            <br>
            <span ref="playerArtist"></span>
            <br>
            <input ref="playerSlider" type="range" min="1" max="100" value="0" @input="setSlider">
        </div>
        <div class="volume">
            <span>Volume</span>
            <input ref="playerVolume" type="range" min="1" max="100" value="30" @change="setVolume">
        </div>
      </div>
    
</template>

<style>
.music-player {
  background-color: #38006b;
  color: antiquewhite;
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-height: 13em;
  min-height: 5em;
  padding: 2em;
}

.volume {
  text-align: center;
  margin-left: 2em;
}

.player-img img {
  object-fit: cover;
  object-position: center;
  width: 20em;
  height: auto;
  aspect-ratio: 1;
  max-width: 50%;
  max-height: 50%;
}

.player-img {
  text-align: center;
}


</style>