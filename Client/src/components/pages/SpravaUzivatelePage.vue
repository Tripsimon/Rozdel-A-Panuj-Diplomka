<script setup>
import { setTransitionHooks } from "vue";
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
const uzivatelStore = useUzivatelStore();
</script>

<template>
    <v-container>
        <v-card color="primary">
            <v-card-text>
                <h3>Přihlášený uživatel:</h3>
                    <p>{{ uzivatelStore.prezdivka }}</p>
                    <p v-if='uzivatelStore.prezdivka == ""' >žádný přihlášený uživatel</p>
                    <br>
                <button color="secondary" @click="odhlaseni(uzivatelStore)" >Odhlásit uživatele</button>
            </v-card-text>
            
        </v-card>
    </v-container>
</template>
        

    
<script>
export default {
    data: () => ({

    }),

    methods: {
        odhlaseni(store){
            console.log(store.odhlasUzivatele());
        }
    },
}
</script>
        
<style>

</style>