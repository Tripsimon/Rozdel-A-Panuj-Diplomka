<script setup>
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
const uzivatelStore = useUzivatelStore();
</script>

<template>
  <v-container>
    <v-card color="primary">
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field v-model="email" label="E-mail" required></v-text-field>

          <v-text-field v-model="heslo" :rules="[v => !!v || 'Item is required']" label="Heslo" required></v-text-field>
          <v-btn color="success" class="mr-4" @click="prihlaseni(email, heslo, uzivatelStore)">
            Přihlášení
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
    


<script>
export default {
  data: () => ({
    email: "",
    heslo: ""
  }),

  methods: {
    prihlaseni(email, heslo, store) {
      let obsah = JSON.stringify({
        "email": email,
        "heslo": heslo,
      })
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3000/uzivatel/prihlaseni");

      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.send(obsah);

      xhr.onload = () => {

        if (xhr.status == 200) {
          let json = JSON.parse(xhr.response);
          store.$patch({
            prihlasen: true,
            prezdivka: json.prezdivka,
            _id: json._id,
          });
        } else if (xhr.status == 404) {
          console.log("Uživatel neexistuje");
        }
      };


    }

  },
}
</script>
    
<style>

</style>