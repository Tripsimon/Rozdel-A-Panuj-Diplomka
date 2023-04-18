<template>
  <div id="content">
    <Alert v-model="showAlert" style='z-index:2000' type="error" :title="alertTitle" :text="alertText" />
    <v-container>
      <v-card color="primary" class="mt-3">
        <v-card-text>
          <v-form ref="form">
            <v-text-field color="secondary" variant="outlined" v-model="email" label="E-mail" required></v-text-field>

            <v-text-field color="secondary" variant="outlined" v-model="heslo" type='password' label="Heslo"
              required></v-text-field>
            <v-btn color="secondary" variant="text" class="mr-4" @click="prihlaseni()">
              Přihlášení
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
    


<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'

import axios from "axios";
import Alert from '../parts/AlertHandler.vue'
import { useUzivatelStore } from "../../stores/uzivatelStore.js"

const form = ref(false)

const email = ref("")
const heslo = ref("")
const showAlert = ref(false)
const alertTitle = ref("")
const alertText = ref("")
const uzivatelStore= useUzivatelStore()
const router = useRouter()


/**
 * Metoda pro přihlášení uživatele
 */
function prihlaseni() {
  axios.post(axios.defaults.baseURL + '/uzivatel/prihlaseni', { 'email': email.value, 'heslo': heslo.value })
    .then(queryResponse => {
      switch (queryResponse.data) {
        case 'noUser':
        alertTitle.value = "Učet nenalezen",
          alertText.value = 'Nebyl nalezen učet s tímto E-Mailem. Prosím, zkontroluje zadaná data'
          showAlert.value = true
          break;

        case 'wrongPass':
        alertTitle.value = "špatné přihlašovací udaje",
          alertText.value = 'Byly zadány špatné přihlašovací udaje. Prosím, zkuste to znovu'
          showAlert.value = true
          break;

        default:
          if (queryResponse.status == 200 || queryResponse.data != null) {
            uzivatelStore.zapisUzivatele(queryResponse.data.prezdivka, queryResponse.data._id, queryResponse.data.opravneni);
            router.push({ path: '/' })
          }
          break;
      }
    }
    )
}


</script>
    
<style></style>