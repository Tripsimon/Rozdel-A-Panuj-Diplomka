<template >
  <div>
    <!-- Modal pro inventář -->
    <InventoryModal :toggle="inventarModal" :inventoryAdventurer="inventarDobrodruh"
      @resync-players="socketsResyncPlayers()" @close-modal="inventarModal = false" />

    <!-- Modal pro detail -->
    <DetailModal :toggle="detailModal" :detailAdventurer="detailAdventurer" @close-modal=" detailModal = false" />

    <!-- Vlastní obsah-->
    <v-container class="mt-3" style="background-image:url(../../../src/assets/images/landingpage.png);">
      <v-row>

        <!-- Mod pruzkumu -->

        <v-col v-if="battleModeSwitch == false" :cols="myIdentity == 'Owner' ? '9' : '12'">
          <v-card color="primary">
            <v-card-title>
              <h1 style="color: #cca000;" align='center'> Průzkum</h1>
            </v-card-title>
            <v-card-text>
              <v-img :src="axios.defaults.baseURL + '/backgrounds/' + vybranePozadi" max-width="100%">
              </v-img>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Mod boje -->
        <v-col v-if="battleModeSwitch == true" :cols="myIdentity == 'Owner' ? '9' : '12'">
          <!-- Nepřátelé -->
          <EnemiesPart :enemies="dataBoje.aktivniNepratele" @add-Life="(index) => fightAddLifeToEnemy(index)"
            @remove-Life="(index) => fightRemoveLifeToEnemy(index)" @kill-Off="(index) => fightRemoveEnemy(index)" />

          <!-- Bojová vřava-->
          <v-card v-if="dataBoje.battleFront.length > 0" color="primary" class="mt-3">
            <v-card-title>
              <h2 style="color: #cca000;"> Bojová vřava</h2>
              <v-divider></v-divider>

            </v-card-title>
            <v-card-text>

              <v-slide-group show-arrows>
                <v-slide-group-item v-for="(entity, index) in dataBoje.battleFrontInstance" :key="index"
                  v-slot="{ isSelected, toggle }">
                  <v-btn class="ma-2" :variant="battleFrontGetStatus(entity)"
                    :color="entity.type == 'adventurer' ? 'success' : 'error'"
                    @click="{ isSelected? battleFrontChosen = null : battleFrontChosen = index ; toggle() }"
                    :prepend-icon="battleFrontGetPrepend(isSelected)"
                    :append-icon="(entity.status == 'dazed' ? 'mdi-lightning-bolt-outline' : '')">
                    {{ entity.name }}
                  </v-btn>
                </v-slide-group-item>


              </v-slide-group>
            </v-card-text>
            <v-card-actions>
              <v-btn color="secondary" variant="outlined" @click="battleFrontNextRound()">
                Dokončit bitevní kolo
              </v-btn>
              <v-btn color="secondary" variant="outlined" @click="battleFrontChoseToFight()">
                Vybrat pro boj
              </v-btn>
              <v-btn color="secondary" variant="outlined" @click="battleFrontExhaust()">
                Unavit
              </v-btn>
              <v-btn color="secondary" variant="outlined" @click="battleFrontReady()">
                Vrátit do boje
              </v-btn>
              <v-btn color="secondary" variant="outlined" @click="battleFrontStun()">
                Omráčit
              </v-btn>


            </v-card-actions>
          </v-card>

          <!-- Hod kostkou-->
          <DiceThrowPart :throwType="dataBoje.bojPorovnanyAtribut" :enemy="dataBoje.bojujiciNepritel"
            :adventurer="dataBoje.bojujiciDobrodruh" :adventurerItems="dataBoje.bojujiciDobrodruhVybava"
            :dice="dataBoje.hozennaKostka" @throw-dice="throwDice()" @clear-dice="clearDice()" />
        </v-col>

        <!-- Přepínač herního modu-->
        <v-col v-if="myIdentity == 'Owner'" cols="3">
          <v-card color="primary">
            <v-card-title>
              <h3 style="color: #cca000;">Herní režim</h3>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col style="margin: auto;">
                  <h4>Půzkum</h4>
                </v-col>
                <v-col style="margin: auto;">
                  <v-switch v-model="battleModeSwitch" @update:modelValue="socketsResyncGamemode()">
                  </v-switch>
                </v-col>
                <v-col style="margin: auto;">
                  <h4>Boj</h4>
                </v-col>


              </v-row>


            </v-card-text>
          </v-card>

          <!-- Změna pozadí -->
          <v-card v-if="battleModeSwitch == false" class="mt-3" color="primary" title="Pozadí">
            <v-card-text>
              <v-select label="Výběr" :items="dostupnePozadi" variant="underlined" v-model="vybranePozadi"></v-select>
            </v-card-text>
          </v-card>

          <!-- Nepřátelé -->
          <v-card v-if="battleModeSwitch == true" color="primary" title="Nepřátelé" class="mt-3"
            >
            <v-card-text>
              <row>
                <v-select color="secondary" variant="outlined" label="Typ nepřítele" :items="enemyTypes"
                  v-model="enemyTypeChosen" @update:modelValue="getEnemiesFromType()"></v-select>
                <v-select v-if="enemiesLoaded.length > 0" color="secondary" variant="outlined" label="Výběr"
                  :items="enemiesLoaded" :item-title="'jmeno'" v-model="enemyChosen" return-object></v-select>
              </row>
            </v-card-text>
            <v-card-actions v-if="enemyChosen != null">
              <v-btn @click="addEnemy" color="secondary" variant="outlined">Přidat</v-btn>
            </v-card-actions>
          </v-card>

          <!-- Typ hodu-->
          <v-card v-if="battleModeSwitch == true" color="primary" class="mt-3">
            <v-card-title>
              <h3 align="center">Mód hodu</h3>
            </v-card-title>
            <v-card-text>
              <v-select label="Porovnávaný atribut" color="secondary" variant="outlined"
                :items="['Volný hod', 'Atributy', 'Zásah', 'Průraz', 'Steč', 'Uhyb', 'Blokace', 'Výdrž']"
                v-model="dataBoje.bojPorovnanyAtribut" @update:modelValue="socketsResyngBattle()"></v-select>
            </v-card-text>
          </v-card>

          <!-- /Nastavení v boji -->

        </v-col>
      </v-row>
      <!-- /Přepínač herního modu-->

      <!-- Kartu dobrodruhů-->
      <v-row class="mb-3">
        <!-- Karta hráče 1 -->
        <v-col cols="4">
          <v-card color="primary" v-if="player1.adventurer != null">
            <v-card-title>{{
              player1.adventurer.krestniJmeno + ' ' + player1.adventurer.prijmeni
            }}</v-card-title>
            <v-card-subtitle>{{ player1.adventurer.rasa + " - " + player1.adventurer.trida }}</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col>
                  <h4>Životy: {{ player1.adventurer.zivoty }}</h4>
                </v-col>
                <v-col>
                  <h4>Peníze: {{ player1.adventurer.penize }}</h4>
                </v-col>
              </v-row>
              <br>
              <v-row>
                <v-col>
                  <h4>Level: {{ player1.adventurer.level }}</h4>
                </v-col>
                <v-col>
                  <h4>Zkušenosti: {{ player1.adventurer.zkusenosti }}</h4>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="openInventory(1)">Inventář</v-btn>
              <v-btn @click="openDetail(1)">Detail</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Karta hráče 2 -->
        <v-col cols="4">
          <v-card color="primary" v-if="player2.adventurer != null">
            <v-card-title>{{
              player2.adventurer.krestniJmeno + ' ' + player2.adventurer.prijmeni
            }}</v-card-title>
            <v-card-subtitle>{{ player2.adventurer.rasa + " - " + player2.adventurer.trida }}</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col>
                  <h4>Životy: {{ player2.adventurer.zivoty }}</h4>
                </v-col>
                <v-col>
                  <h4>Peníze: {{ player2.adventurer.penize }}</h4>
                </v-col>
              </v-row>
              <br>
              <v-row>
                <v-col>
                  <h4>Level: {{ player2.adventurer.level }}</h4>
                </v-col>
                <v-col>
                  <h4>Zkušenosti: {{ player2.adventurer.zkusenosti }}</h4>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="openInventory(2)">Inventář</v-btn>
              <v-btn @click="openDetail(2)">Detail</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Karta hráče 3 -->
        <v-col cols="4">
          <v-card color="primary" v-if="player3.adventurer != null">
            <v-card-title>{{
              player3.adventurer.krestniJmeno + ' ' + player3.adventurer.prijmeni
            }}</v-card-title>
            <v-card-subtitle>{{ player3.adventurer.rasa + " - " + player3.adventurer.trida }}</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col>
                  <h4>Životy: {{ player3.adventurer.zivoty }}</h4>
                </v-col>
                <v-col>
                  <h4>Peníze: {{ player3.adventurer.penize }}</h4>
                </v-col>
              </v-row>
              <br>
              <v-row>
                <v-col>
                  <h4>Level: {{ player3.adventurer.level }}</h4>
                </v-col>
                <v-col>
                  <h4>Zkušenosti: {{ player3.adventurer.zkusenosti }}</h4>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="openInventory(3)">Inventář</v-btn>
              <v-btn @click="openDetail(3)">Detail</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-card  color="primary">
        <v-card-title>
          <h1 style="color: #cca000;" align='center'>
            Herní log
          </h1>
          <v-divider></v-divider>
        </v-card-title>
        <v-card-text>

          <v-virtual-scroll :height="5" :items="sessionLog">
            <v-virtual-scroll-item v-for="entry in sessionLog" :key="entry" >
              <p>{{ entry }}</p>
            </v-virtual-scroll-item>
          </v-virtual-scroll>
        </v-card-text>
      </v-card>

    </v-container>

  </div>
</template>
<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import InventoryModal from '../parts/gamepageParts/InventoryModalPart.vue'
import DetailModal from '../parts/gamepageParts/DetailModalPart.vue'
import EnemiesPart from '../parts/gamepageParts/EnemiesPart.vue'
import DiceThrowPart from '../parts/gamepageParts/DiceThrowPart.vue'
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
import { useRouter } from 'vue-router'
import { io } from 'socket.io-client'
import axios from 'axios'

//Systémové variables
const uzivatelStore = useUzivatelStore()
const router = useRouter()
const webSocket = ref(null)
const sid = ref(null)
const myIdentity = ref(null)
let identityCounter = 0

//Variables herního pozadí
const dostupnePozadi = ref([])
const vybranePozadi = ref(false)

//Variables hráčů
const player1 = reactive({ owner: null, adventurer: null, adventurerID: null })
const player2 = reactive({ owner: null, adventurer: null, adventurerID: null })
const player3 = reactive({ owner: null, adventurer: null, adventurerID: null })

//Herní state
const battleModeSwitch = ref(false)

//Variables pro inventář
const inventarModal = ref(false)
const inventarDobrodruh = ref(null)

//Detail dobrodruha
const detailAdventurer = ref(null)
const detailModal = ref(false)
const detailDobrodruh = ref(null)
const detailLevelInput = ref(null)
const detailExperienceInput = ref(null)
const detailTridaShopnosti = ref([])
const detailRasaSchopnosti = ref([])

// Bojový mod
const dataBoje = reactive({
  bojPorovnanyAtribut: 'Volný hod',
  hozennaKostka: 0,
  bojujiciNepritel: null,
  bojujiciDobrodruh: null,
  bojujiciDobrodruhVybava: [],
  bojujiciDobrodruhPredmet: null,
  aktivniNepratele: [],
  battleFront: [],
  battleFrontInstance: [],
  battleFrontInstanceAdventurers: []
})
const battleFrontChosen = ref(null)

// Nepřátelé
const enemyTypes = ref([])
const enemyTypeChosen = ref(null)
const enemiesLoaded = ref([])
const enemyChosen = ref(null)

// Log
const sessionLog = ref([])

onUnmounted(() => {
  webSocket.value.emit('unMount', myIdentity)
})

onMounted(() => {

  //Duležité proměné
  let urlParams = new URLSearchParams(window.location.search)
  sid.value = urlParams.get('sid')
  if (axios.defaults.baseURL == 'http://localhost:3000') {
    webSocket.value = io('http://localhost:3000')
  } else {
    webSocket.value = io('https://api.rozdel-a-panuj.cz')
    //
  }

  //WEBSOCKET
  //Připojení websocketu



  axios.get(axios.defaults.baseURL + '/sessions/getIdentity', { params: { sid: sid.value, user: uzivatelStore._id } })
    .then(response => {
      console.log(response.data)
      if (response.data == 'Session Lost') {
        router.push({ path: '/pripojeni-do-hry' })
        return
      }
      if (response.data == "Is Owner") {
        myIdentity.value = 'Owner'
        return
      } else if (response.data != null) {
        myIdentity.value = response.data
      }
      socketsResyncPlayers();
      resyncPlayers();
    })
    .catch({

    })

  webSocket.value.on('connect', () => {
    console.log('Websocket servis připojen')
  })

  socketsJoinRoom();

  //Připojení hráče
  webSocket.value.on('resyncPlayers', () => {
    resyncPlayers();
    getLog()
  })

  //Změna herního modu
  webSocket.value.on('resyncGamemode', (mode) => {
    battleModeSwitch.value = mode;
    getLog()
  })

  webSocket.value.on('resyncBattle', (data) => {
    dataBoje.value = data
    getLog()
  })


  //Načtení pozadí
  axios.get(axios.defaults.baseURL + '/pozadi/dump')
    .then(res => {
      dostupnePozadi.value = res.data
      vybranePozadi.value = dostupnePozadi.value[0]
    })

  /**
   * Načte možnosti nepřátel
   */
  getEnemyTypes()
  //loadEnemies()

  resyncPlayers()
})



function getIdentity(entity) {
  if (entity.type == 'monster') {
    return `${entity.name} - ${entity.id}`;
  }
  return `${entity.krestniJmeno} - ${entity.prijmeni}`;
}

function getAdventurerName(adventurer) {
  let name = adventurer.krestniJmeno
  if (adventurer.prezdivka != null) {
    name = name + ' "' + adventurer.prezdivka + '" '
  }
  name = name + adventurer.prijmeni
  return name
}

// SOCKETY
/**
 * Odešle požadavek na připojení socketu do místisti s ID sessiony
 */
function socketsJoinRoom() {
  webSocket.value.emit('joinRoom', sid.value, uzivatelStore._id)
}

/**
 * Resync připojených hráčů a jejich dobrodruhů v dané místnosti
 * 
 */
function socketsResyncPlayers() {
  webSocket.value.emit('resyncPlayers', sid.value)
  getLog()
  resyncPlayers()
}

/**
 * Resyncne herní mod
 */
function socketsResyncGamemode() {
  webSocket.value.emit('resyncGamemode', sid.value, battleModeSwitch.value)
  getLog()
}

function socketsResyngBattle() {
  webSocket.value.emit('resyncBattle', sid.value, dataBoje.value)
  getLog()
}

//Inventář
/**
 * Otevře inventář modal pro daného hráče
 * @param {int} hrac -> Cislo hrace v pořadí
 */
function openInventory(hrac) {
  switch (hrac) {
    case 1:
      inventarDobrodruh.value = player1.adventurer
      break;

    case 2:
      inventarDobrodruh.value = player2.adventurer
      break;

    case 3:
      inventarDobrodruh.value = player3.adventurer
      break;

    default:
      break;
  }
  inventarModal.value = true;
}


//Detail
/**
 * Otevře detail hráčova dobrodruha
 * @param {*} hrac 
 */
function openDetail(hrac) {
  switch (hrac) {
    case 1:
      detailAdventurer.value = player1.adventurer
      break;
    case 2:
      detailAdventurer.value = player2.adventurer
      break;
    case 3:
      detailAdventurer.value = player3.adventurer
      break;

    default:
      break;
  }

  detailModal.value = true
}

/**
 * Změní level a zkušenosti vybraného dobrodruha
 * Resync
 */
function detailChangeLevelExperience() {
  axios.post(axios.defaults.baseURL + '/character/changeLevelAndExperience', { 'adventurer': detailDobrodruh.value._id, 'level': detailLevelInput.value, 'zkusenosti': detailExperienceInput.value })
    .then(responseQuery => {
      if (responseQuery) {
        detailModal.value = false
        detailLevelInput.value = null,
          detailExperienceInput.value = null
        socketsResyncPlayers()
      }
    })
}

// NEPŘÁTELÉ
/**
 * Vybere typ nepřítele pro přidání
 */
function getEnemyTypes() {
  axios.get(axios.defaults.baseURL + '/config/get', { params: { typ: 'typyNepratel' } })
    .then(queryResponse => {
      enemyTypes.value = queryResponse.data
    })
}

function getEnemiesFromType() {
  axios.get(axios.defaults.baseURL + '/monster/byType', { params: { typ: enemyTypeChosen.value } })
    .then(queryResponse => {
      enemiesLoaded.value = queryResponse.data
    })
}



/**
 * Přidá nepřítele do bojového pole
 * Resync
 */
function addEnemy() {

  enemyChosen.value.realneZivoty = enemyChosen.value.zivoty
  enemyChosen.value.identity = identityCounter;
  identityCounter++;

  // ! Zajimava obklika do bakalaá5ky
  dataBoje.aktivniNepratele.push(JSON.parse(JSON.stringify(enemyChosen.value)))
  writeToLog("Přidán nepřítel: " + enemyChosen.value.jmeno + ' - ' + enemyChosen.value.identity)
  battleFrontFillInstance()
  copyBattleFront()
  socketsResyngBattle()
}

/**
 * Přidá život nepříteli
 * @param {int} index  Pozice nepřítele v bojovém poli
 * Resync
 */

function fightAddLifeToEnemy(index) {
  dataBoje.aktivniNepratele[index].realneZivoty = dataBoje.aktivniNepratele[index].realneZivoty + 1
  socketsResyngBattle()
}

/**
 * Odebere život nepříteli
 * @param {int} index Pozice nepřítele v bojovém poli
 * Resync
 */
function fightRemoveLifeToEnemy(index) {
  dataBoje.aktivniNepratele[index].realneZivoty = dataBoje.aktivniNepratele[index].realneZivoty - 1
  socketsResyngBattle()
}

/**
 * Odebere nepřítele z bojiště
 * @param {int} index Pozice nepřítele na bojišti
 */
function fightRemoveEnemy(index) {
  dataBoje.aktivniNepratele.splice(index, 1)
  socketsResyngBattle()
}

// Herní cyklus

/**
 * Vybere dobrodruha pro boj
 * @param {int} adventurer : ID dobrodruha pro boj
 */
function fightChoseAdventurer(adventurer) {
  switch (adventurer) {
    case 1:
      dataBoje.bojujiciDobrodruh = player1.adventurer
      break;
    case 2:
      dataBoje.bojujiciDobrodruh = player2.adventurer
      break;
    case 3:
      dataBoje.bojujiciDobrodruh = player3.adventurer
      break;

    default:
      break;
  }

}



function battleFrontFillInstance() {
  dataBoje.battleFront = [];
  dataBoje.aktivniNepratele.forEach((element, index) => {
    dataBoje.battleFront.push({
      'position': index,
      'name': element.jmeno,
      'id': element.identity,
      'type': "monster",
      'status': 'ready'
    })
  });
  if (player1.adventurer) {
    dataBoje.battleFront.push({
      'position': dataBoje.battleFront.length,
      'name': getAdventurerName(player1.adventurer),
      'id': -1,
      'type': "adventurer",
      'status': 'ready'
    })
  }
  if (player2.adventurer) {
    dataBoje.battleFront.push(player2.adventurer)
  }
  if (player3.adventurer) {
    dataBoje.battleFront.push(player3.adventurer)
  }

}

function copyBattleFront() {
  dataBoje.battleFrontInstance = JSON.parse(JSON.stringify(dataBoje.battleFront))
}

function battleFrontNextRound() {
  dataBoje.battleFrontInstance.forEach((element) => {
    element.status = 'ready'
  })
  socketsResyngBattle()
}


function battleFrontFinish() {
  dataBoje.battleFrontInstance.splice(battleFrontChosen, 1)
  socketsResyngBattle()
}

function battleFrontGetStatus(entity) {
  if (entity.status == 'ready') {
    return "tonal"
  } else if (entity.status == 'exhausted' || entity.status == 'dazed') {
    return "outlined"
  } else {
    return 'tonal'
  }
}

function battleFrontGetPrepend(selected) {
  if (selected) {
    return 'mdi-flag-triangle'
  }

}

/**
 * Unavý vybraného učastníka boje
 */
function battleFrontExhaust() {
  if (battleFrontChosen.value == null) {
    return
  }
  dataBoje.battleFrontInstance[battleFrontChosen.value].status = 'exhausted'
  socketsResyngBattle()
}

function battleFrontReady() {
  if (battleFrontChosen.value == null) {
    return
  }
  dataBoje.battleFrontInstance[battleFrontChosen.value].status = 'ready'
  socketsResyngBattle()
}

function battleFrontStun() {
  if (battleFrontChosen.value == null) {
    return
  }
  dataBoje.battleFrontInstance[battleFrontChosen.value].status = 'dazed'
  socketsResyngBattle()
}

function battleFrontChoseToFight() {
  if (battleFrontChosen.value == null) {
    return
  }

  let chosen = dataBoje.battleFrontInstance[battleFrontChosen.value]
  if (chosen.type == 'monster') {
    let enemy = dataBoje.aktivniNepratele.filter(enemy => enemy.identity == dataBoje.battleFrontInstance[battleFrontChosen.value].id)
    dataBoje.bojujiciNepritel = enemy[0]
  } else if (chosen.type == 'adventurer') {
    switch (chosen.id) {
      case -1:
        fightChoseAdventurer(1)
        break;

      default:
        break;
    }
  }

  socketsResyngBattle()
}



/**
 * Metoda pro hození henrí kostky
 */
function throwDice() {
  dataBoje.hozennaKostka = 0
  dataBoje.hozennaKostka = Math.floor((Math.random() * 6) + 1);
  writeToLog("Byla hozena kostka: " + dataBoje.hozennaKostka);
  socketsResyngBattle()
}

function clearDice() {
  dataBoje.hozennaKostka = 0
  dataBoje.bojujiciNepritel = null
  dataBoje.bojujiciDobrodruh = null
  dataBoje.bojujiciDobrodruhVybava = []
  dataBoje.bojujiciDobrodruhPredmet = null
  socketsResyngBattle()
}


// /Boj

// /Herní cyklus

// Resinc sessionu
/**
 * Znovu načte data hráčů a jejich dobrodruhů z důvodu udržení sessiony
 */
function resyncPlayers() {
  console.log("Proběhne resync hráčů")
  axios.get(axios.defaults.baseURL + '/sessions/sessionPlayers', { params: { sid: sid.value } })
    .then(response => {
      player1.owner = response.data[0].owner
      player1.adventurerID = response.data[0].adventurer

      player2.owner = response.data[1].owner
      player2.adventurerID = response.data[1].adventurer

      player3.owner = response.data[2].owner
      player3.adventurerID = response.data[2].adventurer

      axios.get(axios.defaults.baseURL + '/character/sessionAdventurers', { params: { adventurer1: player1.adventurerID, adventurer2: player2.adventurerID, adventurer3: player3.adventurerID } })
        .then(response => {
          player1.adventurer = response.data[0]
          player2.adventurer = response.data[1]
          player3.adventurer = response.data[2]

        })
    })
}


//LOGOVÁNÍ
/**
 * Zapsání do session logu
 */
function writeToLog(text) {
  const current = new Date();
  const date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  const logged = "[" + date + ' ' + time + "] " + text;
  axios.post(axios.defaults.baseURL + '/sessions/postLogEntry', { 'sessionID': sid.value, 'logEntry': logged })
    .then()
    .catch()
}

/**
 * Získání session logu
 */
function getLog() {
  axios.get(axios.defaults.baseURL + '/sessions/getLog', { params: { 'sessionID': sid.value } })
    .then(queryResponse => {
      sessionLog.value = queryResponse.data
    })
    .catch()
}

</script>
    
<style></style>