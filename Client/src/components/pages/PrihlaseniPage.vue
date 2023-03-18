<script setup>
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
import axios from "axios";

</script>

<template>
  <div id="content">
    <Alert v-model="showAlert" style='z-index:2000' type="error" :title="alertTitle" :text="alertText" />
    <v-container>
      <v-card color="primary" class="mt-3">
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field color="secondary" variant="outlined" v-model="email" label="E-mail" required></v-text-field>

            <v-text-field color="secondary" variant="outlined" v-model="heslo" type='password' label="Heslo" required></v-text-field>
            <v-btn color="secondary" variant="text"  class="mr-4" @click="prihlaseni(email, heslo, uzivatelStore)">
              Přihlášení
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
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
    alertTitle: 'Text',
    alertText: 'Text',
  }),

  methods: {
    prihlaseni() {



      axios.post(axios.defaults.baseURL+'/uzivatel/prihlaseni', { 'email': this.email, 'heslo': this.heslo })
        .then(queryResponse => {
          switch (queryResponse.data) {
            case 'noUser':
              this.alertTitulek = "Učet nenalezen",
                this.alertText = 'Nebyl nalezen učet s tímto E-Mailem. Prosím, zkontroluje zadaná data'
              this.showAlert = true
              break;

            case 'wrongPass':
              this.alertTitulek = "špatné přihlašovací udaje",
                this.alertText = 'Byly zadány špatné přihlašovací udaje. Prosím, zkuste to znovu'
              this.showAlert = true
              break;

            default:
              if (queryResponse.status == 200 || queryResponse.data != null) {
                this.uzivatelStore.zapisUzivatele(queryResponse.data.prezdivka,queryResponse.data._id,queryResponse.data.opravneni);
                this.$router.push({ path: '/' })
              }
              break;
          }
        }
        )
    }
  },
}
</script>
    
<style></style>