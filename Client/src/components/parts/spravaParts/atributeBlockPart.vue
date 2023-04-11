<template>
    <v-col >
        <v-card  align="center">
            <v-card-title>
                {{ props.name }}
            </v-card-title>
            <v-divider color="secondary"></v-divider>

                <v-row>
                    <v-col cols="12" sm="4">
                        <v-btn mb="4" size="medium" variant="text" icon="mdi-minus" color="secondary"
                            @click="$emit('decrease')">
                        </v-btn>
                    </v-col>
                    <v-col align="center" justify="center" cols="12" sm="4">
                        <span mb="4" class="text-h2 font-weight-light mb-4">
                            {{props.atribute}}
                        </span>
                        </v-col>
                    <v-col align="center" justify="center" cols="12" sm="4">
                        <v-btn mb="4" size="medium " variant="text" icon="mdi-plus" color="secondary"
                            @click="$emit('increase')">
                        </v-btn>
                    </v-col>
                </v-row>

        </v-card>
    </v-col>
</template>
<script setup>
const props = defineProps(['atribute','name'])

</script>