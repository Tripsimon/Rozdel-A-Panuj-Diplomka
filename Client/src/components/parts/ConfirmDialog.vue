<template>
    <v-row justify="center">
        <v-dialog v-model="isShown.value" persistent width="auto">

            <v-card>
                <v-card-title  style="background-color: #001d3d;" class="text-h5">
                    Nenávratná akce
                </v-card-title>
                <v-card-text>Tato akce už nepůjde navrátit a data budou ztracena. Opravdu chcete pokračovat ?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" variant="text" @click="$emit('closeDialog',true)">
                        Příjmout
                    </v-btn>
                    <v-btn color="success" variant="text" @click="$emit('closeDialog',false)">
                        Zpět
                    </v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </v-row>
</template>
<script setup>
//Importy
import { ref, toRefs, watch } from 'vue'

//Props
const props = defineProps(['toggle'])
const {toggle} = toRefs(props)

//Variables
const isShown = ref(false)

//Sledování změny stavu
watch(toggle, () =>{
    isShown.value = toggle
})



</script>