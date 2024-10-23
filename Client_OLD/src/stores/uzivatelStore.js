import {defineStore} from 'pinia'

//Store dat přihlášeného uživatele. Důležitá persistence !
export const useUzivatelStore = defineStore('uzivatelStore',{
    state: () => {
        return {
        prihlasen: false,
        prezdivka: "",
        opravneni: '',
        _id: "",
        }
    },
    actions:{
        zapisUzivatele(prezdivka,id,opravneni){
            this.prihlasen = true;
            this.prezdivka = prezdivka;
            this.opravneni = opravneni,
            this._id = id;
        },
        odhlasUzivatele(){
            this.prihlasen = false;
            this.prezdivka = "",
            this.opravneni = '',
            this._id = ""
        }
    },
    persist:{enabled:true}

})