<script setup>
    import { useUserStore } from '@/stores/user'
    const user = useUserStore
</script>

<template>
    <h2 class="text-4xl font-extrabold text-white">Mis Citas</h2>
    <p class="text-white text-lg mt-5">A continuacion pódras administrar tus próximas citas</p>

    <p v-if="user.loading" class="text-white text-2xl text-center mt-5">Cargando...</p>

    <div v-else>
        <p v-if="user.noAppointments" class="text-white text-2xl text-center mt-5">No tienes proximas citas</p>
    </div>
</template>

