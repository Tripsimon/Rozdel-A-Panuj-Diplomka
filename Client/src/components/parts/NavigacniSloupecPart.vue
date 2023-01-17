<script setup>
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
const uzivatelStore = useUzivatelStore();
</script>

<template >
  <v-navigation-drawer color="primary" v-model="drawer" app>
    <v-list>
      <v-list-item dark title="Nepřihlášený uživatel">
      </v-list-item>


    </v-list>
    <v-divider></v-divider>

    <v-list density="compact" nav>


      <v-list-item-title>Správa účtu</v-list-item-title>
      <v-list-item to="/sprava-uctu" prepend-icon="mdi-account" title="Uživatelský učet" value="yeet"></v-list-item>

      <v-list-item-title>Hrát</v-list-item-title>
      <v-list-item to="/pripojeni-do-hry" prepend-icon="mdi-newspaper-variant" title="Připojit se do hry"
        value="pripojeniHry"></v-list-item>
      <v-list-item to="/zalozeni-hry" prepend-icon="mdi-newspaper-variant" title="Založit hru"
        value="zalozeniHry"></v-list-item>
      <v-divider></v-divider>

      <v-list-item-title>Správa dobrodruhů</v-list-item-title>
      <v-list-item to="/tvorba-dobrodruha" prepend-icon="mdi-account-hard-hat" title="Tvorba nového dobrodruha"
        value="tvorbaDobrodruha" theme="secondary"></v-list-item>
      <v-list-item to="/vypis-dobrodruhu" prepend-icon="mdi-newspaper-variant" title="Výpis dobrodruhů" value="myfiles">
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item-title>Správa herních dat</v-list-item-title>
      <v-list-item to="/sprava-pozadi" prepend-icon="mdi-account-hard-hat" title="Spravová pozadí" value="spravaPozadi"
        theme="secondary"></v-list-item>
        <v-list-item to="/sprava-vybavy" prepend-icon="mdi-account-hard-hat" title="Spravová výbavy" value="spravaPozadi"
        theme="secondary"></v-list-item>
      <v-divider></v-divider>

    </v-list>
  </v-navigation-drawer>

  <v-app-bar color="primary" app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Rozděl a Panuj</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn v-if="!uzivatelStore.prihlasen" variant="text" to="/registrace"> Registrace</v-btn>
    <v-btn v-if="!uzivatelStore.prihlasen" variant="text" to="/prihlaseni"> Přihlásit se</v-btn>

  </v-app-bar>
</template>
  



<script>
export default {
  data: () => ({ drawer: false }),
}
</script>