
<template>

<v-container>
  <h1>Tvorba dobrodruha</h1>
  <v-divider></v-divider>

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
    <h2>Základní informace</h2>
    <v-text-field label="Jméno dobrodruha"></v-text-field>


    <v-select :items="races" label="Rasa"></v-select>
    <v-select :items="classes" label="Povolání"></v-select>
    <v-select :items="['LMAO','YeetA']" label="Přesvědčení"></v-select>
    <v-text-field label="Věk"></v-text-field>
    <v-btn-group>
      <v-btn> Jou</v-btn>
      <v-btn> Hou</v-btn>
    </v-btn-group>

    <h2>Atributy</h2>
    <v-text-field label="Síla"></v-text-field>
    <v-text-field label="Zručnost"></v-text-field>
    <v-text-field label="Výdrž"></v-text-field>
    <v-text-field label="Inteligence"></v-text-field>
    <v-text-field label="Vědění"></v-text-field>
    <v-text-field label="šarm"></v-text-field>

    <h2>Výbava //TODO</h2>

    <h2>Dodatečné informace</h2>
    <v-textarea
          name="input-7-1"
          label="Další schopnosti"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          hint="Hint text"
        ></v-textarea>

        <v-textarea
          name="input-7-1"
          label="Příběh"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          hint="Hint text"
        ></v-textarea>

    </v-form>
  </v-container>
</template>



<script>

    let penis = async() =>{
      let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/character/characterCreation/classes");

    xhr.send();

    xhr.onload = () => console.log(xhr.responseText);

      
    }

    penis();

    export default {
        data: () => ({
          valid: true,
          races: ['Anhilarský člověk', 'Grobr',  'Hruurský člověk', 'Ork', 'Inu-im'],  //TODO: Backend
          classes: ['Kolos','Harcovník','Hraničář','Lupič','Čaroděj','Vizír'],        //TODO: Backend
          checkbox: false,
          posts: []
        }),
    
        methods: {
          validate () {
            this.$refs.form.validate()
          },
          reset () {
            this.$refs.form.reset()
          },
          resetValidation () {
            this.$refs.form.resetValidation()
          },
        
        },
      }
</script>

<style>

</style>