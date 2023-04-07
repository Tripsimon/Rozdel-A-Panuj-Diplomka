
<template>
  <div id="content">
    <Alert type="error" :title="alertTitle" :text="alertText" v-model="showAlert" />
    <v-container>
      <v-card class="pa-md-4" max-width="95%" color="primary">
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
          <h1 align="center">Tvorba dobrodruha</h1>
        </v-card-title>


        <v-window v-model="step">
          <!-- Prvni krok-->
          <v-window-item :value="1">
            <v-form ref="form1" v-model="validOne" quick-validation>
              <v-card-text>
                <h2 class="d-flex">Pilíře Dobrodruha</h2>
                <v-divider class="mb-3"></v-divider>

                <v-text-field color="secondary" variant="outlined" :rules="rules.required" label="Křestní jméno"
                  v-model="newAdventurer.name"></v-text-field>
                <v-text-field color="secondary" :rules="rules.required" variant="outlined" label="Příjmení"
                  v-model="newAdventurer.secondName"></v-text-field>
                <v-text-field color="secondary" variant="outlined" label="Přezdívka"
                  v-model="newAdventurer.nickname"></v-text-field>
                <v-select color="secondary" :rules="rules.required" variant="outlined" label="Rasa" :items="rasaMoznosti"
                  item-title="jmeno" return-object v-model="rasaVybrana" @update:modelValue="onRaceSelect"></v-select>

                <!-- Karta pro popis vybrané rasy -->
                <div v-if="rasaVybrana != null">
                  <v-row>
                    <v-col cols="9">
                      <h3>{{ rasaVybrana.jmeno }}</h3>
                      <v-card-subtitle>{{ rasaVybrana.popis }}</v-card-subtitle>
                    </v-col>
                    <v-col cols="3">
                      <h3>Bonusové statistiky: </h3>
                      <p v-if="rasaVybrana.bonusoveAtributy.sila">Síla: {{ rasaVybrana.bonusoveAtributy.sila }}</p>
                      <p v-if="rasaVybrana.bonusoveAtributy.houzevnatost">Houževnatost: {{
                        rasaVybrana.bonusoveAtributy.houzevnatost }}</p>
                      <p v-if="rasaVybrana.bonusoveAtributy.obratnost">Obratnost: {{
                        rasaVybrana.bonusoveAtributy.obratnost }}</p>
                      <p v-if="rasaVybrana.bonusoveAtributy.charisma">Charisma: {{ rasaVybrana.bonusoveAtributy.charisma
                      }}</p>
                      <p v-if="rasaVybrana.bonusoveAtributy.inteligence">Inteligence: {{
                        rasaVybrana.bonusoveAtributy.inteligence }}</p>
                      <p v-if="rasaVybrana.bonusoveAtributy.znalost">Znalost: {{ rasaVybrana.bonusoveAtributy.znalost }}
                      </p>
                    </v-col>
                  </v-row>






                  <h3>Bonusové schopnosti:</h3>
                  <v-divider class="mb-3" color="secondary"></v-divider>
                  <AbilityCard class="mb-3" v-for="ability in rasaSchopnosti" :key="ability._id" :ability="ability"
                    color="" />
                </div>


                <!-- Karta pro popis vybrané rasy -->
                <v-select color="secondary" variant="outlined" v-if="newAdventurer.race != null"
                  :items="rasaVybrana.dostupneTridy" v-model="tridaVybrana" label="Povolání"
                  @update:modelValue="onClassSelect()"></v-select>

                <!-- Karta pro popis vybraného povolání-->
                <div v-if="tridaVybranaObjekt != null">
                  <h3>{{ tridaVybranaObjekt.jmeno }}</h3>
                  <v-card-subtitle class="mb-3">{{ tridaVybranaObjekt.popis }}</v-card-subtitle>

                  <h3>Bonusové schopnosti:</h3>
                  <v-divider class="mb-3" color="secondary"></v-divider>
                  <AbilityCard class="mb-3" v-for="ability in tridaSchopnosti" :key="ability_id" :ability="ability" />
                </div>

              </v-card-text>
            </v-form>
          </v-window-item>
          <!-- /Prvni krok-->

          <!-- Druhý krok-->
          <v-window-item :value="2">
            <v-alert v-model="alert1" closable title="Nevyplněné informace" text="PRosím, vyplnte požadované iformace"
              type="error" variant="tonal"></v-alert>

            <h2 class="d-flex justify-center">Atributy dobrodruha</h2>
            <v-banner lines="one" icon="mdi-arrow-up-bold" color="deep-purple-accent-4" class="my-4">

              <h3 class="d-flex justify-center">Volně dostupné atributy: {{ volneAtributy }}</h3>

              <template v-slot:actions>
                <v-btn @click="resetujAtributy()">Navrátit</v-btn>
              </template>
            </v-banner>

            <v-row>
              <v-col ols="12" sm="6">
                <v-card title="Síla" align="center" color="primary">
                  <v-divider color="secondary"></v-divider>
                  <v-container class="grey lighten-5">
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" color="secondary"
                          @click="decrement('sila')">
                        </v-btn>
                      </v-col>
                      <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                          class="text-h2 font-weight-light mb-4" v-text="atributes.sila"></span></v-col>
                      <v-col align="center" justify="center" cols="12" sm="4">
                        <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" color="secondary"
                          @click="increment('sila')">
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>

              <v-col ols="12" sm="6">
                <v-card title="Houževnatost" align="center" color="primary">
                  <v-divider color="secondary"></v-divider>
                  <v-container class="grey lighten-5">
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" color="secondary"
                          @click="decrement('houzevnatost')"></v-btn>
                      </v-col>
                      <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                          class="text-h2 font-weight-light mb-4" v-text="atributes.houzevnatost"></span></v-col>
                      <v-col align="center" justify="center" cols="12" sm="4">
                        <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" color="secondary"
                          @click="increment('houzevnatost')"></v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col ols="12" sm="6">
                <v-card title="Obratnost" align="center" color="primary">
                  <v-divider color="secondary"></v-divider>
                  <v-container class="grey lighten-5">
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" color="secondary"
                          @click="decrement('obratnost')"></v-btn>
                      </v-col>
                      <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                          class="text-h2 font-weight-light mb-4" v-text="atributes.obratnost"></span></v-col>
                      <v-col align="center" justify="center" cols="12" sm="4">
                        <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" color="secondary"
                          @click="increment('obratnost')"></v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>

              <v-col ols="12" sm="6">
                <v-card title="Charisma" align="center" color="primary">
                  <v-divider color="secondary"></v-divider>
                  <v-container class="grey lighten-5">
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" color="secondary"
                          @click="decrement('charisma')"></v-btn>
                      </v-col>
                      <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                          class="text-h2 font-weight-light mb-4" v-text="atributes.charisma"></span></v-col>
                      <v-col align="center" justify="center" cols="12" sm="4">
                        <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" color="secondary"
                          @click="increment('charisma')"></v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col ols="12" sm="6">
                <v-card title="Inteligence" align="center" color="primary">
                  <v-divider color="secondary"></v-divider>
                  <v-container class="grey lighten-5">
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" color="secondary"
                          @click="decrement('inteligence')"></v-btn>
                      </v-col>
                      <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                          class="text-h2 font-weight-light mb-4" v-text="atributes.inteligence"></span></v-col>
                      <v-col align="center" justify="center" cols="12" sm="4">
                        <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" color="secondary"
                          @click="increment('inteligence')"></v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>

              <v-col ols="12" sm="6">
                <v-card title="Znalost" align="center" color="primary">
                  <v-divider color="secondary"></v-divider>
                  <v-container class="grey lighten-5">
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" color="secondary"
                          @click="decrement('znalost')"></v-btn>
                      </v-col>
                      <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                          class="text-h2 font-weight-light mb-4" v-text="atributes.znalost"></span></v-col>
                      <v-col align="center" justify="center" cols="12" sm="4">
                        <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" color="secondary"
                          @click="increment('znalost')"></v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>




            <h2 class="d-flex justify-center mt-3">Výbava</h2>

            <v-select color="secondary" variant="outlined" label="Hlavní výzbroj" v-model="newAdventurer.mainGear"
              :items="this.tridaVybava.hlavni" item-title="jmeno" return-object>
            </v-select>

            <v-select color="secondary" variant="outlined" label="Sekundární výzbroj" :items="this.tridaVybava.sekundarni"
              v-model="newAdventurer.secondaryGear" item-title="jmeno" return-object></v-select>

            <v-select color="secondary" variant="outlined" label="Bonusová výbava" :items="this.tridaVybava.bonusova"
              v-model="newAdventurer.bonusGear" item-title="jmeno" return-object></v-select>



          </v-window-item>
          <!-- /Druhý krok-->

          <!-- Třetí krok-->
          <v-window-item :value="3">
            <h2>Role dobrodruha</h2>

            <v-select color="secondary" variant="outlined"
              :items="['Zákonné dobro', 'Neutrální dobro', 'Chaotické/zmatené dobro', 'Zákonně neutrální', 'Opravdu neutrální', 'Chaoticky neutrální', 'Zákonně zlý', 'Neutrálně zlý', 'Chaoticky zlý']"
              v-model="newAdventurer.aligment" label="Přesvědčení"></v-select>
            <v-text-field color="secondary" variant="outlined" label="Věk"
              v-model="this.newAdventurer.age"></v-text-field>
            <v-textarea color="secondary" variant="outlined" label="Popis"
              v-model="this.newAdventurer.description"></v-textarea>

            <v-textarea color="secondary" variant="outlined" label="Příběh"
              v-model="this.newAdventurer.story"></v-textarea>
          </v-window-item>
          <!-- /Třetí krok-->

          <v-window-item :value="4">
            <v-container>
              <h2>Shrunutí</h2>
              <v-card title="Základní informace" color="success">
                <template v-slot:text>
                  <p>Jméno: {{ newAdventurer.name }} </p>
                  <p v-if="newAdventurer.nickname != null">Přezdívka: "{{ newAdventurer.nickname }}"</p>
                  <p> Příjmení: {{ newAdventurer.secondName }}</p>
                </template>
              </v-card>

              <v-card title="Statistiky" class="mt-5" color="success">
                <template v-slot:text>
                  <h4>Síla:</h4>
                  <p>{{ atributes.sila }} </p>
                  <p v-if="rasaVybrana.bonusoveAtributy.sila">Bonus:
                    {{ rasaVybrana.bonusoveAtributy.sila }}</p>

                  <h4>Houževnatost:</h4>
                  <p>{{ atributes.houzevnatost }} </p>
                  <p v-if="rasaVybrana.bonusoveAtributy.houzevnatost">Bonus:
                    {{ rasaVybrana.bonusoveAtributy.houzevnatost }}</p>

                  <h4>Obratnost:</h4>
                  <p>{{ atributes.obratnost }} </p>
                  <p v-if="rasaVybrana.bonusoveAtributy.obratnost">Bonus:
                    {{ rasaVybrana.bonusoveAtributy.obratnost }}</p>

                  <h4>Charisma:</h4>
                  <p>{{ atributes.charisma }} </p>
                  <p v-if="rasaVybrana.bonusoveAtributy.charisma">Bonus:
                    {{ rasaVybrana.bonusoveAtributy.charisma }}</p>

                  <h4>Inteligence:</h4>
                  <p>{{ atributes.inteligence }} </p>
                  <p v-if="rasaVybrana.bonusoveAtributy.inteligence">Bonus:
                    {{ rasaVybrana.bonusoveAtributy.inteligence }}</p>

                  <h4>Znalost:</h4>
                  <p>{{ atributes.znalost }} </p>
                  <p v-if="rasaVybrana.bonusoveAtributy.znalost">Bonus:
                    {{ rasaVybrana.bonusoveAtributy.znalost }}</p>

                </template>
              </v-card>

              <v-card title="Výbava" color="success" class="mt-5" text="...">
                <template v-slot:text>
                  <h4>Hlavní výbava: {{ newAdventurer.mainGear.jmeno }}</h4>
                  <h4>Postranní výbava: {{ newAdventurer.secondaryGear.jmeno }}</h4>
                  <p>Bonusová výbava: {{ newAdventurer.bonusGear.jmeno }}</p>
                </template>
              </v-card>
            </v-container>


          </v-window-item>

        </v-window>


        <v-card-actions>
          <v-btn v-if="step > 1" variant="text" @click="previousFormPage()">
            Zpět
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step == 1" color="secondary" variant="outlined" @click="nextFormPage()">
            Schopnosti a vybavení
          </v-btn>
          <v-btn v-if="step == 2" color="secondary" variant="outlined" @click="nextFormPage()">
            Role a příběh
          </v-btn>

          <v-btn v-if="step == 3" color="secondary" variant="outlined" @click="nextFormPage()">
            Shrnutí
          </v-btn>

          <v-btn v-if="step == 4" color="secondary" variant="outlined" @click="sendtoDB()">
            Uložit dobrodruha
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>
  
  
<script setup>
import { ref, onMounted } from 'vue'
import AbilityCard from '../parts/AbilityCard.vue'
import Alert from '../parts/AlertHandler.vue'
import axios from 'axios';
import { useUzivatelStore } from "../../stores/uzivatelStore.js"


//Systémové variables
const showAlert = ref(false)
const alertTitle = ref("")
const alertText = ref("")
const uzivatelStore = useUzivatelStore()

//Rasa
const rasaMoznosti = ref([])
const rasaVybrana = ref(null)
const rasaSchopnosti = ref([])

//Třída
const tridaVybrana = ref(null)
const tridaVybranaObjekt = ref(null)
const tridaVybava = ref({
  hlavni: [],
  sekundarni: [],
  bonusova: [],
})
const tridaPasivniSchopnost = ref(null)
const tridaSchopnosti = ref([])

const validOne = ref(false)
const rules = {
  required: [
    value => {
      if (value) return true
      return 'Pole musí být vyplněno'
    },
  ],
  minLength: [
    value => {
      if (value > 1) return true
      return 'Pole musí obsahovat alespoň 2 symboly'
    },
  ]
}
const step = ref(1)
const alert2 = ref(false)
const alert3 = ref(false)
const newAdventurer = ref({
  name: null,
  secondName: null,
  nickname: null,
  race: null,
  class: null,
  mainGear: null,
  secondaryGear: null,
  bonusGear: null,
  aligment: null,
  age: null,
  description: "Nezjištěno",
  story: "Nezjištěno",
})
const atributes = ref({
  'sila': 8,
  'houzevnatost': 8,
  'obratnost': 8,
  'charisma': 8,
  'inteligence': 8,
  'znalost': 8,
})
const volneAtributy = ref(10)



onMounted(() => {
  axios.get(axios.defaults.baseURL + '/rasy/dump')
    .then(responseQuery => {
      rasaMoznosti.value = responseQuery.data
    })
})



function onRaceSelect() {
  axios.get(axios.defaults.baseURL + '/schopnosti/getMultipleByID', { params: { abilities: rasaVybrana.value.schopnosti } })
    .then(queryResponse => {

      rasaSchopnosti.value = queryResponse.data
    })
  newAdventurer.value.race = rasaVybrana.value.jmeno
}

function onClassSelect() {
  newAdventurer.value.class = tridaVybrana


  axios.get(axios.defaults.baseURL + '/tridy/getByName', { params: { name: tridaVybrana.value } })
    .then(query => {
      tridaVybranaObjekt.value = query.data

      axios.get(axios.defaults.baseURL + '/vybava/multipleID', { params: { items: tridaVybranaObjekt.hlavniVybava } })
        .then(queryResponse => {
          tridaVybava.value.hlavni = queryResponse.data
        })

      axios.get(axios.defaults.baseURL + '/vybava/multipleID', { params: { items: tridaVybranaObjekt.krajniVybava } })
        .then(queryResponse => {
          tridaVybava.value.sekundarni = queryResponse.data
        })


      axios.get(axios.defaults.baseURL + '/vybava/multipleID', { params: { items: tridaVybranaObjekt.bonusovaVybava } })
        .then(queryResponse => {
          tridaVybava.value.bonusova = queryResponse.data
        })


      axios.get(axios.defaults.baseURL + '/schopnosti/getByOwner', { params: { owner: tridaVybrana.value } })
        .then(queryResponse => {
          tridaSchopnosti.value = queryResponse.data
        })



    })

}

// Práce s atributy
function decrement(stat) {
  switch (stat) {
    case "sila":
      if (atributes.sila > 1) {
        atributes.sila--;
        volneAtributy++;
      }
      break

    case "houzevnatost":
      if (atributes.houzevnatost > 1) {
        atributes.houzevnatost--;
        volneAtributy++;
      }
      break;

    case "obratnost":
      if (atributes.obratnost > 1) {
        atributes.obratnost--;
        volneAtributy++;
      }
      break;

    case "charisma":
      if (atributes.charisma > 1) {
        atributes.charisma--;
        volneAtributy++;
      }
      break;

    case "inteligence":
      if (atributes.inteligence > 1) {
        atributes.inteligence--;
        volneAtributy++;
      }
      break;

    case "znalost":
      if (atributes.znalost > 1) {
        atributes.znalost--;
        volneAtributy++;
      }
      break;

    default:
      break;
  }

}

function increment(stat) {
  switch (stat) {
    case "sila":
      if (atributes.sila < 20 && volneAtributy > 0) {
        atributes.sila++;
        volneAtributy--;
      }
      break;

    case "houzevnatost":
      if (atributes.houzevnatost < 20 && volneAtributy > 0) {
        atributes.houzevnatost++;
        volneAtributy--;
      }
      break;

    case "obratnost":
      if (atributes.obratnost < 20 && volneAtributy > 0) {
        atributes.obratnost++;
        volneAtributy--;
      }
      break;

    case "charisma":
      if (atributes.charisma < 20 && volneAtributy > 0) {
        atributes.charisma++;
        volneAtributy--;
      }
      break;

    case "inteligence":
      if (atributes.inteligence < 20 && volneAtributy > 0) {
        atributes.inteligence++;
        volneAtributy--;
      }
      break;

    case "znalost":
      if (atributes.znalost < 20 && volneAtributy > 0) {
        atributes.znalost++;
        volneAtributy--;
      }
      break;
  }

}

function resetujAtributy() {
  atributes.sila = 8;
  atributes.houzevnatost = 8;
  atributes.obratnost = 8;
  atributes.charisma = 8;
  atributes.inteligence = 8;
  atributes.znalost = 8;
  volneAtributy = 10;
}
// /Práce s atributy

// Navigace v formuláři
function nextFormPage() {

  switch (step) {
    case 1:
      if (newAdventurer.name == null || newAdventurer.race == null || newAdventurer.class == null || newAdventurer.secondName == null) {

        alert1 = true;
      } else {
        alert1 = false;
        step++
      }
      break;

    case 2:
      if (newAdventurer.mainGear == null || newAdventurer.secondaryGear == null || newAdventurer.bonusGear == null) {

      } else {
        alert2 = false;
        step++
      }
      break;

    case 3:
      if (newAdventurer.aligment == null || newAdventurer.age == null) {

      } else {
        alert3 = false;
        step++;
      }
      break;
    default:
      break;
  }

}

function previousFormPage() {
  if (step >= 2) {
    step--
  }
}

function sendtoDB() {
  //Přidání atributů
  if (rasaVybrana.bonusoveAtributy.sila != null) {
    atributes.sila = atributes.sila + rasaVybrana.bonusoveAtributy.sila
  }
  if (rasaVybrana.bonusoveAtributy.houzevnatost != null) {
    atributes.houzevnatost = atributes.houzevnatost + rasaVybrana.bonusoveAtributy.houzevnatost
  }
  if (rasaVybrana.bonusoveAtributy.obratnost != null) {
    atributes.obratnost = atributes.obratnost + rasaVybrana.bonusoveAtributy.obratnost
  }
  if (rasaVybrana.bonusoveAtributy.charisma != null) {
    atributes.charisma = atributes.charisma + rasaVybrana.bonusoveAtributy.charisma
  }
  if (rasaVybrana.bonusoveAtributy.inteligence != null) {
    atributes.inteligence = atributes.inteligence + rasaVybrana.bonusoveAtributy.inteligence
  }
  if (rasaVybrana.bonusoveAtributy.znalost != null) {
    atributes.znalost = atributes.znalost + rasaVybrana.bonusoveAtributy.znalost
  }

  let obsah = ({
    "newAdventurer": newAdventurer,
    "owner": uzivatelStore._id,
    "atributes": atributes,
  })

  axios.post(axios.defaults.baseURL + '/character/characterCreation', obsah)
    .then(router.push({ path: '/' }))

}




</script>
  
<style></style>