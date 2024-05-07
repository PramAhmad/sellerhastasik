
<script setup>
import { onMounted, reactive, ref } from 'vue'
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

const router = useRouter()
const login = ref('')
const pass = ref('')
const email = ref('')
const storeName = ref('')
const ownerName = ref('')
const phoneNumber = ref('')
const kecamatan = ref('')
const kelurahan = ref('')
const selectKecamatan = ref([])
const selectKelurahan = ref([])
const address = ref('')
const profilePhoto = ref()
const storeDescription = ref('')
const getKecamatan = async () => {
  try {
    const res = await axios.get("https://api.binderbyte.com/wilayah/kecamatan?api_key=6d9329a90dde55ae4af1062d531fbff87b4defcd5f377206953a4574f1d18e86&id_kabupaten=32.78");
    selectKecamatan.value = res.data.value;
  } catch (err) {
    console.error("Error fetching kecamatan:", err.message);
  }
};

const onKecamanChange = async () => {
  try {
    const res = await axios.get(`https://api.binderbyte.com/wilayah/kelurahan?api_key=6d9329a90dde55ae4af1062d531fbff87b4defcd5f377206953a4574f1d18e86&id_kecamatan=${kecamatan.value}`);
    selectKelurahan.value = res.data.value;
  } catch (err) {
    console.error("Error fetching kelurahan:", err.message);
  }
};

const handlefile = (e) => {
    const file = e.target.files[0]
    profilePhoto.value = file
}
const submit = async () => {

    const formData = new FormData();
    formData.append('name', login.value);
    formData.append('email', email.value);
    formData.append('password', pass.value);
    formData.append('nama_toko', storeName.value);
    formData.append('nama_pemilik', ownerName.value);
    formData.append('no_hp', phoneNumber.value);
    formData.append('kecamatan', kecamatan.value);
    formData.append('kelurahan', kelurahan.value);
    formData.append('alamat', address.value);
    formData.append('deskripsi', storeDescription.value);
    formData.append('foto', profilePhoto.value);
    formData.append('kota','tasikmalaya');
    formData.append('longitude',11111);
    formData.append('latitude',11111);
    
   const res = await  axios.post(import.meta.env.VITE_API_URL + 'seller/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    if(res.message  === 'success'){
        Swal.fire({
            title: 'Success',
            text: res.data.message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
        router.push('/login')
    }else{
        Swal.fire({
            title: 'Error',
            text: res.data.message,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
}
onMounted(() => {
  getKecamatan()
})
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="login"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
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
        <FormField label="Email" help="Please enter your email">
            <FormControl
                v-model="email"
                :icon="mdiEmail"
                name="email"
                autocomplete="email"
            />
        </FormField>
        <FormField label="Nama Toko" help="Please enter your store name">
            <FormControl
                v-model="storeName"
                :icon="mdiStore"
                name="storeName"
                autocomplete="off"
            />
        </FormField>
        <FormField label="Nama Pemilik" help="Masukan  Nama Pemilik">
            <FormControl
                v-model="ownerName"
                :icon="mdiAccount"
                name="ownerName"
                autocomplete="off"
            />
        </FormField>
        <FormField label="No Hp" help="Masukan Nomor hp">
            <FormControl
                v-model="phoneNumber"
                :icon="mdiPhone"
                name="phoneNumber"
                autocomplete="tel"
            />
        </FormField>
        <FormField label="Kecamatan" help="Masukan Kecamatan">
            <select v-model="kecamatan" @change="onKecamanChange" class="w-full" id="kecamatan">
                    <option value="">Pilih Kecamatan</option>
                    <option v-for="item in selectKecamatan" :key="item.id" :value="item.id">{{ item.name }}</option>
                  </select>
        </FormField>
        <FormField label="Kelurahan" help="Masukan Kelurahan">
            <select v-model="kelurahan" class="w-full" id="kelurahan">
                    <option value="">Pilih Kelurahan</option>
                    <option v-for="item in selectKelurahan" :key="item.id" :value="item.id">{{ item.name }}</option>
                  </select>
        </FormField>
        <FormField label="Alamat" help="Masukana Alamat">
            <FormControl
                v-model="address"
                :icon="mdiMapMarker"
                name="address"
                autocomplete="off"
            />
        </FormField>
        <FormField label="Profile Photo" help="Please upload your profile photo">
            <FormControl
                @change="handlefile"
                :icon="mdiImage"
                name="profilePhoto"
                type="file"
                accept="image/*"
            />
        </FormField>
        <FormField label="Deskripsi Toko" help="Please enter your store description">
            <FormControl
                v-model="storeDescription"
                :icon="mdiText"
                name="storeDescription"
                autocomplete="off"
            />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Register" />
            <BaseButton to="/" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
