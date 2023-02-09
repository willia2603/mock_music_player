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
  store.commit('loadTrack', track)
}
function setTrackList() {
  store.commit('setTrackList', props.tracks)
}

</script>
<template>
    <h2>{{name}}</h2>
    <div class="tracks" @mouseover.once="setTrackList">
        <div class="track" v-for="track in tracks" :key="track.id">

            <span><u>Track Name:</u><br><br><a @click="loadTrack(track)">{{track.name}}</a></span>
            <span><u>Album Name:</u> <br><br>
              <RouterLink :to="{name: route_name1, params: {id : track.album_id}}">{{track.album.name}} </RouterLink>
            </span>
            <span><u>Artist:</u><br><br>
              <span v-for="artist in track.artists" :key="artist.id">
                <RouterLink  :to="{name: route_name2, params: {id : artist.id} }">{{artist.name}}<br></RouterLink>
              </span>
            </span>
            <span><u>Duration:</u><br><br>{{track.duration}}</span>
        </div>
    </div>

    
</template>

<style>
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