

<script setup>
import axios from 'axios'
import FormData from 'form-data'
</script>
<template>
  <div id="content">
    <Alert type="error" style='z-index:2000' :title="alertTitle" :text="alertText" v-model="showAlert" />

    <v-container>

      <!-- Import pozadí -->
      <v-card color="primary">
        <v-card-title><h4>Import pozadí</h4></v-card-title>
        <v-form>
        <v-card-text>

          <v-file-input color="secondary" variant="outlined" v-model="inputFile" accept="image/jpeg" label="Nové JPEG herní pozadí"></v-file-input>
          <v-text-field color="secondary" variant="outlined" v-model="inputFileName" :counter="20" label="Jméno souboru" required></v-text-field>

        </v-card-text>
        <v-card-actions>
            <v-btn color="secondary" @click="uploadImage">
              Nahrát
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>

      <v-card color="primary" class="mt-3" title="Aktivní pozadí">
        <v-card-text>
          <v-table theme="">
            <thead>
              <tr>
                <th>
                  Jméno
                </th>
                <th>
                  Obrázek
                </th>
                <th>
                  Akce
                </th>
              </tr>
            </thead>

            <tbody>
              <tr class="mt-2" v-for="image in this.loadedImages" :key="image">
                <th>{{ image }}</th>
                <th><v-img :src='axios.defaults.baseURL+ "/backgrounds/" + image' max-height="500"></v-img></th>
                <th><v-btn icon="mdi-close-box-outline" @click="removeImage(image)" color="error"></v-btn></th>
                <!-- TODO: Asi ikonka -->
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>



<script>

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

    inputFile: null,
    inputFileName: null,
    loadedImages: [],

  }),

  mounted() {
    this.loadImages()
  },

  methods: {

    //TODO:: Uprava asi
    uploadImage() {
      if(this.inputFile == null || this.inputFileName == null)
      {
        this.showAlert = true
        this.alertText = "Nesprávně vyplněná data. Prosím, zkontrolujte si zadaná data"
        return
      }


      const formData = new FormData();
      formData.append('image', this.inputFile[0],this.inputFileName)
      formData.append('imageName',this.inputFileName)
      axios.post(axios.defaults.baseURL+'/pozadi/nahraniSouboru', formData)
    },

    removeImage(img) {
      axios.delete(axios.defaults.baseURL+'/pozadi/smazaniSouboru/' + img)
        .then(this.loadImages())
    },

    loadImages() {
      axios.get(axios.defaults.baseURL+'/pozadi/dump')
        .then(queryResponse => {
          this.loadedImages = queryResponse.data
        })
    }

  }
}
</script>

<style></style>