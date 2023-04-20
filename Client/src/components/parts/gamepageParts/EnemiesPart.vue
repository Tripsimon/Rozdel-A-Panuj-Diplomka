<template>
    <v-card color="primary" title="Nepřátelé">
        <v-container>
            <v-expansion-panels v-if="props.enemies.length != 0">
                <v-expansion-panel v-for=" (enemy, index, key) in props.enemies" :key="key">
                    <v-expansion-panel-title style=" color: #cca000;">
                        <h2>
                            {{ enemy.jmeno + " " + enemy.realneZivoty + " / " + enemy.zivoty + " - "
                                + enemy.identity }}
                        </h2>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-card-subtitle>{{ enemy.popis }}</v-card-subtitle>
                        <h3 class="d-flex">Atributy:</h3>
                        <v-divider class="mb-3"></v-divider>
                        <v-row>
                            <v-col>
                                <p> Síla: {{ enemy.sila }}</p>
                            </v-col>
                            <v-col>
                                <h3> Houževnatost: {{ enemy.houzevnatost }}</h3>
                            </v-col>
                            <v-col>
                                <h3> Obratnost: {{ enemy.obratnost }}</h3>
                            </v-col>
                        </v-row>

                        <v-divider></v-divider>

                        <v-row>
                            <v-col>
                                <h3> Charisma: {{ enemy.charisma }}</h3>
                            </v-col>
                            <v-col>
                                <h3> Inteligence: {{ enemy.inteligence }}</h3>
                            </v-col>
                            <v-col>
                                <h3> Znalost: {{ enemy.znalost }}</h3>
                            </v-col>
                        </v-row>

                        <v-divider></v-divider>

                        <v-row>
                            <v-col>
                                <h3> Zbroj: {{ enemy.zbroj }}</h3>
                            </v-col>
                            <v-col>
                                <h3> Pruraz: {{ enemy.pruraz }}</h3>
                            </v-col>
                            <v-col>
                                <h3> Požkození: {{ enemy.poskozeni }}</h3>
                            </v-col>
                        </v-row>

                        <h3 class="d-flex">Schopnosti:</h3>
                        <v-divider class="mb-3"></v-divider>
                        <p>{{ enemy.schopnosti }}</p>
                    </v-expansion-panel-text>


                    <v-expansion-panel-text>
                        <v-row align="center" justify="space-around">

                            <v-btn @click="fightChoseEnemy(index)">Vybrat pro boj</v-btn>
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

const props = defineProps(['enemies'])
</script>