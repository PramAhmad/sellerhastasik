<script setup>
import axios from 'axios'
import { computed, ref, onMounted } from 'vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import Swal from 'sweetalert2'
defineProps({
  checkable: Boolean
})

const items = ref([])
const selectedProduct = ref(null)
const perPage = ref(5)
const currentPage = ref(0)  
const getProduct = async () => {
  try {
    const response = await axios.get('https://duaorangbaik.fun/api/products')
    items.value = response.data.data.data
    console.log('items', response)
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const isModalActive = ref(false)
const deleteProduk = async (id) => {
//  confirm delte with swal
  Swal.fire({
    title: 'Are you sure?',
    text: "Kamu tidak akan dapat mengembalikan data setelah di hapus",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.delete('https://duaorangbaik.fun/seller/products/' + id, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log('delete', response)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        getProduct()
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  })
}
const checkedRows = ref([])

const itemsPaginated = computed(() =>
  items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 3))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))
const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }
  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []
  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })
  return newArr
}

const checked = (isChecked, product) => {
  if (isChecked) {
    checkedRows.value.push(product)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row._id.$oid === product._id.$oid)
  }
}

const showProductDetails = (product) => {
  selectedProduct.value = product
  isModalActive.value = true
}


onMounted(() => {
  getProduct()
})
</script>

<template>
  <div>
    <CardBoxModal v-model="isModalActive" title="Product Details" :button="null" has-cancel>
      <div v-if="selectedProduct">
  <h3>{{ selectedProduct.nama_produk }}</h3>
  <!-- loop img -->
  <div class="flex flex-wrap gap-10">
    <img v-for="image in selectedProduct.foto" :key="image.id" :src="image" alt="Product Image" class="w-32 h-32" />
  </div>

  <p><strong>Harga:</strong> {{ selectedProduct.harga }}</p>
  <!-- total diskon -->
  <p><strong>Diskon:</strong> {{ selectedProduct.diskon }}%</p>
  <p><strong>Harga Diskon:</strong> {{ selectedProduct.harga_diskon }}</p>
  <p><strong>Stok:</strong> {{ selectedProduct.stok }}</p>
  <p><strong>Deskripsi:</strong> {{ selectedProduct.deskripsi }}</p>
</div>

    </CardBoxModal>
 
    <table>
      <thead>
        <tr>
          <th v-if="checkable" />
          <th />
          <th>Nama Produk</th>
          <th>Foto</th>
          <th>Harga </th>
          <th>Harga Diskon</th>
          <th>Stok</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in itemsPaginated" :key="product._id.$oid">
          <TableCheckboxCell v-if="checkable" @checked="checked($event, product)" />
          <td class="border-b-0 lg:w-6 before:hidden">
            <UserAvatar :username="product.seller.nama_toko" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
          </td>
          <td data-label="Nama Produk">
            {{ product.nama_produk }}
          </td>
          <td data-label="Foto">
            <img :src="product.foto[0]" alt="Product image" class="w-20 h-20 rounded-md" />
          </td>
          <td data-label="Harga">
            {{ product.harga }}
          </td>
          <td data-label="Harga Diskon">
            {{ product.harga_diskon }}
          </td>
          <td data-label="Stok">
            {{ product.stok }}
          </td>
            <td class="before:hidden lg:w-1 whitespace-nowrap">
              <div class="flex gap-2" >

                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton color="info" :icon="mdiEye" small @click="showProductDetails(product)" />
                  <BaseButton color="danger" :icon="mdiTrashCan" small @click="deleteProduk(product._id.$oid)" />
                  
                </BaseButtons>
                <router-link :to="'/product/edit/' + product._id.$oid" class="py-1 px-1.5 rounded-md bg-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

                </router-link>
              </div>
              <!-- to edit page -->
            </td>
        </tr>
      </tbody>
    </table>

    <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
      <BaseLevel>
        <BaseButtons>
          <BaseButton
            v-for="page in pagesList"
            :key="page"
            :active="page === currentPage"
            :label="page + 1"
            :color="page === currentPage ? 'lightDark' : 'whiteDark'"
            small
            @click="currentPage = page"
          />
        </BaseButtons>
        <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
      </BaseLevel>
    </div>
  </div>
</template>
