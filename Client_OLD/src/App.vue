<script setup>
import NavigacniSloupecPart from './components/parts/NavigacniSloupecPart.vue';
import FooterPart from './components/parts/FooterPart.vue';
</script>

<template>
  <v-app id="inspire">
    <navigacni-sloupec-part></navigacni-sloupec-part>
    <v-main>
      <router-view></router-view>
    </v-main>
    <footer-part></footer-part>
  </v-app>
</template>


<script>
export default {
  data: () => ({ drawer: false }),
}


</script>
