<template>
    <div>
        <v-row>
            <v-col>
                <h3 class="mt-3">Schopnost #{{ props.int }}</h3>
            </v-col>

            <v-btn align="right" icon="mdi-close-box-outline" color="error" @click="$emit('removeAbility',props.int)"></v-btn>
        </v-row>
        <v-divider class="mb-3"></v-divider>
        <v-row>
            <v-col>
                <v-text-field color="secondary" v-model="ability.jmeno" variant="outlined" label="Jméno schopnosti"
                    @change="change" :rules="rules.required"> </v-text-field>

                <v-select color="secondary" @change="change" v-model="ability.typ" variant="outlined" label="Typ"
                    :items='["Pasivní", "Aktivní"]' :rules="rules.required"> </v-select>

                <v-text-field v-if="ability.typ == 'Aktivní'" color="secondary" v-model="ability.cd" type="number"
                    variant="outlined" label="Počet kol vyčerpání" :rules="rules.required" @change="change"> </v-text-field>
            </v-col>
            <v-col>
                <v-textarea color="secondary" variant="outlined" style="height: 125%;" v-model="ability.schopnost"
                    label="Popis" :rules="rules.required">
                </v-textarea>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['int'])
const ability = ref({})
const emit = defineEmits(['updatedAbility','removeAbility']);
const rules = {
    required: [
        value => {
            if (value?.length > 0) return true
            return 'Formulář není vyplněný'
        },
    ],
};

function change() {
    emit('updatedAbility', ability.value ,props.int)
}




</script>