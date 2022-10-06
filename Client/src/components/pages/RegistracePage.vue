
<template>

<h1>Registrace</h1>

</template>
    
    
    
    <script>
    
    
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