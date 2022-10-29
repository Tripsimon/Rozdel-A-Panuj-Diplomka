<template >
    <v-navigation-drawer 
    color="primary"
    v-model="drawer" app>
      <v-list >
        <v-list-item dark title="Nepřihlášený uživatel"
  >
        </v-list-item>
          <v-row align="center" justify="space-around">
            <v-btn to="/prihlaseni" >Login</v-btn>
            <v-btn to="/registrace" >Registrace</v-btn>
          </v-row>
  
        </v-list>
        <v-divider></v-divider>
  
        <v-list density="compact" nav>
  
          <v-list-item-title>Správa účtu</v-list-item-title>
          <v-list-item to="/tvorba-dobrodruha" prepend-icon="mdi-newspaper-variant" title="Tvorba nového dobrodruha" value="myfiles"></v-list-item>
          <v-list-item to="/tvorba-dobrodruha" prepend-icon="mdi-newspaper-variant" title="Tvorba nového dobrodruha" value="myfiles"></v-list-item>
          <v-divider></v-divider>
  
          <v-list-item-title>Správa dobrodruhů</v-list-item-title>
          <v-list-item to="/tvorba-dobrodruha" prepend-icon="mdi-newspaper-variant" title="Tvorba nového dobrodruha" value="myfiles"></v-list-item>
          <v-list-item to="/vypis-dobrodruhu" prepend-icon="mdi-newspaper-variant" title="Výpis dobrodruhů" value="myfiles"></v-list-item>
          <v-divider></v-divider>
  
          <v-list-item-title>Slovotepec</v-list-item-title>
          <v-list-item to="/tvorba-dobrodruha" prepend-icon="mdi-newspaper-variant" title="Tvorba nového dobrodruha" value="myfiles"></v-list-item>
          <v-list-item to="/tvorba-dobrodruha" prepend-icon="mdi-newspaper-variant" title="Tvorba nového dobrodruha" value="myfiles"></v-list-item>
          <v-divider></v-divider>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar 
      color="primary" app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  
        <v-toolbar-title>Rozděl a Panuj</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn variant="text" to="/prihlaseni" > Přihlásit se</v-btn>
      </v-app-bar>
  </template>
  
  <script>
  export default {
      data: () => ({ drawer: false }),
    }
  </script>