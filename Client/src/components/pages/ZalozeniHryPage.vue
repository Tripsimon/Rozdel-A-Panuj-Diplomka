<script setup>
import axios from "axios";
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
</script>

<template>
    <v-container>
      <v-card color="primary">
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="jmenoSessionu" label="Jméno herní místnosti" required></v-text-field>
  
            <v-text-field v-model="heslo" label="Heslo" type='password' required></v-text-field>
            <v-btn color="success" class="mr-4" @click="zalozeniHry()">
              Založit
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
      

  
  <script>
  export default {
    data: () => ({
      uzivatelStore: useUzivatelStore(),

      jmenoSessionu: null,
      heslo: null,

    }),
  
    methods: {

      
      zalozeniHry() {
        let obsah = {
          "majitel":this.uzivatelStore._id,
          "jmenoMajitele":this.uzivatelStore.prezdivka,
          "jmenoSessionu":this.jmenoSessionu,
          "heslo":this.heslo
        }

        axios.post("http://localhost:3000/sessions/createSession",obsah)
          .then(res => this.$router.push({path: '/RaPSession', query: {sid: res.data}}))
        ;

      }
  
    },
  }
  </script>
      
  <style>
  
  </style>