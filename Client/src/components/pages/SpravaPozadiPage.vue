
<template>
  <div id="content">
    <Alert type="error" style='z-index:2000' :title="alertTitle" :text="alertText" v-model="showAlert" />

    <v-container>

      <!-- Import pozadí -->
      <v-card color="primary">
        <v-card-title>

          <h1 style="color: #cca000;" align="center" class="ma-3">Import pozadí</h1>
          <v-divider></v-divider>
        </v-card-title>
        <v-form ref="form">
          <v-card-text>

            <v-file-input color="secondary" variant="outlined" v-model="inputFile" accept="image/jpeg"
              label="Nové JPG herní pozadí"></v-file-input>
            <v-text-field color="secondary" variant="outlined" v-model="inputFileName" :counter="20" label="Jméno souboru"
              required></v-text-field>

          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="uploadImage">
              Nahrát
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>

      <v-card color="primary" class="mt-3">
        <v-card-title>
          <h1 style="color: #cca000;" align="center" class="ma-3">Aktivní pozadí</h1>
          <v-divider></v-divider>
        </v-card-title>
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
              <tr class="mt-2" v-for="image in loadedImages" :key="image">
                <th>{{ image }}</th>
                <th><v-img :src='axios.defaults.baseURL + "/backgrounds/" + image' max-height="500"></v-img></th>
                <th><v-btn icon="mdi-close-box-outline" @click="removeImage(image)" color="error"></v-btn></th>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>

//Importy
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import FormData from 'form-data'
import Alert from '../parts/AlertHandler.vue'
import { useUzivatelStore } from "../../stores/uzivatelStore.js"

//Systémové variables
const router = useRouter()
const uzivatelStore = useUzivatelStore()

//Alert
const showAlert = ref(false)
const alertTitle = ref("")
const alertText = ref("")

//Formulář
let inputFile = null
const inputFileName = ref(null)
const loadedImages = ref([])

/**
 * Metoda při načtení komponenty
 */
onMounted(() => {
  if (!uzivatelStore.prihlasen || uzivatelStore.opravneni != 'administrator') {
    router.push({ path: '/' })
  }
  loadImages()
})

/**
 * Metoda pro nahrání nového obrázku
 */
function uploadImage() {
  if (inputFile == null || inputFileName == null) {
    showAlert.value = true
    alertText.value = "Nesprávně vyplněná data. Prosím, zkontrolujte si zadaná data"
    return
  }
  const formData = new FormData();
  formData.append('image', inputFile[0], inputFileName.value)
  formData.append('imageName', inputFileName.value)
  axios.post(axios.defaults.baseURL + '/pozadi/nahraniSouboru', formData)
    .then(queryResponse => {
      if (queryResponse.data == 'File Uploaded') {
        loadImages()
      }
    })
}

/**
 * Odebere pozadá z databáze
 * @param {int} img Identifikátor obrázku
 */
function removeImage(img) {
  axios.delete(axios.defaults.baseURL + '/pozadi/smazaniSouboru/' + img)
    .then(queryResponse => {
      if (queryResponse.data == "File Deleted") {
        loadImages()
      }
    })
}

/**
 * Načte pozadí z databáze
 */
function loadImages() {
  axios.get(axios.defaults.baseURL + '/pozadi/dump')
    .then(queryResponse => {
      loadedImages.value = queryResponse.data
    })
}
</script>

<style></style>