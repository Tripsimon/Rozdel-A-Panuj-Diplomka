

<script setup>
import axios from 'axios'
</script>
<template>


    <!-- Výber typu-->
    <v-container>
        <Alert  type="error" style='z-index:2000' :title="alertTitle" :text="alertText" v-model="showAlert"/>
        <v-card color="primary">
            <h1 class="d-flex justify-center">Správa výbavy</h1>
            <v-card-text>
                <v-select color="secondary" variant="outlined" label="Typ" :items="['Zbraň', 'Zbroj', 'Předmět']" v-model="chosenType"
                    @update:modelValue="updateData()"></v-select>
            </v-card-text>
        </v-card>
        <v-form v-if="chosenType != null" ref="form" v-model="valid" fast-fail @submit.prevent="submit">

            <!-- Zbraně -->
            <v-card title="Tvorba předmětu" color="primary" class="mt-5">
                <v-card-text v-if="chosenType == 'Zbraň'">
                    <v-text-field color="secondary" variant="outlined" v-model="chosenName" :rules="this.rules.required" label="Jméno předmětu" required>
                    </v-text-field>

                    <v-row>

                        <v-col>
                            <v-textarea color="secondary" variant="outlined" v-model="chosenDescription" :rules="this.rules.required" label="Popis" required>
                            </v-textarea>
                        </v-col>

                        <v-col>
                            <v-textarea color="secondary" variant="outlined" v-model="chosenAbilities"  label="Schopnosti předmětu"
                                required>
                            </v-textarea>
                        </v-col>

                    </v-row>

                    <v-text-field color="secondary" variant="outlined" v-model="chosenPierce" type="number" :rules="this.rules.required" label="Pruraznost" required>
                    </v-text-field>

                    <v-row>
                        <v-col>

                            <v-text-field color="secondary" variant="outlined" v-model="chosenDamageBase" type="number" :rules="this.rules.required" label="Základní poškození"
                                required>
                            </v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field color="secondary" variant="outlined" v-model="chosenDamageSeverity" type="number" :rules="this.rules.required"
                                label="Závažnost poškození" required>
                            </v-text-field>
                        </v-col>


                    </v-row>

                    <v-text-field color="secondary" variant="outlined" v-model="chosenWeight" type="number" :rules="this.rules.required" label="Váha" required>
                    </v-text-field>

                </v-card-text>


                <!-- Zbroj -->
                <v-card-text v-if="chosenType == 'Zbroj'">
                    <v-text-field color="secondary" variant="outlined" v-model="chosenName" :rules="this.rules.required" label="Jméno předmětu" required>
                    </v-text-field>

                    <v-row>

                        <v-col>
                            <v-textarea color="secondary" variant="outlined" v-model="chosenDescription" :rules="this.rules.required" label="Popis" required>
                            </v-textarea>
                        </v-col>

                        <v-col>
                            <v-textarea color="secondary" variant="outlined" v-model="chosenAbilities"  label="Schopnosti předmětu"
                                required>
                            </v-textarea>
                        </v-col>

                    </v-row>

                    <v-text-field color="secondary" variant="outlined" v-model="chosenArmor" type="number" :rules="this.rules.required" label="Obrana" required>
                    </v-text-field>

                    <v-text-field color="secondary" variant="outlined" v-model="chosenWeight" type="number" :rules="this.rules.required" label="Váha" required>
                    </v-text-field>

                </v-card-text>


                <!-- Předmět -->
                <v-card-text v-if="chosenType == 'Předmět'">
                    <v-text-field color="secondary" variant="outlined" v-model="chosenName" :rules="this.rules.required" label="Jméno předmětu" required>
                    </v-text-field>
                    <v-row>

                        <v-col>
                            <v-textarea color="secondary" variant="outlined" v-model="chosenDescription" :rules="this.rules.required" label="Popis" required>
                            </v-textarea>
                        </v-col>

                        <v-col>
                            <v-textarea color="secondary" variant="outlined" v-model="chosenAbilities"  label="Schopnosti předmětu"
                                required>
                            </v-textarea>
                        </v-col>

                    </v-row>

                    <v-text-field color="secondary" variant="outlined" v-model="chosenWeight" type="number" :rules="this.rules.required" label="Váha" required>
                    </v-text-field>

                </v-card-text>

                <v-card-actions>
                    <v-btn color="secondary" variant="text" @click="submit">
                        Nahrát
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>

        <!-- Export dat -->
        <v-card v-if="chosenType != null" color="primary" class="mt-3">
            <v-card-text>
                {{ this.chosenType }}

                <v-table >
                    <thead v-if="this.chosenType == 'Zbraň'"  >
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

                    <thead v-if="this.chosenType == 'Zbroj'"  >
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

                    <thead v-if="this.chosenType == 'Předmět'"  >
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

                    <tbody v-if="this.chosenType == 'Zbraň'" >
                        <tr v-for="item in this.loadedData" :key="item._id">
                            <th>{{ item.jmeno }}</th>
                            <th>{{ item.popis }}</th>
                            <th>{{ item.schopnosti }}</th>
                            <th>{{ item.pruraznost }}</th>
                            <th>{{ item.poskozeniZaklad }}</th>
                            <th>{{ item.poskozeniZavaznost }}</th>
                            <th>{{ item.vaha }}</th>
                            <!-- TODO: Asi ikonka -->
                            <th><v-btn icon="mdi-close-box-outline" color="error" @click="removeItem(item._id)"></v-btn></th>
                        </tr>
                    </tbody>

                    <tbody v-if="this.chosenType == 'Zbroj'" >
                        <tr v-for="item in this.loadedData" :key="item._id">
                            <th>{{ item.jmeno }}</th>
                            <th>{{ item.popis }}</th>
                            <th>{{ item.schopnosti }}</th>
                            <th>{{ item.obrana }}</th>
                            <th>{{ item.vaha }}</th>
                            <!-- TODO: Asi ikonka -->
                            <th><v-btn icon="mdi-close-box-outline" color="error" @click="removeItem(item._id)"></v-btn></th>
                        </tr>
                    </tbody>

                    <tbody v-if="this.chosenType == 'Předmět'" >
                        <tr v-for="item in this.loadedData" :key="item._id">
                            <th>{{ item.jmeno }}</th>
                            <th>{{ item.popis }}</th>
                            <th>{{ item.schopnosti }}</th>
                            <th>{{ item.vaha }}</th>
                            <th><v-btn icon="mdi-close-box-outline" color="error" @click="removeItem(item._id)"></v-btn></th>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
    </v-container>
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

        loadedData: [],

        chosenType: null,
        chosenName: null,
        chosenDescription: null,
        chosenAbilities: null,
        chosenPierce: null,
        chosenDamageBase: null,
        chosenDamageSeverity: null,
        chosenArmor: null,
        chosenWeight: null,

        //validace
        rules: {
            required: [
                value => {
                    if (value?.length > 0) return true
                    return 'Formulář není vyplněný'
                },
            ],
        },
        valid: '',

    }),



    methods: {

        //Zbraň', 'Zbroj', 'Předmět
        submit(){
            if(this.valid){


            switch (this.chosenType) {
                case 'Zbraň':
                    this.uploadWeapon();
                    this.updateData()
                    this.clearInputs()
                    break;
            
                case 'Zbroj':
                    this.uploadArmor()
                    this.updateData()
                    this.clearInputs()
                    break;

                case 'Předmět':
                    this.uploadItem()
                    this.updateData()
                    this.clearInputs()
                    break;

                default:
                    break;
            }
            }else{
                this.showAlert = true;
                this.alertTitle = "Nevyplněný formulář"
                this.alertText = "Prosím, vyplňte všechny potřebné složky formuláře"
            }
        },

        uploadWeapon() {
            axios.post('http://localhost:3000/vybava/createWeapon',
                {
                    'name': this.chosenName,
                    'type': this.chosenType,
                    'description': this.chosenDescription,
                    'abilities': this.chosenAbilities,
                    'pierce': this.chosenPierce,
                    'damageBase': this.chosenDamageBase,
                    'damageSeverity': this.chosenDamageSeverity,
                    'weight': this.chosenWeight
                })
                .then(queryResponse => {
                    if (queryResponse.status == 200) {
                        this.updateData()
                    }
                })
        },

        uploadArmor() {
            axios.post('http://localhost:3000/vybava/createArmor',
                {
                    'name': this.chosenName,
                    'type': this.chosenType,
                    'description': this.chosenDescription,
                    'abilities': this.chosenAbilities,
                    'obrana': this.chosenArmor,
                    'weight': this.chosenWeight
                })
                .then(queryResponse => {
                    if (queryResponse.status == 200) {
                        this.updateData()
                    }
                })
        },

        /**
         * Nahraje předmět do databáze
         */
        uploadItem() {
            if(this.valid){
            axios.post('http://localhost:3000/vybava/createItem',
                {
                    'name': this.chosenName,
                    'type': this.chosenType,
                    'description': this.chosenDescription,
                    'abilities': this.chosenAbilities,
                    'weight': this.chosenWeight
                })
                .then(queryResponse => {
                    if (queryResponse.status == 200) {
                        this.updateData()
                        this.clearInputs()
                    }
                })
            }else{
                this.showAlert = true;
                this.alertTitle = "Neplatný formulář"
                this.alertText = "Formulář není správně vyplněný. Prosím zkontrolujte si zadaná data"
            }
        },

        /**
         * Načte nová data pro zobrazení v tabulce existujících předmětů
         */
        updateData() {
            axios.get('http://localhost:3000/vybava/allType', { params: { type: this.chosenType } })
                .then(response => {
                    this.loadedData = response.data
                })
        },

        /**
         * Smaže item z databáze předmětů
         */
        removeItem(itemID) {
            axios.get('http://localhost:3000/vybava/removeItem', { params: { itemID: itemID } })
                .then(queryResponse => {
                    if (queryResponse.status == 200) {
                        this.updateData()
                    }
                })
        },

        /**
         * Vyčistí formulář 
         */
        clearInputs() {
                this.chosenName = null,
                this.chosenDescription = null,
                this.chosenAbilities = null,
                this.chosenPierce = null,
                this.chosenDamageBase = null,
                this.chosenDamageSeverity = null,
                this.chosenArmor = null,
                this.chosenWeight = null
        }
    }
}
</script>

<style></style>