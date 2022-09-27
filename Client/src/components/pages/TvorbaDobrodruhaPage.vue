
<template>

<v-container>
  <h1>Tvorba dobrodruha</h1>
  <v-divider></v-divider>

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >

    <v-text-field label="Jméno dobrodruha"></v-text-field>

    <v-select :items="races" label="Rasa"></v-select>
    </v-form>
  </v-container>
</template>

<script>
    export default {
        data: () => ({
          valid: true,
          races: ['Anhilarský člověk', 'Grobr',  'Hruurský člově', 'Ork', 'Inu-im'], //TODO: Backend
          checkbox: false,
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