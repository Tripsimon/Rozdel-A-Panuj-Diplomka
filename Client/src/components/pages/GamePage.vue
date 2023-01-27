<script setup>
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
import { io } from 'socket.io-client'
import axios from 'axios'

</script>

<template>
  <v-btn @click="updateAdventurers()">TEST</v-btn>
  <!-- Modal pro inventář -->
  <v-row justify="center">
    <v-dialog v-model="inventoryModal" scrollable>
      <v-card color="primary">
        <v-card-title>Inventář</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 80%;">
          <v-card class="mt-3">
            <v-card-title>

              <h3>Peníze: {{ this.inventoryLoadedMoney }}</h3>
              <v-text-field v-model="inventoryChangeMoneyInput" type="number" single-line
                label="Nové množství"></v-text-field>
            </v-card-title>
            <v-card-actions>
              <v-btn @click="inventoryChangeMoney">dsa</v-btn>
            </v-card-actions>
          </v-card>
          <v-expansion-panels class="mt-3" variant="accordion">
            <v-expansion-panel v-for="item in this.inventoryLoadedArray" :key="i">
              <v-expansion-panel-title>{{ item.jmeno + " - " + item.typ }}</v-expansion-panel-title>

              <v-expansion-panel-text v-if="item.typ == 'Zbran'">
                <v-row>
                  <v-col>
                    <h4>Průraznost: {{ item.pruraznost }}</h4>
                  </v-col>
                  <v-col>
                    <h4>Poškození: {{ item.poskozeni }}</h4>
                  </v-col>
                  <v-col>Váha: {{ item.vaha }}</v-col>
                </v-row>
                <v-divider></v-divider>
                {{ item.popis }}
              </v-expansion-panel-text>

              <v-expansion-panel-text v-if="item.typ == 'Zbroj'">
                <v-row>
                  <v-col>
                    <h4>Obrana: {{ item.obrana }}</h4>
                  </v-col>
                  <v-col>Váha: {{ item.vaha }}</v-col>
                </v-row>
                <v-divider></v-divider>
                {{ item.popis }}
              </v-expansion-panel-text>

              <v-expansion-panel-text v-if="item.typ == 'Předmět'">
                <v-row>
                  <v-col>Váha: {{ item.vaha }}</v-col>
                </v-row>
                <v-divider></v-divider>
                {{ item.popis }}
              </v-expansion-panel-text>

              <v-expansion-panel-text>
                <v-btn color="warning" @click="invetoryRemove(item._id)">Smazat předmět</v-btn>
              </v-expansion-panel-text>

            </v-expansion-panel>
          </v-expansion-panels>

          <v-card class="mt-3">
            <v-card-title>Přidat předmět</v-card-title>
            <v-card-text>
              <v-card-text>
                <v-select label="Typ" :items="['Zbran', 'Zbroj', 'Předmět']" v-model="inventoryAddType"
                  @update:modelValue="inventoryAddTypeChange()"></v-select>

                <v-btn v-for="item in this.inventoryAddChoices" @click="inventoryAddPush(item._id)"> {{
                  item.jmeno
                }}</v-btn>

                {{ this.inventoryAddChoices }}
              </v-card-text>
            </v-card-text>
          </v-card>

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue-darken-1" variant="text" @click="inventoryModal = false">
            Zavřít
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <!-- /Modal pro inventář -->

  <v-container>
    <v-row>
      <!-- Mod pruzkumu -->
      <v-col v-if="battleModeSwitch == false" cols="8">
        <v-img :src="'http://localhost:3000/' + vybranePozadi + '.jpg'" max-width="100%">
        </v-img>
      </v-col>
      <!-- /Mod pruzkumu -->

      <!-- Mod boje -->
      <v-col v-if="battleModeSwitch == true" cols="8">

        <!-- Nepřátelé -->
        <v-card color="primary" title="Nepřátelé">
          <v-container>
            <v-expansion-panels>
              <v-expansion-panel v-for=" (enemy, index, key) in this.aktivniNepratele">
                <v-expansion-panel-title>{{ enemy.jmeno + " " + enemy.realneZivoty + " / " + enemy.zivoty }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  {{ enemy }}
                </v-expansion-panel-text>
                <v-expansion-panel-text>

                  <v-btn @click="fightChoseEnemy(index)">Vybrat pro boj</v-btn>
                  <v-btn color="success" @click="fightAddLifeToEnemy(index)">Přidat život</v-btn>
                  <v-btn color="error" @click="fightRemoveLifeToEnemy(index)">Odebrat život</v-btn>
                  <v-btn @click="fightRemoveEnemy(index)">Odebrat život</v-btn>
                </v-expansion-panel-text>

              </v-expansion-panel>
            </v-expansion-panels>
          </v-container>

        </v-card>
        <!-- /Nepřátelé -->

        <!-- Hod kostkou-->
        <v-card color="primary" title="Hod kostkou" class="mt-3">
          <v-container>
            <v-select label="Porovnávaný atribut"
              :items="['Volný hod', 'Atributy', 'Zásah', 'Průraz', 'Steč', 'Uhyb', 'Blokace', 'Výdrž']"
              variant="underlined" v-model="bojPorovnanyAtribut"></v-select>

            <v-row v-if="this.bojPorovnanyAtribut == 'Volný hod'">
              <v-col>
                <v-card color="accent" align="center" justify="center">
                  <v-card-title>Hození kostkou</v-card-title>
                  <v-card-text>
                    <h1 align="center" justify="center">{{ hozennaKostka }}</h1>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Hodit kostkou
                    </v-btn>

                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Vynulovat
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="this.bojPorovnanyAtribut == 'Atributy'">

              <v-col>
                <v-card v-if="this.bojujiciDobrodruh == null">
                  <v-card-title>Vyberte dobrodruha</v-card-title>
                </v-card>
                <v-card color="success" v-if="this.bojujiciDobrodruh != null">
                  <v-card-title>
                    {{ this.bojujiciDobrodruh.krestniJmeno + " " + this.bojujiciDobrodruh.prijmeni }}
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col>Síla: {{ this.bojujiciDobrodruh.atributy.sila }}</v-col>
                      <v-col>Houževnastost: {{ this.bojujiciDobrodruh.atributy.houzevnatost }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>Obratnost: {{ this.bojujiciDobrodruh.atributy.obratnost }}</v-col>
                      <v-col>Charisma: {{ this.bojujiciDobrodruh.atributy.charisma }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>Inteligence: {{ this.bojujiciDobrodruh.atributy.inteligence }}</v-col>
                      <v-col>Znalost: {{ this.bojujiciDobrodruh.atributy.znalost }}</v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>


              <v-col>
                <v-card color="accent" align="center" justify="center">
                  <v-card-title>Hození kostkou</v-card-title>
                  <v-card-text>
                    <h1 align="center" justify="center">{{ hozennaKostka }}</h1>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Hodit kostkou
                    </v-btn>

                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Vyčistit
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col>
                <v-card v-if="this.bojujiciNepritel == null">
                  <v-card-title>Vyberte nepřítele</v-card-title>
                </v-card>
                <v-card v-if="this.bojujiciNepritel != null">
                  <v-card-title>
                    {{ this.bojujiciNepritel.jmeno }}
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col>Síla: {{ this.bojujiciNepritel.sila }}</v-col>
                      <v-col>Houževnastost: {{ this.bojujiciDobrodruh.atributy.houzevnatost }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>Obratnost: {{ this.bojujiciDobrodruh.atributy.obratnost }}</v-col>
                      <v-col>Charisma: {{ this.bojujiciDobrodruh.atributy.charisma }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col>Inteligence: {{ this.bojujiciDobrodruh.atributy.inteligence }}</v-col>
                      <v-col>Znalost: {{ this.bojujiciDobrodruh.atributy.znalost }}</v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="this.bojPorovnanyAtribut == 'Zásah'">
              <v-col>
                <v-card v-if="this.bojujiciDobrodruh == null">
                  <v-card-title>Vyberte dobrodruha</v-card-title>
                </v-card>
                <v-card color="success" v-if="this.bojujiciDobrodruh != null">
                  <v-card-title>
                    {{ this.bojujiciDobrodruh.krestniJmeno + " " + this.bojujiciDobrodruh.prijmeni }}
                  </v-card-title>
                  <v-card-text>

                    <v-col>
                      <h3>Obratnost: {{ this.bojujiciDobrodruh.atributy.obratnost }}</h3>
                    </v-col>

                  </v-card-text>
                </v-card>
              </v-col>


              <v-col>
                <v-card color="accent" align="center" justify="center">
                  <v-card-title>Hození kostkou</v-card-title>
                  <v-card-text>
                    <h1 align="center" justify="center">{{ hozennaKostka }}</h1>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Hodit kostkou
                    </v-btn>

                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Vynulovat
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col>
                <v-card v-if="this.bojujiciNepritel == null">
                  <v-card-title>Vyberte nepřítele</v-card-title>
                </v-card>
                <v-card v-if="this.bojujiciNepritel != null">
                  <v-card-title>
                    {{ this.bojujiciNepritel.jmeno }}
                  </v-card-title>
                  <v-card-text>

                    <v-col>
                      <h3>Obratnost: {{ this.bojujiciDobrodruh.atributy.obratnost }}</h3>
                    </v-col>

                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="this.bojPorovnanyAtribut == 'Průraz'">
              <v-col>
                <v-card v-if="this.bojujiciDobrodruh == null">
                  <v-card-title color="error">Vyberte dobrodruha</v-card-title>
                </v-card>
                <v-card color="success" v-if="this.bojujiciDobrodruh != null">
                  <v-card-title>
                    {{ this.bojujiciDobrodruh.krestniJmeno + " " + this.bojujiciDobrodruh.prijmeni }}
                  </v-card-title>
                  <v-card-text>
                    <v-select :items="this.bojujiciDobrodruhVybava" v-model="this.bojujiciDobrodruhPredmet"
                      item-title="jmeno" return-object label="Vyberte předmět"></v-select>
                    <v-col v-if="!!this.bojujiciDobrodruhPredmet">
                      <h3 v-if="this.bojujiciDobrodruhPredmet.typ == 'Zbran'">Průraz: {{
                        this.bojujiciDobrodruhPredmet.pruraznost
                      }}</h3>
                      <h3 v-else>Předmět nemá zadanou hodnotu pruraznosti</h3>
                    </v-col>

                  </v-card-text>
                </v-card>
              </v-col>


              <v-col>
                <v-card color="accent" align="center" justify="center">
                  <v-card-title>Hození kostkou</v-card-title>
                  <v-card-text>
                    <h1 align="center" justify="center">{{ hozennaKostka }}</h1>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Hodit kostkou
                    </v-btn>

                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Vynulovat
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col>
                <v-card v-if="this.bojujiciNepritel == null">
                  <v-card-title>Vyberte nepřítele</v-card-title>
                </v-card>
                <v-card v-if="this.bojujiciNepritel != null">
                  <v-card-title>
                    {{ this.bojujiciNepritel.jmeno }}
                  </v-card-title>
                  <v-card-text>

                    <v-col>
                      <h3>Zbroj: {{ this.bojujiciNepritel.zbroj }}</h3>
                    </v-col>

                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="this.bojPorovnanyAtribut == 'Steč'">
              <v-col>
                <v-card color="success" v-if="this.bojujiciDobrodruh != null">
                  <v-card-title>
                    {{ this.bojujiciDobrodruh.krestniJmeno + " " + this.bojujiciDobrodruh.prijmeni }}
                  </v-card-title>
                  <v-card-text>
                    <v-select :items="this.bojujiciDobrodruhVybava" v-model="this.bojujiciDobrodruhPredmet"
                      item-title="jmeno" return-object label="Vyberte předmět"></v-select>
                    <v-col v-if="!!this.bojujiciDobrodruhPredmet">
                      <h3 v-if="this.bojujiciDobrodruhPredmet.typ == 'Zbran'">Poškození: {{
                        this.bojujiciDobrodruhPredmet.poskozeni
                      }}</h3>
                      <h3 v-else>Předmět nemá zadanou hodnotu poškození</h3>
                    </v-col>

                  </v-card-text>
                </v-card>
              </v-col>


              <v-col>
                <v-card color="accent" align="center" justify="center">
                  <v-card-title>Hození kostkou</v-card-title>
                  <v-card-text>
                    <h1 align="center" justify="center">{{ hozennaKostka }}</h1>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Hodit kostkou
                    </v-btn>

                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Vynulovat
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col>
                <v-card v-if="this.bojujiciNepritel == null">
                  <v-card-title>Vyberte nepřítele</v-card-title>
                </v-card>
                <v-card v-if="this.bojujiciNepritel != null">
                  <v-card-title>
                    {{ this.bojujiciNepritel.jmeno }}
                  </v-card-title>
                  <v-card-text>

                    <v-col>
                      <h3>Zdraví: {{ this.bojujiciNepritel.realneZivoty + '/' + this.bojujiciNepritel.zivoty }}</h3>
                    </v-col>

                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>


            <v-row v-if="this.bojPorovnanyAtribut == 'Uhyb'">
              <v-col>
                <v-card v-if="this.bojujiciNepritel == null">
                  <v-card-title>Vyberte nepřítele</v-card-title>
                </v-card>
                <v-card color="success" v-if="this.bojujiciDobrodruh != null">
                  <v-card-title>
                    {{ this.bojujiciDobrodruh.krestniJmeno + " " + this.bojujiciDobrodruh.prijmeni }}
                  </v-card-title>
                  <v-card-text>

                    <v-col>
                      <h3>Obratnost: {{ this.bojujiciDobrodruh.atributy.obratnost }}</h3>
                    </v-col>

                  </v-card-text>
                </v-card>
              </v-col>


              <v-col>
                <v-card color="accent" align="center" justify="center">
                  <v-card-title>Hození kostkou</v-card-title>
                  <v-card-text>
                    <h1 align="center" justify="center">{{ hozennaKostka }}</h1>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Hodit kostkou
                    </v-btn>

                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Vynulovat
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col>
                <v-card v-if="this.bojujiciNepritel == null">
                  <v-card-title>Vyberte nepřítele</v-card-title>
                </v-card>
                <v-card v-if="this.bojujiciNepritel != null">
                  <v-card-title>
                    {{ this.bojujiciNepritel.jmeno }}
                  </v-card-title>
                  <v-card-text>

                    <v-col>
                      <h3>Obratnost: {{ this.bojujiciDobrodruh.atributy.obratnost }}</h3>
                    </v-col>

                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="this.bojPorovnanyAtribut == 'Blokace'">

              <v-col>
                <v-card v-if="this.bojujiciDobrodruh == null">
                  <v-card-title>Vyberte nepřítele</v-card-title>
                </v-card>
                <v-card color="success" v-if="this.bojujiciDobrodruh != null">
                  <v-card-title>
                    {{ this.bojujiciDobrodruh.krestniJmeno + " " + this.bojujiciDobrodruh.prijmeni }}
                  </v-card-title>
                  <v-card-text>
                    <v-select :items="this.bojujiciDobrodruhVybava" v-model="this.bojujiciDobrodruhPredmet"
                      item-title="jmeno" return-object label="Vyberte předmět"></v-select>
                    <v-col v-if="!!this.bojujiciDobrodruhPredmet">
                      <h3 v-if="this.bojujiciDobrodruhPredmet.typ == 'Zbroj'">Obrana: {{
                        this.bojujiciDobrodruhPredmet.obrana
                      }}</h3>
                      <h3 v-else>Předmět nemá zadanou hodnotu obrany</h3>
                    </v-col>

                  </v-card-text>
                </v-card>
              </v-col>


              <v-col>
                <v-card color="accent" align="center" justify="center">
                  <v-card-title>Hození kostkou</v-card-title>
                  <v-card-text>
                    <h1 align="center" justify="center">{{ hozennaKostka }}</h1>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Hodit kostkou
                    </v-btn>

                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Vynulovat
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col>
                <v-card v-if="this.bojujiciNepritel == null">
                  <v-card-title>Vyberte nepřítele</v-card-title>
                </v-card>
                <v-card v-if="this.bojujiciNepritel != null">
                  <v-card-title>
                    {{ this.bojujiciNepritel.jmeno }}
                  </v-card-title>
                  <v-card-text>

                    <v-col><h3>Průraznost: {{ this.bojujiciNepritel.pruraz }}</h3></v-col>

                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="this.bojPorovnanyAtribut == 'Výdrž'">
              <v-col>
                <v-card v-if="this.bojujiciDobrodruh == null">
                  <v-card-title>Vyberte dobrodruha</v-card-title>
                </v-card>
                <v-card color="success" v-if="this.bojujiciDobrodruh != null">
                  <v-card-title>
                    {{ this.bojujiciDobrodruh.krestniJmeno + " " + this.bojujiciDobrodruh.prijmeni }}
                  </v-card-title>
                  <v-card-text>

                    <v-col>Obratnost: {{ this.bojujiciDobrodruh.atributy.obratnost }}</v-col>

                  </v-card-text>
                </v-card>
              </v-col>


              <v-col>
                <v-card color="accent" align="center" justify="center">
                  <v-card-title>Hození kostkou</v-card-title>
                  <v-card-text>
                    <h1 align="center" justify="center">{{ hozennaKostka }}</h1>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Hodit kostkou
                    </v-btn>

                    <v-btn color="blue-darken-1" variant="text" @click="throwDice">
                      Vynulovat
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <v-col>
                <v-card v-if="this.bojujiciNepritel == null">
                  <v-card-title>Vyberte nepřítele</v-card-title>
                </v-card>
                <v-card v-if="this.bojujiciNepritel != null">
                  <v-card-title>
                    {{ this.bojujiciNepritel.jmeno }}
                  </v-card-title>
                  <v-card-text>

                    <v-col>Obratnost: {{ this.bojujiciDobrodruh.atributy.obratnost }}</v-col>

                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="mt-3"></v-divider>

            <param>1 = Vždy selže. 2 = Je zapotřebí 2x větší atribut. 3 = Je zapotřebí větší atribut. 4 = Je zapotřebí
            alespon stejný atribut 5 = Je zapotřebí atribut větší než 2x nepřátelského atributu 6 = Kritický uspěch

          </v-container>
        </v-card>
        <!-- /Hod kostkou-->

        <!-- Dobrodruzi -->
        <v-card color="primary" title="Dobrodruzi" class="mt-3">
          <v-card-text>


            <div class="d-flex justify-space-around align-center flex-column flex-sm-row fill-height">
              <v-btn variant="flat" color="secondary" @click="fightChoseAdventurer(1)">
                {{ player1.adventurer.krestniJmeno }}
              </v-btn>

              <v-btn variant="flat" color="secondary">
                {{ player2.adventurer.krestniJmeno }}
              </v-btn>

              <v-btn variant="flat" color="secondary">
                {{ player3.adventurer.krestniJmeno }}
              </v-btn>

            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- /Dobrodruzi -->
      <!-- /Mod boje -->

      <v-col cols="4">

        <v-card color="primary" title="Herní režim">
          <v-card-text>
            <v-switch v-model="battleModeSwitch"></v-switch>
          </v-card-text>
        </v-card>

        <v-card v-if="battleModeSwitch == false" class="mt-3" color="primary" title="Pozadí">
          <v-card-text>
            <v-select label="Výběr" :items="this.dostupnePozadi" variant="underlined"
              v-model="vybranePozadi"></v-select>
          </v-card-text>
        </v-card>

        <!-- Nastavení v boji -->
        <v-card v-if="battleModeSwitch == true" color="primary" title="Nepřátelé" class="mt-3">
          <v-card-text>
            <row>
              <col>
              <v-select label="Výběr" :items="moznostiNepratel" variant="underlined"
                v-model="vybranyNepritel"></v-select>
            </row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="addEnemy">Přidat</v-btn>
          </v-card-actions>
        </v-card>

        <!-- /Nastavení v boji -->

      </v-col>
    </v-row>

    <v-row>

      <!-- Karta hráče 1 -->
      <v-col cols="4">
        <v-card color="primary" v-if="this.player1.adventurer != null">
          <v-card-title>{{
            this.player1.adventurer.krestniJmeno + ' ' + this.player1.adventurer.prijmeni
          }}</v-card-title>
          <v-card-subtitle>{{ this.player1.owner }}</v-card-subtitle>
          <v-card-text>
            {{ this.player1.adventurer }}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="openInventory(1)">Inventář</v-btn>
            <v-btn>Status</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Karta hráče 2 -->
      <v-col cols="4">
        <v-card color="primary" v-if="this.player2.adventurer != null">
          <v-card-title>{{
            this.player2.adventurer.krestniJmeno + ' ' + this.player2.adventurer.prijmeni
          }}</v-card-title>
          <v-card-subtitle>{{ this.player2.owner }}</v-card-subtitle>
          <v-card-text>dsads</v-card-text>
          <v-card-actions>
            <v-btn @click="openInventory(2)">Inventář</v-btn>
            <v-btn>Status</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Karta hráče 3 -->
      <v-col cols="4">
        <v-card color="primary" v-if="this.player3.adventurer != null">
          <v-card-title>{{
            this.player3.adventurer.krestniJmeno + ' ' + this.player3.adventurer.prijmeni
          }}</v-card-title>
          <v-card-subtitle>{{ this.player3.owner }}</v-card-subtitle>
          <v-card-text>dsads</v-card-text>
          <v-card-actions>
            <v-btn @click="openInventory(3)">Inventář</v-btn>
            <v-btn>Status</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>


</template>
<script>

export default {
  data: () => ({
    //Duležité konstanty pro session
    uzivatelStore: useUzivatelStore(),
    jmenoSessionu: null,
    sid: null,
    isOwner: false,
    battleModeSwitch: false,

    //Udrzeni hracu v sessionu
    player1: {
      owner: "Nepřipojen", adventurerID: null,
      adventurer: {
        "_id": {
          "$oid": "63cd7a37f39ef27c34e0204f"
        },
        "majitel": "635fc6b18eb4a7f655db442e",
        "krestniJmeno": "Marcus",
        "prijmeni": "Aurel",
        "prezdivka": "Zlatý Lev",
        "zivoty": 12,
        "rasa": "Anhilarský člověk",
        "trida": "Bojovník",
        "mainGear": "63c723d7b1f3a96286014792",
        "secondaryGear": "63cd4164590a36f414778487",
        "bonusGear": "63cd418a590a36f41477848b",
        "presvedceni": "Neutrální dobro",
        "atributy": {
          "sila": 11,
          "houzevnatost": 12,
          "obratnost": 11,
          "charisma": 11,
          "inteligence": 7,
          "znalost": 6
        },
        "inventar": [
          "63c723d7b1f3a96286014792",
          "63cd4164590a36f414778487",
          "63cd418a590a36f41477848b"
        ],
        "penize": 3,
        "level": 1,
        "zkusenosti": 0,
        "__v": 0
      }
    },
    player2: {
      owner: "Nepřipojen", adventurerID: null, adventurer: {
        "_id": {
          "$oid": "63cd7a37f39ef27c34e0204f"
        },
        "majitel": "635fc6b18eb4a7f655db442e",
        "krestniJmeno": "Marcus",
        "prijmeni": "Aurel",
        "prezdivka": "Zlatý Lev",
        "zivoty": 12,
        "rasa": "Anhilarský člověk",
        "trida": "Bojovník",
        "mainGear": "63c723d7b1f3a96286014792",
        "secondaryGear": "63cd4164590a36f414778487",
        "bonusGear": "63cd418a590a36f41477848b",
        "presvedceni": "Neutrální dobro",
        "atributy": {
          "sila": 11,
          "houzevnatost": 12,
          "obratnost": 11,
          "charisma": 11,
          "inteligence": 7,
          "znalost": 6
        },
        "inventar": [
          "63c723d7b1f3a96286014792",
          "63cd4164590a36f414778487",
          "63cd418a590a36f41477848b"
        ],
        "penize": 3,
        "level": 1,
        "zkusenosti": 0,
        "__v": 0
      }
    },
    player3: {
      owner: "Nepřipojen", adventurerID: null, adventurer: {
        "_id": {
          "$oid": "63cd7a37f39ef27c34e0204f"
        },
        "majitel": "635fc6b18eb4a7f655db442e",
        "krestniJmeno": "Marcus",
        "prijmeni": "Aurel",
        "prezdivka": "Zlatý Lev",
        "zivoty": 12,
        "rasa": "Anhilarský člověk",
        "trida": "Bojovník",
        "mainGear": "63c723d7b1f3a96286014792",
        "secondaryGear": "63cd4164590a36f414778487",
        "bonusGear": "63cd418a590a36f41477848b",
        "presvedceni": "Neutrální dobro",
        "atributy": {
          "sila": 11,
          "houzevnatost": 12,
          "obratnost": 11,
          "charisma": 11,
          "inteligence": 7,
          "znalost": 6
        },
        "inventar": [
          "63c723d7b1f3a96286014792",
          "63cd4164590a36f414778487",
          "63cd418a590a36f41477848b"
        ],
        "penize": 3,
        "level": 1,
        "zkusenosti": 0,
        "__v": 0
      }
    },

    //Herni pozadi pruzkumneho modu
    dostupnePozadi: null,
    vybranePozadi: null,


    //Inventář
    dialogm1: '',
    inventoryModal: false,
    inventoryPlayer: null,
    inventoryLoadedAdventurerID: null,
    inventoryLoadedArray: null,

    inventoryLoadedMoney: null,
    inventoryChangeMoneyInput: null,

    inventoryAddType: null,
    invntoryAddChoices: null,

    // Bojový mod
    bojPorovnanyAtribut: 'Volný hod',
    hozennaKostka: 0,
    bojujiciNepritel: null,
    bojujiciDobrodruh: null,
    bojujiciDobrodruhVybava: [],
    bojujiciDobrodruhPredmet: null,

    // Nepřátelé
    dostupniNepratele: null,
    moznostiNepratel: [],
    vybranyNepritel: null,
    aktivniNepratele: [],
    // /Nepřátelé
    // /Bojový mod
  }),

  mounted() {

    //Websocket
    //socket.emit('customEvent',10, "Hi")
    const socket = io('http://localhost:3001')
    socket.on('connect', () => {
      console.log('Websocket servis připojen')
    })


    //Připojení hráče
    socket.on('updatePlayers', () => {
      this.sid = urlParams.get('sid')

      axios.get('http://localhost:3000/sessions/sessionPlayers', { params: { sid: this.sid } })
        .then(response => {

          this.player1.owner = response.data[0].owner
          this.player1.adventurerID = response.data[0].adventurer

          this.player2.owner = response.data[1].owner
          this.player2.adventurerID = response.data[1].adventurer

          this.player3.owner = response.data[2].owner
          this.player3.adventurerID = response.data[2].adventurer




          axios.get('http://localhost:3000/character/SessionAdventurers', { params: { adventurer1: this.player1.adventurerID, adventurer2: this.player2.adventurerID, adventurer3: this.player3.adventurerID } })
            .then(response => {
              this.player1.adventurer = response.data[0]
              console.log(this.player1.adventurer)
            })

        })
    })

    //Zjištění ownera
    let urlParams = new URLSearchParams(window.location.search)
    this.sid = urlParams.get('sid')
    axios.get('http://localhost:3000/sessions/checkOwner', { params: { sid: this.sid, user: this.uzivatelStore._id } })
      .then(response => {

        if (response.data) {

          this.isOwner = true
        } else {
          socket.emit('playerJoined')
        }

      })


    //Načtení pozadí
    axios.get('http://localhost:3000/pozadi/dump')
      .then(res => {
        this.dostupnePozadi = res.data
        this.vybranePozadi = this.dostupnePozadi[0]
      })


    this.loadEnemies()

    this.updateAdventurers()
  },

  methods: {

    //Inventář
    openInventory(hrac) {
      switch (hrac) {
        case 1:
          this.inventoryLoadedMoney = this.player1.adventurer.penize
          axios.get('http://localhost:3000/vybava/multipleID', { params: { items: this.player1.adventurer.inventar } })
            .then(queryResponse => {
              this.inventoryLoadedArray = queryResponse.data
              this.inventoryLoadedAdventurerID = this.player1.adventurer._id
              this.inventoryModal = true;
            })

          break;

        default:
          break;
      }
    },
    inventoryChangeMoney() {
      console.log(this.inventoryChangeMoneyInput)
      axios.post('http://localhost:3000/character/changeMoney', { money: this.inventoryChangeMoneyInput, adventurer: this.inventoryLoadedAdventurerID })
    },

    inventoryAddTypeChange() {
      axios.get('http://localhost:3000/vybava/allType', { params: { type: this.inventoryAddType } })
        .then(response => {
          this.inventoryAddChoices = response.data
        }
        )
    },

    //Přidá předmět dobroduhovy do inventáře a resynkne dobrodruhy
    inventoryAddPush(item) {
      console.log(this.inventoryLoadedAdventurerID)
      axios.post('http://localhost:3000/character/putIntoInventory', { "item": item, 'adventurer': this.inventoryLoadedAdventurerID })
        .then(responseQuery => {
          if (responseQuery.data == true) {
            this.resyncAdventurers()
          }
        })
    },

    //Odebere předmět z inventáře dobrodruha a resynkne dobrodruhy
    invetoryRemove(item) {
      console.log(this.inventoryLoadedAdventurerID)

      axios.post('http://localhost:3000/character/removeFromInventory', { "item": item, 'adventurer': this.inventoryLoadedAdventurerID })
        .then(responseQuery => {

          if (responseQuery.data == true) {
            this.resyncAdventurers()
          }
        })

    },

    // /Inventář

    // Nepřátelé
    loadEnemies() {
      axios.get('http://localhost:3000/monster/dump')
        .then(queryResponse => {
          this.dostupniNepratele = queryResponse.data,

            queryResponse.data.forEach(enemy => {
              this.moznostiNepratel.push(enemy.jmeno)
            });

        })
    },

    addEnemy() {
      let pozice = this.moznostiNepratel.indexOf(this.vybranyNepritel);
      let vybrany = this.dostupniNepratele[pozice]
      vybrany.realneZivoty = vybrany.zivoty

      // ! Zajimava obklika do bakalaá5ky
      this.aktivniNepratele.push(JSON.parse(JSON.stringify(vybrany)))
      console.log(this.aktivniNepratele)
    },

    fightAddLifeToEnemy(index) {
      this.aktivniNepratele[index].realneZivoty = this.aktivniNepratele[index].realneZivoty + 1
    },
    fightRemoveLifeToEnemy(index) {
      this.aktivniNepratele[index].realneZivoty = this.aktivniNepratele[index].realneZivoty - 1
    },

    fightRemoveEnemy(index) {
      this.aktivniNepratele.splice(index, 1)
    },
    // /Nepřátelé

    // Herní cyklus

    fightChoseAdventurer(adventurer) {
      switch (adventurer) {
        case 1:
          this.bojujiciDobrodruh = this.player1.adventurer
          axios.get('http://localhost:3000/vybava/multipleID', { params: { items: this.player1.adventurer.inventar } })
            .then(queryResponse => {
              console.log(" Výbava", queryResponse)
              this.bojujiciDobrodruhVybava = queryResponse.data
            })

          break;

        default:
          break;
      }
    },

    fightChoseEnemy(enemy) {
      this.bojujiciNepritel = this.aktivniNepratele[enemy]
    },



    // Boj


    throwDice() {
      this.hozennaKostka = Math.floor((Math.random() * 6) + 1);
    },


    // /Boj

    // /Herní cyklus

    // Resinc sessionu
    updateAdventurers() {
      axios.get('http://localhost:3000/sessions/returnSession', { params: { sessionName: this.jmenoSessionu } })
        .then(responseQuery => {
          this.player1.owner = responseQuery.data.player1.owner
          this.player2.owner = responseQuery.data.player2.owner
          this.player3.owner = responseQuery.data.player3.owner

          this.player1.adventurerID = responseQuery.data.player1.adventurer
          this.player2.adventurerID = responseQuery.data.player2.adventurer
          this.player3.adventurerID = responseQuery.data.player3.adventurer

          this.resyncAdventurers()
        })
    },

    resyncAdventurers() {
      axios.get('http://localhost:3000/character/getMultipleAdventurers', { params: { adventurers: [this.player1.adventurerID, this.player2.adventurerID, this.player3.adventurerID] } })
        .then(responseQuery => {
          console.log(responseQuery.data)
          this.player1.adventurer = responseQuery.data[0]
          this.player2.adventurer = responseQuery.data[1]
          this.player3.adventurer = responseQuery.data[2]
        })
    },
    // /Resinc sessionu

    test() {

    }

  },
}
</script>
    
<style>

</style>