<script setup>
import axios from "axios";
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
import { isProxy, toRaw } from 'vue';
</script>

<template>
    <v-container>

      <!--Výber herní postavy pro připojení -->
      <v-card color="primary">
        <v-card-text>
            <h3> Výber herní postavy</h3>
            <v-select
              :items="adventurerChoices"
              variant="underlined"
              v-model="chosenAdventurer"
            ></v-select>
        </v-card-text>
      </v-card>

      <!-- Výběr serveru pro připojení-->
      <v-card color="primary" class="mt-4">
        <v-card-text>
            <h3> Výber serveru</h3>
            <v-select
              label="Výběr"
              v-model="chosenSession"
              :items="this.sessions"
              item-title="sessionName"
              variant="underlined"
              return-object
            ></v-select>

            <v-text-field
              v-if="chosenSession != null"
              v-model="sessionPassword"
              type='password'
              label="Heslo hry"
            ></v-text-field>
        </v-card-text>

        <v-card-actions v-if="sessionPassword != null">
            <v-btn :onclick="joinSession">Připojit</v-btn>
          </v-card-actions>
      </v-card>

    </v-container>
  </template>
      

  
  <script>
  export default {
    data: () => ({
      adventurerChoices: [],
      avaliableAdventurers: [],
      chosenAdventurer: null,
      openSessions: [],
      chosenSession: null,

      sessions: [],

      sessionData: null,
      sessionPassword: null,

      uzivatelStore: useUzivatelStore()
    }),
  
    mounted(){

      /**
       * Naplnění možností dobrodruhů hráče
       */
      axios.get("http://localhost:3000/character/getCharacters",{params: {owner: this.uzivatelStore._id}})
        .then((response) => {
          this.avaliableAdventurers = response.data
        
          response.data.forEach(element => {
            this.adventurerChoices.push(element.krestniJmeno +" '"+ element.prezdivka +"' "+element.prijmeni)
          });
      })

      /**
       * Naplnění možností otevřených herních místností
       */
      axios.get("http://localhost:3000/sessions/openSessions")
        .then((queryResponse) =>{
          this.sessions = queryResponse.data
        })

    },

    methods: {

      /**
       * Připojení do sessionu
       */
      joinSession(){

        let adventurer = this.adventurerChoices.indexOf(this.chosenAdventurer,0)
        
        let body = {
          "sessionID":this.chosenSession._id,
          "password":this.sessionPassword,
          "adventurer":this.avaliableAdventurers[adventurer]._id,
          "player": this.uzivatelStore._id
        }
        
        
        axios.post("http://localhost:3000/sessions/joinSession",body)
          .then(queryResponse =>{
            if(queryResponse.data == 'Wrong Password'){
              console.log("Asi heslo")
            }else{
              console.log(queryResponse.data)
              this.$router.push({path: '/RaPSession', query: {sid: this.chosenSession._id}})
            }
        })
        
      },
    },
  }
  </script>
      
  <style>
  
  </style>