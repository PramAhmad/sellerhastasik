<template>
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
            <!-- Complaint Section -->
            <div v-if="selectedOrder.complaint">
                <h4>Customer Complaint:</h4>
                <p>{{ selectedOrder.complaint }}</p>
            </div>
        </div>
    </CardBoxModal>
    
    <table>
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Nama Produk</th>
                <th>Foto Produk</th>
                <th>Tanggal Beli</th>
                <th>Nama Customer</th>
                <th>Total Beli</th>
                <th>Complaint Customer</th>
             
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="order in itemsPaginated" :key="order.id">
                <td>{{ order.id }}</td>
                <td>{{ order.items[0].name }}</td>
                <td><img :src="order.foto_produk" alt="Product Image" class="w-20 h-20 rounded-md" /></td>
                <td>{{ order.tanggal_beli }}</td>
                <td>{{ order.customerName }}</td>
                <td>{{ order.total_belanja }}</td>
                <td>{{ order.complaint }}</td>
              <td>
                    <BaseButton color="info" :label="'Detail'" small @click="showOrderDetails(order)" />
                </td>
            </tr>
        </tbody>
    </table>
    
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
</template>

<script setup>
import { computed, ref } from 'vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'

// Struktur data order dengan informasi barang yang dipesan
const items = computed(() => [
    {
        id: 1,
        customerName: 'John Doe',
        destinationAddress: '123 Main St, Anytown, USA',
        status: 'Pending',
        items: [
            { id: 1, name: 'Product A', quantity: 2, price: '$20' }
        ],
        total_belanja: "1.000.000",
        tanggal_beli: '2021-10-10',
        foto_produk: 'https://via.placeholder.com/150',
        complaint: 'The product is damaged upon arrival.'
    },
    {
        id: 2,
        customerName: 'Jane Doe',
        destinationAddress: '456 Elm St, Anytown, USA',
        status: 'Shipped',
        items: [
            { id: 2, name: 'Product B', quantity: 1, price: '$30' }
        ],
        total_belanja: "2.000.000",
        tanggal_beli: '2021-10-11',
        foto_produk: 'https://via.placeholder.com/150',
        complaint:"kurang pass cuy gimana ini gak sesuai"
    },
  
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
        'bg-gray-500 py-1 px-2 rounded-full text-white': status === 'Delivered'
    }
}
</script>
