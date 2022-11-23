
<script setup>
import {inject} from 'vue'
const gvClasses = inject('gvClasses')
const gvRaces = inject('gvRaces')
console.log(gvRaces);
</script>

<template>
  <v-container>
    <h1>Tvorba dobrodruha</h1>
    <v-divider color="secondary"></v-divider>

    <v-form ref="form" v-model="valid" lazy-validation >
      <h2>Pilíře Dobrodruha</h2>
      <v-text-field label="Jméno dobrodruha"></v-text-field>
      <v-select label="Rasa" :items="gvRaces['names']" v-model="chosenRace" ></v-select>


      <!-- Karta pro popis vybrané třídy -->
      <v-card
        class="mx-auto"
        v-if="chosenRace != null"
        color="primary"
      >
      <v-card-title>{{gvRaces[chosenRace]['name']}}</v-card-title>
      <v-card-subtitle>{{gvRaces[chosenRace]['description']}}</v-card-subtitle>
      <v-divider color="secondary"></v-divider >
        <v-card-text>
          <h3>Bonusové statistiky:</h3>
          {{gvRaces[chosenRace]['bonusStats']}} 
        </v-card-text>
        <v-divider color="secondary"></v-divider >
        <v-card-text>
          <h3>Bonusové schopnosti:</h3>
        </v-card-text>
        <v-card-text v-for="ability in gvRaces[chosenRace]['bonusAbilities']">
            {{ability['name']}}
        </v-card-text>
      </v-card>
      <!-- Karta pro popis vybrané třídy -->


      <v-select :items="gvClasses['names']" label="Povolání"></v-select>


      <h2>Atributy dobrodruha</h2>




  <v-banner
      lines="one"
      icon="mdi-lock"
      color="deep-purple-accent-4"
      class="my-4"
    >
      <v-banner-text>
        Volně dostupné atributy: {{this.volneAtributy}}
      </v-banner-text>

      <template v-slot:actions>
        <v-btn>Navrátit</v-btn>
      </template>
    </v-banner>

      <v-row disabled>
        <v-col ols="12" sm="6">
          <v-card title="Síla" align="center" color="primary">
            <v-divider color="secondary"></v-divider>
            <v-container class="grey lighten-5">
              <v-row>
                <v-col cols="12" sm="4">
                  <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" color="secondary" @click="decrement('sila')">
                  </v-btn>
                </v-col>
                <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                    class="text-h2 font-weight-light mb-4" v-text="atributy.sila"></span></v-col>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" color="secondary" @click="increment('sila')">
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
                  <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" color="secondary" @click="decrement('houzevnatost')"></v-btn>
                </v-col>
                <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                    class="text-h2 font-weight-light mb-4" v-text="atributy.houzevnatost"></span></v-col>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" color="secondary" @click="increment('houzevnatost')"></v-btn>
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
                  <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" color="secondary" @click="decrement"></v-btn>
                </v-col>
                <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                    class="text-h2 font-weight-light mb-4" v-text="atributy.obratnost"></span></v-col>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" color="secondary" @click="increment('obratnost')"></v-btn>
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
                  <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" color="secondary" @click="decrement"></v-btn>
                </v-col>
                <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                    class="text-h2 font-weight-light mb-4" v-text="atributy.charisma"></span></v-col>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" color="secondary" @click="increment('charisma')"></v-btn>
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
                  <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" color="secondary" @click="decrement"></v-btn>
                </v-col>
                <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                    class="text-h2 font-weight-light mb-4" v-text="atributy.inteligence"></span></v-col>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" color="secondary" @click="increment('inteligence')"></v-btn>
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
                  <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" color="secondary" @click="decrement"></v-btn>
                </v-col>
                <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                    class="text-h2 font-weight-light mb-4" v-text="atributy.znalost"></span></v-col>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" color="secondary" @click="increment('znalost')"></v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>




      <h2>Výbava</h2>
      //TODO
      <h2>Role dobrodruha</h2>

      <v-select :items="['LMAO', 'YeetA']" label="Přesvědčení"></v-select>
      <v-text-field label="Věk"></v-text-field>
      <v-textarea name="input-7-1" label="Další schopnosti"
        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        hint="Hint text"></v-textarea>

      <v-textarea name="input-7-1" label="Příběh"
        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        hint="Hint text"></v-textarea>

    </v-form>
  </v-container>
</template>
  
  
<script>
export default {
  data: () => ({
    valid: true,
    atributy: {
      'sila': 8,
      'houzevnatost': 8,
      'obratnost': 8,
      'charisma': 8,
      'inteligence': 8,
      'znalost': 8,

    },
    volneAtributy: 10,
    chosenRace: null,
  }),
  methods: {

    decrement(stat) {
      switch (stat) {
        case "sila":
          if (this.atributy.sila > 1) {
            this.atributy.sila--;
            this.volneAtributy++;
          }
          case "houzevnatost":
          if (this.atributy.houzevnatost > 1) {
            this.atributy.houzevnatost--;
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
          this.atributy.sila++;
          this.volneAtributy--;
          break;

        case "houzevnatost":
          this.atributy.sila++;
          break;

        default:
          break;
      }

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