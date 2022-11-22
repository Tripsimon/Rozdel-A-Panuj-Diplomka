
<script setup>
import {inject} from 'vue'
const gvClasses = inject('gvClasses')
const gvRaces = inject('gvRaces')
console.log(gvClasses);
</script>

<template>
  <v-container>
    <h1>Tvorba dobrodruha</h1>
    <v-divider color="secondary"></v-divider>

    <v-form ref="form" v-model="valid" lazy-validation >
      <h2>Pilíře Dobrodruha</h2>
      <v-text-field label="Jméno dobrodruha"></v-text-field>
      <v-select label="Rasa" :items="gvRaces" v-model="chosenRace" ></v-select>
      <v-card
        class="mx-auto"
        v-if="chosenRace != null"
      >
      
      <v-card-title>Card title</v-card-title>
        <v-card-text>
          Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.
          In turpis. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut varius tincidunt libero.
        </v-card-text>
      </v-card>

      <v-select :items="gvClasses['names']" label="Povolání"></v-select>


      <h2>Atributy dobrodruha</h2>


      <v-banner
  color="secondary"
  outlined
  rounded
  single-line
  sticky
> Volně dostupnéatributy: {{this.volneAtributy}}</v-banner>


      <v-row disabled>
        <v-col ols="12" sm="6">
          <v-card title="Síla" align="center" color="primary">
            <v-divider color="secondary"></v-divider>
            <v-container class="grey lighten-5">
              <v-row>
                <v-col cols="12" sm="4">
                  <v-btn mb="4" color="secondary" size="medium" variant="text" icon="mdi-minus" :color="color" @click="decrement('sila')">
                  </v-btn>
                </v-col>
                <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                    class="text-h2 font-weight-light mb-4" v-text="atributy.sila"></span></v-col>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" :color="color" @click="increment('sila')">
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
                  <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" :color="color" @click="decrement"></v-btn>
                </v-col>
                <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                    class="text-h2 font-weight-light mb-4" v-text="atributy.houzevnatost"></span></v-col>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" :color="color" @click="decrement"></v-btn>
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
                  <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" :color="color" @click="decrement"></v-btn>
                </v-col>
                <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                    class="text-h2 font-weight-light mb-4" v-text="atributy.obratnost"></span></v-col>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" :color="color" @click="decrement"></v-btn>
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
                  <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" :color="color" @click="decrement"></v-btn>
                </v-col>
                <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                    class="text-h2 font-weight-light mb-4" v-text="atributy.charisma"></span></v-col>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" :color="color" @click="decrement"></v-btn>
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
                  <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" :color="color" @click="decrement"></v-btn>
                </v-col>
                <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                    class="text-h2 font-weight-light mb-4" v-text="atributy.inteligence"></span></v-col>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" :color="color" @click="decrement"></v-btn>
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
                  <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" :color="color" @click="decrement"></v-btn>
                </v-col>
                <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                    class="text-h2 font-weight-light mb-4" v-text="atributy.vedeni"></span></v-col>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" :color="color" @click="decrement"></v-btn>
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