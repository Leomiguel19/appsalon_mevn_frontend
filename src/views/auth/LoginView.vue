<script setup>
    import { inject } from 'vue'
    import AuthAPI from '@/api/AuthAPI'

    const toast = inject('toast')

    const handleSubmit = async (formData) => {
        try {
            const { data: {token} } = await AuthAPI.login(formData)
            console.log(token)
            localStorage.setItem('AUTH_TOKEN', token)
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }
</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar sesion</h1>
    <h1 class="text-2xl text-white text-center my-5">Si tienes una cuenta inicia sesion</h1>

    <FormKit
        id="loginForm"
        type="form"
        :actions="false"
        incomplete-message="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"
    >
        <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Email de usuario"
            validation="required|email"
            :validation-messages="{
                required: 'El email es obligatorio',
                email: 'Email no válido',
            }"
        />

        <FormKit
            type="password"
            label="Password"
            name="password"
            placeholder="Password de usuario"
            validation="required"
            :validation-messages="{
                required: 'El password es obligatorio',
            }"
        />

        <FormKit type="submit">Iniciar Sesion</FormKit>
    </FormKit>
</template>

