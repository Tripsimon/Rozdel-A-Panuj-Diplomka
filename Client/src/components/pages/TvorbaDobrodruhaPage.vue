
<template>

  <v-container>
    <h1>Tvorba dobrodruha</h1>
    <v-divider></v-divider>

    <v-form ref="form" v-model="valid" lazy-validation>
      <h2>Základní informace</h2>
      <v-text-field label="Jméno dobrodruha"></v-text-field>


      <v-select :items="races" label="Rasa"></v-select>
      <v-select :items="classes" label="Povolání"></v-select>
      <v-select :items="['LMAO', 'YeetA']" label="Přesvědčení"></v-select>
      <v-text-field label="Věk"></v-text-field>

      <h2>Atributy</h2>
      <v-row>
        <v-col ols="12" sm="6">
          <v-card title="Síla">
            <v-container class="grey lighten-5" color="primary">
              <v-row>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="small" variant="text" icon="mdi-minus" :color="color" @click="decrement"></v-btn>
                </v-col>
                <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                    class="text-h2 font-weight-light mb-4" v-text="atributy"></span></v-col>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="small " variant="text" icon="mdi-minus" :color="color" @click="decrement"></v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>

        <v-col ols="12" sm="6">
          <v-card title="Síla" color="secondary">
            <v-container class="grey lighten-5" >
              <v-row>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="small" variant="text" icon="mdi-minus" :color="color" @click="decrement"></v-btn>
                </v-col>
                <v-col align="center" justify="center" cols="12" sm="4"><span mb="4"
                    class="text-h2 font-weight-light mb-4" v-text="atributy"></span></v-col>
                <v-col align="center" justify="center" cols="12" sm="4">
                  <v-btn mb="4" size="small " variant="text" icon="mdi-minus" :color="color" @click="decrement"></v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>



      <v-text-field label="Síla"></v-text-field>
      <v-text-field label="Zručnost"></v-text-field>
      <v-text-field label="Výdrž"></v-text-field>
      <v-text-field label="Inteligence"></v-text-field>
      <v-text-field label="Vědění"></v-text-field>
      <v-text-field label="šarm"></v-text-field>

      <h2>Výbava //TODO</h2>

      <h2>Dodatečné informace</h2>
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
    races: ['Anhilarský člověk', 'Grobr', 'Hruurský člověk', 'Ork', 'Inu-im'],
    classes: ['Kolos', 'Harcovník', 'Hraničář', 'Lupič', 'Čaroděj', 'Vizír'],
    atributy: 10

  }),

  methods: {
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