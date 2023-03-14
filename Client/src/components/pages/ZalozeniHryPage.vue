<script setup>
import axios from "axios";
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
</script>

<template>
  <div id="content">
    <Alert  type="error" style="z-index:2000" :title="alertTitle" :text="alertText" v-model="showAlert"/>
    <v-container>
      <v-card color="primary">
        <v-card-text>
          <v-form ref="form" v-model="valid" quick-validation>
            <v-text-field color="secondary" variant="outlined" :rules="this.rules.required" v-model="jmenoSessionu" label="Jméno herní místnosti" required></v-text-field>
            <v-text-field color="secondary" variant="outlined" :rules="this.rules.required" v-model="heslo" label="Heslo" type='password' required></v-text-field>

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
      

  
<script>
import Alert from '../parts/AlertHandler.vue'

export default {
  components: {
    Alert
  },
  data: () => ({
    //Systémové variables
    showAlert: false,
    alertTitle: "",
    alertText: "",
    uzivatelStore: useUzivatelStore(),

    valid:false,
    rules:{
      required: [
        value => {
          if (value) return true
          return 'Pole musí být vyplněno'
        },
      ]
    },

    jmenoSessionu: null,
    heslo: null,

  }),

  methods: {

    /**
     * Metoda pro založení hry
     */
    zalozeniHry() {
      if(!this.valid){
        this.showAlert = true;
        this.alertTitle = "Nefunkční data"
        this.alertText = "Nesprávně vyplněný formulář. Prosím zkontrolujte zadaná data"
        return
      }

      let obsah = {
        "majitel": this.uzivatelStore._id,
        "jmenoMajitele": this.uzivatelStore.prezdivka,
        "jmenoSessionu": this.jmenoSessionu,
        "heslo": this.heslo
      }

      axios.post("http://localhost:3000/sessions/createSession", obsah)
        .then(queryResponse =>{
          if (queryResponse.data == null) {
            this.showAlert = true;
            this.alertTitle = "Chyba v komunikaci"
            this.alertText = "Komunikace se serverem se nezdařila. Prosím, zkuste akci znovu později"
            return
          }
          this.$router.push({ path: '/RaPSession', query: { sid: queryResponse.data }
        })});
    }
  },
}
</script>
      
<style></style>