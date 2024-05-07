<template>
    <LayoutAuthenticated>
        <SectionMain>
            <SectionTitleLineWithButton :icon="mdiPlusBox" title="Tambah Produk" main>
              
            </SectionTitleLineWithButton>
            <CardBox is-form @submit.prevent="addProduct">
        
                <FormField label="Product Name">
                    <FormControl v-model="form.nama_produk"  />
                </FormField>
                <div class="flex gap-10">
                    <FormField label="Harga" class="w-1/2">
                        <FormControl v-model="form.harga" type="number" />
                    </FormField>
                    <FormField label="Jumlah Dikon (%)  " class="w-1/2">
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
                <div v-if="form.foto.length > 0" class="mb-4 flex items-center w-full justify-start gap-10">
                    <div v-for="(photo, index) in form.foto" :key="index" class="relative space-x-2">
                        <img :src="photo.preview" alt="Preview" class="w-36 h-36 rounded-md" />
                        <!-- Tombol Delete -->
                        <button @click="deletePhoto(index)"
                            class="absolute top-0 right-0 -mt-1 -mr-1 text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                
            

                <template #footer>
                    <BaseButtons>
                        <!-- button bisa tambah -->
                        <BaseButton type="submit" color="info"  label="Tambah" />
                        <BaseButton type="reset" color="info" outline label="Reset" />
                    </BaseButtons>
                </template>
            </CardBox>
        </SectionMain>
    </LayoutAuthenticated>
</template>

<script setup>
import { ref } from 'vue'
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

const form = ref({
    nama_produk: '',
    harga: '',
    diskon: '%',
    deskripsi: '',
    stok: '',
    foto: [],
    category: ''
})
const deletePhoto = (index) => {
    form.value.foto.splice(index, 1);
};
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
};
const addProduct = async ()=>{
    console.log("proses")
    const formData = new FormData();
    formData.append('nama_produk', form.value.nama_produk);
    formData.append('harga', form.value.harga);
    formData.append('diskon', form.value.diskon);
    formData.append('deskripsi', form.value.deskripsi);
    formData.append('stok', form.value.stok);
    formData.append('category', form.value.category);
    for (let i = 0; i < form.value.foto.length; i++) {
        formData.append('foto[]', form.value.foto[i].file);
    }
    const token = localStorage.getItem('token');
    if(token){

        try {
            const res = await axios.post(import.meta.env.VITE_API_URL + 'seller/products/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (res.data.message === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Product added successfully'
                });
                router.push('/products');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message
            });
        }
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must login first'
        });
    }
}
</script>