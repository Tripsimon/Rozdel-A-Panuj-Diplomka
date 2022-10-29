<<<<<<< HEAD
<script setup>
import NavigacniSloupecPart from './components/parts/NavigacniSloupecPart.vue';
import {useUzivatelStore} from "./stores/uzivatelStore.js"

const uzivatelStore = useUzivatelStore();

console.log(uzivatelStore._id)
</script>

<template>
  <v-app id="inspire">
    <navigacni-sloupec-part></navigacni-sloupec-part>
=======
<template>
  <v-app id="inspire">
    <v-navigation-drawer
      dark
        v-model="drawer"
        app

</script>

<template>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item to="/tvorba-dobrodruha" prepend-icon="mdi-newspaper-variant" title="Tvorba nového dobrodruha" value="myfiles"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Rozděl a Panuj</v-toolbar-title>
    </v-app-bar>
>>>>>>> parent of 897c873 (Oprava formuláře)

    <v-main>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>


<script>
<<<<<<< HEAD

=======
>>>>>>> parent of 897c873 (Oprava formuláře)
export default {
  data: () => ({ drawer: false }),
}


</script>
