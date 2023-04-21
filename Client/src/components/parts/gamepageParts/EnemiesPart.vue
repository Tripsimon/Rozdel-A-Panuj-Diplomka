<template>
    <v-card color="primary">
        <v-card-title>
            <h2 style="color: #cca000;"> Nepřátelé</h2>
              <v-divider></v-divider>
        </v-card-title>
        <v-container>
            <v-expansion-panels v-if="props.enemies.length != 0">
                <v-expansion-panel v-for=" (enemy, index, key) in props.enemies" :key="key">
                    <v-expansion-panel-title style=" color: #cca000;">
                        <h2>
                            {{ enemy.jmeno + " " + enemy.realneZivoty + " / " + enemy.zivoty + " - ID:"
                                + enemy.identity }}
                        </h2>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-card-subtitle>{{ enemy.popis }}</v-card-subtitle>
                        <h3 class="d-flex mt-3">Atributy:</h3>
                        <v-divider ></v-divider>
                        <v-row>
                            <v-col>
                                <p> Síla: {{ enemy.sila }}</p>
                            </v-col>
                            <v-col>
                                <p> Houževnatost: {{ enemy.houzevnatost }}</p>
                            </v-col>
                            <v-col>
                                <p> Obratnost: {{ enemy.obratnost }}</p>
                            </v-col>
                        </v-row>
                        <v-divider color="primary"></v-divider>
                        <v-row>
                            <v-col>
                                <p> Charisma: {{ enemy.charisma }}</p>
                            </v-col>
                            <v-col>
                                <p> Inteligence: {{ enemy.inteligence }}</p>
                            </v-col>
                            <v-col>
                                <p> Znalost: {{ enemy.znalost }}</p>
                            </v-col>
                        </v-row>

                        <h3 class="d-flex mt-3">Bojové atributy:</h3>
                        <v-divider ></v-divider>

                        <v-row>
                            <v-col>
                                <p> Zbroj: {{ enemy.zbroj }}</p>
                            </v-col>
                            <v-col>
                                <p> Pruraz: {{ enemy.pruraz }}</p>
                            </v-col>

                        </v-row>
                        <v-divider color="primary"></v-divider>
                        <v-row>
                            <v-col>
                                <p> Základ poškození: {{ enemy.poskozeniZaklad }}</p>
                            </v-col>

                            <v-col>
                                <p> Závažnost poškození: {{ enemy.poskozeniZavaznost }}</p>
                            </v-col>
                        </v-row>

                        <h3 class="d-flex mt-3">Schopnosti:</h3>
                        <v-divider class="mb-3"></v-divider>
                        <AbilityCard class="mb-3" v-for="ability in enemy.schopnosti" :key="ability._id" :ability="ability" />

                    </v-expansion-panel-text>

                    <v-expansion-panel-text class="mb-3">
                        <v-row align="center" justify="space-around">

                            <v-btn color="primary" @click="$emit(choseToFight,index) ">Vybrat pro boj</v-btn>
                            <v-btn color="success" @click="fightAddLifeToEnemy(index)">Přidat život</v-btn>
                            <v-btn color="error" @click="fightRemoveLifeToEnemy(index)">Odebrat život</v-btn>
                            <v-btn color="error" @click="fightRemoveEnemy(index)">Odebrat z bojiště</v-btn>
                        </v-row>
                    </v-expansion-panel-text>

                </v-expansion-panel>
            </v-expansion-panels>
            <h4 v-if="props.enemies.length == 0">Nepřátelé nejsou vybráni pro boj</h4>
        </v-container>

    </v-card>
</template>
<script setup>
import axios from 'axios'
import { ref, toRefs, watch } from 'vue'
import AbilityCard from '../../parts/AbilityCard.vue'

const props = defineProps(['enemies'])
</script>