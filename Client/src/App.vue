<script setup>
import NavigacniSloupecPart from './components/parts/NavigacniSloupecPart.vue';
import {useUzivatelStore} from "./stores/uzivatelStore.js"

const uzivatelStore = useUzivatelStore();

console.log(uzivatelStore._id)
</script>

<template>
  <v-app id="inspire">
    <navigacni-sloupec-part></navigacni-sloupec-part>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>


<script>

export default {
  data: () => ({ drawer: null }),
}


</script>
