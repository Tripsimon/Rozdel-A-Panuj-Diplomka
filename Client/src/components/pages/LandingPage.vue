<template>
  <div id="content">

    <v-parallax src="../../../src/assets/images/landingpage.png">
      <div class="d-flex flex-column fill-height justify-center align-center text-white">
        <h1 class="text-h4 font-weight-thin mb-4">
          Rozděl a Panuj
        </h1>
        <h4 class="subheading">
          Společné dobrodružství na dosah ruky !
        </h4>
      </div>
    </v-parallax>

    <v-container>

      <v-card class="mb-3" variant="tonal">
        <v-card-title style="background-color: #001d3d;">
          <p style="color: #cca000;">Dobrodružství zcela zdarma </p>
        </v-card-title>
        <v-card-text class="mt-3">
          <p >Pojdte si s přáteli užít nevídané dobrodružství plné zvratů a hrdinství z pohodlí vašeho domova. Stačí mít jen skupinku statečných přátel a můžete začít třeba hned !</p>
        </v-card-text>
        <v-card-actions>
          <v-btn to="/registrace" color="secondary">Registrovat</v-btn>
          <v-btn to="/prihlaseni" color="secondary">Přihlásit</v-btn>
        </v-card-actions>
      </v-card>

      <v-card class="mb-3" variant="tonal">
        <v-card-title style="background-color: #001d3d;">
          <p style="color: #cca000;"> Zjednodušená pravidla !</p>
        </v-card-title>
        <v-card-text class="mt-3">
          <p>Aplikace Rozděl a Panuj tradičně složitá a nabobtnaná pravidla stolních her na hrdiny přetváří do zábavného a interaktivního systému pro úplné nováčky nebo veterány žánru
          </p>
          </v-card-text>
        <v-card-actions>
          <v-btn to="/pravidla" color="secondary">Pravidla</v-btn>
        </v-card-actions>
      </v-card>

      <v-card class="mb-3" variant="tonal">
        <v-card-title style="background-color: #001d3d;">
          <p style="color: #cca000;"> Plně v češtině !</p>
        </v-card-title>
        <v-card-text class="mt-3">
          Už se nemusíte snažit krkolomně překládat pravidla zahraničních stolních her pro své kamarády. Rozděl a Panuj je plně v čestině.
        </v-card-text>
      </v-card>


      <v-card class="mb-3" variant="tonal">
        <v-card-title style="background-color: #001d3d;">
          <p style="color: #cca000;">Své dobrodružství, svá úskalí</p>
        </v-card-title>
        <v-card-text class="mt-3">
          Rozděl a Panuj podporuje naprostou volnost v nastavení každého dobrodružství. Přidejte si svá monstra, dobrodruhy, předměty nebo i lokace !
        </v-card-text>
      </v-card>

    </v-container>
  </div>
</template>

<script setup>
</script>
