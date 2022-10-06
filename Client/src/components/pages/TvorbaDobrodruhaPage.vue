
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
    <v-btn-group>
      <v-btn> Jou</v-btn>
      <v-btn> Hou</v-btn>
    </v-btn-group>

    <h2>Atributy</h2>



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