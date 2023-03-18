
<script setup>
import axios, { Axios } from 'axios';
import { inject } from 'vue'
import { useUzivatelStore } from "../../stores/uzivatelStore.js"




</script>

<template>
  <div id="content">
    <Alert type="error" :title="alertTitle" :text="alertText" v-model="showAlert" />
    <v-container>
      <v-card class="pa-md-4" max-width="95%" color="primary">
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
        </v-card-title>
          <v-window v-model="step">
            <!-- Prvni krok-->
            <v-window-item :value="1">
              <v-form ref="form" v-model="validOne" quick-validation>
                <h2 class="d-flex justify-center">Pilíře Dobrodruha</h2>
                <v-text-field color="secondary" variant="outlined" :rules="this.rules.required"  label="Křestní jméno"
                  v-model="newAdventurer.name"></v-text-field>
                <v-text-field color="secondary" :rules="this.rules.required" variant="outlined" label="Příjmení"
                  v-model="newAdventurer.secondName"></v-text-field>
                <v-text-field color="secondary" variant="outlined" label="Přezdívka"
                  v-model="newAdventurer.nickname"></v-text-field>
                <v-select color="secondary" :rules="this.rules.required" variant="outlined" label="Rasa" :items="rasaMoznosti" item-title="jmeno"
                  return-object v-model="rasaVybrana" @update:modelValue="onRaceSelect"></v-select>

                <!-- Karta pro popis vybrané rasy -->
                <v-card class="mx-auto" v-if="newAdventurer.race != null" color="primary">
                  <v-card-title>{{ rasaVybrana.jmeno }}</v-card-title>
                  <v-card-subtitle>{{ rasaVybrana.popis }}</v-card-subtitle>
                  <v-divider color="secondary"></v-divider>
                  <v-card-text>
                    <h3>Bonusové statistiky: </h3>
                    <p v-if="rasaVybrana.bonusoveAtributy.sila">
                      Síla: {{ rasaVybrana.bonusoveAtributy.sila }}
                    </p>

                    <p v-if="rasaVybrana.bonusoveAtributy.houzevnatost">
                      Houževnatost: {{ rasaVybrana.bonusoveAtributy.houzevnatost }}
                    </p>

                    <p v-if="rasaVybrana.bonusoveAtributy.obratnost">
                      Obratnost: {{ rasaVybrana.bonusoveAtributy.obratnost }}
                    </p>

                    <p v-if="rasaVybrana.bonusoveAtributy.charisma">
                      Charisma: {{ rasaVybrana.bonusoveAtributy.charisma }}
                    </p>

                    <p v-if="rasaVybrana.bonusoveAtributy.inteligence">
                      Inteligence: {{ rasaVybrana.bonusoveAtributy.inteligence }}
                    </p>

                    <p v-if="rasaVybrana.bonusoveAtributy.znalost">
                      Znalost: {{ rasaVybrana.bonusoveAtributy.znalost }}
                    </p>

                  </v-card-text>
                  <v-divider color="secondary"></v-divider>
                  <v-card-text>
                    <h3>Bonusové schopnosti:</h3>
                  </v-card-text>
                  <v-card-text v-for="ability in this.rasaSchopnosti">
                    <h4>{{ ability.jmeno }}</h4>
                    <p>{{ ability.popisFluff }}</p>
                    <p>[{{ ability.popisSchopnosti }}]</p>
                  </v-card-text>
                </v-card>
                <!-- Karta pro popis vybrané rasy -->


                <v-select color="secondary" variant="outlined" v-if="newAdventurer.race != null" :items="this.rasaVybrana.dostupneTridy" v-model="tridaVybrana"
                  label="Povolání" @update:modelValue="onClassSelect()"></v-select>

                <!-- Karta pro popis vybraného povolání-->
                <v-card class="mx-auto" v-if="this.tridaVybranaObjekt != null" color="primary">
                  <v-card-title>{{ this.tridaVybranaObjekt.jmeno }}</v-card-title>
                  <v-card-subtitle>{{ this.tridaVybranaObjekt.popis }}</v-card-subtitle>

                  <ul>
                    <li v-if="this.tridaSchopnosti != null" v-for="ability in this.tridaSchopnosti">
                      <AbilityCard :ability="ability" color="primary" />
                    </li>
                  </ul>

                </v-card>
              </v-form>
              <!-- Karta pro popis vybraného povolání-->
            </v-window-item>
            <!-- /Prvni krok-->

            <!-- Druhý krok-->
            <v-window-item :value="2">
              <v-alert v-model="alert1" closable title="Nevyplněné informace" text="PRosím, vyplnte požadované iformace"
                type="error" variant="tonal"></v-alert>

              <h2 class="d-flex justify-center">Atributy dobrodruha</h2>
              <v-banner lines="one" icon="mdi-arrow-up-bold" color="deep-purple-accent-4" class="my-4">

                <h3 class="d-flex justify-center">Volně dostupné atributy: {{ this.volneAtributy }}</h3>

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

              <v-select color="secondary" variant="outlined" label="Hlavní výzbroj" v-model="newAdventurer.mainGear" :items="this.tridaVybava.hlavni"
                item-title="jmeno" return-object>
              </v-select>

              <v-select color="secondary" variant="outlined" label="Sekundární výzbroj" :items="this.tridaVybava.sekundarni"
                v-model="newAdventurer.secondaryGear" item-title="jmeno" return-object></v-select>

              <v-select color="secondary" variant="outlined" label="Bonusová výbava" :items="this.tridaVybava.bonusova" v-model="newAdventurer.bonusGear"
                item-title="jmeno" return-object></v-select>



            </v-window-item>
            <!-- /Druhý krok-->

            <!-- Třetí krok-->
            <v-window-item :value="3">
              <h2>Role dobrodruha</h2>

              <v-select color="secondary" variant="outlined"
                :items="['Zákonné dobro', 'Neutrální dobro', 'Chaotické/zmatené dobro', 'Zákonně neutrální', 'Opravdu neutrální', 'Chaoticky neutrální', 'Zákonně zlý', 'Neutrálně zlý', 'Chaoticky zlý']"
                v-model="newAdventurer.aligment" label="Přesvědčení"></v-select>
              <v-text-field  color="secondary" variant="outlined" label="Věk" v-model="this.newAdventurer.age"></v-text-field>
              <v-textarea color="secondary" variant="outlined" label="Popis" v-model="this.newAdventurer.description"></v-textarea>

              <v-textarea color="secondary" variant="outlined" label="Příběh" v-model="this.newAdventurer.story"></v-textarea>
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
                    <p>{{ this.atributes.sila }} </p>
                    <p v-if="rasaVybrana.bonusoveAtributy.sila">Bonus:
                      {{ rasaVybrana.bonusoveAtributy.sila }}</p>

                    <h4>Houževnatost:</h4>
                    <p>{{ this.atributes.houzevnatost }} </p>
                    <p v-if="rasaVybrana.bonusoveAtributy.houzevnatost">Bonus:
                      {{ rasaVybrana.bonusoveAtributy.houzevnatost }}</p>

                    <h4>Obratnost:</h4>
                    <p>{{ this.atributes.obratnost }} </p>
                    <p v-if="rasaVybrana.bonusoveAtributy.obratnost">Bonus:
                      {{ rasaVybrana.bonusoveAtributy.obratnost }}</p>

                    <h4>Charisma:</h4>
                    <p>{{ this.atributes.charisma }} </p>
                    <p v-if="rasaVybrana.bonusoveAtributy.charisma">Bonus:
                      {{ rasaVybrana.bonusoveAtributy.charisma }}</p>

                    <h4>Inteligence:</h4>
                    <p>{{ this.atributes.inteligence }} </p>
                    <p v-if="rasaVybrana.bonusoveAtributy.inteligence">Bonus:
                      {{ rasaVybrana.bonusoveAtributy.inteligence }}</p>

                    <h4>Znalost:</h4>
                    <p>{{ this.atributes.znalost }} </p>
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
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn v-if="step > 1" variant="text" @click="previousFormPage()">
            Zpět
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step == 1" color="primary" variant="flat" @click="nextFormPage()">
            Schopnosti a vybavení
          </v-btn>
          <v-btn v-if="step == 2" color="primary" variant="flat" @click="nextFormPage()">
            Role a příběh
          </v-btn>

          <v-btn v-if="step == 3" color="primary" variant="flat" @click="nextFormPage()">
            Shrnutí
          </v-btn>

          <v-btn v-if="step == 4" color="primary" variant="flat" @click="sendtoDB()">
            Uložit dobrodruha
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>
  
  
<script>

import AbilityCard from '../parts/AbilityCard.vue'
import Alert from '../parts/AlertHandler.vue'

export default {
  components: {
    Alert
  },

  data: () => ({
    //Systémové variables
    showAlert: false,
    alertTitle: "",
    alertText: "",
    uzivatelStore: useUzivatelStore(),

    //Rasa
    rasaMoznosti: [],
    rasaVybrana: null,
    rasaSchopnosti: [],

    //Třída
    tridaVybrana: null,
    tridaVybranaObjekt: null,
    tridaVybava: {
      hlavni: [],
      sekundarni: [],
      bonusova: [],
    },
    tridaPasivniSchopnost: null,
    tridaSchopnosti: [],

    validOne:false,
    rules:{
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
    },
    step: 1,
    alert2: false,
    alert3: false,
    newAdventurer: {
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
    },
    atributes: {
      'sila': 8,
      'houzevnatost': 8,
      'obratnost': 8,
      'charisma': 8,
      'inteligence': 8,
      'znalost': 8,
    },
    volneAtributy: 10,


  }),

  components: {
    AbilityCard
  },

  mounted() {
    axios.get(axios.defaults.baseURL+'/rasy/dump')
      .then(responseQuery => {
        this.rasaMoznosti = responseQuery.data
      })
  },

  methods: {

    onRaceSelect() {
      axios.get(axios.defaults.baseURL+'/schopnosti/getMultipleByID', { params: { abilities: this.rasaVybrana.schopnosti } })
        .then(queryResponse => this.rasaSchopnosti = queryResponse.data)
      this.newAdventurer.race = this.rasaVybrana.jmeno

    },

    onClassSelect() {
      this.newAdventurer.class = this.tridaVybrana


      axios.get(axios.defaults.baseURL+'/tridy/getByName', { params: { name: this.tridaVybrana } })
        .then(query => {
          this.tridaVybranaObjekt = query.data

          axios.get(axios.defaults.baseURL+'/vybava/multipleID', { params: { items: this.tridaVybranaObjekt.hlavniVybava } })
            .then(queryResponse => {
              this.tridaVybava.hlavni = queryResponse.data
            })

          axios.get(axios.defaults.baseURL+'/vybava/multipleID', { params: { items: this.tridaVybranaObjekt.krajniVybava } })
            .then(queryResponse => {
              this.tridaVybava.sekundarni = queryResponse.data
            })


          axios.get(axios.defaults.baseURL+'/vybava/multipleID', { params: { items: this.tridaVybranaObjekt.bonusovaVybava } })
            .then(queryResponse => {
              this.tridaVybava.bonusova = queryResponse.data
            })



          axios.get(axios.defaults.baseURL+'/schopnosti/getByOwner', { params: { owner: this.tridaVybrana } })
            .then(queryResponse => {
              this.tridaSchopnosti = queryResponse.data
            })



        })

    },

    // Práce s atributy
    decrement(stat) {
      switch (stat) {
        case "sila":
          if (this.atributes.sila > 1) {
            this.atributes.sila--;
            this.volneAtributy++;
          }
          break

        case "houzevnatost":
          if (this.atributes.houzevnatost > 1) {
            this.atributes.houzevnatost--;
            this.volneAtributy++;
          }
          break;

        case "obratnost":
          if (this.atributes.obratnost > 1) {
            this.atributes.obratnost--;
            this.volneAtributy++;
          }
          break;

        case "charisma":
          if (this.atributes.charisma > 1) {
            this.atributes.charisma--;
            this.volneAtributy++;
          }
          break;

        case "inteligence":
          if (this.atributes.inteligence > 1) {
            this.atributes.inteligence--;
            this.volneAtributy++;
          }
          break;

        case "znalost":
          if (this.atributes.znalost > 1) {
            this.atributes.znalost--;
            this.volneAtributy++;
          }
          break;

        default:
          break;
      }

    },

    increment(stat) {
      switch (stat) {
        case "sila":
          if (this.atributes.sila < 20 && this.volneAtributy > 0) {
            this.atributes.sila++;
            this.volneAtributy--;
          }
          break;

        case "houzevnatost":
          if (this.atributes.houzevnatost < 20 && this.volneAtributy > 0) {
            this.atributes.houzevnatost++;
            this.volneAtributy--;
          }
          break;

        case "obratnost":
          if (this.atributes.obratnost < 20 && this.volneAtributy > 0) {
            this.atributes.obratnost++;
            this.volneAtributy--;
          }
          break;

        case "charisma":
          if (this.atributes.charisma < 20 && this.volneAtributy > 0) {
            this.atributes.charisma++;
            this.volneAtributy--;
          }
          break;

        case "inteligence":
          if (this.atributes.inteligence < 20 && this.volneAtributy > 0) {
            this.atributes.inteligence++;
            this.volneAtributy--;
          }
          break;

        case "znalost":
          if (this.atributes.znalost < 20 && this.volneAtributy > 0) {
            this.atributes.znalost++;
            this.volneAtributy--;
          }
          break;
      }

    },

    resetujAtributy() {
      this.atributes.sila = 8;
      this.atributes.houzevnatost = 8;
      this.atributes.obratnost = 8;
      this.atributes.charisma = 8;
      this.atributes.inteligence = 8;
      this.atributes.znalost = 8;

      this.volneAtributy = 10;
    },
    // /Práce s atributy

    // Navigace v formuláři
    nextFormPage() {

      switch (this.step) {
        case 1:
          if (this.newAdventurer.name == null || this.newAdventurer.race == null || this.newAdventurer.class == null || this.newAdventurer.secondName == null) {

            this.alert1 = true;
          } else {
            this.alert1 = false;
            this.step++
          }
          break;

        case 2:
          if (this.newAdventurer.mainGear == null || this.newAdventurer.secondaryGear == null || this.newAdventurer.bonusGear == null) {

          } else {
            this.alert2 = false;
            this.step++
          }
          break;

        case 3:
          if (this.newAdventurer.aligment == null || this.newAdventurer.age == null) {

          } else {
            this.alert3 = false;
            this.step++;
          }
          break;
        default:
          break;
      }

    },

    previousFormPage() {
      if (this.step >= 2) {
        this.step--
      }
    },

    sendtoDB() {
      //Přidání atributů
      if (this.rasaVybrana.bonusoveAtributy.sila != null) {
        this.atributes.sila = this.atributes.sila + this.rasaVybrana.bonusoveAtributy.sila
      }
      if (this.rasaVybrana.bonusoveAtributy.houzevnatost != null) {
        this.atributes.houzevnatost = this.atributes.houzevnatost + this.rasaVybrana.bonusoveAtributy.houzevnatost
      }
      if (this.rasaVybrana.bonusoveAtributy.obratnost != null) {
        this.atributes.obratnost = this.atributes.obratnost + this.rasaVybrana.bonusoveAtributy.obratnost
      }
      if (this.rasaVybrana.bonusoveAtributy.charisma != null) {
        this.atributes.charisma = this.atributes.charisma + this.rasaVybrana.bonusoveAtributy.charisma
      }
      if (this.rasaVybrana.bonusoveAtributy.inteligence != null) {
        this.atributes.inteligence = this.atributes.inteligence + this.rasaVybrana.bonusoveAtributy.inteligence
      }
      if (this.rasaVybrana.bonusoveAtributy.znalost != null) {
        this.atributes.znalost = this.atributes.znalost + this.rasaVybrana.bonusoveAtributy.znalost
      }

      let obsah = ({
        "newAdventurer": this.newAdventurer,
        "owner": this.uzivatelStore._id,
        "atributes": this.atributes,
      })

      axios.post(axios.defaults.baseURL+'/character/characterCreation', obsah)
        .then(this.$router.push({ path: '/' }))

    },

    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },

  },
}
</script>
  
<style></style>