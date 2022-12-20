<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
  tracks: {
    required: true
  },
  name: {
    required: true
  },
  route_name1: {
    required: true
  },
  route_name2: {
    required: true
  }
})

function loadTrack(track) {
  // TODO resetSlider()
  // store.commit('clearUpdateTimer')
  store.commit('loadTrack', track)
}
function setTrackList() {
  store.commit('setTrackList', props.tracks)
  console.log('track list setted')
}

</script>
<template>
    <h2>{{name}}</h2>
    <!-- TODO: 1. load track 2. load track list 3. play track 4. set ended-->
    <div class="tracks" @mouseover.once="setTrackList">
        <div class="track" v-for="track in tracks">

            <span><u>Track Name:</u><br><br><a @click="loadTrack(track)">{{track.name}}</a></span>
            <span><u>Album Name:</u> <br><br>
              <RouterLink :to="{name: route_name1, params: {id : track.album_id}}">{{track.album.name}} </RouterLink>
            </span>
            <span><u>Artist:</u><br><br>
              <span v-for="artist in track.artists">
                <RouterLink  :to="{name: route_name2, params: {id : artist.id} }">{{artist.name}}<br></RouterLink>
              </span>
            </span>
            <span><u>Duration:</u><br><br>{{track.duration}}</span>
        </div>
    </div>

    
</template>

<style scoped>
.track {
    display: flex;
    justify-content: space-around;
    border: solid #38006b;
    padding: 2em;
    margin-top: 1em;
    margin-bottom: 1em;
    text-align: center;
}
</style>