<script setup>
    import { useAppointmentsStore } from '@/stores/appointments';
    import { formatCurrency } from '@/helpers'

    const appointments = useAppointmentsStore()

    defineProps({
        service: {
            type: Object
        }
    })
</script>

<template>
    <div 
        class="p-5 space-y-5 rounded-lg cursor-pointer bg-white"
        @click="appointments.onServiceSelected(service)"
    >
        <p class="text-2xl font-light">{{ service.name }}</p>
        <p class="text-4xl font-black text-blue-600">{{ formatCurrency(service.price) }}</p>
    </div>
</template>

