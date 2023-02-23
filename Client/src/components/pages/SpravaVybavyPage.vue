

<script setup>
import axios from 'axios'
import FormData from 'form-data'
</script>
<template>


    <v-container>
        <v-card color="primary">
            <h1 class="d-flex justify-center">Správa výbavy</h1>
            <v-card-text>
                <v-select label="Typ" :items="['Zbran', 'Zbroj', 'Předmět']" v-model="chosenType" @update:modelValue="updateData()"></v-select>
            </v-card-text>
        </v-card>

        <v-card title="Tvorba předmětu" color="primary" class="mt-5" v-if="chosenType == 'Zbran'">
            <v-card-text>
                <v-text-field v-model="chosenName" label="Jméno předmětu" required>
                </v-text-field>

                <v-text-field v-model="chosenDescription" label="Popis" required>
                </v-text-field>

                <v-row>
                    <v-col>

                        <v-text-field v-model="chosenPierce" label="Pruraznost" required>
                        </v-text-field>
                    </v-col>

                    <v-col>
                        <v-text-field v-model="chosenDamage" label="Poškození" required>
                        </v-text-field>
                    </v-col>


                </v-row>

                <v-text-field v-model="chosenWeight" label="Váha" required>
                </v-text-field>

            </v-card-text>

            <v-card-actions>
                <v-btn @click="uploadWeapon">
                    Nahrát
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-card title="Tvorba předmětu" color="primary" class="mt-5" v-if="chosenType == 'Zbroj'">
            <v-card-text>
                <v-text-field v-model="chosenName" label="Jméno předmětu" required>
                </v-text-field>

                <v-text-field v-model="chosenDescription" label="Popis" required>
                </v-text-field>


                <v-text-field v-model="chosenArmor" label="Obrana" required>
                </v-text-field>

                Asi váhová kategorie

                <v-text-field v-model="chosenWeight" label="Váha" required>
                </v-text-field>

            </v-card-text>

            <v-card-actions>
                <v-btn @click="uploadArmor">
                    Nahrát
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-card title="Tvorba předmětu" color="primary" class="mt-5" v-if="chosenType == 'Předmět'">
            <v-card-text>
                <v-text-field v-model="chosenName" label="Jméno předmětu" required>
                </v-text-field>

                <v-text-field v-model="chosenDescription" label="Popis" required>
                </v-text-field>

                <v-text-field v-model="chosenWeight" label="Váha" required>
                </v-text-field>

            </v-card-text>

            <v-card-actions>
                <v-btn @click="uploadItem">
                    Nahrát
                </v-btn>
            </v-card-actions>
        </v-card>




        <v-card v-for="item in this.loadedData">
            <v-card-text>
                {{ item }}
            </v-card-text>
        </v-card>



    </v-container>
</template>



<script>


export default {
    data: () => ({
        chosenType: null,
        chosenName: null,
        chosenDescription: null,
        chosenPierce: null,
        chosenDamage: null,
        chosenArmor: null,
        chosenWeight: null,

        loadedData: [],
    }),



    methods: {
        uploadWeapon() {
            axios.post('http://localhost:3000/vybava/createWeapon',
                {
                    'name': this.chosenName,
                    'type': this.chosenType,
                    'description': this.chosenDescription,
                    'pierce': this.chosenPierce,
                    'damage': this.chosenDamage,
                    'weight': this.chosenWeight
                })
                .then(response => console.log(response))
        },

        uploadArmor(){
            axios.post('http://localhost:3000/vybava/createArmor',
                {
                    'name': this.chosenName,
                    'type': this.chosenType,
                    'description': this.chosenDescription,
                    'obrana': this.chosenArmor,
                    'weight': this.chosenWeight
                })
                .then(response => console.log(response))
        },

        uploadItem(){
            axios.post('http://localhost:3000/vybava/createItem',
                {
                    'name': this.chosenName,
                    'type': this.chosenType,
                    'description': this.chosenDescription,
                    'weight': this.chosenWeight
                })
                .then(response => console.log(response))
        },

        updateData(){
            axios.get('http://localhost:3000/vybava/allType',{params:{type: this.chosenType}})
                .then(response =>{
                    this.loadedData = response.data
                }
            )
        }

    }
}
</script>

<style>

</style>