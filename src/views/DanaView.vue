<template>
    <div>
        <LayoutAuthenticated>
            <SectionMain>
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
                    <CardBoxWidget
                        trend="12%"
                        trend-type="up"
                        color="text-emerald-500"
                        :icon="mdiAccountMultiple"
                        :number="totalStoreBalance" 
                        prefix="Rp "
                        label="Saldo Toko"
                    />
                    <CardBoxWidget
                        trend="50%"
                        trend-type="down"
                        color="text-blue-500"
                        :icon="mdiCartOutline"
                        :number="totalWithdrawnBalance" 
                        prefix="Rp "
                        label="Total Penarikan Dana"
                    />
                    <CardBoxWidget
                        trend="jumlah"
                        trend-type="alert"
                        color="text-red-500"
                        :icon="mdiChartTimelineVariant"
                        :number="10"
                        
                        label="Jumlah Penarikan Dana"
                    />
                </div>
             
                <div class="py-16">
                    <DanaMasukTables/>

                </div>
                <div>
                    <DanaKeluar/>
                </div>
            </SectionMain>
        </LayoutAuthenticated>
    </div>
</template>

<script setup>
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import { mdiAccountMultiple, mdiCartOutline, mdiChartTimelineVariant } from '@mdi/js'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionMain from '@/components/SectionMain.vue'
import DanaMasukTables from '@/components/DanaMasukTables.vue'
import DanaKeluar from '@/components/DanaKeluar.vue'
const totalStoreBalance = 10000000; 
const totalWithdrawnBalance = 5000000; 
</script>

<style lang="">
    
</style>
