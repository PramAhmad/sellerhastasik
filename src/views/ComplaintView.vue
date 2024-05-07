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

import ComplainTables from '@/components/ComplainTables.vue'
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Complaint" main>

      </SectionTitleLineWithButton>
    
      <CardBox class="mb-6" has-table>
        <ComplainTables checkable />
      </CardBox>

   
    </SectionMain>
  </LayoutAuthenticated>
</template>
