<script setup>
import { useUzivatelStore } from "../../stores/uzivatelStore.js"
import { io } from 'socket.io-client'
import axios from 'axios'



</script>

<template>
  <div>

    <!-- Modal pro inventář -->
    <InventoryModal 
    :toggle="this.inventarModal" 
    :inventoryAdventurer="this.inventarDobrodruh" 
    @resync-players="this.socketsResyncPlayers()"
    @close-modal="this.inventarModal = false"
    />
    
    <DetailModal
    :toggle="this.detailModal"
    :detailAdventurer="this.detailAdventurer"
    />
   
    <v-container class="mt-3">
      {{ this.player1.adventurer }}
      <v-row>
        <!-- Mod pruzkumu -->
        <v-col v-if="battleModeSwitch == false" cols="9">
          <v-img :src="axios.defaults.baseURL + '/backgrounds/' + vybranePozadi" max-width="100%">
          </v-img>
        </v-col>

        <!-- Mod boje -->
        <v-col v-if="battleModeSwitch == true" cols="9">
          <!-- Nepřátelé -->
          <v-card color="primary" title="Nepřátelé">
            <v-container>
              <v-expansion-panels v-if="this.dataBoje.aktivniNepratele.length != 0">
                <v-expansion-panel v-for=" (enemy, index, key) in this.dataBoje.aktivniNepratele">
                  <v-expansion-panel-title>{{ enemy.jmeno + " " + enemy.realneZivoty + " / " + enemy.zivoty + " - " +enemy.identity}}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-card-subtitle>{{ enemy.popis }}</v-card-subtitle>
                    {{ enemy }}
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
              <h4 v-if="this.dataBoje.aktivniNepratele.length == 0">Nepřátelé nejsou vybráni pro boj</h4>
            </v-container>

          </v-card>

          <!-- Bojová fronta-->
          <v-card color="primary" class="mt-3">
            <v-card-title style="color: #cca000;" align='center'>
            Bojová Fronta
            </v-card-title>
            <v-card-text>
              <v-slide-group show-arrows>
                <v-slide-group-item v-for="(warrior,index) in this.dataBoje.battleFrontInstance" :key="index"  v-slot="{ isSelected, toggle }">
                  <v-btn class="ma-2"  :color="isSelected ? 'primary' : ('krestniJmeno' in warrior ? 'success' : 'error')" @click="{this.battleFrontChosen = index;toggle()}">
                    {{ this.getIdentity(warrior) }}
                  </v-btn>
                </v-slide-group-item>

              
              </v-slide-group>
            </v-card-text>
            <v-card-action>
              <v-btn color="secondary" @click="battleFrontFinish()">
                Dokončit akci
              </v-btn>
              <v-btn color="secondary" @click="copyBattleFront()">
                Dokončit bitevní kolo
              </v-btn>
            </v-card-action>
          </v-card>

          <!-- Hod kostkou-->
          <v-card color="primary" class="mt-3">
            <v-card-title>
              Hod kostkou
            </v-card-title>
            <v-container>
              {{ this.adventurer1 }}
              <v-row v-if="this.dataBoje.bojPorovnanyAtribut == 'Volný hod'">
                <v-col>
                  <v-card color="accent" align="center" justify="center">
                    <v-card-title>Hození kostkou</v-card-title>

                    <v-card-text>
                      <v-expand-x-transition>
                        <v-img v-if="this.dataBoje.hozennaKostka != 0"
                          :src="'../../src/assets/images/dice/dice' + this.dataBoje.hozennaKostka + '.jpg'" align="center"
                          justify="center" max-height="250"></v-img>
                      </v-expand-x-transition>
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
              </v-row>
              <v-row v-if="this.dataBoje.bojPorovnanyAtribut == 'Atributy'">

                <v-col>
                  <v-card v-if="this.dataBoje.bojujiciDobrodruh == null">
                    <v-card-title>Vyberte dobrodruha</v-card-title>
                  </v-card>
                  <v-card color="success" v-if="this.dataBoje.bojujiciDobrodruh != null">
                    <v-card-title>
                      {{ this.dataBoje.bojujiciDobrodruh.krestniJmeno + " " + this.dataBoje.bojujiciDobrodruh.prijmeni }}
                    </v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col>Síla: {{ this.dataBoje.bojujiciDobrodruh.atributy.sila }}</v-col>
                        <v-col>Houževnastost: {{ this.dataBoje.bojujiciDobrodruh.atributy.houzevnatost }}</v-col>
                      </v-row>
                      <v-row>
                        <v-col>Obratnost: {{ this.dataBoje.bojujiciDobrodruh.atributy.obratnost }}</v-col>
                        <v-col>Charisma: {{ this.dataBoje.bojujiciDobrodruh.atributy.charisma }}</v-col>
                      </v-row>
                      <v-row>
                        <v-col>Inteligence: {{ this.dataBoje.bojujiciDobrodruh.atributy.inteligence }}</v-col>
                        <v-col>Znalost: {{ this.dataBoje.bojujiciDobrodruh.atributy.znalost }}</v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>


                <v-col>
                  <v-card color="accent" align="center" justify="center">
                    <v-card-title>Hození kostkou</v-card-title>
                    <v-card-text>
                      <v-img v-if="this.dataBoje.hozennaKostka != 0"
                        :src="'../../src/assets/images/dice/dice' + this.dataBoje.hozennaKostka + '.jpg'" align="center"
                        justify="center" max-height="250"></v-img>
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
                  <v-card v-if="this.dataBoje.bojujiciNepritel == null">
                    <v-card-title>Vyberte nepřítele</v-card-title>
                  </v-card>
                  <v-card v-if="this.dataBoje.bojujiciNepritel != null">
                    <v-card-title>
                      {{ this.dataBoje.bojujiciNepritel.jmeno }}
                    </v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col>Síla: {{ this.dataBoje.bojujiciNepritel.sila }}</v-col>
                        <v-col>Houževnastost: {{ this.dataBoje.bojujiciNepritel.houzevnatost }}</v-col>
                      </v-row>
                      <v-row>
                        <v-col>Obratnost: {{ this.dataBoje.bojujiciNepritel.obratnost }}</v-col>
                        <v-col>Charisma: {{ this.dataBoje.bojujiciNepritel.charisma }}</v-col>
                      </v-row>
                      <v-row>
                        <v-col>Inteligence: {{ this.dataBoje.bojujiciNepritel.inteligence }}</v-col>
                        <v-col>Znalost: {{ this.dataBoje.bojujiciNepritel.znalost }}</v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-if="this.dataBoje.bojPorovnanyAtribut == 'Zásah'">
                <v-col>
                  <v-card v-if="this.dataBoje.bojujiciDobrodruh == null">
                    <v-card-title>Vyberte dobrodruha</v-card-title>
                  </v-card>
                  <v-card color="success" v-if="this.dataBoje.bojujiciDobrodruh != null">
                    <v-card-title>
                      {{ this.dataBoje.bojujiciDobrodruh.krestniJmeno + " " + this.dataBoje.bojujiciDobrodruh.prijmeni }}
                    </v-card-title>
                    <v-card-text>

                      <v-col>
                        <h3>Obratnost: {{ this.dataBoje.bojujiciDobrodruh.atributy.obratnost }}</h3>
                      </v-col>

                    </v-card-text>
                  </v-card>
                </v-col>


                <v-col>
                  <v-card color="accent" align="center" justify="center">
                    <v-card-title>Hození kostkou</v-card-title>
                    <v-card-text>
                      <v-img v-if="this.dataBoje.hozennaKostka != 0"
                        :src="'../../src/assets/images/dice/dice' + this.dataBoje.hozennaKostka + '.jpg'" align="center"
                        justify="center" max-height="250"></v-img>
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
                  <v-card v-if="this.dataBoje.bojujiciNepritel == null">
                    <v-card-title>Vyberte nepřítele</v-card-title>
                  </v-card>
                  <v-card v-if="this.dataBoje.bojujiciNepritel != null">
                    <v-card-title>
                      {{ this.dataBoje.bojujiciNepritel.jmeno }}
                    </v-card-title>
                    <v-card-text>

                      <v-col>
                        <h3>Obratnost: {{ this.dataBoje.bojujiciNepritel.obratnost }}</h3>
                      </v-col>

                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-if="this.dataBoje.bojPorovnanyAtribut == 'Průraz'">
                <v-col>
                  <v-card v-if="this.dataBoje.bojujiciDobrodruh == null">
                    <v-card-title color="error">Vyberte dobrodruha</v-card-title>
                  </v-card>
                  <v-card color="success" v-if="this.dataBoje.bojujiciDobrodruh != null">
                    <v-card-title>
                      {{ this.dataBoje.bojujiciDobrodruh.krestniJmeno + " " + this.dataBoje.bojujiciDobrodruh.prijmeni }}
                    </v-card-title>
                    <v-card-text>
                      <v-select :items="this.dataBoje.bojujiciDobrodruhVybava"
                        v-model="this.dataBoje.bojujiciDobrodruhPredmet" item-title="jmeno" return-object
                        label="Vyberte předmět"></v-select>
                      <v-col v-if="!!this.dataBoje.bojujiciDobrodruhPredmet">
                        <h3 v-if="this.dataBoje.bojujiciDobrodruhPredmet.typ == 'Zbraň'">Průraz: {{
                          this.dataBoje.bojujiciDobrodruhPredmet.pruraznost
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
                      <v-img v-if="this.dataBoje.hozennaKostka != 0"
                        :src="'../../src/assets/images/dice/dice' + this.dataBoje.hozennaKostka + '.jpg'" align="center"
                        justify="center" max-height="250"></v-img>
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
                  <v-card v-if="this.dataBoje.bojujiciNepritel == null">
                    <v-card-title>Vyberte nepřítele</v-card-title>
                  </v-card>
                  <v-card v-if="this.dataBoje.bojujiciNepritel != null">
                    <v-card-title>
                      {{ this.dataBoje.bojujiciNepritel.jmeno }}
                    </v-card-title>
                    <v-card-text>

                      <v-col>
                        <h3>Zbroj: {{ this.dataBoje.bojujiciNepritel.zbroj }}</h3>
                      </v-col>

                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-if="this.dataBoje.bojPorovnanyAtribut == 'Steč'">
                <v-col>
                  <v-card v-if="this.dataBoje.bojujiciDobrodruh == null">
                    <v-card-title color="error">Vyberte dobrodruha</v-card-title>
                  </v-card>
                  <v-card color="success" v-if="this.dataBoje.bojujiciDobrodruh != null">
                    <v-card-title>
                      {{ this.dataBoje.bojujiciDobrodruh.krestniJmeno + " " + this.dataBoje.bojujiciDobrodruh.prijmeni }}
                    </v-card-title>
                    <v-card-text>
                      <v-select :items="this.dataBoje.bojujiciDobrodruhVybava"
                        v-model="this.dataBoje.bojujiciDobrodruhPredmet" item-title="jmeno" return-object
                        label="Vyberte předmět"></v-select>
                      <v-col v-if="!!this.dataBoje.bojujiciDobrodruhPredmet">
                        <h3 v-if="this.dataBoje.bojujiciDobrodruhPredmet.typ == 'Zbraň'">Poškození: {{
                          this.dataBoje.bojujiciDobrodruhPredmet.poskozeni
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
                      <v-img v-if="this.dataBoje.hozennaKostka != 0"
                        :src="'../../src/assets/images/dice/dice' + this.dataBoje.hozennaKostka + '.jpg'" align="center"
                        justify="center" max-height="250"></v-img>
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
                  <v-card v-if="this.dataBoje.bojujiciNepritel == null">
                    <v-card-title>Vyberte nepřítele</v-card-title>
                  </v-card>
                  <v-card v-if="this.dataBoje.bojujiciNepritel != null">
                    <v-card-title>
                      {{ this.dataBoje.bojujiciNepritel.jmeno }}
                    </v-card-title>
                    <v-card-text>

                      <v-col>
                        <h3>Zdraví: {{ this.dataBoje.bojujiciNepritel.realneZivoty + '/' +
                          this.dataBoje.bojujiciNepritel.zivoty }}</h3>
                      </v-col>

                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-if="this.dataBoje.bojPorovnanyAtribut == 'Uhyb'">
                <v-col>
                  <v-card v-if="this.dataBoje.bojujiciDobrodruh == null">
                    <v-card-title>Vyberte dobrodruha</v-card-title>
                  </v-card>
                  <v-card color="success" v-if="this.dataBoje.bojujiciDobrodruh != null">
                    <v-card-title>
                      {{ this.dataBoje.bojujiciDobrodruh.krestniJmeno + " " + this.dataBoje.bojujiciDobrodruh.prijmeni }}
                    </v-card-title>
                    <v-card-text>

                      <v-col>
                        <h3>Obratnost: {{ this.dataBoje.bojujiciDobrodruh.atributy.obratnost }}</h3>
                      </v-col>

                    </v-card-text>
                  </v-card>
                </v-col>


                <v-col>
                  <v-card color="accent" align="center" justify="center">
                    <v-card-title>Hození kostkou</v-card-title>
                    <v-card-text>
                      <v-img v-if="this.dataBoje.hozennaKostka != 0"
                        :src="'../../src/assets/images/dice/dice' + this.dataBoje.hozennaKostka + '.jpg'" align="center"
                        justify="center" max-height="250"></v-img>
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
                  <v-card v-if="this.dataBoje.bojujiciNepritel == null">
                    <v-card-title>Vyberte nepřítele</v-card-title>
                  </v-card>
                  <v-card v-if="this.dataBoje.bojujiciNepritel != null">
                    <v-card-title>
                      {{ this.dataBoje.bojujiciNepritel.jmeno }}
                    </v-card-title>
                    <v-card-text>

                      <v-col>
                        <h3>Obratnost: {{ this.dataBoje.bojujiciDobrodruh.atributy.obratnost }}</h3>
                      </v-col>

                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-if="this.dataBoje.bojPorovnanyAtribut == 'Blokace'">

                <v-col>
                  <v-card v-if="this.dataBoje.bojujiciDobrodruh == null">
                    <v-card-title>Vyberte dobrodruha</v-card-title>
                  </v-card>
                  <v-card color="success" v-if="this.dataBoje.bojujiciDobrodruh != null">
                    <v-card-title>
                      {{ this.dataBoje.bojujiciDobrodruh.krestniJmeno + " " + this.dataBoje.bojujiciDobrodruh.prijmeni }}
                    </v-card-title>
                    <v-card-text>
                      <v-select :items="this.dataBoje.bojujiciDobrodruhVybava"
                        v-model="this.dataBoje.bojujiciDobrodruhPredmet" item-title="jmeno" return-object
                        label="Vyberte předmět"></v-select>
                      <v-col v-if="!!this.dataBoje.bojujiciDobrodruhPredmet">
                        <h3 v-if="this.dataBoje.bojujiciDobrodruhPredmet.typ == 'Zbroj'">Obrana: {{
                          this.dataBoje.bojujiciDobrodruhPredmet.obrana
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
                      <v-img v-if="this.dataBoje.hozennaKostka != 0"
                        :src="'../../src/assets/images/dice/dice' + this.dataBoje.hozennaKostka + '.jpg'" align="center"
                        justify="center" max-height="250"></v-img>
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
                  <v-card v-if="this.dataBoje.bojujiciNepritel == null">
                    <v-card-title>Vyberte nepřítele</v-card-title>
                  </v-card>
                  <v-card v-if="this.dataBoje.bojujiciNepritel != null">
                    <v-card-title>
                      {{ this.dataBoje.bojujiciNepritel.jmeno }}
                    </v-card-title>
                    <v-card-text>

                      <v-col>
                        <h3>Průraznost: {{ this.dataBoje.bojujiciNepritel.pruraz }}</h3>
                      </v-col>

                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-if="this.dataBoje.bojPorovnanyAtribut == 'Výdrž'">
                <v-col>
                  <v-card v-if="this.dataBoje.bojujiciDobrodruh == null">
                    <v-card-title>Vyberte dobrodruha</v-card-title>
                  </v-card>
                  <v-card color="success" v-if="this.dataBoje.bojujiciDobrodruh != null">
                    <v-card-title>
                      {{ this.dataBoje.bojujiciDobrodruh.krestniJmeno + " " + this.dataBoje.bojujiciDobrodruh.prijmeni }}
                    </v-card-title>
                    <v-card-text>

                      <v-col>
                        <h3>Obratnost: {{ this.dataBoje.bojujiciDobrodruh.zivoty }}</h3>
                      </v-col>

                    </v-card-text>
                  </v-card>
                </v-col>


                <v-col>
                  <v-card color="accent" align="center" justify="center">
                    <v-card-title>Hození kostkou</v-card-title>
                    <v-card-text>
                      <v-img v-if="this.dataBoje.hozennaKostka != 0"
                        :src="'../../src/assets/images/dice/dice' + this.dataBoje.hozennaKostka + '.jpg'" align="center"
                        justify="center" max-height="250"></v-img>
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
                  <v-card v-if="this.dataBoje.bojujiciNepritel == null">
                    <v-card-title>Vyberte nepřítele</v-card-title>
                  </v-card>
                  <v-card v-if="this.dataBoje.bojujiciNepritel != null">
                    <v-card-title>
                      {{ this.dataBoje.bojujiciNepritel.jmeno }}
                    </v-card-title>
                    <v-card-text>

                      <v-col>
                        <h3>Obratnost: {{ this.dataBoje.bojujiciDobrodruh.atributy.obratnost }}</h3>
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
          <v-card v-if="this.dataBoje.bojujiciDobrodruh == null" color="primary" title="Dobrodruzi" class="mt-3">
            <v-card-text>
              <div class="d-flex justify-space-around align-center flex-column flex-sm-row fill-height">
                {{ p }}
                <v-btn v-if="player1.adventurer != null" variant="flat" color="secondary"
                  @click="fightChoseAdventurer(1)">
                  {{ player1.adventurer.krestniJmeno }}
                </v-btn>

                <v-btn v-if="player2.adventurer != null" variant="flat" color="secondary"
                  @click="fightChoseAdventurer(2)">
                  {{ player2.adventurer.krestniJmeno }}
                </v-btn>

                <v-btn v-if="player3.adventurer != null" variant="flat" color="secondary"
                  @click="fightChoseAdventurer(3)">
                  {{ player3.adventurer.krestniJmeno }}
                </v-btn>

              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Přepínač herního modu-->
        <v-col v-if="this.myIdentity == 'Owner'" cols="3">
          <v-card color="primary">
            <v-card-title v-if="this.battleModeSwitch">
              <h3>Herní mod: Boj</h3>
            </v-card-title>
            <v-card-title v-else>
              <h3>Herní mod: Pruzkum</h3>
            </v-card-title>
            <v-card-text>
              <v-switch v-model="battleModeSwitch" @update:modelValue="socketsResyncGamemode()" :label="`Přepínač`">
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
                <v-select color="secondary" variant="outlined" label="Výběr" :items="moznostiNepratel"
                  v-model="vybranyNepritel"></v-select>
              </row>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="addEnemy" color="secondary" variant="outlined">Přidat</v-btn>
            </v-card-actions>
          </v-card>

          <!-- Typ hodu-->
          <v-card v-if="battleModeSwitch == true" color="primary" class="mt-3">
            <v-card-title>
              <h3 align="center">Mód hodu</h3>
            </v-card-title>
            <v-card-text>
              <v-select label="Porovnávaný atribut" color="secondary" variant="outlined"
                :items="['Volný hod', 'Atributy', 'Zásah', 'Průraz', 'Steč', 'Uhyb', 'Blokace', 'Výdrž']"
                v-model="dataBoje.bojPorovnanyAtribut" @update:modelValue="this.socketsResyngBattle()"></v-select>
            </v-card-text>
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
import InventoryModal from '../parts/gamepageParts/InventoryModalPart.vue'
import DetailModal from '../parts/gamepageParts/DetailModalPart.vue'
import AbilityCard from "../parts/AbilityCard.vue"

export default {
  name: 'Gamepage',
  components: {

    AbilityCard,
    InventoryModal,
    DetailModal,
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
    inventarModal: false, 
    inventarDobrodruh: null,


    //Detail dobrodruha
    detailModal: false,
    detailDobrodruh: null,
    detailLevelInput: null,
    detailExperienceInput: null,
    detailTridaShopnosti: [],
    detailRasaSchopnosti: [],

    // Bojový mod
    dataBoje: {
      bojPorovnanyAtribut: 'Volný hod',
      hozennaKostka: 0,
      bojujiciNepritel: null,
      bojujiciDobrodruh: null,
      bojujiciDobrodruhVybava: [],
      bojujiciDobrodruhPredmet: null,
      aktivniNepratele: [],
      battleFront: [],
      battleFrontInstance: [],
      battleFrontInstanceAdventurers: [],
    },
    battleFrontChosen: null,



    // Nepřátelé
    dostupniNepratele: null,
    moznostiNepratel: [],
    vybranyNepritel: null,
    monsterIdentity: 1,
  }),
  unmounted(){
    this.webSocket.emit('disconnect',this.myIdentity)
  },
  mounted() {

    //Duležité proměné
    let urlParams = new URLSearchParams(window.location.search)
    this.sid = urlParams.get('sid')
    if (axios.defaults.baseURL == 'http://localhost:3000') {
      this.webSocket = io('http://localhost:3000')
    } else {
      this.webSocket = io('https://api.rozdel-a-panuj.cz')
      //
    }

    //WEBSOCKET
    //Připojení websocketu
    this.webSocket.on('connect', () => {
      console.log('Websocket servis připojen')
    })
    this.socketsJoinRoom();

    axios.get(axios.defaults.baseURL + '/sessions/checkOwner', { params: { sid: this.sid, user: this.uzivatelStore._id } })
      .then(response => {
        if (response.data) {
          this.isOwner = true
          this.myIdentity = 'Owner'
        } else {
          this.socketsResyncPlayers();
          this.resyncPlayers();
        }
      })


    //Připojení hráče
    this.webSocket.on('resyncPlayers', () => {
      this.resyncPlayers();
    })

    //Změna herního modu
    this.webSocket.on('resyncGamemode', (mode) => {
      this.battleModeSwitch = mode;
    })

    this.webSocket.on('resyncBattle', (data) => {
      this.dataBoje = data
    })


    //Načtení pozadí
    axios.get(axios.defaults.baseURL + '/pozadi/dump')
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

    getIdentity(entity){
      if(entity.jmeno){
        return `${entity.jmeno} - ${entity.identity}`;
      }
      return `${entity.krestniJmeno} - ${entity.prijmeni}`;
    }, 
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
      this.webSocket.emit('resyncGamemode', this.sid, this.battleModeSwitch)
    },

    socketsResyngBattle() {
      this.webSocket.emit('resyncBattle', this.sid, this.dataBoje)
    },


    //Inventář
    /**
     * Otevře inventář modal pro daného hráče
     * @param {int} hrac -> Cislo hrace v pořadí
     */
    openInventory(hrac) {
      switch (hrac) {
        case 1:
          this.inventarDobrodruh = this.player1.adventurer
          break;

        case 2:
          this.inventarDobrodruh = this.player2.adventurer
          break;

        case 3:
          this.inventarDobrodruh = this.player3.adventurer
          break;

        default:
          break;
      }
      this.inventarModal = true;
    },


    //Detail
    /**
     * Otevře detail hráčova dobrodruha
     * @param {*} hrac 
     */
    openDetail(hrac) {
      switch (hrac) {
        case 1:
          this.detailAdventurer = this.player1.adventurer
          break;
        case 2:
          this.detailAdventurer = this.player2.adventurer
          break;
        case 3:
          this.detailAdventurer = this.player3.adventurer
          break;

        default:
          break;
      }

      /*

        */
      this.detailModal = true
    },

    /**
     * Změní level a zkušenosti vybraného dobrodruha
     * Resync
     */
    detailChangeLevelExperience() {
      axios.post(axios.defaults.baseURL + '/character/changeLevelAndExperience', { 'adventurer': this.detailDobrodruh._id, 'level': this.detailLevelInput, 'zkusenosti': this.detailExperienceInput })
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
      axios.get(axios.defaults.baseURL + '/monster/dump')
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
      vybrany.identity = this.monsterIdentity
      this.monsterIdentity++; 

      // ! Zajimava obklika do bakalaá5ky
      this.dataBoje.aktivniNepratele.push(JSON.parse(JSON.stringify(vybrany)))
      this.battleFrontFillInstance()
      this.copyBattleFront()
      this.socketsResyngBattle()
    },

    /**
     * Přidá život nepříteli
     * @param {int} index  Pozice nepřítele v bojovém poli
     * Resync
     */

    fightAddLifeToEnemy(index) {
      this.dataBoje.aktivniNepratele[index].realneZivoty = this.dataBoje.aktivniNepratele[index].realneZivoty + 1
      this.socketsResyngBattle()
    },

    /**
     * Odebere život nepříteli
     * @param {int} index Pozice nepřítele v bojovém poli
     * Resync
     */
    fightRemoveLifeToEnemy(index) {
      this.dataBoje.aktivniNepratele[index].realneZivoty = this.dataBoje.aktivniNepratele[index].realneZivoty - 1
      this.socketsResyngBattle()
    },

    /**
     * Odebere nepřítele z bojiště
     * @param {int} index Pozice nepřítele na bojišti
     */
    fightRemoveEnemy(index) {
      this.dataBoje.aktivniNepratele.splice(index, 1)
      this.socketsResyngBattle()
    },

    // Herní cyklus

    /**
     * 
     * @param {int} adventurer : ID dobrodruha pro boj
     */
    fightChoseAdventurer(adventurer) {
      switch (adventurer) {
        case 1:
          this.dataBoje.bojujiciDobrodruh = this.player1.adventurer
          break;
        case 2:
          this.dataBoje.bojujiciDobrodruh = this.player2.adventurer
          break;
        case 3:
          this.dataBoje.bojujiciDobrodruh = this.player3.adventurer
          break;

        default:
          break;
      }
      axios.get(axios.defaults.baseURL + '/vybava/multipleID', { params: { items: this.dataBoje.bojujiciDobrodruh.inventar } })
        .then(queryResponse => {
          this.dataBoje.bojujiciDobrodruhVybava = queryResponse.data
          this.socketsResyngBattle()
        })

    },

    /**
     * Vybere nepřítele pro hod kostkou
     * @param {INT} enemy Pozice v poli aktivních nepřátel
     */
    fightChoseEnemy(enemy) {
      this.dataBoje.bojujiciNepritel = this.dataBoje.aktivniNepratele[enemy]
      this.socketsResyngBattle()
    },


    battleFrontFillInstance(){
      this.dataBoje.battleFront = JSON.parse(JSON.stringify(this.dataBoje.aktivniNepratele))
      if (this.player1.adventurer) {
        this.dataBoje.battleFront.push(this.player1.adventurer)
      }

    },

    copyBattleFront(){
      this.dataBoje.battleFrontInstance = JSON.parse(JSON.stringify(this.dataBoje.battleFront))
    },


    battleFrontFinish(){
      this.dataBoje.battleFrontInstance.splice(this.battleFrontChosen,1)
    },




    throwDice() {
      this.dataBoje.hozennaKostka = Math.floor((Math.random() * 6) + 1);
      this.socketsResyngBattle()
    },

    clearDice() {
      this.dataBoje.hozennaKostka = 0
      this.dataBoje.bojujiciNepritel = null
      this.dataBoje.bojujiciDobrodruh = null
      this.dataBoje.bojujiciDobrodruhVybava = []
      this.dataBoje.bojujiciDobrodruhPredmet = null
      this.socketsResyngBattle()
    },


    // /Boj

    // /Herní cyklus

    // Resinc sessionu
    /**
     * Znovu načte data hráčů a jejich dobrodruhů z důvodu udržení sessiony
     */
    resyncPlayers() {
      console.log("Proběhne resync")
      axios.get(axios.defaults.baseURL + '/sessions/sessionPlayers', { params: { sid: this.sid } })
        .then(response => {

          this.player1.owner = response.data[0].owner
          this.player1.adventurerID = response.data[0].adventurer

          this.player2.owner = response.data[1].owner
          this.player2.adventurerID = response.data[1].adventurer

          this.player3.owner = response.data[2].owner
          this.player3.adventurerID = response.data[2].adventurer

          axios.get(axios.defaults.baseURL + '/character/sessionAdventurers', { params: { adventurer1: this.player1.adventurerID, adventurer2: this.player2.adventurerID, adventurer3: this.player3.adventurerID } })
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