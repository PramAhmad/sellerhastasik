<template>
    <div>
      <!-- Section untuk tabel riwayat pembayaran -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4">Riwayat Tarik Dana </h2>
        <!-- Tabel riwayat penarikan dana -->
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Withdrawal ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dana Yang Akan Di Tarik</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="withdrawal in withdrawals" :key="withdrawal.id">
              <td>{{ withdrawal.id }}</td>
              <td>{{ withdrawal.date }}</td>
              <td>{{ withdrawal.amount }}</td>
              <td><span :class="getStatusClass(withdrawal.status)">{{ withdrawal.status }}</span></td>
              <td>
                <BaseButton color="info" :label="'Detail'" small @click="showWithdrawalDetails(withdrawal)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import BaseButton from '@/components/BaseButton.vue'
  

  const withdrawals = ref([
    {
      id: 1,
    date: '2021-10-10',
      amount: 'Rp 1.000.000',
      status: 'Pending'
    },
    {
      id: 2,
      date:'2024-10-10',
      amount: 'Rp 2.000.000',
      status: 'Approved'
    },
 
  ])
  

  const showWithdrawalDetails = (withdrawal) => {

    console.log('Showing withdrawal details:', withdrawal)
  }
  
  
  const getStatusClass = (status) => {
    return {
      'bg-blue-500 py-1 px-2 rounded-full text-white  ': status === 'Pending',
      'bg-green-500 py-1 px-2 rounded-full text-white': status === 'Approved',
      'bg-red-500 py-1 px-2 rounded-full text-white': status === 'Rejected'
    }
  }
  </script>
  