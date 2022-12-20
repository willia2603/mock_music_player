<script setup>
// import { def } from '@vue/shared';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import DisplayTracks from '../../components/DisplayTracks.vue';
import DisplayNameImage from '../../components/DisplayNameImage.vue';
import axios from 'axios';
import {onBeforeMount, ref} from 'vue'

const tracks = ref([])
const album = ref([])
const name = "Tracks"

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
    let res = await axios.get(`http://localhost:5000/api/v1/album_tracks/${props.id}`);
    album.value = res.data
    tracks.value = res.data.tracks
}
getData()
</script>



<template>
<DisplayNameImage :path="album.album_cover" :name="album.album_name" class="albums-disp"></DisplayNameImage>
<DisplayTracks :name="name" :tracks="tracks" :route_name1="route_name1" :route_name2="route_name2"></DisplayTracks>
</template>

<style scoped>

</style>