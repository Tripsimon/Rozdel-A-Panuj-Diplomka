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
                        <v-divider></v-divider>
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
                        <v-divider></v-divider>

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

                        <v-card class="mb-3" v-for="ability in enemy.schopnosti" :key="ability">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="9">
                                        <h3>{{ ability.jmeno }}</h3>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="9">
                                        <h4>Popis schopnosti:</h4>
                                        <p>{{ ability.schopnost }}</p>
                                        <br>
                                    </v-col>

                                    <v-col cols="3">
                                        <p>Typ: {{ ability.typ }}</p>
                                        <br>

                                        <p v-if="ability.typ == 'Aktivní'">Odpočinek pro obnovu: {{
                                            ability.cd }}</p>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>

                    </v-expansion-panel-text>

                    <v-expansion-panel-text v-if="props.rights == 'Owner'" class="mb-3">
                        <v-row align="center" justify="space-around">
                            <v-btn color="success" @click="$emit('addLife', index)">Přidat život</v-btn>
                            <v-btn color="error" @click="$emit('removeLife', index)">Odebrat život</v-btn>
                            <v-btn color="error" @click="$emit('killOff', index)">Odebrat z bojiště</v-btn>
                        </v-row>
                    </v-expansion-panel-text>

                </v-expansion-panel>
            </v-expansion-panels>
            <h4 v-if="props.enemies.length == 0">Nepřátelé nejsou vybráni pro boj</h4>
        </v-container>

    </v-card>
</template>
<script setup>

//Props
const props = defineProps(['enemies', 'rights'])

</script>