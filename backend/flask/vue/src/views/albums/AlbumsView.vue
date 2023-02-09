<script setup>
import fetchData from '../../utils.js'
import DisplayArtistAlbum from '../../components/DisplayArtistAlbum.vue';
import {ref} from 'vue'

const albums = ref(null)
const name = ref(null)
const error = ref(false)

const class1 = "albums-disp"
const class2 = ''
const propriety='img_cover'
const route_name1 = 'albumTracks'

fetchData(`http://localhost:5000/api/v1/albums`, error)
.then((data) => { 
    albums.value = data.albums
    name.value = data.title
} ) 
</script>

<template>
    <div v-if="error">{{error}}. Please try again later.</div>
    <template v-else>
        <DisplayArtistAlbum :list="albums" :name="name" :class1="class1" :class2="class2" :propriety="propriety" :route_name="route_name1"></DisplayArtistAlbum>
    </template>
</template>

<style>

</style>
