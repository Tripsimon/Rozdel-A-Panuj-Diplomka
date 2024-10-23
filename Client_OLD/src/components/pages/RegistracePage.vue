
<template>
  <v-container>

    <Alert v-if="showAlert" type="error" :title="alertTitulek" :text="alertText" />

    <v-card color="primary" class="mt-3">
      <v-card-title>
        <h1 style="color: #cca000;" align='center'> Registrace</h1>
        <v-divider></v-divider>
      </v-card-title>

      <v-card-text>

        <v-form ref="form" v-model="valid">

          <v-text-field color="secondary" variant="outlined" v-model="email" :rules="rules.emailRule" label="E-mail"
            required></v-text-field>

          <v-text-field color="secondary" variant="outlined" v-model="prezdivka" :rules="rules.nameRule" label="Jméno"
            required></v-text-field>

          <v-text-field color="secondary" variant="outlined" v-model="heslo" :rules="rules.hesloRule" label="Heslo"
            type='password' required></v-text-field>

          <v-text-field color="secondary" variant="outlined" v-model="reHeslo" :rules="rules.againPassword"
            label="Heslo znovu" type='password' required></v-text-field>


          <v-btn color="secondary" variant="text" class="mr-4" @click="register()">
            Registrovat
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>



  </v-container>
</template>
    

    
<script setup>

//Importy
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Alert from '../parts/AlertHandler.vue'
import axios from 'axios'
import { useUzivatelStore } from "../../stores/uzivatelStore.js"

//Variables
const uzivatelStore = useUzivatelStore()
const router = useRouter()

//Alert
const showAlert = ref(false)
const alertTitulek = ref('text')
const alertText = ref('text')

//Formulář
const email = ref("")
const prezdivka = ref("")
const heslo = ref("")
const reHeslo = ref("")
const valid = ref("")
const form = ref(false)
const rules = {
  hesloRule: [
    value => {
      if (value?.length > 7) return true
      return 'Heslo musí obsahovat alespon 8 znaků'
    },],

  nameRule: [
    value => {
      if (value?.length > 3) return true
      return 'Jméno musí obsahovat alespon 4 znaky'
    },],

  emailRule: [
    value => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Formát zadání není E-Mail'
  ],

  againPassword: [
    value => {
      if (value == heslo.value) return true
      return 'Heslo se neschoduje'
    }
  ]
}

/**
 * Funkce, která po odeslání požadavku zajistí registraci uživatele
 */
function register() {
  form.value?.validate()
    .then(form => {
      if (form.valid) {
        axios.post(axios.defaults.baseURL + "/uzivatel/registrace", { 'email': this.email, 'prezdivka': this.prezdivka, 'heslo': this.heslo })
          .then(queryResponse => {

            switch (queryResponse.data) {
              case 'usedMail':
                showAlert.value = true;
                alertTitulek.value = "Využitá adresa"
                alertText.value = 'Tato E-Mailová adresa je již využívána. Prosím, zvolte jinou'
                break;

              case 'usedNick':
                showAlert.value = true;
                alertTitulek.value = "Využitá přezdívka"
                alertText.value = 'Tato přezdívka adresa je již využívána.'
                break;

              default:
                if (queryResponse.status == 201 || queryResponse.data != null) {
                  uzivatelStore.$patch({
                    prihlasen: true,
                    prezdivka: this.prezdivka,
                    _id: queryResponse.data
                  })
                  router.push({ path: '/' })
                }
                break;
            }
          })
      }
    })
}
</script>
    
<style></style>