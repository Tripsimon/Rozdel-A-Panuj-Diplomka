<script setup>
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
</script>

<template >
  <div>
    <v-navigation-drawer color="primary" v-model="drawer" app>
      <v-list>
        <v-list-item v-if="!this.uzivatelStore.prihlasen" dark title="Nepřihlášený uživatel"></v-list-item>
        <v-list-item v-else dark :title="this.uzivatelStore.prezdivka"></v-list-item>


      </v-list>
      <v-divider></v-divider>

      <v-list density="compact" nav>

        <div v-if="this.uzivatelStore.prihlasen">
          <v-list-item-title>Správa účtu</v-list-item-title>
          <v-list-item to="/sprava-uctu" prepend-icon="mdi-account" title="Uživatelský učet" value="spravaUctu"
            color="secondary"></v-list-item>
        </div>

        <div v-if="this.uzivatelStore.prihlasen">
          <v-list-item-title>Hrát</v-list-item-title>
          <v-list-item to="/pripojeni-do-hry" prepend-icon="mdi-location-enter" title="Připojit se do hry"
            value="pripojeniHry" color="secondary"></v-list-item>
          <v-list-item to="/zalozeni-hry" prepend-icon="mdi-folder-plus-outline" title="Založit hru" value="zalozeniHry"
            color="secondary"></v-list-item>
          <v-divider></v-divider>
        </div>

        <div>
          <v-list-item-title>Rozděl a Panuj</v-list-item-title>
          <v-list-item to="/pravidla" prepend-icon="mdi-format-list-checkbox" title="Pravidla" value="pravidla"
            color="secondary"></v-list-item>
          <v-divider></v-divider>
        </div>

        <div v-if="this.uzivatelStore.prihlasen">
          <v-list-item-title>Správa dobrodruhů</v-list-item-title>
          <v-list-item to="/tvorba-dobrodruha" prepend-icon="mdi-account-plus-outline" title="Tvorba nového dobrodruha"
            value="tvorbaDobrodruha" color="secondary"></v-list-item>
          <v-list-item to="/vypis-dobrodruhu" prepend-icon="mdi-account-search-outline" title="Výpis dobrodruhů"
            value="vypisDobrodruhu" color="secondary">
          </v-list-item>
          <v-divider></v-divider>
        </div>

        <div v-if="this.uzivatelStore.prihlasen">
          <v-list-item-title>Správa herních dat</v-list-item-title>
          <v-list-item to="/sprava-pozadi" prepend-icon="mdi-image-edit-outline" title="Spravová pozadí"
            value="spravaPozadi" color="secondary"></v-list-item>
          <v-list-item to="/sprava-vybavy" prepend-icon="mdi-shield-star-outline" title="Spravová výbavy"
            value="spravaVybavy" color="secondary"></v-list-item>
          <v-list-item to="/sprava-nepratel" prepend-icon="mdi-emoticon-devil-outline" title="Spravová nepřátel"
            value="spravaNepratel" color="secondary"></v-list-item>
          <v-divider></v-divider>
        </div>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" app>
      <v-app-bar-nav-icon color="secondary" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title  >Rozděl a Panuj</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="!uzivatelStore.prihlasen" variant="text" to="/registrace"> Registrace</v-btn>
      <v-btn v-if="!uzivatelStore.prihlasen" variant="text" to="/prihlaseni"> Přihlásit se</v-btn>

    </v-app-bar>
  </div>
</template>
  



<script>
export default {
  data: () => ({
    drawer: false,
    uzivatelStore: useUzivatelStore(),
  }),
}
</script>