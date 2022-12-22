<script setup>
import fetchData from '../../utils.js'
import DisplayArtistAlbum from '../../components/DisplayArtistAlbum.vue';
import axios from 'axios';
import {ref} from 'vue'

const artists = ref(null)
const name = ref(null)
const error = ref(false)

const class1="artists-disp"
const class2 = ""
const propriety='artist_img'
const route_name2 = 'artistsInfo'

fetchData(`http://localhost:5000/api/v1/artists`, error)
.then((data) => { 
    artists.value = data.artists
    name.value = data.title
} ) 
</script>

<template>
    <div v-if="error">{{error}}. Please try again later.</div>
    <template v-else>
        <DisplayArtistAlbum :list="artists" :name="name" :class1="class1" :class2="class2" :propriety="propriety" :route_name="route_name2"></DisplayArtistAlbum>
    </template>
</template>

<style>

</style>