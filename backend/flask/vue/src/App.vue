<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import Nav from './components/Nav.vue';
import MusicPlayer from './components/MusicPlayer.vue'
</script>

<template>
  <header>
    <h1>Spotify (almost)</h1>
  </header>
  <div class="page-layout">
    <Nav></Nav>
    <main>
      <!-- * component gets loaded here -->
      <!-- * :key to make route links with params rerender component as well -->
        <RouterView :key="$route.path"></RouterView>
    </main>
  </div>
  <footer >
    <MusicPlayer></MusicPlayer>
</footer>


</template>

<style>
</style>