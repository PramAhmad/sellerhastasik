<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
const email = ref('')
const pass = ref('')

const router = useRouter()

const submit = async () => {
   const res = await axios.post(import.meta.env.VITE_API_URL + 'seller/login', {
    email: email.value,
    password: pass.value
   })
    if (res.data.message === 'success') {
      localStorage.setItem('token', res.data.token)
      router.push('/dashboard')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: res.data.message
      })
    }
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="">
      <CardBox :class="cardClass" is-form @submit.prevent="submit" class="bg-gray-200">
        <h2 class="text-center font-semibold text-gray-800 text-3xl">Admin Login</h2>
        <FormField label="Email" help="Please enter your login">
          <FormControl
            v-model="email"
            :icon="mdiAccount"
            name="login"
            autocomplete="email"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="pass"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

      

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
