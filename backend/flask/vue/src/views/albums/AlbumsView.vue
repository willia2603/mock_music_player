<script setup>
import { RouterLink, RouterView } from 'vue-router'
import DisplayArtistAlbum from '../../components/DisplayArtistAlbum.vue';
import axios from 'axios';
import {onBeforeMount, ref} from 'vue'

const albums = ref(null)
const name = ref(null)
const class1 = "albums-disp"
const class2 = ''
const propriety='img_cover'
const route_name1 = 'albumTracks'

async function getData() {
    let res = await axios.get(`http://localhost:5000/api/v1/albums`);
    albums.value = res.data.albums
    name.value = res.data.title
}

getData()
</script>

<template>
<DisplayArtistAlbum :list="albums" :name="name" :class1="class1" :class2="class2" :propriety="propriety" :route_name="route_name1"></DisplayArtistAlbum>
</template>

<style scoped>

</style>
