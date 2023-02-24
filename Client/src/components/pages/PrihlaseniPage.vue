<script setup>
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
import axios from "axios";

</script>

<template>

  <v-container>

    <Alert v-if="showAlert" type="error" :title="alertTitulek" :text="alertText" />

    <v-card color="primary" class="mt-3">
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="email" label="E-mail" required></v-text-field>

          <v-text-field v-model="heslo" type='password' label="Heslo" required></v-text-field>
          <v-btn color="success" class="mr-4" @click="prihlaseni(email, heslo, uzivatelStore)">
            Přihlášení
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
      heslo: "",

      showAlert: false,
      alertTitulek: 'Text',
      alertText: 'Text',
  }),

  methods: {
    prihlaseni() {


      axios.post("http://localhost:3000/uzivatel/prihlaseni",{'email':this.email,'heslo':this.heslo})
        .then(queryResponse =>{

          switch (queryResponse.data) {
            case 'noUser':
              this.alertTitulek = "Učet nenalezen",
              this.alertText = 'Nebyl nalezen učet s tímto E-Mailem. Prosím, skontroluje zadaná data'
              this.showAlert = true
            break;

            case 'wrongPass':
              this.alertTitulek = "špatné přihlašovací udaje",
              this.alertText = 'Byly zadány špatné přihlašovací udaje. Prosím, zkuste to znovu'
              this.showAlert = true
            break;
          
            default:
              if (queryResponse.status == 200 || queryResponse.data != null) {
                this.uzivatelStore.$patch({
                  prihlasen: true,
                  prezdivka: queryResponse.data.prezdivka,
                  _id: queryResponse.data._id,
                });
              } 
              break;
          }


        })

    

    }
    
  },
}
</script>
    
<style>

</style>