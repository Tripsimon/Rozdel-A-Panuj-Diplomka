<template>
    <v-divider></v-divider>
    <v-card :color="color">
        <v-card-text>
            <v-row>
                <v-col>
                    <h4>{{ ability.jmeno }}</h4>
                </v-col>

                <v-col>
                    <p>Potřebný level: {{ ability.level }}</p>
                </v-col>
            </v-row>
            <br>
            <p>{{ ability.popisFluff }}</p>
            <p>[ {{ ability.popisSchopnosti }} ]</p>
            <v-row v-if="ability.typPouziti == 'Aktivní'">
                <v-col>
                    <p>Počet použití: {{ ability.pocetPouziti}}</p>
                </v-col>

                <v-col>
                    <p>Odpočinek pro obnovu: {{ ability.cd }}</p>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'Ability Card',
    props: ['ability','color'],

    data: () => ({
    }),
}
</script>