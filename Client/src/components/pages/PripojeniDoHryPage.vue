<script setup>
import axios from "axios";
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
const uzivatelStore = useUzivatelStore();
</script>

<template>
    <v-container>
      <v-card color="primary">
        <v-card-text>
            <h3> Výber herní postavy</h3>
        </v-card-text>
        <v-card-actions>
            <v-select
              label="Výběr"
              :items="adventurerChoices"
              variant="underlined"
              v-model="vybranyDobrodruh"
            ></v-select>
          </v-card-actions>
      </v-card>
    </v-container>
  </template>
      

  
  <script>
  export default {
    data: () => ({
      adventurerChoices: [],
      vybranyDobrodruh: null
    }),
  
    mounted(){

      axios.get("http://localhost:3000/character/getCharacters",{params: {owner: this.uzivatelStore._id}})
        .then((response) => {
          console.log(response.data[0])
          this.adventurerChoices.push(response.data[0].name +" '"+ response.data[0].nickname +"' "+response.data[0].secondName)
        })
    },

    methods: {
      getAdventurers(){

      }
  
    },
  }
  </script>
      
  <style>
  
  </style>