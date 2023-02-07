<script setup>
import axios from 'axios';
import fetchData from '../utils.js'
import {ref} from 'vue'
import DisplayArtistAlbum from '../components/DisplayArtistAlbum.vue';
// TODO fix scroll container
const albums = ref(null)
const artists = ref(null)
const error = ref(false)

const name1 = ref('')
const name2 = ref('')
const title = ref('')
const route_name1 = 'albumTracks'
const route_name2 = 'artistsInfo'

fetchData(`http://localhost:5000/api/v1/hp`, error)
.then((data) => { 
    albums.value = data.albums
    artists.value = data.artists;
    name1.value = data.name1
    name2.value = data.name2  
} ) 
</script>

<template>
    <div v-if="error">{{error}}. Please try again later........</div>
    <template v-else>
      <DisplayArtistAlbum :list="albums" :name="name1" class1="albums-disp" class2="details" class3="hp" propriety="img_cover" :route_name="route_name1"></DisplayArtistAlbum>
      <DisplayArtistAlbum :list="artists" :name="name2" class1="artists-disp" class2="details" class3="hp" propriety="artist_img" :route_name="route_name2" ></DisplayArtistAlbum>
    </template>
</template>
