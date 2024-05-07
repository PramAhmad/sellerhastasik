<template>
    <LayoutAuthenticated>
      <SectionMain>
        <SectionTitleLineWithButton :icon="mdiPlusBox" title="Edit Produk" main>
          
        </SectionTitleLineWithButton>
        <CardBox is-form @submit.prevent="updateProduct">
    
          <FormField label="Product Name">
            <FormControl v-model="form.nama_produk" />
          </FormField>
          <div class="flex gap-10">
            <FormField label="Harga" class="w-1/2">
              <FormControl v-model="form.harga" type="number" />
            </FormField>
            <FormField label="Jumlah Dikon (%)" class="w-1/2">
              <FormControl v-model="form.diskon" type="number" />
            </FormField>
          </div>
          <FormField label="Deskripsi">
            <FormControl v-model="form.deskripsi" type="textarea" />
          </FormField>
          <FormField label="Stock">
            <FormControl v-model="form.stok" type="number" />
          </FormField>
          <FormField label="Kategori">
            <FormControl v-model="form.category" />
          </FormField>
  
          <FormField label="Photos">
                    <FormFilePicker accept="image/*" multiple @change="handlePhotoChange" />
                </FormField>
                <!-- Handle existing photos -->
                <div v-if="form.foto && form.foto.length > 0" class="mb-4 flex items-center w-full justify-start gap-10">
                    <div v-for="(photo, index) in form.foto" :key="index" class="relative space-x-2">
                        <!-- Check if there is a preview -->
                        <img v-if="photo.preview" :src="photo.preview" alt="Preview" class="w-24 h-24 rounded-md" />
                        <!-- If there is no preview, display the original photo -->
                        <img v-else :src="photo" alt="Original" class="w-24 h-24 rounded-md" />
                        <!-- Tombol Delete -->
                        <button @click="deletePhoto(index)" class="absolute top-0 right-0 -mt-1 -mr-1 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
          <template #footer>
            <BaseButtons>
              <!-- button bisa tambah -->
              <BaseButton type="submit" color="info" label="Update" />
              <BaseButton type="reset" color="info" outline label="Reset" />
            </BaseButtons>
          </template>
        </CardBox>
      </SectionMain>
    </LayoutAuthenticated>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import {
    mdiPlusBox,
    mdiAccount,
    mdiMail,
    mdiGithub,
    mdiTrashCan,
  } from '@mdi/js'
  import SectionMain from '@/components/SectionMain.vue'
  import CardBox from '@/components/CardBox.vue'
  import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
  import FormFilePicker from '@/components/FormFilePicker.vue'
  import FormField from '@/components/FormField.vue'
  import FormControl from '@/components/FormControl.vue'
  import BaseDivider from '@/components/BaseDivider.vue'
  import BaseButton from '@/components/BaseButton.vue'
  import BaseButtons from '@/components/BaseButtons.vue'
  import SectionTitle from '@/components/SectionTitle.vue'
  import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
  import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
  import NotificationBarInCard from '@/components/NotificationBarInCard.vue'
  import Swal from 'sweetalert2'
  import axios from 'axios'
  import { useRoute } from 'vue-router'
  
  const $route = useRoute()

  const getProductById = async () => {
    const token = localStorage.getItem('token')
    const res = await axios.get(import.meta.env.VITE_API_URL + 'seller/products/' + $route.params.id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const product = res.data.data[0]
    console.log(product)
    form.value.nama_produk = product.nama_produk
    form.value.harga = product.harga
    form.value.diskon = product.diskon
    form.value.deskripsi = product.deskripsi
    form.value.stok = product.stok
    form.value.category = product.category
    form.value.foto = product.foto
  }
  
  const form = ref({
    nama_produk: '',
    harga: '',
    diskon: '',
    deskripsi: '',
    stok: '',
    category: '',
    foto: []
  })
  
  const deletePhoto = (index) => {
    form.value.foto.splice(index, 1)
  }
  
  const handlePhotoChange = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
            const photo = {
                file: file,
                preview: e.target.result
            };
            form.value.foto.push(photo);
        };
        reader.readAsDataURL(file);
    }
}
  const updateProduct = async () => {
    const formData = new FormData()
    formData.append('nama_produk', form.value.nama_produk)
    formData.append('harga', form.value.harga)
    formData.append('diskon', form.value.diskon)
    formData.append('deskripsi', form.value.deskripsi)
    formData.append('stok', form.value.stok)
    formData.append('category', form.value.category)
    for (let i = 0; i < form.value.foto.length; i++) {
        formData.append('foto[]', form.value.foto[i].file)
    }
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const res = await axios.post(import.meta.env.VITE_API_URL + 'seller/products/'+ $route.params.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: res.data.message
            })
        getProductById()
        } catch (error) {
            console.error('Error updating product:', error)
            console.log(formData)
        }
    }
  }
  
  onMounted(() => {
    getProductById()
     
  })
  </script>
  