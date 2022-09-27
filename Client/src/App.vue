<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-list>
        <v-list-item
            title="Rozděl a Panuj"
            subtitle="Dashboard"
        ></v-list-item>
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
