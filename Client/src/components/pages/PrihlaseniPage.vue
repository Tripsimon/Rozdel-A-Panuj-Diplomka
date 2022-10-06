<template>

<v-container>
<v-card>
  <v-card-text>
<v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Jméno"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Heslo"
      required
    ></v-text-field>


    <v-btn
      
      color="success"
      class="mr-4"
      @click="prihlaseni"
    >
      Přihlášení
    </v-btn>
  </v-form>
</v-card-text>
</v-card>
</v-container>
</template>
    
    
    
    <script>

    
        export default {
            data: () => ({
              valid: true,
              races: ['Anhilarský člověk', 'Grobr',  'Hruurský člověk', 'Ork', 'Inu-im'],  //TODO: Backend
              classes: ['Kolos','Harcovník','Hraničář','Lupič','Čaroděj','Vizír'],        //TODO: Backend
              checkbox: false,
              posts: []
            }),
        
            methods: {
              prihlaseni () {
                console.log("Login");
              }
            
            },
          }
    </script>
    
    <style>
    
    </style>