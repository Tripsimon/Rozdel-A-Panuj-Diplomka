<script setup>
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
import axios from 'axios'
</script>

<template>
    <v-container class="mt-3">
        <confirm-dialog :toggle="dialogToggle" @close-dialog=" closeDialog"></confirm-dialog>
        <div id="content">
            <v-card v-if="this.avaliableAdventurers != null" v-for="adventurer in this.avaliableAdventurers" :key="adventurer._id" color="primary"
                class="mt-3">
                <v-card-title>{{ adventurer.krestniJmeno + ' "' + adventurer.prezdivka + '" ' + adventurer.prijmeni
                }}</v-card-title>
                <v-card-subtitle>Popis: {{ adventurer.popis }}</v-card-subtitle>
                <v-card-subtitle>Příběh: {{ adventurer.pribeh }}</v-card-subtitle>
                <v-card-text>

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
                    <h3>Status</h3>
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
                </v-card-text>
                <v-card-actions>
                    <v-btn color="secondary" @click="smazDobrodruha(adventurer._id)">Vymazat dobrodruha</v-btn>
                </v-card-actions>
            </v-card>
            <v-card v-if="this.avaliableAdventurers.length == 0" title="Tento učet nemá žádného dobrodruha">
                <v-card-actions>
                    <v-btn color="secondary" @click="this.$router.push({ path: '/tvorba-dobrodruha' })">Tvorba dobrodruha</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-container>
</template>
<script>
import ConfirmDialog from '../parts/ConfirmDialog.vue'
export default {

    
  components: () =>({
        ConfirmDialog
    }),

    data: () => ({
        uzivatelStore: useUzivatelStore(),
        avaliableAdventurers: [],
        dialogToggle: false,
        adventurerToDelete: null,
    }),

    mounted() {
        this.getAdventurers()
    },

    methods: {

        getAdventurers() {
            axios.get(axios.defaults.baseURL + '/character/getCharacters', { params: { owner: this.uzivatelStore._id } })
                .then((response) => {
                    this.avaliableAdventurers = response.data
                })
        },

        smazDobrodruha(id){
            this.dialogToggle = true
            this.adventurerToDelete = id
        },

        closeDialog(response){
            this.dialogToggle = false
            console.log(this.adventurerToDelete)
            if(response && this.adventurerToDelete != null){
                axios.delete(axios.defaults.baseURL+'/character/deleteAdventurer',{data:{adventurer: this.adventurerToDelete}})
            }
        }

    }
}
</script>