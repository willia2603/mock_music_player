<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Spotify (almost)</h1>
  </header>
  <div class="page-layout">
    <!-- TODO make component -->
    <nav>
        <h2>Menu</h2>
        <!-- TODO make loop -->
        <ul>
        <li><RouterLink :to="{name: 'home'}">Home</RouterLink></li>
        <li><RouterLink :to="{name: 'albums'}">Albums</RouterLink></li>
        <li><RouterLink :to="{name: 'artists'}">Artists</RouterLink></li>
        <li><RouterLink :to="{name: 'tracks'}">Tracks</RouterLink></li>
        <li><RouterLink :to="{name: 'search'}">Search</RouterLink></li>
        </ul>
        <!-- <form action="{{url_for('search_page.search')}}"> -->
        <form>
            <input type="search" name="q" placeholder="Search ...">
            <input type="submit" value="Go!">
        </form>
    </nav>
    <main>
      <!-- * component gets loaded here -->
      <!-- * :key to make route links with params rerender component as well -->
        <RouterView :key="$route.path"></RouterView>
    </main>
  </div>
  <!-- TODO make music player component -->
  <footer class="music-player">
    <div>
        <button class='prev-btn' onclick="playPrevious()">Previous</button>
        <button class='play-btn' onclick="playPause()">Play</button>
        <button class='next-btn' onclick="playNext()">Next</button>
    </div>
    <img class='player-cover' src="/static/images/album_placeholder.jpeg" alt="album cover">
    <div>
        <span class="player-song-name"> No song is playing</span>
        <br>
        <span class="player-album"></span>
        <br>
        <span class="player-artist"></span>
        <br>
        <input class="player-slider" type="range" min="1" max="100" value="0" onchange="setSlider()">
    </div>
    <div>
        <span>Volume</span>
        <input class="player-volume" type="range" min="1" max="100" value="30" onchange="setVolume()">
    </div>
</footer>


</template>

<style>
</style>