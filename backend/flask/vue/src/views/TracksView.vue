<script setup>
import fetchData from '../utils.js'
import DispalyTracks from '../components/DisplayTracks.vue';
import {ref} from 'vue'

const tracks = ref(null)
const name = ref("")
const error = ref(false)

const route_name1 = 'albumTracks'
const route_name2 = 'artistsInfo'

fetchData(`http://localhost:5000/api/v1/tracks`, error)
.then((data) => { 
    tracks.value = data.tracks
    name.value = data.title 
} ) 
</script>

<template>
    <div v-if="error">{{error}}. Please try again later..</div>
    <template v-else>
        <DispalyTracks :name="name" :tracks="tracks" :route_name1="route_name1" :route_name2="route_name2"></DispalyTracks>
    </template>
</template>

<style>

</style>