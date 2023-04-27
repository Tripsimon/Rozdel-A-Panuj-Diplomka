<template>
    <v-row justify="center">

        <v-dialog v-model="isShown.value" scrollable persistent>
            <v-card color="primary">
                <v-card-title>
                    <h1 style="color: #cca000;">{{ getAdventurerName() }}</h1>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 80%;">
                    <v-card class="mt-3">
                        <v-card-title>
                            <h2 style="color: #cca000;">Zkušenosti</h2>
                            <v-divider class="mb-3"></v-divider>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="6"> <v-text-field variant="outlined" color="secondary" v-model="detailLevelInput" type="number" single-line
                                        label="Level" :placeholder="props.detailAdventurer.level"></v-text-field></v-col>
                                <v-col cols="6"> <v-text-field variant="outlined" color="secondary" v-model="detailExperienceInput" type="number" single-line
                                        label="Zkušenosti"
                                        :placeholder="props.detailAdventurer.zkusenosti"></v-text-field></v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="detailChangeLevelExperience">Změnit</v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card class="mt-3">
                        <v-card-title>
                            <h2 style="color: #cca000;">Zdraví</h2>
                            <v-divider class="mb-3"></v-divider>
                        </v-card-title>
                        <v-card-text>
                            <v-text-field variant="outlined" color="secondary" v-model="detailLifeInput" type="number" single-line label="Zdraví"
                                :placeholder="props.detailAdventurer.aktualniZivoty + ' / ' + props.detailAdventurer.zivoty"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="detailChangeLife">Změnit</v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card class="mt-3">
                        <v-card-title>
                            <h2 style="color: #cca000;">Atributy</h2>
                            <v-divider class="mb-3"></v-divider>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <h3> Síla: {{ props.detailAdventurer.atributy.sila }}</h3>
                                </v-col>
                                <v-col>
                                    <h3> Houževnatost: {{ props.detailAdventurer.atributy.houzevnatost }}</h3>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <h3> Obratnost: {{ props.detailAdventurer.atributy.obratnost }}</h3>
                                </v-col>
                                <v-col>
                                    <h3> Charisma: {{ props.detailAdventurer.atributy.charisma }}</h3>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <h3> Inteligence: {{ props.detailAdventurer.atributy.inteligence }}</h3>
                                </v-col>
                                <v-col>
                                    <h3> Znalost: {{ props.detailAdventurer.atributy.znalost }}</h3>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                    <v-card class="mt-3"  v-if="abilitiesRace != null">
                        <v-card-title>
                            <h2 style="color: #cca000;">Schopnosti rasy</h2>
                            <v-divider class="mb-3"></v-divider>
                        </v-card-title>
                        <AbilityCard v-for="ability in  abilitiesRace" :key="ability" :ability="ability" />
                    </v-card>

                    <v-card class="mt-3"  v-if="abilitiesClass != null">
                        <v-card-title>
                            <h2 style="color: #cca000;">Schopnosti povolání</h2>
                            <v-divider class="mb-3"></v-divider>
                        </v-card-title>
                        <AbilityCard v-for="ability in  abilitiesClass" :key="ability" :ability="ability" />
                    </v-card>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1" variant="text" @click="$emit('closeModal')">
                        Zavřít
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script setup>

//Importy
import axios from 'axios'
import { ref, toRefs, watch } from 'vue'
import AbilityCard from '../AbilityCard.vue';

//Systémové variables
const props = defineProps(['toggle', 'detailAdventurer'])
const emit = defineEmits(['closeModal', 'resyncPlayers'])
const { toggle } = toRefs(props)

//Data rasy a tříd
const abilitiesRace = ref({})
const abilitiesClass = ref({})

const isShown = ref(false)
watch(toggle, () => {
    isShown.value = toggle
    getAbilities()
})

//Formulář
const detailLevelInput = ref(null)
const detailExperienceInput = ref(null)
const detailLifeInput = ref(null)

/**
 * Získá ability dobrodruha
 */
function getAbilities() {
    axios.get(axios.defaults.baseURL + '/schopnosti/getByOwner', { params: { 'owner': props.detailAdventurer.trida } })
        .then(queryResponse => {
            abilitiesRace.value = queryResponse.data
        })

    axios.get(axios.defaults.baseURL + '/schopnosti/getByOwner', { params: { 'owner': props.detailAdventurer.rasa } })
        .then(queryResponse => {
            abilitiesClass.value = queryResponse.data
        })
}

/**
 * Získá jméno dobrodruha
 */
function getAdventurerName() {
    let name = props.detailAdventurer.krestniJmeno
    if (props.detailAdventurer.prezdivka != null) {
        name = name + ' "' + props.detailAdventurer.prezdivka + '" '
    }
    name = name + props.detailAdventurer.prijmeni
    return name
}

/**
 * Změní level a zkušenosti vybraného dobrodruha
 */
function detailChangeLevelExperience() {
    axios.post(axios.defaults.baseURL + '/character/changeLevelAndExperience', { 'adventurer': props.detailAdventurer._id, 'level': detailLevelInput.value, 'zkusenosti': detailExperienceInput.value })
        .then(responseQuery => {
            if (responseQuery) {
                emit('resyncPlayers')
                emit('closeModal')
                detailLevelInput.value = null,
                    detailExperienceInput.value = null
                socketsResyncPlayers()
            }
        })
        .catch(
            console.log("Vyskytla se chyba při komunikaci se serverem")
        )
}

/**
 * Změní aktuální životy
 */
function detailChangeLife() {
    axios.post(axios.defaults.baseURL + '/character/changeActualLife', { 'adventurer': props.detailAdventurer._id, 'zivoty': detailLifeInput.value })
        .then(responseQuery => {
            if (responseQuery) {
                emit('resyncPlayers')
                emit('closeModal')
                detailLifeInput.value = null
            }
        })
        .catch(
            console.log("Vyskytla se chyba při komunikaci se serverem")
        )
}
</script>