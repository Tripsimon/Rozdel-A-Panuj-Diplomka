<template>
    <v-card :color="color">
        <v-card-text>

            <v-row>
                <v-col cols="9">
                    <h3>{{ props.ability.jmeno }}</h3>
                </v-col>

                <v-col>
                    <p>Potřebný level: {{ props.ability.level }}</p>
                </v-col>
            </v-row>

            <v-row>

                <v-col cols="9">
                    <h4>Popis:</h4>
                    <p>{{ props.ability.popisFluff }}</p>
                    <br>
                    <h4>Schopnost:</h4>
                    <p>[ {{ props.ability.popisSchopnosti }} ]</p>
                </v-col>

                <v-col cols="3">
                    <p>Typ: {{ props.ability.typPouziti }}</p>
                                        <br>
                    <p v-if="props.ability.typPouziti == 'Aktivní'">Počet použití: {{ props.ability.pocetPouziti }}</p>
                    <p v-if="props.ability.typPouziti == 'Aktivní'">Odpočinek pro obnovu: {{ props.ability.cd }}</p>
                </v-col>

            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup>

//Props
const props = defineProps(['ability', 'color'])

</script>