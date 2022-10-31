
import {defineStore} from 'pinia'

export const useUzivatelStore = defineStore('uzivatelStore',{
    state: () => {
        return {
        prihlasen: false,
        prezdivka: "A",
        _id: "",
        }
    },
    getters:{ doubleCount: "YEET",},
    actions:{
        zapisUzivatele(prezdivka,_id){
            this.prihlasen = true;
            this.prezdivka = prezdivka;
            this.id = "454"
        }
    }

})