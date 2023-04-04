<template>
    <v-container>
        <v-card color="primary" class="mt-5">
            <v-card-title>
                <h1 align="center" class="ma-3">Tvorba nepřítele</h1>
            </v-card-title>

            <v-card-text>

                <v-form ref="form" @submit.prevent="submit">
                    <!-- Základní informace-->
                    <h2 class="mt-3">Základní informace</h2>
                    <v-divider class="mb-3"></v-divider>
                    <v-row>
                        <v-col>
                            <v-text-field color="secondary" variant="outlined" v-model="chosenName" :rules="rules.required"
                                label="Jméno nepřítele" required>
                            </v-text-field>

                            <v-select color="secondary" variant="outlined" label="Typ nepřítele"
                                :items="avaliableMonsterTypes.data" :rules="rules.required">
                            </v-select>

                            <v-select color="secondary" variant="outlined" label="Velikostní skupina"
                                :items='["Maličká", "Malá", "Lidská", "Veliká", "Gigantická"]' v-model="chosenSizeGroup"
                                :rules="rules.required">
                            </v-select>

                        </v-col>
                        <v-col>
                            <v-textarea color="secondary" variant="outlined" style="height: 125%;"
                                v-model="chosenDescription" label="Popis" :rules="rules.required">
                            </v-textarea>
                        </v-col>
                    </v-row>

                    <!-- Schopnosti -->
                    <h2 class="mt-3">Schopnosti</h2>
                    <v-divider class="mb-3"></v-divider>
                    <v-btn class="mb-3" color="secondary" variant="outlined"
                        @click="() => { chosenAbilities.push({}); abilityNumber++ }">
                        Přidat schopnost
                    </v-btn>

                    <div v-for="instance in abilityNumber" v-bind:key="instance">
                        <v-row >
                            <v-col>
                                <h3 class="mt-3">Schopnost #{{ instance }}</h3>
                            </v-col>

                            <v-btn align="right" icon="mdi-close-box-outline" @click="removeAbility(instance-1)" color="error"></v-btn>

                        </v-row>
                        <v-divider class="mb-3"></v-divider>
                        <v-row>
                            <v-col>
                                <v-text-field color="secondary" v-model="chosenAbilities[instance - 1].jmeno"
                                    variant="outlined" label="Jméno schopnosti" :rules="rules.required"> </v-text-field>
                                <v-select color="secondary" v-model="chosenAbilities[instance - 1].typ" variant="outlined"
                                    label="Typ" :items='["Pasivní", "Aktivní"]' :rules="rules.required"> </v-select>
                                <v-text-field v-if="chosenAbilities[instance - 1].typ == 'Aktivní'" color="secondary"
                                    v-model="chosenAbilities[instance - 1].cd" type="number" variant="outlined"
                                    label="Počet kol vyčerpání" :rules="rules.required"> </v-text-field>
                            </v-col>
                            <v-col>
                                <v-textarea color="secondary" variant="outlined" style="height: 125%;"
                                    v-model="chosenAbilities[instance - 1].schopnost" label="Popis" :rules="rules.required">
                                </v-textarea>
                            </v-col>
                        </v-row>


                    </div>

                    <h2 class="mt-3">Atributy</h2>
                    <v-divider class="mb-3"></v-divider>
                    <v-row>
                        <v-col>
                            <v-text-field color="secondary" type="number" variant="outlined" v-model="chosenStrength"
                                label="Síla" :rules="rules.required">
                            </v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field color="secondary" type="number" variant="outlined" v-model="chosenConstitution"
                                label="Houževnatost" :rules="rules.required">
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>

                            <v-text-field color="secondary" type="number" variant="outlined" v-model="chosenAgility"
                                label="Obratnost" :rules="rules.required">
                            </v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field color="secondary" type="number" variant="outlined" v-model="chosenCharisma"
                                label="Charisma" :rules="rules.required">
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>

                            <v-text-field color="secondary" type="number" variant="outlined" v-model="chosenInteligence"
                                label="Inteligence" :rules="rules.required">
                            </v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field color="secondary" type="number" variant="outlined" v-model="chosenKnowledge"
                                label="Znalost" :rules="rules.required">
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>

                        <v-col>
                            <v-text-field color="secondary" type="number" variant="outlined" v-model="chosenArmor"
                                label="Zbroj" :rules="rules.required">
                            </v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field color="secondary" type="number" variant="outlined" v-model="chosenLife"
                                label="životy" :rules="rules.required">
                            </v-text-field>
                        </v-col>



                    </v-row>

                    <v-text-field color="secondary" variant="outlined" type="number" v-model="chosenPierce" label="Průraz"
                        :rules="rules.required">
                    </v-text-field>


                    <v-row>
                        <v-col>
                            <v-text-field color="secondary" type="number" variant="outlined" v-model="chosenDamageBase"
                                label="Základní poškození" :rules="rules.required">
                            </v-text-field>
                        </v-col>
                        <v-col>

                            <v-text-field color="secondary" type="number" variant="outlined" v-model="chosenDamageSeverity"
                                label="Závažnost poškození" :rules="rules.required">
                            </v-text-field>
                        </v-col>


                    </v-row>

                    <v-row>
                        <v-col>

                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-btn color="secondary" @click="submit()">
                    Nahrát
                </v-btn>
            </v-card-actions>
        </v-card>


        <v-card color="primary" class="mt-5">
            <v-card-title>
                <h1 align="center" class="ma-3">Dostupná monstra</h1>
            </v-card-title>

            <v-card-text v-if="loadedMonsters == ''">
                <h2 class="ma-3">Žádná dostupná monstra</h2>
            </v-card-text>
            <v-card-text v-else>
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
                    <tbody>
                        <tr v-for="monster in loadedMonsters" :key="monster.jmeno">
                            <th>{{ monster.jmeno }}</th>
                            <th>{{ monster.popis }}</th>
                            <th>
                                <p v-for="ability in monster.schopnosti" :key="ability.jmeno">{{ ability.jmeno }}</p>
                            </th>

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
                            <th><v-btn icon="mdi-close-box-outline" color="error"
                                    @click="removeMonster(monster._id)"></v-btn>
                            </th>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>



    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const form = ref(null);

const loadedMonsters = ref([]);
const avaliableMonsterTypes = ref(["Data se nepodařilo načíst"])

const chosenName = ref(null);
const chosenDescription = ref(null);

const abilityNumber = ref(0)
const chosenAbilities = ref([]);

const chosenStrength = ref(null);
const chosenConstitution = ref(null);
const chosenAgility = ref(null);
const chosenCharisma = ref(null);
const chosenInteligence = ref(null);
const chosenKnowledge = ref(null);



const rules = {
    required: [
        value => {
            if (value?.length > 0) return true
            return 'Formulář není vyplněný'
        },
    ],
};

const chosenArmor = ref(null);
const chosenLife = ref(null);
const chosenPierce = ref(null);
const chosenDamageBase = ref(null);
const chosenDamageSeverity = ref(null);

const chosenSizeGroup = ref('Lidská');

onMounted(() => {
    getMonsters()
    getMonsterTypes()
})


function getMonsterTypes() {
    axios.get(axios.defaults.baseURL + '/config/get', { params: { typ: 'typyNepratel' } })
        .then(queryResponse => avaliableMonsterTypes.value = queryResponse)
}

/**
 * Vypíše všechna dostupná monstra
 */
function getMonsters() {
    axios.get(axios.defaults.baseURL + '/monster/dump')
        .then(queryResponse => loadedMonsters.value = queryResponse.data)
}

function removeAbility(index) {
    this.abilityNumber--;
    chosenAbilities.value.splice(index,1)
}

function submit() {
    form.value?.validate().then(({ valid }) => {
        if (valid) {
            axios.post(axios.defaults.baseURL + '/monster/createMonster',
                {
                    'name': chosenName.value,
                    'description': chosenDescription.value,
                    'abilities': chosenAbilities.value,

                    'strength': chosenStrength.value,
                    'constitution': chosenConstitution.value,
                    'agility': chosenAgility.value,
                    'charisma': chosenCharisma.value,
                    'inteligence': chosenInteligence.value,
                    'knowledge': chosenKnowledge.value,

                    'armor': chosenArmor.value,
                    'life': chosenLife.value,

                    'pierce': chosenPierce.value,
                    'damageBase': chosenDamageBase.value,
                    'damageSeverity': chosenDamageSeverity.value,

                    'sizeGroup': chosenSizeGroup.value
                }
            ).then(response => { getMonsters() })
        }

    }).catch((nvm) => {
        console.log(nvm);
    })

}


/**
 * Smaže monstrum z databáze
 * @param {int} id ID monstra
 */
function removeMonster(id) {
    axios.delete(axios.defaults.baseURL + '/monster/removeMonster', { data: { 'id': id } })
        .then(queryResponse => {
            if (queryResponse.data == 'monsterDeleted') { this.getMonsters() }

        })
}



</script>

<style></style>