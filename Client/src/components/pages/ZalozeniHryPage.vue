<script setup>
import axios from "axios";
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
</script>

<template>
  <div id="content">
    <Alert  type="error" style='z-index:2000' :title="alertTitle" :text="alertText" v-model="showAlert"/>
    <v-container>
      <v-card color="primary">
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field color="secondary" v-model="jmenoSessionu" label="Jméno herní místnosti" required></v-text-field>
            <v-text-field color="secondary" v-model="heslo" label="Heslo" type='password' required></v-text-field>
            <v-btn color="secondary" class="mr-4" @click="zalozeniHry()">
              Založit
            </v-btn>
          </v-form>
        </v-card-text>
        <v-card-action>

        </v-card-action>
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

    rules:{
      required: [
        value => {
          if (value) return true
          return 'You must enter a first name.'
        },
      ]
    },

    jmenoSessionu: null,
    heslo: null,

  }),

  methods: {


    zalozeniHry() {
      let obsah = {
        "majitel": this.uzivatelStore._id,
        "jmenoMajitele": this.uzivatelStore.prezdivka,
        "jmenoSessionu": this.jmenoSessionu,
        "heslo": this.heslo
      }
      axios.post("http://localhost:3000/sessions/createSession", obsah)
        .then(res => this.$router.push({ path: '/RaPSession', query: { sid: res.data } }))
        ;

    }

  },
}
</script>
      
<style></style>