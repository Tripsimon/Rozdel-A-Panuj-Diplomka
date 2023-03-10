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

        <v-form ref="form" v-model="valid" fast-fail  @submit.prevent="submit"  >

          <v-text-field v-model="email" :rules="rules.emailRule" label="E-mail" required></v-text-field>

          <v-text-field v-model="prezdivka" :rules="rules.nameRule"  label="Jméno" required></v-text-field>

          <v-text-field v-model="heslo"  :rules="rules.hesloRule" label="Heslo"
            type='password' required></v-text-field>

          <v-text-field v-model="reHeslo"   label="Heslo znovu"
            type='password' required></v-text-field>


          <v-btn color="success" class="mr-4" @click="register()">
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
    valid: '',
    rules: {
      hesloRule: [
        value => {
          if (value?.length > 7) return true
          return 'Heslo musí obsahovat alespon 8 znaků'
        },

      ],
      nameRule: [
        value => {
          if (value?.length > 3) return true
          return 'Jméno musí obsahovat alespon 4 znaky'
        },

      ],

      emailRule: [ 
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Formát zadání není E-Mail'
      ],

    },


    showAlert: false,
    alertTitulek: 'Text',
    alertText: 'Text',

  }),

  methods: {

    register() {
      
      if (this.valid != true) {
        this.showAlert = true,
        this.alertTitulek = "Nesprávná data",
        this.alertText = "Prosím, vyplně formulář korektními daty"
      }else if(this.heslo != this.reHeslo) {
        this.showAlert = true,
        this.alertTitulek = "Rozdílná hesla",
        this.alertText = "Zadaná kontrola hesla se liší. Zkontrolujte prosím zadaná data"
      }else{

      

      axios.post("http://localhost:3000/uzivatel/registrace", { 'email': this.email, 'prezdivka': this.prezdivka, 'heslo': this.heslo })
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
                this.$router.push({ path: '/' })
              }
              break;
          }

        })
      }
    }
    
  }
}
</script>
    
<style></style>