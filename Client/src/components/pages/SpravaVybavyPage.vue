<template>
    <!-- Výber typu-->
    <v-container>
        <Alert type="error" style='z-index:2000' :title="alertTitle" :text="alertText" v-model="showAlert" />
        <v-card color="primary">
            <v-form ref="form" @submit.prevent="submit">
                <v-card-title>
                    <h1 align="center" class="ma-3">Správa výbavy</h1>
                </v-card-title>

                <v-card-text>
                    <v-select color="secondary" variant="outlined" label="Typ" :items="['Zbraň', 'Zbroj', 'Předmět']"
                        v-model="chosenType" @update:modelValue="updateData()"></v-select>
                </v-card-text>

                <!-- Zbran-->
                <v-card-text v-if="chosenType == 'Zbraň'">
                    <h2>Tvorba zbraně</h2>
                    <v-divider class="mb-3"></v-divider>


                    <v-row>
                        <v-col>
                            <v-text-field color="secondary" variant="outlined" v-model="chosenName" :rules="rules.required"
                                label="Jméno předmětu">
                            </v-text-field>
                            <v-text-field color="secondary" variant="outlined" v-model="chosenWeight" type="number"
                                :rules="rules.required" label="Váha">
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <v-textarea style="height: 125%;" color="secondary" variant="outlined"
                                v-model="chosenDescription" :rules="rules.required" label="Popis předmětu">
                            </v-textarea>
                        </v-col>

                    </v-row>

                    <v-btn class="mb-3" color="secondary" variant="outlined"
                        @click="() => { chosenAbilities.push({}); chosenAbilitiesCount++ }">
                        Přidat schopnost
                    </v-btn>
                    <AbilityCreation v-for="i in chosenAbilitiesCount" :key="i" :int="i" @updatedAbility="(ability,index) =>{updateAbility(ability,index)}" @removeAbility="(index) =>removeAbility(index)" />

                    <v-text-field color="secondary" variant="outlined" v-model="chosenPierce" type="number"
                        :rules="rules.required" label="Pruraznost">
                    </v-text-field>

                    <v-row>
                        <v-col>

                            <v-text-field color="secondary" variant="outlined" v-model="chosenDamageBase" type="number"
                                :rules="rules.required" label="Základní poškození">
                            </v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field color="secondary" variant="outlined" v-model="chosenDamageSeverity" type="number"
                                :rules="rules.required" label="Závažnost poškození">
                            </v-text-field>
                        </v-col>


                    </v-row>



                </v-card-text>


                <!-- Zbroj -->
                <v-card-text v-if="chosenType == 'Zbroj'">
                    <h2>Tvorba zbroje</h2>
                    <v-divider class="mb-3"></v-divider>
                    <v-text-field color="secondary" variant="outlined" v-model="chosenName" :rules="rules.required"
                        label="Jméno předmětu">
                    </v-text-field>

                    <v-row>

                        <v-col>
                            <v-textarea color="secondary" variant="outlined" v-model="chosenDescription"
                                :rules="rules.required" label="Popis">
                            </v-textarea>
                        </v-col>

                        <v-col>
                            <v-textarea color="secondary" variant="outlined" v-model="chosenAbilities"
                                label="Schopnosti předmětu">
                            </v-textarea>
                        </v-col>

                    </v-row>

                    <v-text-field color="secondary" variant="outlined" v-model="chosenArmor" type="number"
                        :rules="rules.required" label="Obrana">
                    </v-text-field>

                    <v-text-field color="secondary" variant="outlined" v-model="chosenWeight" type="number"
                        :rules="rules.required" label="Váha">
                    </v-text-field>

                </v-card-text>


                <!-- Předmět -->
                <v-card-text v-if="chosenType == 'Předmět'">
                    <h2>Tvorba předmětu</h2>
                    <v-divider class="mb-3"></v-divider>
                    <v-text-field color="secondary" variant="outlined" v-model="chosenName" :rules="rules.required"
                        label="Jméno předmětu">
                    </v-text-field>
                    <v-row>

                        <v-col>
                            <v-textarea color="secondary" variant="outlined" v-model="chosenDescription"
                                :rules="rules.required" label="Popis">
                            </v-textarea>
                        </v-col>

                        <v-col>
                            <v-textarea color="secondary" variant="outlined" v-model="chosenAbilities"
                                label="Schopnosti předmětu">
                            </v-textarea>
                        </v-col>

                        <AbilityCreation />

                    </v-row>

                    <v-text-field color="secondary" variant="outlined" v-model="chosenWeight" type="number"
                        :rules="rules.required" label="Váha">
                    </v-text-field>

                </v-card-text>

                <v-card-actions v-if="chosenType != null">
                    <v-btn color="secondary" variant="text" @click="submit">
                        Nahrát
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>


        <!-- Export dat -->
        <v-card v-if="loadedData != []" color="primary" class="mt-3">
            <v-card-text>

                <v-table>
                    <thead v-if="chosenType == 'Zbraň'">
                        <tr>
                            <th>
                                Jméno
                            </th>
                            <th>
                                Popis
                            </th>
                            <th>
                                Schopnosti
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

                    <thead v-if="chosenType == 'Zbroj'">
                        <tr>
                            <th>
                                Jméno
                            </th>
                            <th>
                                Popis
                            </th>
                            <th>
                                Schopnosti
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

                    <thead v-if="chosenType == 'Předmět'">
                        <tr>
                            <th>
                                Jméno
                            </th>
                            <th>
                                Popis
                            </th>
                            <th>
                                Schopnost
                            </th>
                            <th>
                                Váha
                            </th>
                            <th>
                                Akce
                            </th>
                        </tr>
                    </thead>

                    <tbody v-if="chosenType == 'Zbraň'">
                        <tr v-for="item in loadedData" :key="item._id">
                            <th>{{ item.jmeno }}</th>
                            <th>{{ item.popis }}</th>
                            <th>{{ item.schopnosti }}</th>
                            <th>{{ item.pruraznost }}</th>
                            <th>{{ item.poskozeniZaklad }}</th>
                            <th>{{ item.poskozeniZavaznost }}</th>
                            <th>{{ item.vaha }}</th>
                            <!-- TODO: Asi ikonka -->
                            <th><v-btn icon="mdi-close-box-outline" color="error" @click="removeItem(item._id)"></v-btn>
                            </th>
                        </tr>
                    </tbody>

                    <tbody v-if="chosenType == 'Zbroj'">
                        <tr v-for="item in loadedData" :key="item._id">
                            <th>{{ item.jmeno }}</th>
                            <th>{{ item.popis }}</th>
                            <th>{{ item.schopnosti }}</th>
                            <th>{{ item.obrana }}</th>
                            <th>{{ item.vaha }}</th>
                            <!-- TODO: Asi ikonka -->
                            <th><v-btn icon="mdi-close-box-outline" color="error" @click="removeItem(item._id)"></v-btn>
                            </th>
                        </tr>
                    </tbody>

                    <tbody v-if="chosenType == 'Předmět'">
                        <tr v-for="item in loadedData" :key="item._id">
                            <th>{{ item.jmeno }}</th>
                            <th>{{ item.popis }}</th>
                            <th>{{ item.schopnosti }}</th>
                            <th>{{ item.vaha }}</th>
                            <th><v-btn icon="mdi-close-box-outline" color="error" @click="removeItem(item._id)"></v-btn>
                            </th>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>



<script setup>
import { ref } from 'vue'
import Alert from '../parts/AlertHandler.vue'
import AbilityCreation from '../parts/spravaParts/abilityCreationPart.vue'
import axios from 'axios'

//Systémové variables
const showAlert = ref(false)
const alertTitle = ref("")
const alertText = ref("")
const loadedData = ref([])
const form = ref(null)

const chosenType = ref(null)
const chosenName = ref(null)
const chosenDescription = ref(null)
const chosenAbilitiesCount = ref(0)
const chosenAbilities = ref([])
const chosenPierce = ref(null)
const chosenDamageBase = ref(null)
const chosenDamageSeverity = ref(null)
const chosenArmor = ref(null)
const chosenWeight = ref(null)

//validace
const rules = {
    required: [
        value => {
            if (value?.length > 0) return true
            return 'Formulář není vyplněný'
        },
    ],
};


function updateAbility(ability,index) {
    chosenAbilities[index] = ability
}

function removeAbility(index) {
    console.log(index)
    chosenAbilitiesCount.value--;
    chosenAbilities.value.splice(index-1, 1)
    
}

//Zbraň', 'Zbroj', 'Předmět
function submit() {

    form.value?.validate()
        .then(({ valid }) => {
            if (valid) {
                switch (chosenType.value) {
                    case 'Zbraň':
                        uploadWeapon();
                        updateData()
                        clearInputs()
                        break;

                    case 'Zbroj':
                        uploadArmor()
                        updateData()
                        clearInputs()
                        break;

                    case 'Předmět':
                        uploadItem()
                        updateData()
                        clearInputs()
                        break;

                    default:
                        break;
                }
            } else {
                showAlert.value = true;
                alertTitle.value = "Nevyplněný formulář"
                alertText.value = "Prosím, vyplňte všechny potřebné složky formuláře"
            }
        })
}

function uploadWeapon() {
    axios.post(axios.defaults.baseURL + '/vybava/createWeapon',
        {
            'name': chosenName.value,
            'type': chosenType.value,
            'description': chosenDescription.value,
            'abilities': chosenAbilities.value,
            'pierce': chosenPierce.value,
            'damageBase': chosenDamageBase.value,
            'damageSeverity': chosenDamageSeverity.value,
            'weight': chosenWeight.value
        })
        .then(queryResponse => {
            if (queryResponse.status == 200) {
                updateData()
            }
        })
}

function uploadArmor() {
    axios.post(axios.defaults.baseURL + '/vybava/createArmor',
        {
            'name': chosenName,
            'type': chosenType,
            'description': chosenDescription,
            'abilities': chosenAbilities,
            'obrana': chosenArmor,
            'weight': chosenWeight
        })
        .then(queryResponse => {
            if (queryResponse.status == 200) {
                updateData()
            }
        })
}

/**
 * Nahraje předmět do databáze
 */
function uploadItem() {
    if (this.valid) {
        axios.post(axios.defaults.baseURL + '/vybava/createItem',
            {
                'name': chosenName,
                'type': chosenType,
                'description': chosenDescription,
                'abilities': chosenAbilities,
                'weight': chosenWeight
            })
            .then(queryResponse => {
                if (queryResponse.status == 200) {
                    updateData()
                    clearInputs()
                }
            })
    } else {
        showAlert.value = true;
        alertTitle.value = "Neplatný formulář"
        alertText.value = "Formulář není správně vyplněný. Prosím zkontrolujte si zadaná data"
    }
}

/**
 * Načte nová data pro zobrazení v tabulce existujících předmětů
 */
function updateData() {
    axios.get(axios.defaults.baseURL + '/vybava/allType', { params: { type: chosenType.value } })
        .then(response => {
            loadedData.value = response.data
        })
}

/**
 * Smaže item z databáze předmětů
 */
function removeItem(itemID) {
    axios.get(axios.defaults.baseURL + '/vybava/removeItem', { params: { itemID: itemID } })
        .then(queryResponse => {
            if (queryResponse.status == 200) {
                updateData()
            }
        })
}

/**
 * Vyčistí formulář 
 */
function clearInputs() {
    chosenName.value = null,
        chosenDescription.value = null,
        chosenAbilities.value = null,
        chosenPierce.value = null,
        chosenDamageBase.value = null,
        chosenDamageSeverity.value = null,
        chosenArmor.value = null,
        chosenWeight.value = null
}


</script>

<style></style>