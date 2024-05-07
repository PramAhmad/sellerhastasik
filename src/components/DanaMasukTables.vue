<template>
    <div>
      <!-- Modal untuk detail order -->
      <CardBoxModal v-model="isModalActive" title="Order Details">
        <div v-if="selectedOrder">
          <p><strong>Order ID:</strong> {{ selectedOrder.id }}</p>
          <p><strong>Customer Name:</strong> {{ selectedOrder.customerName }}</p>
          <p><strong>Destination Address:</strong> {{ selectedOrder.destinationAddress }}</p>
          <p><strong>Status:</strong> <span :class="getStatusClass(selectedOrder.status)">{{ selectedOrder.status }}</span></p>
          <h4>Ordered Items:</h4>
          <ul>
            <li v-for="item in selectedOrder.items" :key="item.id">
              {{ item.name }} - Quantity: {{ item.quantity }} - Price: {{ item.price }}
            </li>
          </ul>
          <!-- Tambahan informasi lainnya -->
        </div>
      </CardBoxModal>
  
      <!-- Section untuk tabel riwayat pembayaran -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4">History Dana Masuk</h2>
        <!-- Tabel riwayat pembayaran -->
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Beli</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in itemsPaginated" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.customerName }}</td>
              <td>{{ order.total_belanja }}</td>
              <td><span :class="getStatusClass(order.status)">{{ order.status }}</span></td>
              <td>
                <BaseButton color="info" :label="'Detail'" small @click="showOrderDetails(order)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Navigasi halaman di bawah tabel -->
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
  
  <script setup>
  import { computed, ref } from 'vue'
  import CardBoxModal from '@/components/CardBoxModal.vue'
  import BaseLevel from '@/components/BaseLevel.vue'
  import BaseButtons from '@/components/BaseButtons.vue'
  import BaseButton from '@/components/BaseButton.vue'
  
  // Struktur data order dengan informasi pembayaran
  const items = computed(() => [
    {
      id: 1,
      customerName: 'John Doe',
      total_belanja: 'Rp. 500.000',
      status: 'Success'
    },
    {
      id: 2,
      customerName: 'Jane Doe',
      total_belanja: 'Rp. 750.000',
      status: 'Pending'
    },
    // Tambahkan data order lainnya sesuai kebutuhan
  ])
  
  const isModalActive = ref(false)
  const selectedOrder = ref(null)
  
  // Pagination
  const perPage = ref(5)
  const currentPage = ref(0)
  const itemsPaginated = computed(() => items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1)))
  const numPages = computed(() => Math.ceil(items.value.length / perPage.value))
  const currentPageHuman = computed(() => currentPage.value + 1)
  const pagesList = computed(() => {
    const pagesList = []
    for (let i = 0; i < numPages.value; i++) {
      pagesList.push(i)
    }
    return pagesList
  })
  
  // Fungsi untuk menampilkan modal detail order
  const showOrderDetails = (order) => {
    selectedOrder.value = order
    isModalActive.value = true
  }
  
  // Fungsi untuk menentukan kelas status badge berdasarkan status
  const getStatusClass = (status) => {
    return {
      'bg-blue-500 py-1 px-2 rounded-full text-white  ': status === 'Pending',
      'bg-green-500 py-1 px-2 rounded-full text-white': status === 'Shipped',
      'bg-gray-500 py-1 px-2 rounded-full text-white': status === 'Delivered',
      'bg-yellow-500 py-1 px-2 rounded-full text-white': status === 'Success'
    }
  }
  </script>
  