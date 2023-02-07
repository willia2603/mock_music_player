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
header {
    padding: 0;
    background-color: #38006b;
    color: antiquewhite;
    padding: 2em;
    text-align: center;
}

main {
    background-color: #9c4dcc;
    width: 75%;
    padding: 1.5em;
    padding-left: 3em;
    margin-bottom: 12%;
}

footer {
    position: fixed;
    width: 100vw;
    bottom: 0px;
}
.page-layout {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    margin-bottom: 100px;
}
</style>