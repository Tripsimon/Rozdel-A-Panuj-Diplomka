<template>
    <v-row justify="center">
        <v-dialog v-model="isShown.value" scrollable persistent>
            <v-card color="primary">
                <v-card-title>
                    <h1 style="color: #cca000;">Inventář: {{ inventoryWeight + " / " + (inventoryAdventurer.atributy.sila * 5) }}</h1>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 80%;">
                    <v-card class="mt-3">
                        <v-card-title>
                            <h2 style="color: #cca000;">Peníze: {{ inventoryMoney }}</h2>
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
                                <h2 style="color: #cca000;">{{ item.jmeno + " - " + item.typ }}</h2>
                            </v-expansion-panel-title>

                            <v-expansion-panel-text v-if="item.typ == 'Zbraň'">
                                <v-row>
                                    <v-col>
                                        <h4>Průraznost: {{ item.pruraznost }}</h4>
                                    </v-col>
                                    <v-col>
                                        <h4>Poškození základ: {{ item.poskozeniZaklad }}</h4>
                                    </v-col>
                                    <v-col>
                                        <h4>Poškození závažnost: {{ item.poskozeniZavaznost }}</h4>
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
                        <v-card-title style="color: #cca000;">Přidat předmět</v-card-title>
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

                                                    <tr v-for="item in itemAddOptions.Weapons" :key="item.jmeno">
                                                        <th>{{ item.jmeno }}</th>
                                                        <th>{{ item.popis }}</th>
                                                        <th>{{ item.pruraznost }}</th>
                                                        <th>{{ item.poskozeniZaklad }}</th>
                                                        <th>{{ item.poskozeni }}</th>
                                                        <th>{{ item.vaha }}</th>
                                                        <th><v-btn @click="addItem(item)">Přidat</v-btn></th>
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
                                                        <th><v-btn @click="addItem(item)">Přidat</v-btn></th>
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
const inputItemType = ref("weapons")
const itemAddOptions = ref({})

function reloadInventory() {
    inventoryMoney.value = props.inventoryAdventurer.penize
    inventoryWeight.value = 0
    console.log(inventoryAdventurer.value.inventar)

    inventoryAdventurer.value.inventar.forEach(element => {
        inventoryWeight.value += element.vaha
    });

}

function getAddOptions() {
    axios.get(axios.defaults.baseURL + '/vybava/allType', { params: { type: 'Zbraň' } })
        .then(queryResponse => {
            itemAddOptions.value.Weapons = queryResponse.data
        })
        .catch(
            console.log("Vyskytla se chyba při komunikaci se serverem")
        )

    axios.get(axios.defaults.baseURL + '/vybava/allType', { params: { type: 'Zbroj' } })
        .then(queryResponse => {
            itemAddOptions.value.Armors = queryResponse.data
        })
        .catch(
            console.log("Vyskytla se chyba při komunikaci se serverem")
        )

    axios.get(axios.defaults.baseURL + '/vybava/allType', { params: { type: 'Předmět' } })
        .then(queryResponse => {
            itemAddOptions.value.Items = queryResponse.data

        })
        .catch(
            console.log("Vyskytla se chyba při komunikaci se serverem")
        )
}

function changeMoney() {
    axios.post(axios.defaults.baseURL + '/character/changeMoney', { money: inputChangeMoney.value, adventurer: inventoryAdventurer.value._id })
        .then(queryResponse => {
            this.reloadInventory();
            inventoryMoney.value = inputChangeMoney.value;
            inputChangeMoney.value = null
            emit('resyncPlayers');
        })
        .catch(
            console.log("Vyskytla se chyba při komunikaci se serverem")
        )
}


/**
* 
* @param {id} item -> Předmět který se má přidat  
*/
function addItem(item) {
    axios.post(axios.defaults.baseURL + '/character/putIntoInventory', { "item": item, 'adventurer': inventoryAdventurer.value._id })
        .then(responseQuery => {
            console.log(responseQuery.data)
            if (responseQuery.data == "Item Added") {
                emit('resyncPlayers');
                emit('closeModal')
            }
        })
        .catch( error =>{
            console.log(error)
        }
            //console.log("Vyskytla se chyba při komunikaci se serverem")
        )
}

/**
 * Odebere předmět z inventáře dobrodruha a resynkne dobrodruhy
 * @param {string} item ID Itemu
 */
function invetoryRemove(item) {
    axios.post(axios.defaults.baseURL + '/character/removeFromInventory', { "item": item, 'adventurer': inventoryAdventurer.value._id })
        .then(responseQuery => {
            if (responseQuery.data == "Item Deleted") {
                emit('resyncPlayers');
                emit('closeModal')
            }
        })
        .catch( 
            console.log("Vyskytla se chyba při komunikaci se serverem")
        )
}

</script>