<script setup>
import { mdiMonitorCellphone,mdiPlus, mdiTableBorder, mdiTableOff, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'

import axios from 'axios'
import { onMounted, ref } from 'vue'
import TableProducts from '@/components/TableProducts.vue'
import OrderTables from '@/components/OrderTables.vue'
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Orders" main>

      </SectionTitleLineWithButton>
    
      <CardBox class="mb-6" has-table>
        <OrderTables checkable />
      </CardBox>

   
    </SectionMain>
  </LayoutAuthenticated>
</template>
