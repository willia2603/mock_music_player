<script setup>
import { RouterLink, RouterView } from 'vue-router'
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

</script>
<template>
    <h2>{{name}}</h2>
    <!-- TODO: fix error -->
    <div class="tracks" >
        <div class="track" v-for="track in tracks">
            <span><u>Track Name:</u><br><br><a >{{track.name}}</a></span>
            <span><u>Album Name:</u> <br><br>
              <RouterLink :to="{name: route_name1, params: {id : track.album_id}}">{{track.album.name}} </RouterLink>
            </span>
            <span><u>Artist:</u><br><br>
              <span v-for="artist in track.artists">
                <RouterLink  :to="{name: route_name2, params: {id : artist.id} }">{{artist.name}}<br></RouterLink>
                <!-- {{artist.id}}
                
                {{route_name2 + '/' + artist.id}} -->
                <!-- <RouterLink  :to="{path: '/artists' + '/' + 2 }">{{artist.name}}<br></RouterLink> -->
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