<script setup>
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
import {io} from 'socket.io-client'
import axios from 'axios'
const uzivatelStore = useUzivatelStore();
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-img :src="'http://localhost:3000/'+vybranePozadi+'.jpg'"  max-width="100%">
        </v-img>
      </v-col>

      <v-col cols="4">
        <v-card color="primary" title="Pozadí">
          <v-card-actions>
            <v-select
              label="Výběr"
              :items="this.dostupnePozadi"
              variant="underlined"
              v-model="vybranePozadi"
            ></v-select>
          </v-card-actions>

        </v-card>

        <v-btn @click="test()">
          Button
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <v-card title="Slovotepec" :subtitle="uzivatelStore.prezdivka" text="..."></v-card>
      </v-col>
      <v-col cols="3">
        <v-card title="Hráč #1" subtitle="Subtitle" text="..."></v-card>
      </v-col>
      <v-col cols="3">
        <v-card title="Hráč #2" subtitle="Subtitle" text="..."></v-card>
      </v-col>
      <v-col cols="3">
        <v-card title="Hráč #3" subtitle="Subtitle" text="..."></v-card>
      </v-col>
    </v-row>

  </v-container>


</template>
    


<script>





export default {
  data: () => ({
    jmenoSessionu: null,
    sid: null,
    isOwner: false,


    dostupnePozadi: null,
    vybranePozadi: null,

  }),

  mounted(){

    //Websocket
    const socket = io('http://localhost:3001')
    socket.on('connect', () =>{
    console.log('Websocket servis připojen')
    //socket.emit('customEvent',10, "Hi")
    })

    //Zjištění ownera
    let urlParams = new URLSearchParams(window.location.search)
    this.sid = urlParams.get('sid')
    axios.get('http://localhost:3000/sessions/checkOwner',{ params: { sid: this.sid, user: this.uzivatelStore._id } })
      .then(response => {if(response.data){this.isOwner = true}})


    //Načtení pozadí
    axios.get('http://localhost:3000/pozadi/dump')
      .then(res => {
        this.dostupnePozadi = res.data
        this.vybranePozadi = this.dostupnePozadi[0]
      })
  },

  methods: {

    test(){console.log(this.isOwner)}

  },
}
</script>
    
<style>

</style>