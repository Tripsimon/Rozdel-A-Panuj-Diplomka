<template>
    <v-container class="mt-3">
        <confirm-dialog :toggle="dialogToggle" @close-dialog="closeDialog"></confirm-dialog>
        <div id="content">
            <v-card v-if="avaliableAdventurers.length > 0" v-for="adventurer in avaliableAdventurers" :key="adventurer._id"
                color="primary" class="mt-3">
                <v-card-title style="color: #cca000;">{{ adventurer.krestniJmeno + ' "' + adventurer.prezdivka + '" ' +
                    adventurer.prijmeni
                }}</v-card-title>
                <v-card-subtitle>Popis: {{ adventurer.popis }}</v-card-subtitle>
                <v-card-subtitle>Příběh: {{ adventurer.pribeh }}</v-card-subtitle>
                <v-card-text>
                    <h3>Status:</h3>
                    <v-row>
                        <v-col></v-col>
                        <v-col>
                            <p>Rasa: {{ adventurer.rasa }}</p>
                        </v-col>
                        <v-col>
                            <p>Třída: {{ adventurer.trida }}</p>
                        </v-col>
                        <v-col></v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <p>Životy: {{ adventurer.zivoty }}</p>
                        </v-col>
                        <v-col>
                            <p>Peníze: {{ adventurer.penize }}</p>
                        </v-col>
                        <v-col>
                            <p>Level: {{ adventurer.level }}</p>
                        </v-col>
                        <v-col>
                            <p>Zkošenosti: {{ adventurer.zkusenosti + " / " + (adventurer.level * 10) }} </p>
                        </v-col>
                    </v-row>
                    <v-divider class="mt-2 mb-2"></v-divider>
                    <h3>Atributy</h3>
                    <v-row>
                        <v-col>
                            <p>Síla: {{ adventurer.atributy.sila }}</p>
                        </v-col>
                        <v-col>
                            <p>Kouževnatost: {{ adventurer.atributy.houzevnatost }}</p>
                        </v-col>
                        <v-col>
                            <p>Obratnost: {{ adventurer.atributy.obratnost }}</p>
                        </v-col>
                        <v-col>
                            <p>Charisma: {{ adventurer.atributy.charisma }}</p>
                        </v-col>
                        <v-col>
                            <p>Inteligence: {{ adventurer.atributy.inteligence }}</p>
                        </v-col>
                        <v-col>
                            <p>Znalost: {{ adventurer.atributy.znalost }}</p>
                        </v-col>
                    </v-row>


                    <v-divider class="mt-2 mb-2"></v-divider>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="secondary" @click="smazDobrodruha(adventurer._id)">Vymazat dobrodruha</v-btn>
                </v-card-actions>
            </v-card>
            <v-card v-if="avaliableAdventurers.length == 0" title="Tento učet nemá žádného dobrodruha">
                <v-card-actions>
                    <v-btn color="secondary" @click="$router.push({ path: '/tvorba-dobrodruha' })">Tvorba
                        dobrodruha</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-container>
</template>
<script setup>
//Importy
import { ref, onMounted } from 'vue'
import ConfirmDialog from '../parts/ConfirmDialog.vue'
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
import { useRouter, } from 'vue-router'
import axios from 'axios'

//Systémové variables
const router = useRouter()
const uzivatelStore = useUzivatelStore()
const dialogToggle = ref(false)

//Dobrodruzi
const avaliableAdventurers = ref([])
const adventurerToDelete = ref(null)

/**
 * Funkce po načtení komponenty
 */
onMounted(() => {
    if (!uzivatelStore.prihlasen) {
        router.push({ path: '/' })
    }
    getAdventurers()
})

/**
 * Získá dostupné dobrodruhy
 */
function getAdventurers() {
    axios.get(axios.defaults.baseURL + '/character/getCharacters', { params: { owner: uzivatelStore._id } })
        .then((response) => {
            avaliableAdventurers.value = response.data
        })
}

/**
 * Smaže dobrodruha z databáze
 */
function smazDobrodruha(id) {
    dialogToggle.value = true
    adventurerToDelete.value = id
}

/**
 * Práce s dialogem
 */
function closeDialog(answer) {
    dialogToggle.value = false
    if (answer && adventurerToDelete != null) {
        axios.delete(axios.defaults.baseURL + '/character/deleteAdventurer', { data: { adventurer: adventurerToDelete.value } })
            .then(queryResponse => {
                if (queryResponse.data == 'Adventurer Deleted') {
                    getAdventurers()
                }
            })
    }
}

</script>