<script setup>
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
import { io } from 'socket.io-client'
import axios from 'axios'



</script>

<template>
  <div>
    <!-- Modal pro inventář -->
    <v-row justify="center">
      <v-dialog v-model="inventoryModal" scrollable>
        <v-card color="primary">
          <v-card-title>Inventář: {{ this.inventarVaha + " / " + (this.invetarDobrodruh.atributy.sila * 5)
          }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 80%;">
            <v-card class="mt-3">
              <v-card-title>

                <!-- Peníze-->
                <h3>Peníze: {{ this.inventoryLoadedMoney }}</h3>
                <v-text-field v-model="inventoryChangeMoneyInput" type="number" single-line
                  label="Nové množství"></v-text-field>
              </v-card-title>
              <v-card-actions>
                <v-btn @click="inventoryChangeMoney">Změnit</v-btn>
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
                  <v-btn color="warning" @click="invetoryRemove(item._id)">Zahodit předmět</v-btn>
                </v-expansion-panel-text>

              </v-expansion-panel>
            </v-expansion-panels>

            <v-card class="mt-3">
              <v-card-title>Přidat předmět</v-card-title>
              <v-card-text>

                <v-tabs v-model="inventoryAddType" bg-color="primary">
                  <v-tab value="weapons">Zbraně</v-tab>
                  <v-tab value="armors">Zbroje</v-tab>
                  <v-tab value="items">Předměty</v-tab>
                </v-tabs>

                <v-card-text>




                  <v-card-text>
                    <v-window v-model="inventoryAddType">
                      <v-window-item value="weapons">
                        <v-table>
                          <thead>
                            <tr>
                              <th>
                                Jméno
                              </th>
                              <th>
                                Popis
                              </th>
                              <th>
                                Pruraznost
                              </th>
                              <th>
                                Základní poškození
                              </th>
                              <th>
                                Závažnost poškození
                              </th>
                              <th>
                                Váha
                              </th>
                              <th>
                                Akce
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in this.inventoryAddWeapons" :key="item.jmeno">
                              <th>{{item.jmeno}}</th>
                              <th>{{item.popis}}</th>
                              <th>{{item.pruraznost}}</th>
                              <th>{{item.poskozeni}}</th>
                              <th>{{item.poskozeni}}</th>
                              <th>{{item.vaha}}</th>
                              <th><v-btn>Přidat</v-btn></th>
                            </tr>
                          </tbody>
                          
                        </v-table>
                      </v-window-item>

                      <v-window-item value="armors">
                        <v-table>
                          <thead>
                            <tr>
                              <th>
                                Jméno
                              </th>
                              <th>
                                Popis
                              </th>
                              <th>
                                Obrana
                              </th>
                              <th>
                                Váha
                              </th>
                              <th>
                                Akce
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in this.inventoryAddArmor" :key="item.jmeno">
                              <th>{{ item.jmeno }}</th>
                              <th>{{ item.popis }}</th>
                              <th>{{ item.obrana }}</th>
                              <th>{{ item.vaha }}</th>
                              <th><v-btn>Přidat</v-btn></th>
                            </tr>
                          </tbody>
                        </v-table>
                      </v-window-item>

                      <v-window-item value="items">
                        <v-table>
                          <thead>
                            <tr>
                              <th>
                                Jméno
                              </th>
                              <th>
                                Popis
                              </th>
                              <th>
                                Váha
                              </th>
                              <th>
                                Akce
                              </th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in this.inventoryAddItem" :key="item.jmeno">
                              <th>{{ item.jmeno }}</th>
                              <th>{{ item.popis }}</th>
                              <th>{{ item.vaha }}</th>
                              <th><v-btn>Přidat</v-btn></th>
                            </tr>
                          </tbody>
                      </v-table>
                    </v-window-item>
                  </v-window>
                </v-card-text>

                <!--
                              <v-select label="Typ" :items="['Zbran', 'Zbroj', 'Předmět']" v-model="inventoryAddType"
                                @update:modelValue="inventoryAddTypeChange()"></v-select>

                              <v-btn v-for="item in this.inventoryAddChoices" @click="inventoryAddPush(item._id)"> {{
                                item.jmeno
                              }}</v-btn>

                              {{ this.inventoryAddChoices }}
                              -->
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

    <!-- Modal pro detail dobrodruha -->
    <v-row justify="center">
      <v-dialog v-model="detailModal" scrollable>
        <v-card color="primary">
          <v-card-title>Detail dobrodruha</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 80%;">

            <v-card class="mt-3" title="Zkušenosti">
              <v-card-text>
                <v-row>
                  <v-col cols="6"> <v-text-field v-model="detailLevelInput" type="number" single-line label="Level"
                      :placeholder="this.detailDobrodruh.level"></v-text-field></v-col>
                  <v-col cols="6"> <v-text-field v-model="detailExperienceInput" type="number" single-line
                      label="Zkušenosti" :placeholder="this.detailDobrodruh.zkusenosti"></v-text-field></v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-btn @click="detailChangeLevelExperience">Změnit</v-btn>
              </v-card-actions>
            </v-card>

            <v-card class="mt-3" title="Atributy">
              <v-card-text>
                <v-row>
                  <v-col>
                    <h3> Síla: {{ this.detailDobrodruh.atributy.sila }}</h3>
                  </v-col>
                  <v-col>
                    <h3> Houževnatost: {{ this.detailDobrodruh.atributy.houzevnatost }}</h3>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h3> Obratnost: {{ this.detailDobrodruh.atributy.obratnost }}</h3>
                  </v-col>
                  <v-col>
                    <h3> Charisma: {{ this.detailDobrodruh.atributy.charisma }}</h3>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h3> Inteligence: {{ this.detailDobrodruh.atributy.inteligence }}</h3>
                  </v-col>
                  <v-col>
                    <h3> Znalost: {{ this.detailDobrodruh.atributy.znalost }}</h3>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="mt-3" title="Schopnosti rasy" v-if="this.detailRasaSchopnosti != null">
              <AbilityCard v-for="ability in this.detailTridaShopnosti" :ability="ability" />
            </v-card>

            <v-card class="mt-3" title="Schopnosti třídy" v-if="this.detailTridaShopnosti != null">
              <AbilityCard v-for="ability in this.detailTridaShopnosti" :ability="ability" />
            </v-card>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue-darken-1" variant="text" @click="detailModal = false">
              Zavřít
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-container class="mt-3">
      <v-row>
        <!-- Mod pruzkumu -->
        <v-col v-if="battleModeSwitch == false" cols="9">
          <v-img :src="'http://localhost:3000/' + vybranePozadi + '.jpg'" max-width="100%">
          </v-img>
        </v-col>

        <!-- Mod boje -->
        <v-col v-if="battleModeSwitch == true" cols="9">
          <!-- Nepřátelé -->
          <v-card color="primary" title="Nepřátelé">
            <v-container>
              <v-expansion-panels v-if="this.aktivniNepratele.length != 0">
                <v-expansion-panel v-for=" (enemy, index, key) in this.aktivniNepratele">
                  <v-expansion-panel-title>{{ enemy.jmeno + " " + enemy.realneZivoty + " / " + enemy.zivoty }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card-subtitle>{{ enemy.popis }}</v-card-subtitle>
                    <br>
                    <v-row>
                      <v-col>
                        <h3> Síla: {{ enemy.sila }}</h3>
                      </v-col>
                      <v-col>
                        <h3> Houževnatost: {{ enemy.houzevnatost }}</h3>
                      </v-col>
                      <v-col>
                        <h3> Obratnost: {{ enemy.obratnost }}</h3>
                      </v-col>
                    </v-row>

                    <v-divider></v-divider>

                    <v-row>
                      <v-col>
                        <h3> Charisma: {{ enemy.charisma }}</h3>
                      </v-col>
                      <v-col>
                        <h3> Inteligence: {{ enemy.inteligence }}</h3>
                      </v-col>
                      <v-col>
                        <h3> Znalost: {{ enemy.znalost }}</h3>
                      </v-col>
                    </v-row>

                    <v-divider></v-divider>

                    <v-row>
                      <v-col>
                        <h3> Zbroj: {{ enemy.zbroj }}</h3>
                      </v-col>
                      <v-col>
                        <h3> Pruraz: {{ enemy.pruraz }}</h3>
                      </v-col>
                      <v-col>
                        <h3> Požkození: {{ enemy.poskozeni }}</h3>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>


                  <v-expansion-panel-text>
                    <v-row align="center" justify="space-around">

                      <v-btn @click="fightChoseEnemy(index)">Vybrat pro boj</v-btn>
                      <v-btn color="success" @click="fightAddLifeToEnemy(index)">Přidat život</v-btn>
                      <v-btn color="error" @click="fightRemoveLifeToEnemy(index)">Odebrat život</v-btn>
                      <v-btn color="error" @click="fightRemoveEnemy(index)">Odebrat z bojiště</v-btn>
                    </v-row>
                  </v-expansion-panel-text>

                </v-expansion-panel>
              </v-expansion-panels>
              <h4 v-if="this.aktivniNepratele.length == 0">Nepřátelé nejsou vybráni pro boj</h4>
            </v-container>

          </v-card>

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

                      <v-btn color="blue-darken-1" variant="text" @click="clearDice">
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

                      <v-btn color="blue-darken-1" variant="text" @click="clearDice">
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

                      <v-btn color="blue-darken-1" variant="text" @click="clearDice">
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

                      <v-btn color="blue-darken-1" variant="text" @click="clearDice">
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
                    <v-card-title>Vyberte dobrodruha</v-card-title>
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

                      <v-btn color="blue-darken-1" variant="text" @click="clearDice">
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
                        <h3>Průraznost: {{ this.bojujiciNepritel.pruraz }}</h3>
                      </v-col>

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

                      <v-col>
                        <h3>Obratnost: {{ this.bojujiciDobrodruh.zivoty }}</h3>
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

                      <v-btn color="blue-darken-1" variant="text" @click="clearDice">
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

          <!-- Dobrodruzi -->
          <v-card v-if="this.bojujiciDobrodruh == null" color="primary" title="Dobrodruzi" class="mt-3">
            <v-card-text>
              <div class="d-flex justify-space-around align-center flex-column flex-sm-row fill-height">
                <v-btn variant="flat" color="secondary" @click="fightChoseAdventurer(1)">
                  {{ player1.adventurer.krestniJmeno }}
                </v-btn>

                <v-btn variant="flat" color="secondary" @click="fightChoseAdventurer(2)">
                  {{ player2.adventurer.krestniJmeno }}
                </v-btn>

                <v-btn variant="flat" color="secondary" @click="fightChoseAdventurer(3)">
                  {{ player3.adventurer.krestniJmeno }}
                </v-btn>

              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Přepínač herního modu-->
        <v-col cols="3">
          <v-card color="primary">
            <v-card-title v-if="this.battleModeSwitch">
              <h3>Herní mod: Boj</h3>
            </v-card-title>
            <v-card-title v-else>
              <h3>Herní mod: Pruzkum</h3>
            </v-card-title>
            <v-card-text>
              <v-switch v-model="battleModeSwitch" :label="`Přepínač`">
              </v-switch>
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
      <!-- /Přepínač herního modu-->

      <!-- Kartu dobrodruhů-->
      <v-row>
        <!-- Karta hráče 1 -->
        <v-col cols="4">
          <v-card color="primary" v-if="this.player1.adventurer != null">
            <v-card-title>{{
              this.player1.adventurer.krestniJmeno + ' ' + this.player1.adventurer.prijmeni
            }}</v-card-title>
            <v-card-subtitle>{{ this.player1.adventurer.rasa + " - " + this.player1.adventurer.trida }}</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col>
                  <h4>Životy: {{ this.player1.adventurer.zivoty }}</h4>
                </v-col>
                <v-col>
                  <h4>Peníze: {{ this.player1.adventurer.penize }}</h4>
                </v-col>
              </v-row>
              <br>
              <v-row>
                <v-col>
                  <h4>Level: {{ this.player1.adventurer.level }}</h4>
                </v-col>
                <v-col>
                  <h4>Zkušenosti: {{ this.player1.adventurer.zkusenosti }}</h4>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="openInventory(1)">Inventář</v-btn>
              <v-btn @click="openDetail(1)">Detail</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Karta hráče 2 -->
        <v-col cols="4">
          <v-card color="primary" v-if="this.player2.adventurer != null">
            <v-card-title>{{
              this.player2.adventurer.krestniJmeno + ' ' + this.player2.adventurer.prijmeni
            }}</v-card-title>
            <v-card-subtitle>{{ this.player2.adventurer.rasa + " - " + this.player2.adventurer.trida }}</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col>
                  <h4>Životy: {{ this.player2.adventurer.zivoty }}</h4>
                </v-col>
                <v-col>
                  <h4>Peníze: {{ this.player2.adventurer.penize }}</h4>
                </v-col>
              </v-row>
              <br>
              <v-row>
                <v-col>
                  <h4>Level: {{ this.player2.adventurer.level }}</h4>
                </v-col>
                <v-col>
                  <h4>Zkušenosti: {{ this.player2.adventurer.zkusenosti }}</h4>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="openInventory(2)">Inventář</v-btn>
              <v-btn @click="openDetail(2)">Detail</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Karta hráče 3 -->
        <v-col cols="4">
          <v-card color="primary" v-if="this.player3.adventurer != null">
            <v-card-title>{{
              this.player3.adventurer.krestniJmeno + ' ' + this.player3.adventurer.prijmeni
            }}</v-card-title>
            <v-card-subtitle>{{ this.player3.adventurer.rasa + " - " + this.player3.adventurer.trida }}</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col>
                  <h4>Životy: {{ this.player3.adventurer.zivoty }}</h4>
                </v-col>
                <v-col>
                  <h4>Peníze: {{ this.player3.adventurer.penize }}</h4>
                </v-col>
              </v-row>
              <br>
              <v-row>
                <v-col>
                  <h4>Level: {{ this.player3.adventurer.level }}</h4>
                </v-col>
                <v-col>
                  <h4>Zkušenosti: {{ this.player3.adventurer.zkusenosti }}</h4>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="openInventory(3)">Inventář</v-btn>
              <v-btn @click="openDetail(3)">Detail</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-container>

  </div>
</template>
<script>
import DetailModal from '../parts/GameModalDeaily.vue'
import AbilityCard from "../parts/AbilityCard.vue"

export default {
  name: 'Gamepage',
  components: {
    DetailModal,
    AbilityCard
  },
  data: () => ({
    //Duležité konstanty pro session
    uzivatelStore: useUzivatelStore(),
    webSocket: null,
    jmenoSessionu: null,
    sid: null,
    isOwner: false,
    myIdentity: null,

    battleModeSwitch: false,

    player1: { owner: null, adventurer: null, adventurerID: null },
    player2: { owner: null, adventurer: null, adventurerID: null },
    player3: { owner: null, adventurer: null, adventurerID: null },


    //Herni pozadi pruzkumneho modu
    dostupnePozadi: null,
    vybranePozadi: null,


    //Inventář
    inventoryModal: false,
    inventoryPlayer: null,
    inventoryLoadedAdventurerID: null,
    inventoryLoadedArray: null,
    inventoryLoadedMoney: null,
    inventoryChangeMoneyInput: null,
    inventoryAddType: null,
    inventoryAddWeapons: [],
    inventoryAddArmor: [],
    inventoryAddItem: [],
    invetarDobrodruh: null,
    inventarVaha: 0,

    //Detail dobrodruha
    detailModal: false,
    detailDobrodruh: null,
    detailLevelInput: null,
    detailExperienceInput: null,
    detailTridaShopnosti: [],
    detailRasaSchopnosti: [],

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
  }),

  mounted() {

    //Duležité proměné
    let urlParams = new URLSearchParams(window.location.search)
    this.sid = urlParams.get('sid')
    this.webSocket = io('http://localhost:3001')

    //Připojení websocketu
    this.webSocket.on('connect', () => {
      console.log('Websocket servis připojen')
    })
    this.socketsJoinRoom();

    axios.get('http://localhost:3000/sessions/checkOwner', { params: { sid: this.sid, user: this.uzivatelStore._id } })
      .then(response => {
        if (response.data) {
          this.isOwner = true
        } else {
          this.socketsResyncPlayers();
          this.resyncPlayers();
        }
      })


    //Připojení hráče
    this.webSocket.on('resyncPlayers', () => {
      this.resyncPlayers();
    })
    // /Websocket




    //Načtení pozadí
    axios.get('http://localhost:3000/pozadi/dump')
      .then(res => {
        this.dostupnePozadi = res.data
        this.vybranePozadi = this.dostupnePozadi[0]
      })

    /**
     * Načte možnosti nepřátel
     */
    this.loadEnemies()

    this.resyncPlayers()
  },

  methods: {

    // SOCKETY
    /**
     * Odešle požadavek na připojení socketu do místisti s ID sessiony
     */
    socketsJoinRoom() {
      this.webSocket.emit('joinRoom', this.sid, this.uzivatelStore._id)
    },

    /**
     * Resync připojených hráčů a jejich dobrodruhů v dané místnosti
     * 
     */
    socketsResyncPlayers() {
      this.webSocket.emit('resyncPlayers', this.sid)
      this.resyncPlayers()
    },

    /**
     * Resyncne herní mod
     */
    socketsResyncGamemode() {
      this.webSocket.emit('resyncGamemode', this.sid,)
    },

    //Inventář
    /**
     * Otevře modal pro daného hráče
     * @param {int} hrac -> Cislo hrace v pořadí
     */
    openInventory(hrac) {
      switch (hrac) {
        case 1:
          this.invetarDobrodruh = this.player1.adventurer
          break;

        case 2:
          this.invetarDobrodruh = this.player2.adventurer
          break;

        case 3:
          this.invetarDobrodruh = this.player3.adventurer
          break;

        default:
          break;
      }
      this.inventoryLoadedMoney = this.invetarDobrodruh.penize
      this.inventarVaha = 0
      axios.get('http://localhost:3000/vybava/multipleID', { params: { items: this.invetarDobrodruh.inventar } })
        .then(queryResponse => {
          this.inventoryLoadedArray = queryResponse.data
          this.inventoryLoadedAdventurerID = this.invetarDobrodruh._id
          this.inventoryModal = true;
          queryResponse.data.forEach(item => {
            this.inventarVaha += item.vaha
          });
      })
      this.inventoryAddGetChoices()

    },

    /**
     * Metoda pro změnu počtu peněz vybraného dobrodruha
     */
    inventoryChangeMoney() {
      axios.post('http://localhost:3000/character/changeMoney', { money: this.inventoryChangeMoneyInput, adventurer: this.inventoryLoadedAdventurerID })
      this.inventoryModal = false
      this.socketsResyncPlayers()
    },

    inventoryAddGetChoices() {
      axios.get('http://localhost:3000/vybava/allType', { params: { type: 'Zbran' } })
        .then(response => {
          this.inventoryAddWeapons = response.data
        })

        axios.get('http://localhost:3000/vybava/allType', { params: { type: 'Zbroj' } })
        .then(response => {
          this.inventoryAddArmor = response.data
        })

        axios.get('http://localhost:3000/vybava/allType', { params: { type: 'Předmět' } })
        .then(response => {
          this.inventoryAddItem = response.data
        })
    },

    /**
     * 
     * @param {id} item -> Předmět který se má přidat  
     */
    inventoryAddPush(item) {
      axios.post('http://localhost:3000/character/putIntoInventory', { "item": item, 'adventurer': this.inventoryLoadedAdventurerID })
        .then(responseQuery => {
          if (responseQuery.data == true) {
            this.resyncAdventurers()
          }
        })
    },

    /**
     *     //Odebere předmět z inventáře dobrodruha a resynkne dobrodruhy
     * @param {string} item ID Itemu
     */
    invetoryRemove(item) {
      axios.post('http://localhost:3000/character/removeFromInventory', { "item": item, 'adventurer': this.inventoryLoadedAdventurerID })
        .then(responseQuery => {
          if (responseQuery.data == true) {
            this.resyncAdventurers()
          }
        })

    },

    //Detail
    /**
     * Otevře detail hráčova dobrodruha
     * @param {*} hrac 
     */
    openDetail(hrac) {
      this.detailDobrodruh = null

      switch (hrac) {
        case 1:
          this.detailDobrodruh = this.player1.adventurer
          break;
        case 2:
          this.detailDobrodruh = this.player2.adventurer
          break;
        case 3:
          this.detailDobrodruh = this.player3.adventurer
          break;

        default:
          break;
      }

      axios.get('http://localhost:3000/schopnosti/byOwner', { params: { 'owner': this.detailDobrodruh.trida } })
        .then(queryResponse => {
          this.detailTridaShopnosti = queryResponse.data
        })

      axios.get('http://localhost:3000/schopnosti/byOwner', { params: { 'owner': this.detailDobrodruh.rasa } })
        .then(queryResponse => {
          this.detailRasaSchopnosti = queryResponse.data
        })
      this.detailModal = true
    },

    /**
     * Změní level a zkušenosti vybraného dobrodruha
     * Resync
     */
    detailChangeLevelExperience() {
      axios.post('http://localhost:3000/character/changeLevelAndExperience', { 'adventurer': this.detailDobrodruh._id, 'level': this.detailLevelInput, 'zkusenosti': this.detailExperienceInput })
        .then(responseQuery => {
          if (responseQuery) {
            this.detailModal = false
            this.detailLevelInput = null,
              this.detailExperienceInput = null
            this.socketsResyncPlayers()
          }
        })
    },

    // Nepřátelé
    /**
     * Načte všechny dostupné nepřátelské entity
     */
    loadEnemies() {
      axios.get('http://localhost:3000/monster/dump')
        .then(queryResponse => {
          this.dostupniNepratele = queryResponse.data,
            queryResponse.data.forEach(enemy => {
              this.moznostiNepratel.push(enemy.jmeno)
            });

        })
    },

    /**
     * Přidá nepřítele do bojového pole
     * Resync
     */
    addEnemy() {
      let pozice = this.moznostiNepratel.indexOf(this.vybranyNepritel);
      let vybrany = this.dostupniNepratele[pozice]
      vybrany.realneZivoty = vybrany.zivoty

      // ! Zajimava obklika do bakalaá5ky
      this.aktivniNepratele.push(JSON.parse(JSON.stringify(vybrany)))
      this.socketsResyncPlayers()
    },

    /**
     * Přidá život nepříteli
     * @param {int} index  Pozice nepřítele v bojovém poli
     * Resync
     */

    fightAddLifeToEnemy(index) {
      this.aktivniNepratele[index].realneZivoty = this.aktivniNepratele[index].realneZivoty + 1
      this.socketsResyncPlayers()
    },

    /**
     * Odebere život nepříteli
     * @param {int} index Pozice nepřítele v bojovém poli
     * Resync
     */
    fightRemoveLifeToEnemy(index) {
      this.aktivniNepratele[index].realneZivoty = this.aktivniNepratele[index].realneZivoty - 1
      this.socketsResyncPlayers()
    },

    fightRemoveEnemy(index) {
      this.aktivniNepratele.splice(index, 1)
    },

    // Herní cyklus

    fightChoseAdventurer(adventurer) {
      switch (adventurer) {
        case 1:
          this.bojujiciDobrodruh = this.player1.adventurer
          axios.get('http://localhost:3000/vybava/multipleID', { params: { items: this.player1.adventurer.inventar } })
            .then(queryResponse => {
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

    clearDice() {
      this.hozennaKostka = 0
      this.bojujiciNepritel = null
      this.bojujiciDobrodruh = null
      this.bojujiciDobrodruhVybava = []
      this.bojujiciDobrodruhPredmet = null
    },


    // /Boj

    // /Herní cyklus

    // Resinc sessionu
    /**
     * Znovu načte data hráčů a jejich dobrodruhů z důvodu udržení sessiony
     */
    resyncPlayers() {
      console.log("Proběhne resync")
      axios.get('http://localhost:3000/sessions/sessionPlayers', { params: { sid: this.sid } })
        .then(response => {

          this.player1.owner = response.data[0].owner
          this.player1.adventurerID = response.data[0].adventurer

          this.player2.owner = response.data[1].owner
          this.player2.adventurerID = response.data[1].adventurer

          this.player3.owner = response.data[2].owner
          this.player3.adventurerID = response.data[2].adventurer

          axios.get('http://localhost:3000/character/sessionAdventurers', { params: { adventurer1: this.player1.adventurerID, adventurer2: this.player2.adventurerID, adventurer3: this.player3.adventurerID } })
            .then(response => {

              console.log(response)
              this.player1.adventurer = response.data[0]
              this.player2.adventurer = response.data[1]
              this.player3.adventurer = response.data[2]

            })

        })
    },

    /**
     * Resyncne herní mod
     */
    resyncGamemode() {

    },
  },
}
</script>
    
<style></style>