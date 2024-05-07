<template>
  <div class="w-full">
    <template v-if="datas && datas.data">
      <img
        :src="datas.data.foto"
        alt="User avatar"
        class="w-10 h-10 rounded-full"
      />
      <h1 class="text-md">{{ datas.data.nama_toko }}</h1>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/main'
import { onMounted, ref } from 'vue';
import axios from 'axios'

const mainStore = useMainStore()
const userName = ref('')
const userEmail = ref('')
const userAvatar = ref('')
const datas = ref([])
const getCurentUser = async () => {
  const token = localStorage.getItem('token')
  if(token){
    try {
      const getid = await axios.get(import.meta.env.VITE_API_URL + 'user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const res = await axios.get(import.meta.env.VITE_API_URL + 'seller/info/'+getid.data.id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    datas.value = res.data
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  }
}

onMounted(() => {
  getCurentUser()
})
</script>
