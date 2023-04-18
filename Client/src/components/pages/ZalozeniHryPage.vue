<!-- Refaktored-->
<template>
  <div id="content">
    <Alert type="error" style="z-index:2000" :title="alertTitle" :text="alertText" v-model="showAlert" />
    <v-container>
      <v-card color="primary">
        <v-card-text>
          <v-form ref="form" >
            <v-text-field color="secondary" variant="outlined" :rules="rules.required" v-model="jmenoSessionu"
              label="Jméno herní místnosti" required></v-text-field>
            <v-text-field color="secondary" variant="outlined" :rules="rules.required" v-model="heslo" label="Heslo"
              type='password' required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" variant="text" class="mr-4" @click="zalozeniHry()">
            Založit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>
      

  
<script setup>
//Balíčky
import axios from "axios";

//Součásti Vue a Store
import { ref, onMounted } from 'vue'
import { useRouter, } from 'vue-router'
import { useUzivatelStore } from "../../stores/uzivatelStore.js"

//Komponenty
import Alert from '../parts/AlertHandler.vue'

//Systémové variables
const router = useRouter()
let uzivatelStore = useUzivatelStore()

//Alert variables
const showAlert = ref(false)
const alertTitle = ref('')
const alertText = ref('')

//Formulář
const form = ref(null)
const jmenoSessionu = ref(null)
const heslo = ref(null)
const rules = {
  required: [
    value => {
      if (value?.length > 0) return true
      return 'Formulář není vyplněný'
    },
  ],
}


onMounted(() =>{
    if (!uzivatelStore.prihlasen) {
        router.push({path: '/'})
    }
})


/**
 * Metoda pro založení hry
 */
function zalozeniHry() {
  form.value?.validate()
    .then(({ valid }) => {
      if (valid) {

        //Naplnění obsahu
        let obsah = {
          "majitel": uzivatelStore._id,
          "jmenoMajitele": uzivatelStore.prezdivka,
          "jmenoSessionu": jmenoSessionu.value,
          "heslo": heslo.value
        }

        //Odeslání požadavku
        axios.post(axios.defaults.baseURL + '/sessions/createSession', obsah)
          .then(queryResponse => {
            if (queryResponse.data == null) {
              showAlert.value = true;
              alertTitle.value = "Chyba v komunikaci"
              alertText.value = "Komunikace se serverem se nezdařila. Prosím, zkuste akci znovu později"
              return
            }
            router.push({
              path: '/RaPSession', query: { sid: queryResponse.data }
            })
          })
          .catch(err => {
            showAlert.value = true;
            alertTitle.value = "Chyba v komunikaci"
            alertText.value = "Komunikace se serverem se nezdařila. Prosím, zkuste akci znovu později"
          })
      }
    })
}
</script>
