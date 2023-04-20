<template>
    <v-row justify="center">
        <v-dialog v-model="isShown" scrollable>
            <v-card color="primary">
                <v-card-title>Detail dobrodruha</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 80%;">

                    <v-card class="mt-3" title="Zkušenosti">
                        <v-card-text>
                            <v-row>
                                <v-col cols="6"> <v-text-field v-model="detailLevelInput" type="number" single-line
                                        label="Level" :placeholder="props.detailAdventurer.level"></v-text-field></v-col>
                                <v-col cols="6"> <v-text-field v-model="detailExperienceInput" type="number" single-line
                                        label="Zkušenosti"
                                        :placeholder="props.detailAdventurer.zkusenosti"></v-text-field></v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn @click="detailChangeLevelExperience">Změnit</v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card class="mt-3" title="Atributy">
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
                    {{ abilities.value }}

                    <v-card class="mt-3" title="Schopnosti rasy" v-if="this.detailRasaSchopnosti != null">
                        <AbilityCard v-for="ability in this.detailTridaShopnosti" :ability="ability" />
                    </v-card>

                    <v-card class="mt-3" title="Schopnosti třídy" v-if="this.detailTridaShopnosti != null">
                        <AbilityCard v-for="ability in this.detailTridaShopnosti" :ability="ability" />
                    </v-card>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue-darken-1" variant="text" @click="detailModal = false">
                        Zavřít
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script setup>
import axios from 'axios'
import { ref, toRefs, watch } from 'vue'
const props = defineProps(['toggle', 'detailAdventurer'])

const { toggle } = toRefs(props)
const abilities = ref({})

const isShown = ref(false)
watch(toggle, () => {
    isShown.value = toggle
    console.log(props.detailAdventurer)
    getAbilities()
})

function getAbilities() {
    axios.get(axios.defaults.baseURL + '/schopnosti/getByOwner', { params: { 'owner': props.detailAdventurer.trida } })
        .then(queryResponse => {
          abilities.value = queryResponse.data
          console.log(abilities)
        })

      axios.get(axios.defaults.baseURL + '/schopnosti/getByOwner', { params: { 'owner': props.detailAdventurer.rasa } })
        .then(queryResponse => {
            abilities.value = queryResponse.data
        })
}
</script>