import { ref, onMounted, computed, inject, watch } from "vue"
import { defineStore } from "pinia"
import { useRouter } from 'vue-router'

import AppointmentAPI from "@/api/AppointmentAPI"
import { convertToISO } from "@/helpers/date"

export const useAppointmentsStore = defineStore('appointments', () => {

    const services = ref([])
    const date = ref('')
    const time = ref('')
    const appointmentsByDate = ref([])
    const hours = ref([])

    const toast = inject('toast')
    const router = useRouter()

    onMounted(() => {
        const startHour = 10
        const endHour = 19

        for(let hour = startHour; hour <= endHour; hour++){
            hours.value.push(hour+':00')
        }
    })

    watch(date, async() => {
        time.value = ''
        if(date.value === ''){
            // Obtenemos las citas
            const { data } = await AppointmentAPI.getByDate(date.value)
            appointmentsByDate.value = data
        }

        console.log(data)
    })

    function setSelectedAppointment(appointment) {
        console.log(appointment)
        services.value = appointment.services
    }

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

    async function createAppointment(){
        const appointment = {
            services: services.value.map( service => service._id ),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value,
        }

        try {
            const { data } = await AppointmentAPI.create(appointment)
            toast.open({
                message: data.msg,
                type: 'success'
            })   
            clearAppointmentData()
            router.push({name: 'my-appointments'})
        } catch (error) {
            console.log(error)
        }
    }

    function clearAppointmentData(){
        services.value = []
        date.value = ''
        time.value = ''
    }

    const noServicesSelected = computed(() => services.value.length === 0)

    const isServiceSelected = computed(() => {
        return (id) => services.value.some(services => services._id === id)
    })

    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0)
    })

    const isValidReservation = computed(() => {
        return services.value.length && date.value.length && time.value.length
    })

    const isDateSelected = computed(() => {
        return date.value ? true : false
    })

    const disableTime = computed(() => {
        return (hour) => {
            return appointmentsByDate.value.find(appointment => appointment.time === hour)
        }
    })

    return {
        services,
        date,
        hours,
        time,
        setSelectedAppointment,
        noServicesSelected,
        createAppointment,
        onServiceSelected,
        isServiceSelected,
        totalAmount,
        isValidReservation,
        isDateSelected,
        disableTime,
    }
})