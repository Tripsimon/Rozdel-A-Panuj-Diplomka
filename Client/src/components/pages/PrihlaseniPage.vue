<template>
{{uzivatelStore.prezdivka}}
<v-container>
<v-card>
  <v-card-text>
<v-form
    ref="form"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="heslo"
      :rules="[v => !!v || 'Item is required']"
      label="Heslo"
      required
    ></v-text-field>


    <v-btn
      
      color="success"
      class="mr-4"
      @click="prihlaseni(email,heslo)"
    >
      Přihlášení
    </v-btn>
  </v-form>
</v-card-text>
</v-card>
</v-container>
</template>
    
<script setup>
import {useUzivatelStore} from "../../stores/uzivatelStore.js"
const uzivatelStore = useUzivatelStore();
</script>

<script>
export default {
  data: () => ({
    email:"",
    heslo:""
  }),
        
            methods: {
              prihlaseni (email,heslo) {
                let obsah = JSON.stringify({
                    "email":email,
                    "heslo":heslo,
                })
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost:3000/uzivatel/prihlaseni");

                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");

                xhr.send(obsah);  
                xhr.onload = () => {
                  console.log(xhr.status);
                  console.log(xhr.response);
                  console.log(uzivatelStore);
                };
                

              }
            
            },
          }
    </script>
    
    <style>
    
    </style>