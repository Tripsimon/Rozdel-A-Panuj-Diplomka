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
            <v-form ref="form1">
              <v-card-text>
                <h2 class="d-flex">Pilíře Dobrodruha</h2>
                <v-divider class="mb-3"></v-divider>

                <v-text-field color="secondary" variant="outlined" :rules="rules.required" label="Křestní jméno"
                  v-model="newAdventurer.name"></v-text-field>
                <v-text-field color="secondary" :rules="rules.required" variant="outlined" label="Příjmení"
                  v-model="newAdventurer.secondName"></v-text-field>
                <v-text-field color="secondary" variant="outlined" label="Přezdívka" v-model="newAdventurer.nickname"
                  :rules="rules.required"></v-text-field>
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
                  :items="rasaVybrana.dostupneTridy" :rules="rules.required" v-model="tridaVybrana" label="Povolání"
                  @update:modelValue="onClassSelect()"></v-select>

                <!-- Karta pro popis vybraného povolání-->
                <div v-if="tridaVybranaObjekt != null">
                  <h3>{{ tridaVybranaObjekt.jmeno }}</h3>
                  <v-card-subtitle class="mb-3">{{ tridaVybranaObjekt.popis }}</v-card-subtitle>

                  <h3>Bonusové schopnosti:</h3>
                  <v-divider class="mb-3" color="secondary"></v-divider>

                  <AbilityCard class="mb-3" v-for="ability in tridaSchopnosti" :key="ability._id" :ability="ability" />
                </div>

              </v-card-text>
            </v-form>
          </v-window-item>
          <!-- /Prvni krok-->

          <!-- Druhý krok-->
          <v-window-item :value="2">
            <v-form ref="form2">
              <v-card-text>
                <h2 class="d-flex">Atributy dobrodruha</h2>
                <v-divider class="mb-3"></v-divider>

                <v-banner lines="one" icon="mdi-arrow-up-bold" color="secondary" class="my-4">
                  <h3 class="d-flex justify-center">Volně dostupné atributy: {{ volneAtributy }}</h3>
                  <template v-slot:actions>
                    <v-btn variant="outlined" @click="resetujAtributy()">Navrátit</v-btn>
                  </template>
                </v-banner>

                <v-row cols="12">
                  <v-col col="4">
                    <AtributeCard name="Síla" :atribute="atributes.sila" @decrease="decrement('sila')"
                      @increase="increment('sila')" />
                  </v-col>
                  <v-col col="4">
                    <AtributeCard name="Houževnatost" :atribute="atributes.houzevnatost"
                      @decrease="decrement('houzevnatost')" @increase="increment('houzevnatost')" />
                  </v-col>
                  <v-col col="4">
                    <AtributeCard name="Obratnost" :atribute="atributes.obratnost" @decrease="decrement('obratnost')"
                      @increase="increment('obratnost')" />
                  </v-col>
                </v-row>

                <v-row cols="12">
                  <v-col col="4">
                    <AtributeCard name="Charisma" :atribute="atributes.charisma" @decrease="decrement('charisma')"
                      @increase="increment('charisma')" />
                  </v-col>
                  <v-col col="4">
                    <AtributeCard name="Inteligence" :atribute="atributes.inteligence"
                      @decrease="decrement('inteligence')" @increase="increment('inteligence')" />
                  </v-col>
                  <v-col col="4">
                    <AtributeCard name="Znalost" :atribute="atributes.znalost" @decrease="decrement('znalost')"
                      @increase="increment('znalost')" />
                  </v-col>
                </v-row>

                <h2 class="d-flex mt-3">Výbava</h2>
                <v-divider class="mb-3"></v-divider>

                <v-select color="secondary" variant="outlined" label="Hlavní výzbroj" v-model="newAdventurer.mainGear"
                  :rules="rules.required" :items="tridaVybava.hlavni" item-title="jmeno" return-object>
                </v-select>

                <v-select color="secondary" variant="outlined" label="Sekundární výzbroj" :items="tridaVybava.sekundarni"
                  :rules="rules.required" v-model="newAdventurer.secondaryGear" item-title="jmeno"
                  return-object></v-select>

                  <v-select color="secondary" variant="outlined" label="Zbroj" :items="tridaVybava.zbroj"
                  :rules="rules.required" v-model="newAdventurer.armor" item-title="jmeno"
                  return-object></v-select>

                <v-select color="secondary" variant="outlined" label="Bonusová výbava" :items="tridaVybava.bonusova"
                  :rules="rules.required" v-model="newAdventurer.bonusGear" item-title="jmeno" return-object></v-select>

              </v-card-text>
            </v-form>
          </v-window-item>
          <!-- /Druhý krok-->

          <!-- Třetí krok-->
          <v-window-item :value="3">
            <v-form ref="form3">
              <h2 class="d-flex">Povaha dobrodruha</h2>
              <v-divider class="mb-3"></v-divider>

              <v-select color="secondary" variant="outlined"
                :items="['Zákonné dobro', 'Neutrální dobro', 'Chaotické/zmatené dobro', 'Zákonně neutrální', 'Opravdu neutrální', 'Chaoticky neutrální', 'Zákonně zlý', 'Neutrálně zlý', 'Chaoticky zlý']"
                v-model="newAdventurer.aligment" label="Přesvědčení" :rules="rules.required"></v-select>
              <v-text-field color="secondary" type="number" variant="outlined" label="Věk" :rules="rules.required"
                v-model="newAdventurer.age"></v-text-field>
              <v-textarea color="secondary" variant="outlined" label="Popis" :rules="rules.required"
                v-model="newAdventurer.description"></v-textarea>

              <v-textarea color="secondary" variant="outlined" label="Příběh" v-model="newAdventurer.story"
                :rules="rules.required"></v-textarea>
            </v-form>
          </v-window-item>
          <!-- /Třetí krok-->

          <!-- Čtvrtý krok-->
          <v-window-item :value="4">

            <h2 class="d-flex">Shrnutí</h2>
            <v-divider class="mb-3"></v-divider>

            <v-card>
              <v-card-title>
                <h3>Základní informace</h3>
                <v-divider class="mb-3"></v-divider>
              </v-card-title>
              <v-card-text>
                <p>Jméno: {{ newAdventurer.name }} </p>
                <p v-if="newAdventurer.nickname != null">Přezdívka: "{{ newAdventurer.nickname }}"</p>
                <p> Příjmení: {{ newAdventurer.secondName }}</p>
              </v-card-text>
            </v-card>

            <v-card class="mt-5">
              <v-card-title>
                <h3>Atributy</h3>
                <v-divider class="mb-3"></v-divider>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <h4>Síla:{{ atributes.sila }}</h4>
                    <p v-if="rasaVybrana.bonusoveAtributy.sila">Bonus:{{ rasaVybrana.bonusoveAtributy.sila }}</p>
                  </v-col>
                  <v-col>
                    <h4>Houževnatost: {{ atributes.houzevnatost }}</h4>
                    <p v-if="rasaVybrana.bonusoveAtributy.houzevnatost">Bonus:
                      {{ rasaVybrana.bonusoveAtributy.houzevnatost }}</p>
                  </v-col>
                  <v-col>
                    <h4>Obratnost: {{ atributes.obratnost }}</h4>
                    <p v-if="rasaVybrana.bonusoveAtributy.obratnost">Bonus:
                      {{ rasaVybrana.bonusoveAtributy.obratnost }}</p>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <h4>Charisma: {{ atributes.charisma }}</h4>
                    <p v-if="rasaVybrana.bonusoveAtributy.charisma">Bonus:
                      {{ rasaVybrana.bonusoveAtributy.charisma }}</p>
                  </v-col>
                  <v-col>
                    <h4>Inteligence: {{ atributes.inteligence }}</h4>
                    <p v-if="rasaVybrana.bonusoveAtributy.inteligence">Bonus:
                      {{ rasaVybrana.bonusoveAtributy.inteligence }}</p>
                  </v-col>
                  <v-col>
                    <h4>Znalost: {{ atributes.znalost }}</h4>
                    <p v-if="rasaVybrana.bonusoveAtributy.znalost">Bonus:
                      {{ rasaVybrana.bonusoveAtributy.znalost }}</p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="mt-5">
              <v-card-title>
                <h3>Výbava</h3>
                <v-divider class="mb-3"></v-divider>
              </v-card-title>
              <v-card-text>
                <h4>Hlavní výbava: {{ newAdventurer.mainGear.jmeno }}</h4>
                <h4>Postranní výbava: {{ newAdventurer.secondaryGear.jmeno }}</h4>
                <p>Bonusová výbava: {{ newAdventurer.bonusGear.jmeno }}</p>
              </v-card-text>
            </v-card>
          </v-window-item>
          <!-- /Čtvrtý krok-->
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
import { useRouter } from 'vue-router'
import AbilityCard from '../parts/AbilityCard.vue'
import AtributeCard from '../parts/spravaParts/atributeBlockPart.vue'
import Alert from '../parts/AlertHandler.vue'
import axios from 'axios';
import { useUzivatelStore } from "../../stores/uzivatelStore.js"

//Systémové variables
const router = useRouter()

//Alert
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
const tridaSchopnosti = ref([])
const tridaVybava = ref({
  hlavni: [],
  sekundarni: [],
  zbroj: [],
  bonusova: [],
})

//Formulář
const step = ref(1)
const form1 = ref()
const form2 = ref()
const form3 = ref()
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

//Nový dobrodruh 
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

//atributy
const atributes = ref({
  'sila': 8,
  'houzevnatost': 8,
  'obratnost': 8,
  'charisma': 8,
  'inteligence': 8,
  'znalost': 8,
})
const volneAtributy = ref(10)

/**
 * Funkce po mountnutí komponenty
 */
onMounted(() => {
  if (!uzivatelStore.prihlasen) {
        router.push({path: '/'})
    }

  axios.get(axios.defaults.baseURL + '/rasy/dump')
    .then(responseQuery => {
      rasaMoznosti.value = responseQuery.data
    })
})

/**
 * Metoda pro vybrání nové rasy
 */
function onRaceSelect() {
  axios.get(axios.defaults.baseURL + '/schopnosti/getMultipleByID', { params: { abilities: rasaVybrana.value.schopnosti } })
    .then(queryResponse => {
      rasaSchopnosti.value = queryResponse.data
    })
  newAdventurer.value.race = rasaVybrana.value.jmeno
}

/**
 * Metoda pro bybrání nové rasy
 */
function onClassSelect() {
  newAdventurer.value.class = tridaVybrana

  axios.get(axios.defaults.baseURL + '/tridy/getByName', { params: { name: tridaVybrana.value } })
    .then(query => {
      tridaVybranaObjekt.value = query.data

      axios.get(axios.defaults.baseURL + '/vybava/multipleID', { params: { items: tridaVybranaObjekt.value.hlavniVybava } })
        .then(queryResponse => {
          tridaVybava.value.hlavni = queryResponse.data
        })

      axios.get(axios.defaults.baseURL + '/vybava/multipleID', { params: { items: tridaVybranaObjekt.value.krajniVybava } })
        .then(queryResponse => {
          tridaVybava.value.sekundarni = queryResponse.data
        })

      axios.get(axios.defaults.baseURL + '/vybava/multipleID', { params: { items: tridaVybranaObjekt.value.bonusovaVybava } })
        .then(queryResponse => {
          tridaVybava.value.bonusova = queryResponse.data
        })

        axios.get(axios.defaults.baseURL + '/vybava/multipleID', { params: { items: tridaVybranaObjekt.value.zbrojVybava } })
        .then(queryResponse => {
          tridaVybava.value.zbroj = queryResponse.data
        })
1
        
      axios.get(axios.defaults.baseURL + '/schopnosti/getByOwner', { params: { owner: tridaVybrana.value } })
        .then(queryResponse => {
          tridaSchopnosti.value = queryResponse.data
        })
    })
}

/**
 * Odebere atribut
 * @param {string} stat Jméno statistiky
 */
function decrement(stat) {
  switch (stat) {
    case "sila":
      if (atributes.value.sila > 1) {
        atributes.value.sila--;
        volneAtributy.value++;
      }
      break

    case "houzevnatost":
      if (atributes.value.houzevnatost > 1) {
        atributes.value.houzevnatost--;
        volneAtributy.value++;
      }
      break;

    case "obratnost":
      if (atributes.value.obratnost > 1) {
        atributes.value.obratnost--;
        volneAtributy.value++;
      }
      break;

    case "charisma":
      if (atributes.value.charisma > 1) {
        atributes.value.charisma--;
        volneAtributy.value++;
      }
      break;

    case "inteligence":
      if (atributes.value.inteligence > 1) {
        atributes.value.inteligence--;
        volneAtributy.value++;
      }
      break;

    case "znalost":
      if (atributes.value.znalost > 1) {
        atributes.value.znalost--;
        volneAtributy.value++;
      }
      break;

    default:
      break;
  }
}

/**
 * Přidá atribut
 * @param {string} stat Jméno atributu
 */
function increment(stat) {
  switch (stat) {
    case "sila":
      if (atributes.value.sila < 20 && volneAtributy.value > 0) {
        atributes.value.sila++;
        volneAtributy.value--;
      }
      break;

    case "houzevnatost":
      if (atributes.value.houzevnatost < 20 && volneAtributy.value > 0) {
        atributes.value.houzevnatost++;
        volneAtributy.value--;
      }
      break;

    case "obratnost":
      if (atributes.value.obratnost < 20 && volneAtributy.value > 0) {
        atributes.value.obratnost++;
        volneAtributy.value--;
      }
      break;

    case "charisma":
      if (atributes.value.charisma < 20 && volneAtributy.value > 0) {
        atributes.value.charisma++;
        volneAtributy.value--;
      }
      break;

    case "inteligence":
      if (atributes.value.inteligence < 20 && volneAtributy.value > 0) {
        atributes.value.inteligence++;
        volneAtributy.value--;
      }
      break;

    case "znalost":
      if (atributes.value.znalost < 20 && volneAtributy.value > 0) {
        atributes.value.znalost++;
        volneAtributy.value--;
      }
      break;
  }

}

/**
 * Resetuje výběr atributů
 */
function resetujAtributy() {
  atributes.value.sila = 8;
  atributes.value.houzevnatost = 8;
  atributes.value.obratnost = 8;
  atributes.value.charisma = 8;
  atributes.value.inteligence = 8;
  atributes.value.znalost = 8;
  volneAtributy.value = 10;
}

/**
 * Navigace v krocích formuláře
 */
function nextFormPage() {

  switch (step.value) {
    case 1:
      form1.value?.validate()
        .then(form => {
          if (form.valid) {
            step.value++;
          }
        })
      break;

    case 2:
      form2.value?.validate()
        .then(form => {
          if (form.valid) {
            step.value++;
          }
        })

      break;

    case 3:
      form3.value?.validate()
        .then(form => {
          if (form.valid) {
            step.value++;
          }
        })
      break;
    default:
      break;
  }
}

/**
 * Návrat v formuláři
 */
function previousFormPage() {
  if (step.value >= 2) {
    step.value--
  }
}

/**
 * Odešle nového dobrodruha do Databáze
 */
function sendtoDB() {
  if (rasaVybrana.value.bonusoveAtributy.sila != null) {
    atributes.value.sila = atributes.value.sila + rasaVybrana.value.bonusoveAtributy.sila
  }
  if (rasaVybrana.value.bonusoveAtributy.houzevnatost != null) {
    atributes.value.houzevnatost = atributes.value.houzevnatost + rasaVybrana.value.bonusoveAtributy.houzevnatost
  }
  if (rasaVybrana.value.bonusoveAtributy.obratnost != null) {
    atributes.value.obratnost = atributes.value.obratnost + rasaVybrana.value.bonusoveAtributy.obratnost
  }
  if (rasaVybrana.value.bonusoveAtributy.charisma != null) {
    atributes.value.charisma = atributes.value.charisma + rasaVybrana.value.bonusoveAtributy.charisma
  }
  if (rasaVybrana.value.bonusoveAtributy.inteligence != null) {
    atributes.value.inteligence = atributes.value.inteligence + rasaVybrana.value.bonusoveAtributy.inteligence
  }
  if (rasaVybrana.value.bonusoveAtributy.znalost != null) {
    atributes.value.znalost = atributes.value.znalost + rasaVybrana.value.bonusoveAtributy.znalost
  }

  let obsah = ({
    "newAdventurer": newAdventurer.value,
    "owner": uzivatelStore._id,
    "atributes": atributes.value,
  })

  console.log(obsah)
  
  axios.post(axios.defaults.baseURL + '/character/characterCreation', obsah)
    .then(router.push({ path: '/' }))
    
}
</script>