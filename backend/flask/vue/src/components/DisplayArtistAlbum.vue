<script setup>
import { RouterLink, RouterView } from 'vue-router'
const props = defineProps({
    list: {
        required:true
    },
    class1: {
        required: true
    },
    class2: {
        required: true
    },
    class3: {
        required: true
    },
    name: {
        required: true
    },
    propriety: {
        required: true
    },
    route_name: {
        required: true
    }
})
</script>
<template>
    <section :class="[class1, class3]">
        <h2>{{name}}</h2>
        <div :class="class2">
            <div>
                <span v-for="el in list" :key="el.id">
                    <RouterLink :to="{name: route_name, params: {id : el.id} }"><img :src="el[propriety]" alt="cover"></RouterLink>
                </span>
            </div>
        </div>
    </section>
</template>

<style>
.details {
    display: flex;
}

.details a {
    min-width: 33%; 
}

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

.albums-disp,
.artists-disp {
    overflow-x: scroll;
    
}

.hp {
    white-space: nowrap;
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