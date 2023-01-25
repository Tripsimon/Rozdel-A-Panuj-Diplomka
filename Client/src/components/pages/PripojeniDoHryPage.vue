<script setup>
import axios from "axios";
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
import { isProxy, toRaw } from 'vue';
const uzivatelStore = useUzivatelStore();
</script>

<template>
    <v-container>
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

      <v-card color="primary" class="mt-4">
        <v-card-text>
            <h3> Výber serveru</h3>
            <v-select
              label="Výběr"
              :items="this.openSessions"
              variant="underlined"
              v-model="chosenSession"
              @update:modelValue="sessionSelect"
            ></v-select>
            <v-text-field
              v-if="chosenSession != null"
              v-model="sessionPassword"
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
      sessionData: null,
      sessionPassword: null
    }),
  
    mounted(){

      // Sehnání dobrodruhů
      axios.get("http://localhost:3000/character/getCharacters",{params: {owner: this.uzivatelStore._id}})
        .then((response) => {
          this.avaliableAdventurers = response.data
        
          response.data.forEach(element => {
            console.log(element)
            this.adventurerChoices.push(element.krestniJmeno +" '"+ element.prezdivka +"' "+element.prijmeni)
          });
          

      })

      // Sehnání sessionů
      axios.get("http://localhost:3000/sessions/openSessions")
        .then((response) =>{

        response.data.forEach(ses => {
          this.openSessions.push(toRaw(ses.sessionName))
        });
        
        
        })
    },

    methods: {

      sessionSelect(){
        axios.get('http://localhost:3000/sessions/returnSession',{params:{sessionName: this.chosenSession}})
          .then(data => {
            this.sessionData = data.data
          })
      },

      //Připojení do hry
      joinSession(){

        let adventurer = this.adventurerChoices.indexOf(this.chosenAdventurer,0)

        console.log(this.uzivatelStore._id)
        
        let body = {
          "sessionID":this.chosenSession,
          "password":this.sessionPassword,
          "adventurer":this.avaliableAdventurers[adventurer]._id,
          "player": this.uzivatelStore._id
        }
        axios.post("http://localhost:3000/sessions/joinSession",body)
          .then(data =>{
            if(data.data != false){
              this.$router.push({path: '/RaPSession', query: {sid: data.data}})
          }else{
            console.log("špatné heslo")
          }

          })
      },

      test(){
        console.log(this.openSessions)
      }
  
    },
  }
  </script>
      
  <style>
  
  </style>