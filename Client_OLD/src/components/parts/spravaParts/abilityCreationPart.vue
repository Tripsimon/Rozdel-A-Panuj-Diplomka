<template>
    <div>
        <v-row>
            <v-col>
                <h3 class="mt-3">Schopnost #{{ props.int + 1 }}</h3>
            </v-col>
<v-col class="text-right">
            <v-btn  icon="mdi-delete" color="error" @click="$emit('removeAbility',props.int)"></v-btn>
        </v-col>
        </v-row>
        <v-divider class="mb-3"></v-divider>
        <v-row>
            <v-col>
                <v-text-field color="secondary" v-model="ability.jmeno" variant="outlined" label="Jméno schopnosti"
                    @change="change" :rules="rules.required"> </v-text-field>

                <v-select color="secondary" @update:modelValue="change" v-model="ability.typ" variant="outlined" label="Typ"
                    :items='["Pasivní", "Aktivní"]' :rules="rules.required"> </v-select>

                <v-text-field v-if="ability.typ == 'Aktivní'" color="secondary" v-model="ability.cd" type="number"
                    variant="outlined" label="Počet kol vyčerpání" :rules="rules.required" @change="change"> </v-text-field>
            </v-col>
            <v-col>
                <v-textarea color="secondary" variant="outlined" style="height: 125%;" v-model="ability.schopnost"
                    label="Popis" @change="change" :rules="rules.required">
                </v-textarea>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>

//Importy
import { ref,watch } from 'vue'
const emit = defineEmits(['updatedAbility','removeAbility']);

//Props
const props = defineProps(
    {
        int: Number,
        abilityProp: Object
    }
)
const ability = ref(props.abilityProp);

const rules = {
    required: [
        value => {
            if (value?.length > 0) return true
            return 'Formulář není vyplněný'
        },
    ],
};

/**
 * Emit změny u schopnosti
 */
function change() {
    emit('updatedAbility', ability.value ,props.int)
}

/**
 * Sledování změn
 */
watch(() => props.abilityProp, (val) => {
    ability.value = val;
})
</script>