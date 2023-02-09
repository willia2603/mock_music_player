<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'


const props = defineProps({
  name: {
    required: true
  },
  path: {
    required: true
  },
  class: {
    type: String,
    required: true
  }
})


</script>
<template>
<div :class="class">
    <h1>{{name}}</h1>
    <img :src="path">
</div>

</template>

<style>
.albums-disp img {
    object-fit: cover;
    object-position: center center;
    width: 20em;
    height: auto;
    aspect-ratio: 1;
    max-width: 100%;
    max-height: 100%;
    padding: 1.5em;
}

.artists-disp img {
    object-fit: cover;
    object-position: 50% 50%;
    aspect-ratio: 1;
    width: 20em;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
    padding: 1.0em;
}
</style>