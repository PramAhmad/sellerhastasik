<script setup>
import axios from 'axios'
import { computed, ref, onMounted } from 'vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'

const reviews = ref([])
const perPage = ref(5)
const currentPage = ref(0)

const getReviews = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(import.meta.env.VITE_API_URL + 'seller/reviews', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('reviews', response)
    reviews.value = response.data.data
  } catch (error) {
    console.error('Error fetching reviews:', error)
  }
}

onMounted(() => {
  getReviews()
})

const itemsPaginated = computed(() =>
  reviews.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 3))
)

const numPages = computed(() => Math.ceil(reviews.value.length / perPage.value))
const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }
  return pagesList
})
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
            <th>Nama Produk</th>
            <th>Foto Produk</th>
          <th>Nama Customer</th>
          <th>Rating</th>
          <th>Review</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="review in itemsPaginated" :key="review.nama_customer">
            <td>{{ review.product_name }}</td>
            <td>
                <img :src="review.product_photo" class="w-10 h-10 rounded-md" alt="">
            </td>   
            <td>
            <!-- img avatar -->
        <div class="flex items-start align-middle gap-3">
            <img :src="review.photo_customer" class="w-10 h-10 rounded-md" alt="">
            <span class="py-2">{{ review.nama_customer }}</span>
        </div></td>
          <td>{{ review.rating }}</td>
          <td>{{ review.review }}</td>
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
