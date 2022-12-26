<script setup>
import { RouterLink, RouterView } from 'vue-router'
import fetchData from '../utils.js'
import DisplayArtistAlbum from '../components/DisplayArtistAlbum.vue';
import DisplayTracks from '../components/DisplayTracks.vue';
import {ref} from 'vue'

const tracks = ref([])
const albums = ref([])
const artists = ref([])
const title = ref("")
const error = ref(false)

const route_name1 = 'albumTracks'
const route_name2 = 'artistsInfo'

const props = defineProps({
    query: {
        required: false
    },
})

function isEmpty() {
    return tracks.value.length === 0 && albums.value.length === 0 && artists.value.length === 0
}

fetchData(`http://localhost:5000/api/v1/search?q=${props.query}`, error)
.then((data) => { 
    tracks.value = data.tracks
    albums.value = data.albums
    artists.value = data.artists
    title.value = data.title   
} ) 

</script>

<template>
    <div v-if="error">{{error}}. Please try again later.</div>
    <template v-else>
        <h1>{{title}}</h1>
        <div v-if="isEmpty()">No match</div>
        <div v-else >
            <DisplayTracks name="Tracks" :tracks="tracks" :route_name1="route_name1" :route_name2="route_name2"></DisplayTracks>
            <DisplayArtistAlbum :list="albums" name="Albums" class1="albums-disp" class2="details" propriety="img_cover" :route_name="route_name1" ></DisplayArtistAlbum>
            <DisplayArtistAlbum :list="artists" name="Aritsts" class1="artists-disp" class2="details" propriety="artist_img" :route_name="route_name2"  ></DisplayArtistAlbum>
        </div>
    </template>
</template>

<style>

</style>