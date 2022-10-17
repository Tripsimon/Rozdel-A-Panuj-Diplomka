
<template>


<v-container>
<v-card>
  <h1>Registrace</h1>
  <v-card-text>

<v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

  <v-text-field
      v-model="email"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="prezdivka"
      :counter="10"
      :rules="nameRules"
      label="Jméno"
      required
    ></v-text-field>


    <v-text-field
      v-model="heslo"
      :items="items"
      label="Heslo"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :items="items"
      label="Heslo znovu"
      required
    ></v-text-field>


    <v-btn
      
      color="success"
      class="mr-4"
      @click="register(email,prezdivka,heslo)"
    >
      Registrovat
    </v-btn>
  </v-form>
</v-card-text>
</v-card>
</v-container>
</template>
    
    
    
    <script>
    
    
        export default {
            data: () => ({
              email: 1
            }),
        
            methods: {

              register(email,prezdivka,heslo){


                let obsah = JSON.stringify({
                    "email":email,
                    "heslo":prezdivka,
                    "prezdivka":heslo
                })

                
                let xhr = new XMLHttpRequest();
                //xhr.open("POST", "https://reqbin.com/echo/post/json");
                xhr.open("POST", "http://localhost:3000/uzivatel/registrace");

                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");

                xhr.onload = () => console.log(xhr.responseText);

                xhr.send(obsah);  
                

                /*
                try{
                  const res = await fetch("http://localhost:3000/uzivatel",
                  {method: "GET",
                  headers: {"Content-Type":"application/json"},
                  body: JSON.stringify({
                    "email":'loggedUser',
                    "heslo":'gameName',
                    "prezdivka":'collectors',
                })
                })
                }catch{
                  console.log("vytkytla se chyba");
                }
                */
              }
            }
          }
    </script>
    
    <style>
    
    </style>