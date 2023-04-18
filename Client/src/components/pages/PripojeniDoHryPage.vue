<template>
  <v-container>


    <!-- Výběr serveru pro připojení-->
    <v-card color="primary" class="mt-4">
      <v-card-title>
        <h4>Výběr serveru:</h4>
      </v-card-title>
      <v-card-text v-if="sessions.value != null">
        <v-form>
          <v-text-field color="secondary" variant="outlined" v-model="sessionPassword" type='password'
            label="Heslo hry"></v-text-field>
          <v-select color="secondary" variant="outlined" label="Výber herní postavy" :items="adventurerChoices"
            v-model="chosenAdventurer"></v-select>
        </v-form>
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

            <tr class="mt-2" v-for="session in sessions" :key="session">
              <th>{{ session.sessionName }}</th>
              <th>{{ session.ownerName }}</th>
              <th>{{ (3 - session.slots) }}/3</th>
              <th>
                <v-btn color="success" @click="joinSession(session._id)"
                  icon="mdi-arrow-right-thin-circle-outline"></v-btn>
              </th>
              <!-- TODO: Asi ikonka -->
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-card-text v-else>
        <p>Žádný server není dostupný. Prosím, zkuste se přpojit později</p>
      </v-card-text>
    </v-card>

  </v-container>
</template>
      

  
<script setup>

import axios from "axios";
import { ref, onMounted } from 'vue'
import { useRouter, } from 'vue-router'
import { useUzivatelStore } from "../../stores/uzivatelStore.js"

const router = useRouter()

const adventurerChoices = ref([])
const avaliableAdventurers = ref([])
const playerAdventurers = ref([])
const chosenAdventurer = ref(null)
const openSessions = ref([])
const chosenSession = ref(null)

const sessions = ref([])

const sessionData = ref(null)
const sessionPassword = ref(null)
const uzivatelStore = useUzivatelStore()

onMounted(() => {

  if (!uzivatelStore.prihlasen) {
    router.push({ path: '/' })
  }
  /**
   * Naplnění možností dobrodruhů hráče
   */
  axios.get(axios.defaults.baseURL + '/character/getCharacters', { params: { owner: uzivatelStore._id } })
    .then((response) => {
      avaliableAdventurers.value = response.data

      response.data.forEach(element => {
        adventurerChoices.value.push(element.krestniJmeno + " '" + element.prezdivka + "' " + element.prijmeni)
      });
    })

  findSessions();


})


/**
 * Připojení do sessionu
 */
function joinSession(id) {

  let adventurer = adventurerChoices.indexOf(chosenAdventurer, 0)

  console.log(chosenAdventurer)
  let body = {
    "sessionID": id,
    "password": sessionPassword,

    "adventurer": avaliableAdventurers[adventurer]._id,
    "player": uzivatelStore._id
  }
  axios.post(axios.defaults.baseURL + '/sessions/joinSession', body)
    .then(queryResponse => {
      if (queryResponse.data == 'Wrong Password') {
      } else {
        router.push({ path: '/RaPSession', query: { sid: id } })
      }
    })

}

/**
 * Naplnění možností otevřených herních místností
 */
function findSessions() {
  axios.get(axios.defaults.baseURL + '/sessions/openSessions')
    .then((queryResponse) => {
      sessions.value = queryResponse.data
    })
}
</script>
      
<style></style>