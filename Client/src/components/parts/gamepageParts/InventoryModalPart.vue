<template>

    <v-row justify="center">

        <v-dialog v-model="isShown.value" scrollable persistent>

            <v-card color="primary">
                <v-card-title>
                    <h1>Inventář: {{ inventoryWeight + " / " + (inventoryAdventurer.atributy.sila * 5) }}</h1>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 80%;">
                    <v-card class="mt-3">
                        <v-card-title>
                            <h2>Peníze: {{ inventoryMoney }}</h2>
                            <v-divider class="mb-3"></v-divider>
                            <v-text-field v-model="inputChangeMoney" type="number" single-line
                                label="Nové množství"></v-text-field>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn @click="changeMoney()">Změnit</v-btn>
                        </v-card-actions>
                    </v-card>
                    <!-- Výpis předmětů-->
                    <v-expansion-panels class="mt-3" variant="accordion">
                        <v-expansion-panel v-for="item in props.inventoryAdventurer.inventar" :key="item.name">
                            <v-expansion-panel-title>
                                <h2>{{ item.jmeno + " - " + item.typ }}</h2>
                            </v-expansion-panel-title>

                            <v-expansion-panel-text v-if="item.typ == 'Zbraň'">
                                <v-row>
                                    <v-col>
                                        <h4>Průraznost: {{ item.pruraznost }}</h4>
                                    </v-col>
                                    <v-col>
                                        <h4>Poškození: {{ item.poskozeni }}</h4>
                                    </v-col>
                                    <v-col>Váha: {{ item.vaha }}</v-col>
                                </v-row>
                                <v-divider></v-divider>
                                {{ item.popis }}
                            </v-expansion-panel-text>

                            <v-expansion-panel-text v-if="item.typ == 'Zbroj'">
                                <v-row>
                                    <v-col>
                                        <h4>Obrana: {{ item.obrana }}</h4>
                                    </v-col>
                                    <v-col>Váha: {{ item.vaha }}</v-col>
                                </v-row>
                                <v-divider></v-divider>
                                {{ item.popis }}
                            </v-expansion-panel-text>

                            <v-expansion-panel-text v-if="item.typ == 'Předmět'">
                                <v-row>
                                    <v-col>Váha: {{ item.vaha }}</v-col>
                                </v-row>
                                <v-divider></v-divider>
                                {{ item.popis }}
                            </v-expansion-panel-text>

                            <v-expansion-panel-text>
                                <v-btn color="warning" @click="invetoryRemove(item._id)">Zahodit předmět</v-btn>
                            </v-expansion-panel-text>

                        </v-expansion-panel>
                    </v-expansion-panels>

                    <v-card class="mt-3">
                        <v-card-title>Přidat předmět</v-card-title>
                        <v-card-text>

                            <v-tabs v-model="inputItemType" bg-color="primary">
                                <v-tab value="weapons">Zbraně</v-tab>
                                <v-tab value="armors">Zbroje</v-tab>
                                <v-tab value="items">Předměty</v-tab>
                            </v-tabs>

                            <v-card-text>
                                <v-card-text>

                                    <v-window v-model="inputItemType">
                                        <v-window-item value="weapons">
                                            <v-table>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Jméno
                                                        </th>
                                                        <th>
                                                            Popis
                                                        </th>
                                                        <th>
                                                            Pruraznost
                                                        </th>
                                                        <th>
                                                            Základní poškození
                                                        </th>
                                                        <th>
                                                            Závažnost poškození
                                                        </th>
                                                        <th>
                                                            Váha
                                                        </th>
                                                        <th>
                                                            Akce
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr v-for="item in addItem.Weapons" :key="item.jmeno">

                                                        <th>{{ item.jmeno }}</th>
                                                        <th>{{ item.popis }}</th>
                                                        <th>{{ item.pruraznost }}</th>
                                                        <th>{{ item.poskozeni }}</th>
                                                        <th>{{ item.poskozeni }}</th>
                                                        <th>{{ item.vaha }}</th>
                                                        <th><v-btn @click="inventoryAddPush(item._id)">Přidat</v-btn></th>
                                                    </tr>
                                                </tbody>

                                            </v-table>
                                        </v-window-item>

                                        <v-window-item value="armors">
                                            <v-table>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Jméno
                                                        </th>
                                                        <th>
                                                            Popis
                                                        </th>
                                                        <th>
                                                            Obrana
                                                        </th>
                                                        <th>
                                                            Váha
                                                        </th>
                                                        <th>
                                                            Akce
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in itemAddOptions.Armors" :key="item.jmeno">
                                                        <th>{{ item.jmeno }}</th>
                                                        <th>{{ item.popis }}</th>
                                                        <th>{{ item.obrana }}</th>
                                                        <th>{{ item.vaha }}</th>
                                                        <th><v-btn @click="addItem(item._id)">Přidat</v-btn></th>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </v-window-item>

                                        <v-window-item value="items">
                                            <v-table>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Jméno
                                                        </th>
                                                        <th>
                                                            Popis
                                                        </th>
                                                        <th>
                                                            Váha
                                                        </th>
                                                        <th>
                                                            Akce
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in itemAddOptions.Items" :key="item.jmeno">
                                                        <th>{{ item.jmeno }}</th>
                                                        <th>{{ item.popis }}</th>
                                                        <th>{{ item.vaha }}</th>
                                                        <th><v-btn @click="addItem(item)">Přidat</v-btn></th>
                                                    </tr>
                                                </tbody>
                                            </v-table>
                                        </v-window-item>
                                    </v-window>
                                </v-card-text>
                            </v-card-text>
                        </v-card-text>
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
import axios from 'axios'
import { ref, toRefs, watch } from 'vue'

// PROPS
const props = defineProps(['toggle', 'inventoryAdventurer'])
const emit = defineEmits(['resyncPlayers'])
const { toggle, inventoryAdventurer } = toRefs(props)

const isShown = ref(false)
watch(toggle, () => {
    isShown.value = toggle
    reloadInventory()
    getAddOptions()
})

const inputChangeMoney = ref(null)
const inventoryMoney = ref(0)
const inventoryWeight = ref(0)
const inventoryItems = ref([])
const inputItemType = ref("weapons")
const itemAddOptions = ref({})

function reloadInventory() {
    inventoryMoney.value = props.inventoryAdventurer.penize
    inventoryWeight.value = 0

}

function getAddOptions() {
    axios.get(axios.defaults.baseURL + '/vybava/allType', { params: { type: 'Zbraň' } })
        .then(response => {
            itemAddOptions.value.Weapons = response.data

        })

    axios.get(axios.defaults.baseURL + '/vybava/allType', { params: { type: 'Zbroj' } })
        .then(response => {
            itemAddOptions.value.Armors = response.data
        })

    axios.get(axios.defaults.baseURL + '/vybava/allType', { params: { type: 'Předmět' } })
        .then(response => {
            itemAddOptions.value.Items = response.data

        })
}

function changeMoney() {
    axios.post(axios.defaults.baseURL + '/character/changeMoney', { money: inputChangeMoney.value, adventurer: inventoryAdventurer.value._id })
        .then(queryResponse => {
            this.reloadInventory();
            inventoryMoney.value = inputChangeMoney.value;
            inputChangeMoney.value = null
            emit('resyncPlayers');

        })
}

/**
* 
* @param {id} item -> Předmět který se má přidat  
*/
function addItem(item) {
    axios.post(axios.defaults.baseURL + '/character/putIntoInventory', { "item": item, 'adventurer': inventoryAdventurer.value._id })
        .then(responseQuery => {
            if (responseQuery.data == true) {
                emit('resyncPlayers');
            }
        })
}

/**
 * Odebere předmět z inventáře dobrodruha a resynkne dobrodruhy
 * @param {string} item ID Itemu
 */
function invetoryRemove(item) {
    axios.post(axios.defaults.baseURL + '/character/removeFromInventory', { "item": item, 'adventurer': inventoryAdventurer.value._id })
        .then(responseQuery => {
            if (responseQuery.data == true) {
                emit('resyncPlayers');
            }
        })

}

</script>