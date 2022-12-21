<script setup>
import { RouterLink, RouterView } from 'vue-router'
import DisplayArtistAlbum from '../components/DisplayArtistAlbum.vue';
import DisplayTracks from '../components/DisplayTracks.vue';

import {onBeforeMount, ref} from 'vue'
import axios from 'axios';

const tracks = ref([])
const albums = ref([])
const artists = ref([])
const title = ref("")

const route_name1 = 'albumTracks'
const route_name2 = 'artistsInfo'

const props = defineProps({
    query: {
        required: false
    },
})


async function getData() {
    let res = await axios.get(`http://localhost:5000/api/v1/search?q=${props.query}`);
    tracks.value = res.data.tracks
    albums.value = res.data.albums
    artists.value = res.data.artists
    title.value = res.data.title
}

getData()

</script>

<template>
<h1>{{title}}</h1>

<!-- TODO: see how to render based on whether lists ar present or not -->
<DisplayTracks name="Tracks" :tracks="tracks" :route_name1="route_name1" :route_name2="route_name2"></DisplayTracks>
<DisplayArtistAlbum :list="albums" name="Albums" class1="albums-disp" class2="details" propriety="img_cover" :route_name="route_name1" ></DisplayArtistAlbum>
<DisplayArtistAlbum :list="artists" name="Aritsts" class1="artists-disp" class2="details" propriety="artist_img" :route_name="route_name2"  ></DisplayArtistAlbum>


</template>

<style scoped>

</style>