<script setup>
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
import { io } from 'socket.io-client'
import axios from 'axios'
const uzivatelStore = useUzivatelStore();
</script>

<template>

  <!-- Modal pro inventář -->
  <v-row justify="center">
    <v-dialog v-model="inventoryModal" scrollable>

      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Select Country</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-expansion-panels variant="accordion">

            <v-expansion-panel  title="Item"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."></v-expansion-panel>


            <v-expansion-panel v-for="i in 6" :key="i" title="Item"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."></v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <!-- /Modal pro inventář -->

  <v-container>
    <v-row>
      <v-col cols="8">
        <v-img :src="'http://localhost:3000/' + vybranePozadi + '.jpg'" max-width="100%">
        </v-img>
      </v-col>

      <v-col cols="4">
        <v-card color="primary" title="Pozadí">
          <v-card-text>
            <v-select label="Výběr" :items="this.dostupnePozadi" variant="underlined"
              v-model="vybranePozadi"></v-select>
          </v-card-text>

        </v-card>

        <v-btn @click="updateAdventurers()">
          Button
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <!-- 
      <v-col cols="3">
        <v-card title="Slovotepec" :subtitle="uzivatelStore.prezdivka" text="..."></v-card>
      </v-col>
      -->


      <v-col cols="4">
        <v-card v-if="this.player1.adventurer != null">
          <v-card-title>{{ this.player1.adventurer.name + ' ' + this.player1.adventurer.secondName }}</v-card-title>
          <v-card-subtitle>{{ this.player1.owner }}</v-card-subtitle>
          <v-card-text>dsads</v-card-text>
          <v-card-actions>
            <v-btn>Inventář</v-btn>
            <v-btn>Status</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card title="Hráč #2" :subtitle="this.player2.owner" text="..."></v-card>
      </v-col>
      <v-col cols="4">
        <v-card title="Hráč #3" :subtitle="this.player3.owner" text="..."></v-card>
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

    player1: { owner: "Nepřipojen", adventurerID: null, adventurer: null },
    player2: { owner: "Nepřipojen", adventurerID: null },
    player3: { owner: "Nepřipojen", adventurerID: null },

    dialogm1: '',
    inventoryModal: true,

  }),

  mounted() {

    //Websocket
    //socket.emit('customEvent',10, "Hi")
    const socket = io('http://localhost:3001')
    socket.on('connect', () => {
      console.log('Websocket servis připojen')
    })


    //Připojení hráče
    socket.on('updatePlayers', () => {
      this.sid = urlParams.get('sid')

      axios.get('http://localhost:3000/sessions/sessionPlayers', { params: { sid: this.sid } })
        .then(response => {

          this.player1.owner = response.data[0].owner
          this.player1.adventurerID = response.data[0].adventurer

          this.player2.owner = response.data[1].owner
          this.player2.adventurerID = response.data[1].adventurer

          this.player3.owner = response.data[2].owner
          this.player3.adventurerID = response.data[2].adventurer




          axios.get('http://localhost:3000/character/SessionAdventurers', { params: { adventurer1: this.player1.adventurerID, adventurer2: this.player2.adventurerID, adventurer3: this.player3.adventurerID } })
            .then(response => {
              this.player1.adventurer = response.data[0]
              console.log(this.player1.adventurer)
            })

        })
    })

    //Zjištění ownera
    let urlParams = new URLSearchParams(window.location.search)
    this.sid = urlParams.get('sid')
    axios.get('http://localhost:3000/sessions/checkOwner', { params: { sid: this.sid, user: this.uzivatelStore._id } })
      .then(response => {

        if (response.data) {

          this.isOwner = true
        } else {
          socket.emit('playerJoined')
        }

      })


    //Načtení pozadí
    axios.get('http://localhost:3000/pozadi/dump')
      .then(res => {
        this.dostupnePozadi = res.data
        this.vybranePozadi = this.dostupnePozadi[0]
      })
  },

  methods: {

    updateAdventurers() { },

    test() {

    }

  },
}
</script>
    
<style>

</style>