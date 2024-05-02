import { ref, onMounted, computed } from "vue"
import { defineStore } from "pinia"
import ServicesAPI from "@/api/ServicesAPI"

export const useAppointmentsStore = defineStore('appointments', () => {

    const services = ref([])

    function onServiceSelected(service){
        if(services.value.some(selectedService => selectedService._id === service._id)){
            services.value = services.value.filter(selectedService => selectedService._id !== service._id)
        }else{
            if(services.value.length === 2){
                alert("Maximo 2 servicios por cita")
                return
            }
            services.value.push(service)
        }
    }

    const isServiceSelected = computed(() => {
        return (id) => services.value.some(services => services._id === id)
    })

    return {
        onServiceSelected,
        isServiceSelected
    }
})