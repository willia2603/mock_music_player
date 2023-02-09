<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import {onBeforeMount, ref} from 'vue'

const router = useRouter()
const input_value = ref('')

function gotoResult(){
  router.push({name: 'search', params: {query : input_value.value} })
}
</script>

<template>
<nav>
    <h2>Menu</h2>
    <!-- TODO make loop -->
    <ul>
    <li><RouterLink :to="{name: 'home'}">Home</RouterLink></li>
    <li><RouterLink :to="{name: 'albums'}">Albums</RouterLink></li>
    <li><RouterLink :to="{name: 'artists'}">Artists</RouterLink></li>
    <li><RouterLink :to="{name: 'tracks'}">Tracks</RouterLink></li>
    </ul>
    <form @submit.prevent="gotoResult">
        <input type="search" name="q" placeholder="Search ..." v-model="input_value">
        <input type="submit" value="Go!">
    </form>
</nav> 
    
    
</template>

<style>
nav {
    background-color: #6a1b9a;
    padding: 1.5em;
    width: 25%;
    text-align: center;
    min-height: 60vh;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    padding: 0.5em;
}

form {
    padding: 0.5em;
}


</style>