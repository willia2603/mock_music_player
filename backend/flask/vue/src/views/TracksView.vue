<script setup>
import { RouterLink, RouterView } from 'vue-router'
import DispalyTracks from '../components/DisplayTracks.vue';
import axios from 'axios';
import {ref} from 'vue'

const tracks = ref(null)
const name = ref("")

const route_name1 = 'albumTracks'
const route_name2 = 'artistsInfo'

async function getData(){
    const api_endpoint = 'api/v1/'
    let res = await axios.get(`http://localhost:5000/api/v1/tracks`);
    tracks.value = res.data.tracks
    name.value = res.data.title
}
getData()
</script>

<template>
    <DispalyTracks :name="name" :tracks="tracks" :route_name1="route_name1" :route_name2="route_name2"></DispalyTracks>
</template>

<style scoped>

</style>