<template>
  <v-card color="primary" class="mt-3">
    <v-card-title>
      <h2 style="color: #cca000;">Hod kostkou</h2>
      <v-divider></v-divider>
    </v-card-title>
    <v-container>
      <v-row>

        <!-- DOBRODRUZI -->
        <v-col v-if="props.throwType == 'Atributy'">
          <v-card v-if="props.adventurer == null">
            <v-card-title>
              <h3 style="color: #cca000;">Vyberte dobrodruha</h3>
              <v-divider></v-divider>
            </v-card-title>
          </v-card>
          <v-card v-if="props.adventurer != null">
            <v-card-title>
              <h3 style="color:#90EE90"> {{ getAdventurerName() }}</h3>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col>Síla: {{ props.adventurer.atributy.sila }}</v-col>
                <v-col>Houževnastost: {{ props.adventurer.atributy.houzevnatost }}</v-col>
              </v-row>
              <v-row>
                <v-col>Obratnost: {{ props.adventurer.atributy.obratnost }}</v-col>
                <v-col>Charisma: {{ props.adventurer.atributy.charisma }}</v-col>
              </v-row>
              <v-row>
                <v-col>Inteligence: {{ props.adventurer.atributy.inteligence }}</v-col>
                <v-col>Znalost: {{ props.adventurer.atributy.znalost }}</v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="props.throwType == 'Zásah'">
          <v-card v-if="props.adventurer == null">
            <v-card-title>
              <h3 style="color: #cca000;">Vyberte dobrodruha</h3>
              <v-divider></v-divider>
            </v-card-title>
          </v-card>
          <v-card v-if="props.adventurer != null">
            <v-card-title>
              <h3 style="color:#90EE90"> {{ getAdventurerName() }}</h3>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>

              <v-col>
                <h3>Obratnost: {{ props.adventurer.atributy.obratnost }}</h3>
              </v-col>

            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="props.throwType == 'Průraz'">
          <v-card v-if="props.adventurer == null">
            <v-card-title>
              <h3 style="color: #cca000;">Vyberte dobrodruha</h3>
              <v-divider></v-divider>
            </v-card-title>
          </v-card>
          <v-card v-if="props.adventurer != null">
            <v-card-title>
              <h3 style="color:#90EE90"> {{ getAdventurerName() }}</h3>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>
              <v-select :items="props.adventurer.inventar" v-model="chosenItem" item-title="jmeno" return-object
                label="Vyberte předmět"></v-select>
              <v-col v-if="!!chosenItem">
                <h3 v-if="chosenItem.typ == 'Zbraň'">Průraz: {{
                  chosenItem.pruraznost
                }}</h3>
                <h3 v-else>Předmět nemá zadanou hodnotu pruraznosti</h3>
              </v-col>

            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="props.throwType == 'Steč'">
          <v-card v-if="props.adventurer == null">
            <v-card-title>
              <h3 style="color: #cca000;">Vyberte dobrodruha</h3>
              <v-divider></v-divider>
            </v-card-title>
          </v-card>
          <v-card v-if="props.adventurer != null">
            <v-card-title>
              <h3 style="color:#90EE90"> {{ getAdventurerName() }}</h3>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>

              <v-col v-if="!!chosenItem">
                <h3 v-if="chosenItem.typ == 'Zbraň'">
                Základ poškození: {{chosenItem.poskozeniZaklad}}
                </h3>
                <h3 v-if="chosenItem.typ == 'Zbraň'">
                Závažnost poškození: {{chosenItem.poskozeniZavaznost}}
                </h3>
                <h3 v-else>Předmět nemá zadanou hodnotu poškození</h3>
              </v-col>

            </v-card-text>
            <v-card-actions>
              <v-select variant="outlined" :items="props.adventurer.inventar" v-model="chosenItem" item-title="jmeno"
                return-object label="Vyberte předmět"></v-select>

            </v-card-actions>
          </v-card>
        </v-col>

        <v-col v-if="props.throwType == 'Uhyb'">
          <v-card v-if="props.adventurer == null">
            <v-card-title>
              <h3 style="color: #cca000;">Vyberte dobrodruha</h3>
              <v-divider></v-divider>
            </v-card-title>
          </v-card>
          <v-card  v-if="props.adventurer != null">
            <v-card-title>
              <h3 style="color:#90EE90"> {{ getAdventurerName() }}</h3>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>

              <v-col>
                <h3>Obratnost: {{ props.adventurer.atributy.obratnost }}</h3>
              </v-col>

            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="props.throwType == 'Blokace'">
          <v-card v-if="props.adventurer == null">
            <v-card-title>
              <h3 style="color: #cca000;">Vyberte dobrodruha</h3>
              <v-divider></v-divider>
            </v-card-title>
          </v-card>
          <v-card  v-if="props.adventurer != null">
            <v-card-title>
              <h3 style="color:#90EE90"> {{ getAdventurerName() }}</h3>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>
              <v-select :items="props.adventurerVybava" v-model="chosenItem" item-title="jmeno" return-object
                label="Vyberte předmět"></v-select>
              <v-col v-if="!!chosenItem">
                <h3 v-if="chosenItem.typ == 'Zbroj'">Obrana: {{
                  chosenItem.obrana
                }}</h3>
                <h3 v-else>Předmět nemá zadanou hodnotu obrany</h3>
              </v-col>

            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="props.throwType == 'Výdrž'">
          <v-card v-if="props.adventurer == null">
            <v-card-title>
              <h3 style="color:#90EE90"> {{ getAdventurerName() }}</h3>
              <v-divider></v-divider>
            </v-card-title>
          </v-card>
          <v-card  v-if="props.adventurer != null">
            <v-card-title>
              {{ props.adventurer.krestniJmeno + " " + props.adventurer.prijmeni }}
            </v-card-title>
            <v-card-text>
              {{ props.adventurer }}
              <v-col>
                <h3>Životy: {{ props.adventurer.zivoty }} / {{ props.adventurer.zivoty }}</h3>
              </v-col>

            </v-card-text>
          </v-card>
        </v-col>

        <!-- KOSTKA-->
        <v-col>
          <v-card color="accent" align="center" justify="center">
            <v-card-title>
              <h3 style="color: #cca000;">Kostka</h3>
              <v-divider></v-divider>
            </v-card-title>

            <v-card-text>
              <v-img v-if="props.dice != 0" :src="'../../../src/assets/images/dice/dice' + props.dice + '.jpg'"
                align="center" justify="center" max-height="250"></v-img>

            </v-card-text>
            <v-card-actions>
              <v-btn color="blue-darken-1" variant="text" @click="$emit('throwDice')">
                Hodit kostkou
              </v-btn>

              <v-btn color="blue-darken-1" variant="text" @click="$emit('clearDice')">
                Vynulovat
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- NEPŘÍTEL-->
        <v-col v-if="props.throwType == 'Atributy'">
          <v-card v-if="props.enemy == null">
            <v-card-title>
              <h3 style="color: #cca000;">Vyberte nepřítele</h3>
              <v-divider></v-divider>
            </v-card-title>
          </v-card>
          <v-card v-if="props.enemy != null">
            <v-card-title>
              <h3 style="color: #ff726f">{{ props.enemy.jmeno }}</h3>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col>Síla: {{ props.enemy.sila }}</v-col>
                <v-col>Houževnastost: {{ props.enemy.houzevnatost }}</v-col>
              </v-row>
              <v-row>
                <v-col>Obratnost: {{ props.enemy.obratnost }}</v-col>
                <v-col>Charisma: {{ props.enemy.charisma }}</v-col>
              </v-row>
              <v-row>
                <v-col>Inteligence: {{ props.enemy.inteligence }}</v-col>
                <v-col>Znalost: {{ props.enemy.znalost }}</v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="props.throwType == 'Zásah'">
          <v-card v-if="props.enemy == null">
            <v-card-title>
              <h3 style="color: #cca000;">Vyberte nepřítele</h3>
              <v-divider></v-divider>
            </v-card-title>
          </v-card>
          <v-card v-if="props.enemy != null">
            <v-card-title>
              <h3 style="color: #ff726f">{{ props.enemy.jmeno }}</h3>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>

              <v-col>
                <h3>Obratnost: {{ props.enemy.obratnost }}</h3>
              </v-col>

            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="props.throwType == 'Průraz'">
          <v-card v-if="props.enemy == null">
            <v-card-title>
              <h3 style="color: #cca000;">Vyberte nepřítele</h3>
              <v-divider></v-divider>
            </v-card-title>
          </v-card>
          <v-card v-if="props.enemy != null">
            <v-card-title>
              <h3 style="color: #ff726f">{{ props.enemy.jmeno }}</h3>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>

              <v-col>
                <h3>Zbroj: {{ props.enemy.zbroj }}</h3>
              </v-col>

            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="props.throwType == 'Steč'">
          <v-card v-if="props.enemy == null">
            <v-card-title>
              <h3 style="color: #cca000;">Vyberte nepřítele</h3>
              <v-divider></v-divider>
            </v-card-title>
          </v-card>
          <v-card v-if="props.enemy != null">
            <v-card-title>
              <h3 style="color: #ff726f">{{ props.enemy.jmeno }}</h3>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>

              <v-col>
                <h3>Zdraví: {{ props.enemy.realneZivoty + '/' +
                  props.enemy.zivoty }}</h3>
              </v-col>

            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="props.throwType == 'Uhyb'">
          <v-card v-if="props.enemy == null">
            <v-card-title>
              <h3 style="color: #cca000;">Vyberte nepřítele</h3>
              <v-divider></v-divider>
            </v-card-title>
          </v-card>
          <v-card v-if="props.enemy != null">
            <v-card-title>
              <h3 style="color: #ff726f">{{ props.enemy.jmeno }}</h3>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>

              <v-col>
                <h3>Obratnost: {{ props.adventurer.atributy.obratnost }}</h3>
              </v-col>

            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="props.throwType == 'Blokace'">
          <v-card v-if="props.enemy == null">
            <v-card-title>
              <h3 style="color: #cca000;">Vyberte nepřítele</h3>
              <v-divider></v-divider>
            </v-card-title>
          </v-card>
          <v-card v-if="props.enemy != null">
            <v-card-title>
              <h3 style="color: #ff726f">{{ props.enemy.jmeno }}</h3>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>

              <v-col>
                <h3>Průraznost: {{ props.enemy.pruraz }}</h3>
              </v-col>

            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="props.throwType == 'Výdrž'">
          <v-card v-if="props.enemy == null">
            <v-card-title>
              <h3 style="color: #cca000;">Vyberte nepřítele</h3>
              <v-divider></v-divider>
            </v-card-title>
          </v-card>
          <v-card v-if="props.enemy != null">
            <v-card-title>
              <h3 style="color: #ff726f">{{ props.enemy.jmeno }}</h3>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text>

              <v-col>
                <h3>Obratnost: {{ props.enemy.poskozeniZaklad }}</h3>
              </v-col>

            </v-card-text>
          </v-card>
        </v-col>

      </v-row>




      <v-divider class="mt-3"></v-divider>

      <v-card-subtitle>
        <br>
        1 = Vždy selže.
        <br>
        2 = Je zapotřebí 2x větší atribut.
        <br>
        3 = Je zapotřebí větší atribut.
        <br>
        4 = Je zapotřebí alespon stejný atribut
        <br>
        5 = Je zapotřebí atribut větší než 2x nepřátelského atributu
        <br>
        6 = Kritický uspěch
      </v-card-subtitle>

    </v-container>
  </v-card>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps(['throwType', 'enemy', 'adventurer', 'adventurerItems', 'dice'])
const chosenItem = ref(null)

function getAdventurerName() {
  let name = props.adventurer.krestniJmeno
  if (props.adventurer.prezdivka != null) {
    name = name + ' "' + props.adventurer.prezdivka + '" '
  }
  name = name + props.adventurer.prijmeni
  return name
}

</script>