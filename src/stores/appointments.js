import { ref, onMounted } from "vue"
import { defineStore } from "pinia"
import ServicesAPI from "@/api/ServicesAPI"

export const useAppointmentsStore = defineStore('appointments', () => {

    function onServiceSelected(service){
        console.log(service)
    }

    return {
        onServiceSelected
    }
})