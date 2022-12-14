<script setup>
import axios from 'axios';
import {onBeforeMount, ref} from 'vue'
import DisplayArtistAlbum from '../components/DisplayArtistAlbum.vue';

const albums = ref(null)
const artists = ref(null)
const album_route='/albums/'
const artist_route='/artists/'
const name1 = ref('')
const name2 = ref('')
const title = ref('')
const route_name1 = 'albumTracks'
const route_name2 = 'artistsInfo'


async function getData() {
    try {
      let res = await axios.get('http://localhost:5000/api/v1/hp');
      albums.value = res.data.albums
      artists.value = res.data.artists;
      title.value = res.data.title
      name1.value = res.data.name1
      name2.value = res.data.name2
      
    } catch (err) {
      console.log(err)
    }
    };
getData()
</script>

<template>
    <!-- TODO: 1. display albums 2. display artists -->
    <DisplayArtistAlbum :list="albums" :name="name1" class1="albums-disp" class2="details" propriety="img_cover" :route_name="route_name1"></DisplayArtistAlbum>
    <DisplayArtistAlbum :list="artists" :name="name2" class1="artists-disp" class2="details" propriety="artist_img" :route_name="route_name2" ></DisplayArtistAlbum>
</template>
