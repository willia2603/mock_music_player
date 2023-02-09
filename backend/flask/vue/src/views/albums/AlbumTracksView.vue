<script setup>
import DisplayTracks from '../../components/DisplayTracks.vue';
import DisplayNameImage from '../../components/DisplayNameImage.vue';
import {ref} from 'vue'
import fetchData from '../../utils.js'

const tracks = ref([])
const album = ref([])
const error = ref(false)

const name = "Tracks"
const route_name1 = 'albumTracks'
const route_name2 = 'artistsInfo'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

fetchData(`http://localhost:5000/api/v1/album_tracks/${props.id}`, error)
.then((data) => { 
    album.value = data
    tracks.value = data.tracks
} ) 
</script>



<template>
  <div v-if="error">{{error}}. Please try again later.</div>
    <template v-else>
      <DisplayNameImage :path="album.album_cover" :name="album.album_name" class="albums-disp"></DisplayNameImage>
      <DisplayTracks :name="name" :tracks="tracks" :route_name1="route_name1" :route_name2="route_name2"></DisplayTracks>
    </template>
</template>

<style>

</style>