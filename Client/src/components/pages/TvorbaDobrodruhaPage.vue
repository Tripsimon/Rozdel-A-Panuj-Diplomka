
<script setup>
import axios, { Axios } from 'axios';
import { inject } from 'vue'
import { useUzivatelStore } from "../../stores/uzivatelStore.js"

const gvClasses = inject('gvClasses')
const gvRaces = inject('gvRaces')

const uzivatelStore = useUzivatelStore();
</script>

<template>

  <v-container>
    <v-card class="pa-md-4" max-width="95%" color="primary">
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
      </v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-window v-model="step">

          <!-- Prvni krok-->
          <v-window-item :value="1">



            <v-alert v-model="alert1" closable title="Nevyplněné informace" text="PRosím, vyplnte požadované iformace"
              type="error" variant="tonal"></v-alert>

            <h2 class="d-flex justify-center">Pilíře Dobrodruha</h2>
            <v-text-field label="Křestní jméno" v-model="newAdventurer.name"></v-text-field>
            <v-text-field label="Příjmení" v-model="newAdventurer.secondName"></v-text-field>
            <v-text-field label="Přezdívka" v-model="newAdventurer.nickname"></v-text-field>

            <v-select label="Rasa" :items="gvRaces['names']" v-model="newAdventurer.race"
              @update:modelValue="onRaceSelect(gvClasses)"></v-select>

            <!-- Karta pro popis vybrané rasy -->
            <v-card class="mx-auto" v-if="newAdventurer.race != null" color="primary">
              <v-card-title>{{ gvRaces[newAdventurer.race]['name'] }}</v-card-title>
              <v-card-subtitle>{{ gvRaces[newAdventurer.race]['description'] }}</v-card-subtitle>
              <v-divider color="secondary"></v-divider>
              <v-card-text>
                <h3>Bonusové statistiky: </h3>
                <p v-if="gvRaces[newAdventurer.race]['bonusStats'].sila">Síla:
                  {{ gvRaces[newAdventurer.race]['bonusStats'].sila }}</p>
                <p v-if="gvRaces[newAdventurer.race]['bonusStats'].houzevnatost">Houževnatost:
                  {{ gvRaces[newAdventurer.race]['bonusStats'].houzevnatost }}</p>
                <p v-if="gvRaces[newAdventurer.race]['bonusStats'].obratnost">Obratnost:
                  {{ gvRaces[newAdventurer.race]['bonusStats'].obratnost }}</p>
                <p v-if="gvRaces[newAdventurer.race]['bonusStats'].charisma">Charisma:
                  {{ gvRaces[newAdventurer.race]['bonusStats'].charisma }}</p>
                <p v-if="gvRaces[newAdventurer.race]['bonusStats'].inteligence">Inteligence:
                  {{ gvRaces[newAdventurer.race]['bonusStats'].inteligence }}</p>
                <p v-if="gvRaces[newAdventurer.race]['bonusStats'].vedeni">Vědění: {{
                  gvRaces[newAdventurer.race]['bonusStats'].vedeni
                }}
                </p>

              </v-card-text>
              <v-divider color="secondary"></v-divider>
              <v-card-text>
                <h3>Bonusové schopnosti:</h3>
              </v-card-text>
              <v-card-text v-for="ability in raceAbilities">
                <h4>{{ ability.jmeno }}</h4>
                <p>{{ ability.popisFluff }}</p>
                <p>[{{ ability.popisSchopnosti }}]</p>
              </v-card-text>
            </v-card>
            <!-- Karta pro popis vybrané rasy -->


            <v-select v-if="newAdventurer.race != null" :items="gvRaces[newAdventurer.race]['avaliableClasses']"
              v-model="newAdventurer.class" label="Povolání"
              @update:modelValue="onClassSelect(gvClasses[newAdventurer.class]['mainGear'], gvClasses[newAdventurer.class]['secondaryGear'], gvClasses[newAdventurer.class]['bonusGear'])"></v-select>

            <!-- Karta pro popis vybraného povolání-->
            <v-card class="mx-auto" v-if="newAdventurer.class != null" border="" color="primary">
              <v-card-title>{{ gvClasses[newAdventurer.class]['name'] }}</v-card-title>
              <v-card-subtitle>{{ gvClasses[newAdventurer.class]['description'] }}</v-card-subtitle>
              <v-divider color="secondary"></v-divider>
              <v-card-text>
                <h3>Pasivní schopnost: </h3>
                <p>{{ gvClasses[newAdventurer.class]['passive'] }}</p>
              </v-card-text>
              <v-divider color="secondary"></v-divider>
              <v-card-text>
                <h3>Aktivní schopnost</h3>
                <p>{{ gvClasses[newAdventurer.class]['abilities'][0] }}</p>
              </v-card-text>
            </v-card>
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




            <h2 class="d-flex justify-center">Výbava</h2>

            <v-select label="Hlavní výzbroj" v-model="newAdventurer.mainGear" :items="this.classGear.mainGearNames">
            </v-select>

            <v-select label="Sekundární výzbroj" :items="this.classGear.secondaryGearNames"
              v-model="newAdventurer.secondaryGear"></v-select>

            <v-select label="Bonusová výbava" :items="this.classGear.bonusGearNames"
              v-model="newAdventurer.bonusGear"></v-select>



          </v-window-item>
          <!-- /Druhý krok-->

          <!-- Třetí krok-->
          <v-window-item :value="3">
            <h2>Role dobrodruha</h2>

            <v-select
              :items="['Zákonné dobro', 'Neutrální dobro', 'Chaotické/zmatené dobro', 'Zákonně neutrální', 'Opravdu neutrální', 'Chaoticky neutrální', 'Zákonně zlý', 'Neutrálně zlý', 'Chaoticky zlý']"
              v-model="newAdventurer.aligment" label="Přesvědčení"></v-select>
            <v-text-field label="Věk"></v-text-field>
            <v-textarea label="Popis" value="Nezjištěno"></v-textarea>

            <v-textarea label="Příběh" value="Nezjištěno"></v-textarea>
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
                  <p v-if="gvRaces[newAdventurer.race]['bonusStats'].sila">Bonus:
                    {{ gvRaces[newAdventurer.race]['bonusStats'].sila }}</p>

                  <h4>Houževnatost:</h4>
                  <p>{{ this.atributes.houzevnatost }} </p>
                  <p v-if="gvRaces[newAdventurer.race]['bonusStats'].houzevnatost">Bonus:
                    {{ gvRaces[newAdventurer.race]['bonusStats'].houzevnatost }}</p>

                  <h4>Obratnost:</h4>
                  <p>{{ this.atributes.obratnost }} </p>
                  <p v-if="gvRaces[newAdventurer.race]['bonusStats'].obratnost">Bonus:
                    {{ gvRaces[newAdventurer.race]['bonusStats'].obratnost }}</p>

                  <h4>Charisma:</h4>
                  <p>{{ this.atributes.charisma }} </p>
                  <p v-if="gvRaces[newAdventurer.race]['bonusStats'].charisma">Bonus:
                    {{ gvRaces[newAdventurer.race]['bonusStats'].charisma }}</p>

                  <h4>Inteligence:</h4>
                  <p>{{ this.atributes.inteligence }} </p>
                  <p v-if="gvRaces[newAdventurer.race]['bonusStats'].inteligence">Bonus:
                    {{ gvRaces[newAdventurer.race]['bonusStats'].inteligence }}</p>

                  <h4>Znalost:</h4>
                  <p>{{ this.atributes.znalost }} </p>
                  <p v-if="gvRaces[newAdventurer.race]['bonusStats'].znalost">Bonus:
                    {{ gvRaces[newAdventurer.race]['bonusStats'].znalost }}</p>

                </template>
              </v-card>

              <v-card title="Výbava" color="success" class="mt-5" text="...">
                <template v-slot:text>
                  <h4>Hlavní výbava: {{ newAdventurer.mainGear }}</h4>
                  <h4>sekundární výbava: {{ newAdventurer.secondaryGear }}</h4>
                  <p>Bonusová výbava: {{ newAdventurer.bonusGear }}</p>
                </template>
              </v-card>
            </v-container>


          </v-window-item>

        </v-window>
      </v-form>
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
</template>
  
  
<script>
export default {
  data: () => ({

    raceAbilities: [],
    classAbilities: [],
    classGear: {
      mainGear: [],
      mainGearNames: [],
      secondaryGear: [],
      secondaryGearNames: [],
      bonusGear: [],
      bonusGearNames: [],
    },

    step: 1,
    alert1: false,
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
  methods: {

    onRaceSelect() {
      axios.get('http://localhost:3000/schopnosti/byOwner', { params: { owner: "AAA" } })
        .then(queryResponse => this.raceAbilities = queryResponse.data)
    },

    onClassSelect(main, secondary, bonus) {

      axios.get('http://localhost:3000/vybava/multipleID', { params: { maingear: main } })
        .then(queryResponse => {
          queryResponse.data.forEach(item => {
            this.classGear.mainGearNames.push(item.jmeno)
            this.classGear.mainGear.push(item._id)
          });
        })

      axios.get('http://localhost:3000/vybava/multipleID', { params: { maingear: secondary } })
        .then(queryResponse => {
          queryResponse.data.forEach(item => {
            this.classGear.secondaryGearNames.push(item.jmeno)
            this.classGear.secondaryGear.push(item._id)
          });
        })


      axios.get('http://localhost:3000/vybava/multipleID', { params: { maingear: bonus } })
        .then(queryResponse => {
          queryResponse.data.forEach(item => {
            this.classGear.bonusGearNames.push(item.jmeno)
            this.classGear.bonusGear.push(item._id)
          });
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
          if (this.newAdventurer.name == null || this.newAdventurer.class == null || this.newAdventurer.race == null || this.newAdventurer.secondName == null) {
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
          if (this.newAdventurer.aligment == null) {

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
      console.log('Ukladam dobrodruha')

      this.newAdventurer.mainGear = this.classGear.mainGear[this.classGear.mainGearNames.indexOf(this.newAdventurer.mainGear)]
      this.newAdventurer.secondaryGear = this.classGear.secondaryGear[this.classGear.secondaryGearNames.indexOf(this.newAdventurer.secondaryGear)]
      this.newAdventurer.bonusGear = this.classGear.bonusGear[this.classGear.bonusGearNames.indexOf(this.newAdventurer.bonusGear)]
      let obsah = ({
        "newAdventurer": this.newAdventurer,
        "owner": this.uzivatelStore._id,
        "atributes": this.atributes,
        "bonusAtributes": this.gvRaces[this.newAdventurer.race]['bonusStats']
      })


      axios.post("http://localhost:3000/character/characterCreation",obsah)
        .then(this.$router.push({path: '/'}))
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
  
<style>

</style>