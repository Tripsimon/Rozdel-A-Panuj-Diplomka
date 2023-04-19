<template>
  <v-container>


    <!-- Výběr serveru pro připojení-->
    <v-card color="primary" class="mt-4">
      <v-card-title>
        <h4>Výběr serveru:</h4>
      </v-card-title>
      <v-card-text v-if="sessions.length != 0">
        <v-form ref="form">
          <v-text-field color="secondary" variant="outlined" v-model="sessionPassword" type='password'
            label="Heslo hry" :rules="rules.required" ></v-text-field>
          <v-select color="secondary" variant="outlined" label="Výber herní postavy" :items="avaliableAdventurers"
            :item-title="'trueName'" :item-value="'_id'" v-model="chosenAdventurer" :rules="rules.required"></v-select>
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

const form = ref(false)
const rules = {
    required: [
        value => {
            if (value?.length > 0) return true
            return 'Formulář není vyplněný'
        },
    ],
};

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

      avaliableAdventurers.value.forEach(element => {
        element.trueName = element.krestniJmeno + ' ' + element.prezdivka +' ' + element.prijmeni
      
      });
    })

  findSessions();


})


/**
 * Připojení do sessionu
 */
function joinSession(id) {
  form.value?.validate()
    .then(({ valid }) => {
      if (valid) {
        let adventurer = adventurerChoices.value.indexOf(chosenAdventurer, 0)
        console.log(adventurer)

        console.log(chosenAdventurer)
        let body = {
          "sessionID": id,
          "password": sessionPassword.value,

          "adventurer": chosenAdventurer.value,
          "player": uzivatelStore._id
        }
        axios.post(axios.defaults.baseURL + '/sessions/joinSession', body)
          .then(queryResponse => {
            if (queryResponse.data == 'Session Joined') {
              router.push({ path: '/RaPSession', query: { sid: id } })
            } else {
              console.log("Problém při připojení")
            }
          })
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