<script setup>
import { RouterLink, RouterView } from 'vue-router'
import DisplayArtistAlbum from '../../components/DisplayArtistAlbum.vue';
import axios from 'axios';
import {onBeforeMount, ref} from 'vue'

const artists = ref(null)
const name = ref(null)
const class1="artists-disp"
const class2 = ""
const propriety='artist_img'
const route_name2 = 'artistsInfo'

async function getData(){
    let res = await axios.get(`http://localhost:5000/api/v1/artists`);
    artists.value = res.data.artists
    name.value = res.data.title
}
getData()
</script>

<template>
<DisplayArtistAlbum :list="artists" :name="name" :class1="class1" :class2="class2" :propriety="propriety" :route_name="route_name2"></DisplayArtistAlbum>
</template>

<style scoped>

</style>