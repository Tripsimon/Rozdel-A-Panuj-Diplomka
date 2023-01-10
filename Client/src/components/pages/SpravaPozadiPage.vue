

<script setup>
import axios from 'axios'
import FormData from 'form-data'
</script>
<template>


  <v-container>
    <v-card color="primary">
      <h1 class="d-flex justify-center">Import pozadí</h1>
      <v-card-text>
        <v-file-input v-model="inputFile" accept="image/*" label="File input"></v-file-input>
        <v-text-field v-model="inputFileName" :counter="20" label="Jméno souboru" required></v-text-field>
        <v-card-actions>
          <v-btn @click="uploadImage">
            Nahrát
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>

    <v-card color="primary" class="mt-5" v-for="image in this.loadedImages">
      <h1 class="d-flex justify-center ">{{ image }}</h1>
      <v-card-text>
        <v-img :src='"http://localhost:3000/"+image+".jpg"' max-height="500" ></v-img>

      </v-card-text>
      <v-card-actions>
          <v-btn @click="removeImage(image)" color="danger">
            Odstranit
          </v-btn>
        </v-card-actions>
    </v-card>




  </v-container>
</template>



<script>


export default {
  data: () => ({
    inputFile: '',
    inputFileName: null,
    loadedImages: [],

  }),

  mounted(){
    axios.get('http://localhost:3000/pozadi/dump')
      .then(res => {
        this.loadedImages = res.data
      })
  },

  methods: {

    uploadImage() {
      const formData = new FormData();
      formData.append('testImage',this.inputFile[0])

      axios.post('http://localhost:3000/pozadi/setFileName',{'name':this.inputFileName})
        .then(axios.post('http://localhost:3000/pozadi/nahraniSouboru',formData).then(
          axios.get('http://localhost:3000/pozadi/dump')
          .then(res => {
            this.loadedImages = res.data
          })
        ))
      

    },

    removeImage(img){
      axios.delete('http://localhost:3000/pozadi/smazaniSouboru/'+img,)
        .then(axios.get('http://localhost:3000/pozadi/dump')
          .then(res => {
            this.loadedImages = res.data
          }))
    },


    
  }
}
</script>

<style>

</style>