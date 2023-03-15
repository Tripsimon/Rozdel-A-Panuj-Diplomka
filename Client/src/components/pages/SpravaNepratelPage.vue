

<script setup>
import axios from 'axios'
import FormData from 'form-data'
</script>
<template>
    <v-container>
        <v-card title="Tvorba nepřítele" color="primary" class="mt-5">
            <v-card-text>
                <v-text-field color="secondary" variant="outlined" v-model="chosenName" label="Jméno nepřítele" required>
                </v-text-field>

                <v-row>
                    <v-col>
                        <v-textarea color="secondary" variant="outlined" v-model="chosenDescription" label="Popis" required>
                        </v-textarea>
                    </v-col>
                    <v-col>
                        <v-textarea color="secondary" variant="outlined" v-model="chosenAbilities" label="Schopnosti" required>
                        </v-textarea>
                    </v-col>
                </v-row>


                <v-row>
                    <v-col>
                        <v-text-field color="secondary" variant="outlined" v-model="chosenStrength" label="Síla" required>
                        </v-text-field>
                    </v-col>

                    <v-col>
                        <v-text-field color="secondary" variant="outlined" v-model="chosenConstitution" label="Houževnatost"
                            required>
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>

                        <v-text-field color="secondary" variant="outlined" v-model="chosenAgility" label="Obratnost"
                            required>
                        </v-text-field>
                    </v-col>

                    <v-col>
                        <v-text-field color="secondary" variant="outlined" v-model="chosenCharisma" label="Charisma"
                            required>
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>

                        <v-text-field color="secondary" variant="outlined" v-model="chosenInteligence" label="Inteligence"
                            required>
                        </v-text-field>
                    </v-col>

                    <v-col>
                        <v-text-field color="secondary" variant="outlined" v-model="chosenKnowledge" label="Znalost"
                            required>
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>

                    <v-col>
                        <v-text-field color="secondary" variant="outlined" v-model="chosenArmor" label="Zbroj" required>
                        </v-text-field>
                    </v-col>

                    <v-col>
                        <v-text-field color="secondary" variant="outlined" v-model="chosenLife" label="životy" required>
                        </v-text-field>
                    </v-col>



                </v-row>

                <v-text-field color="secondary" variant="outlined" v-model="chosenPierce" label="Průraz" required>
                </v-text-field>


                <v-row>
                    <v-col>
                        <v-text-field color="secondary" variant="outlined" v-model="chosenDamageBase"
                            label="Základní poškození" required>
                        </v-text-field>
                    </v-col>
                    <v-col>

                        <v-text-field color="secondary" variant="outlined" v-model="chosenDamageSeverity"
                            label="Závažnost poškození" required>
                        </v-text-field>
                    </v-col>


                </v-row>

                <v-row>
                    <v-col>
                        <v-select color="secondary" variant="outlined" label="Velikostní skupina"
                            :items='["Maličká", "Malá", "Střední", "Veliká", "Gigantická"]'
                            v-model="chosenSizeGroup"></v-select>
                    </v-col>
                </v-row>

            </v-card-text>

            <v-card-actions>
                <v-btn color="secondary" @click="uploadMonster">
                    Nahrát
                </v-btn>
            </v-card-actions>
        </v-card>


        <v-card color="primary" class="mt-5">
            <v-card-title>Dostupná monstra</v-card-title>
            <v-card-text>
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
                                Schopnosti
                            </th>

    
                            <th>
                                Atributy
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
                                Velikostní skupina
                            </th>
                            <th>
                                Akce
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="monster in this.loadedMonsters" :key="monster.jmeno">
                            <th>{{ monster.jmeno }}</th>
                            <th>{{ monster.popis }}</th>
                            <th>{{ monster.schopnosti }}</th>

                            <th>
                                <p>Síla:{{ monster.sila }}</p>
                                <p>Houževnatost:{{ monster.houzevnatost }}</p>
                                <p>Obratnost:{{ monster.sila }}</p>
                                <p>Charisma:{{ monster.charisma }}</p>
                                <p>Inteligence:{{ monster.inteligence }}</p>
                                <p>Znalost:{{ monster.znalost }}</p>
                            </th>

                            <th>{{ monster.pruraz }}</th>
                            <th>{{ monster.poskozeniZaklad }}</th>
                            <th>{{ monster.poskozeniZavaznost }}</th>
                            <th>{{ monster.velikostniSkupina }}</th>
                            <th><v-btn icon="mdi-close-box-outline" color="error" @click="removeMonster(monster._id)"></v-btn>
                            </th>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>



    </v-container>
</template>



<script>


export default {
    data: () => ({

        loadedMonsters: null,


        chosenName: null,
        chosenDescription: null,
        chosenAbilities: null,

        chosenStrength: null,
        chosenConstitution: null,
        chosenAgility: null,
        chosenCharisma: null,
        chosenInteligence: null,
        chosenKnowledge: null,

        chosenArmor: null,
        chosenLife: null,

        chosenPierce: null,
        chosenDamageBase: null,
        chosenDamageSeverity: null,

        chosenSizeGroup: null,
    }),

    mounted() {
        this.getMonsters()
    },

    methods: {

        /**
         * Vypíše všechna dostupná monstra
         */
        getMonsters() {
            axios.get('http://localhost:3000/monster/dump')
                .then(queryResponse => this.loadedMonsters = queryResponse.data)
        },

        uploadMonster() {
            axios.post('http://localhost:3000/monster/createMonster',
                {
                    'name': this.chosenName,
                    'description': this.chosenDescription,
                    'abilities': this.chosenAbilities,

                    'strength': this.chosenStrength,
                    'constitution': this.chosenConstitution,
                    'agility': this.chosenAgility,
                    'charisma': this.chosenCharisma,
                    'inteligence': this.chosenInteligence,
                    'knowledge': this.chosenKnowledge,

                    'armor': this.chosenArmor,
                    'life': this.chosenLife,

                    'pierce': this.chosenPierce,
                    'damageBase': this.chosenDamageBase,
                    'damageSeverity': this.chosenDamageSeverity,

                    'sizeGroup': this.chosenSizeGroup
                }
            ).then(response => { console.log(response), this.getMonsters() })
        },

        /**
         * Smaže monstrum z databáze
         * @param {int} id ID monstra
         */
        removeMonster(id){
            axios.delete('http://localhost:3000/monster/removeMonster',{ data:{'id':id}})
                .then( queryResponse =>{
                    if(queryResponse.data == 'monsterDeleted'){this.getMonsters()}
                    
                })
        },

    }
}
</script>

<style></style>