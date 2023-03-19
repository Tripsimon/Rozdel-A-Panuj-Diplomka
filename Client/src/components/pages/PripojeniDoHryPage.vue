<script setup>
import axios from "axios";
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
</script>

<template>
  <v-container>

    <!--Výber herní postavy pro připojení -->
    <v-card color="primary">
      <v-card-text>
        <v-select color="secondary" variant="outlined" label="Výber herní postavy" :items="adventurerChoices"
          v-model="chosenAdventurer"></v-select>
      </v-card-text>
    </v-card>

    <!-- Výběr serveru pro připojení-->
    <v-card color="primary" class="mt-4" >
      <v-card-title ><h4 >Výběr serveru:</h4></v-card-title>
      <v-card-text v-if="this.sessions != []">
        <v-text-field color="secondary" variant="outlined" v-model="sessionPassword" type='password'
          label="Heslo hry"></v-text-field>
          <v-table>
            <thead>
              <tr>
                <th>
                  Jméno
                </th>
                <th>
                  Majitel
                </th>
                <th>
                  Připojeno
                </th>
                <th>
                  Akce
                </th>
              </tr>
            </thead>

            <tbody>

              <tr class="mt-2" v-for="session in this.sessions" :key="session">
                <th>{{session.sessionName}}</th>
                <th>{{session.ownerName}}</th>
                <th>{{( 3 - session.slots)}}/3</th>
                <th>
                  <v-btn color="success" @click="joinSession(session._id)" icon="mdi-arrow-right-thin-circle-outline"></v-btn>
                </th>
                <!-- TODO: Asi ikonka -->
              </tr>
            </tbody>
          </v-table>
      </v-card-text>
      <v-card-text v-else>
        <p >Žádný server není dostupný. Prosím, zkuste se přpojit později</p>
      </v-card-text>

        <v-card-actions v-if="sessionPassword != null">
          <v-btn @click="joinSession">Připojit</v-btn>
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

  mounted() {

    /**
     * Naplnění možností dobrodruhů hráče
     */
    axios.get(axios.defaults.baseURL+'/character/getCharacters', { params: { owner: this.uzivatelStore._id } })
      .then((response) => {
        this.avaliableAdventurers = response.data

        response.data.forEach(element => {
          this.adventurerChoices.push(element.krestniJmeno + " '" + element.prezdivka + "' " + element.prijmeni)
        });
      })

      this.findSessions();


  },

  methods: {

    /**
     * Připojení do sessionu
     */
    joinSession(id) {

      let adventurer = this.adventurerChoices.indexOf(this.chosenAdventurer, 0)

      let body = {
        "sessionID": id,
        "password": this.sessionPassword,
        "adventurer": this.avaliableAdventurers[adventurer]._id,
        "player": this.uzivatelStore._id
      }
      axios.post(axios.defaults.baseURL+'/sessions/joinSession', body)
        .then(queryResponse => {
          if (queryResponse.data == 'Wrong Password') {
          } else {
            this.$router.push({ path: '/RaPSession', query: { sid: id } })
          }
        })

    },

    /**
     * Naplnění možností otevřených herních místností
     */
    findSessions(){
      axios.get(axios.defaults.baseURL+'/sessions/openSessions')
      .then((queryResponse) => {

        this.sessions = queryResponse.data
        console.log(this.sessions[0])
      })
    }
  },
}
</script>
      
<style></style>