<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import DisplayArtistAlbum from '../../components/DisplayArtistAlbum.vue';
import DisplayTracks from '../../components/DisplayTracks.vue';
import DisplayNameImage from '../../components/DisplayNameImage.vue';
import axios from 'axios';
import {onBeforeMount, ref} from 'vue'

const artist_name = ref("")
const albums = ref(null)
const tracks = ref(null)
const artist_img = ref("")

const class1="albums-disp"
const class2 = ""
const propriety='img_cover'
const route_name1 = 'albumTracks'
const route_name2 = 'artistsInfo'


const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
// TODO: figure out why having const props and access id as prop.id works, and w/o not
async function getData() {
    let res = await axios.get(`http://localhost:5000/api/v1/artists/${props.id}`);
    artist_img.value = res.data.artist_img
    artist_name.value = res.data.title
    tracks.value = res.data.tracks
    albums.value = res.data.albums
    // name.value = res.data.name
}

getData()

</script>
<template>
<DisplayNameImage :path="artist_img" :name="artist_name" class="artists-disp"></DisplayNameImage>
<DisplayTracks name="Tracks" :tracks="tracks" :route_name1="route_name1" :route_name2="route_name2"></DisplayTracks>
<DisplayArtistAlbum :list="albums" name="Albums" :class1="class1" :class2="class2" :propriety="propriety" :route_name="route_name1"></DisplayArtistAlbum>

</template>



<style scoped>

</style>