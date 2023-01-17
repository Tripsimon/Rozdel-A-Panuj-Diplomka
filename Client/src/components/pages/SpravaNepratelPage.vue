

<script setup>
import axios from 'axios'
import FormData from 'form-data'
</script>
<template>


    <v-container>
        <v-card color="primary">
            <h1 class="d-flex justify-center">Správa nepřátel</h1>
        </v-card>

        <v-card title="Tvorba nepřítele" color="primary" class="mt-5" >
            <v-card-text>
                <v-text-field v-model="chosenName" label="Jméno nepřítele" required>
                </v-text-field>

                <v-text-field v-model="chosenDescription" label="Popis" required>
                </v-text-field>

                <v-row>
                    <v-col>

                        <v-text-field v-model="chosenSpeed" label="Hbitost" required>
                        </v-text-field>
                    </v-col>

                    <v-col>
                        <v-text-field v-model="chosenConstitution" label="Houzevnatost" required>
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>

                        <v-text-field v-model="chosenPierce" label="Zbroj" required>
                        </v-text-field>
                    </v-col>

                    <v-col>
                        <v-text-field v-model="chosenDamage" label="Iniciativa" required>
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>

                        <v-text-field v-model="chosenPierce" label="Damage" required>
                        </v-text-field>
                    </v-col>

                    <v-col>
                        <v-text-field v-model="chosenDamage" label="Damage2 ?" required>
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-text-field v-model="chosenWeight" label="Váhová kategorie" required>
                </v-text-field>

            </v-card-text>

            <v-card-actions>
                <v-btn @click="uploadWeapon">
                    Nahrát
                </v-btn>
            </v-card-actions>
        </v-card>




    </v-container>
</template>



<script>


export default {
    data: () => ({
        chosenName: null,
        chosenDescription: null,

        chosenSpeed: null,
        chosenConstitution: null,

        chosenZbroj: null,
        chosenIniciativa: null,

        chosenVelikost: null,
    }),

    methods: {
       
    }
}
</script>

<style>

</style>