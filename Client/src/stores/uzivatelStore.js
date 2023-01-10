import {watch} from 'vue'
import {defineStore} from 'pinia'

export const useUzivatelStore = defineStore('uzivatelStore',{
    state: () => {
        return {
        prihlasen: false,
        prezdivka: "",
        _id: "",
        }
    },
    actions:{
        zapisUzivatele(prezdivka,id){
            this.prihlasen = true;
            this.prezdivka = prezdivka;
            this._id = id;
        },
        odhlasUzivatele(){
            this.prihlasen = false;
            this.prezdivka = "",
            this._id = ""
        }
    },
    persist:{enabled:true}

})