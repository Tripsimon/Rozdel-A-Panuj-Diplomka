<script setup>
import axios from "axios";
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
</script>
<template>
  <v-container>

    <Alert v-if="showAlert" type="error" :title="alertTitulek" :text="alertText" />

    <v-card color="primary" class="mt-3">
      <h1 class="d-flex justify-center">Registrace</h1>
      <v-card-text>

        <v-form ref="form" v-model="valid" lazy-validation>

          <v-text-field v-model="email" label="E-mail" required></v-text-field>

          <v-text-field v-model="prezdivka" :counter="10" :rules="nameRules" label="Jméno" required></v-text-field>


          <v-text-field v-model="heslo" :items="items" label="Heslo" :type="show1 ? 'text' : 'password'" required></v-text-field>

          <v-text-field v-model="reHeslo" :items="items" label="Heslo znovu" :type="show1 ? 'text' : 'password'" required></v-text-field>


          <v-btn color="success" class="mr-4" @click="register(email, prezdivka, heslo)">
            Registrovat
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>



  </v-container>
</template>
    

    
<script>

import Alert from '../parts/AlertHandler.vue'

export default {
  components: {
    Alert
  },

  data: () => ({
    uzivatelStore: useUzivatelStore(),
    email: "",
    prezdivka: "",
    heslo: "",
    reHeslo: "",

    showAlert: false,
    alertTitulek: 'Text',
    alertText: 'Text',

  }),

  methods: {

    register() {


      axios.post("http://localhost:3000/uzivatel/registrace", {'email': this.email, 'prezdivka': this.prezdivka, 'heslo': this.heslo})
        .then(queryResponse => {

          switch (queryResponse.data) {
            case 'usedMail':
              this.showAlert = true;
              this.alertTitulek = "Využitá adresa"
              this.alertText = 'Tato E-Mailová adresa je již využívána. Prosím, zvolte jinou'
              break;

            case 'usedNick':
              this.showAlert = true;
              this.alertTitulek = "Využitá přezdívka"
              this.alertText = 'Tato přezdívka adresa je již využívána.'
              break;

            default:
                if (queryResponse.status == 201 || queryResponse.data != null) {
                  this.uzivatelStore.$patch({
                    prihlasen: true,
                    prezdivka: this.prezdivka,
                    _id: queryResponse.data
                  })
                  this.$router.push({path: '/'})
                }
              break;
          }

        })
    
    }
  }
}
</script>
    
<style></style>