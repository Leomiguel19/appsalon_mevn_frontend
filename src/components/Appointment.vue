<script setup>
    import { displayDate } from '@/helpers/date';

    defineProps({
        appointment: {
            type: Object
        }
    })
</script>

<template>
    <div class="bg-white p-5 space-y-3 rounded-lg">
        <p class="text-gray-500 font-black">
            Fecha: <span class="font-light"> {{displayDate(appointment.date)}} </span>
            Hora: <span class="font-light"> {{ appointment.time }} </span>
        </p>
    </div>
</template>