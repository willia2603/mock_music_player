<script setup>
import DisplayArtistAlbum from '../../components/DisplayArtistAlbum.vue';
import DisplayTracks from '../../components/DisplayTracks.vue';
import DisplayNameImage from '../../components/DisplayNameImage.vue';
import fetchData from '../../utils.js'
import {ref} from 'vue'

const artist_name = ref("")
const albums = ref(null)
const tracks = ref(null)
const artist_img = ref("")
const error = ref(false)

const class1="albums-disp"
const class2 = ""
const propriety='img_cover'
const route_name1 = 'albumTracks'
const route_name2 = 'artistsInfo'


const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
// TODO: figure out why having const props and access id as prop.id works, and w/o not
fetchData(`http://localhost:5000/api/v1/artists/${props.id}`, error)
.then((data) => { 
    artist_img.value = data.artist_img
    artist_name.value = data.title
    tracks.value = data.tracks
    albums.value = data.albums
} ) 

</script>
<template>
  <div v-if="error">{{error}}. Please try again later.</div>
    <template v-else>
      <DisplayNameImage :path="artist_img" :name="artist_name" class="artists-disp"></DisplayNameImage>
      <DisplayTracks name="Tracks" :tracks="tracks" :route_name1="route_name1" :route_name2="route_name2"></DisplayTracks>
      <DisplayArtistAlbum :list="albums" name="Albums" :class1="class1" :class2="class2" :propriety="propriety" :route_name="route_name1"></DisplayArtistAlbum>
    </template>

</template>



<style>

</style>