<template>
  <v-app id="inspire">
    <v-navigation-drawer
      dark
        v-model="drawer"
        app

    >
      <v-list dark>

        <v-list-item
        dark
            title="Nepřihlášený uživatel"
        >
      </v-list-item>
        <v-row align="center" justify="space-around">
          <v-btn to="/prihlaseni" >Login</v-btn>
          <v-btn to="/registrace" >Registrace</v-btn>
        </v-row>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item to="/tvorba-dobrodruha" prepend-icon="mdi-newspaper-variant" title="Tvorba nového dobrodruha" value="myfiles"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Rozděl a Panuj</v-toolbar-title>
    </v-app-bar>

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
