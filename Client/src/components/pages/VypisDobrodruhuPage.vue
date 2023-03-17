<script setup>
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
import axios from 'axios'
</script>

<template>
    <v-container>
        <v-card v-for="adventurer in this.avaliableAdventurers" color="primary" class="mt-3">
            <v-card-title>{{ adventurer.krestniJmeno + ' "'+ adventurer.prezdivka + '" '+ adventurer.prijmeni }}</v-card-title>
            <v-card-text>
                {{ adventurer }}
                <br>
                {{ adventurer.atributy }}
            </v-card-text>
            <v-card-actions>
                <v-btn color="secondary">Smazat</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        uzivatelStore: useUzivatelStore(),
        avaliableAdventurers: []
    }),

    mounted() {
        this.getAdventurers()
    },

    methods: {

        getAdventurers() {
            axios.get(axios.defaults.baseURL+'/character/getCharacters', { params: { owner: this.uzivatelStore._id } })
                .then((response) => {
                    this.avaliableAdventurers = response.data
                })
        }

    }
}
</script>