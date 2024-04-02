<template>
  <div class="p-5">
    <div class="container">
      <!-- <h1 class="title">Room Temperature</h1> -->
      <div>
        <span class="tag is-success" :class="{ 'is-skeleton': connectedStatus === 'pending' }"
          v-if="connected === true">Online</span>
        <span class="tag is-danger" v-else>Offline</span>
      </div>
      <div class="fixed-grid has-4-cols has-1-cols-mobile has-3-cols-tablet has-4-cols-desktop mt-5">
        <div class="grid">
          <div class="cell">
            <div class="card">
              <header class="class-header">
                <p class="card-header-title">Temperature</p>
              </header>
              <div class="card-content">
                <p class="title is-size-3" :class="{ 'has-skeleton': valueStatus === 'pending' }">
                  {{ values?.temperature ?? "NA" }}°C
                </p>
              </div>
            </div>
          </div>
          <div class="cell">
            <div class="card">
              <header class="class-header">
                <p class="card-header-title">Humidity</p>
              </header>
              <div class="card-content">
                <p class="title is-size-3" :class="{ 'has-skeleton': valueStatus === 'pending' }">
                  {{ `${values?.humidity}%` ?? "NA" }}
                </p>
              </div>
            </div>
          </div>
          <div class="cell">
            <div class="card">
              <header class="class-header">
                <p class="card-header-title">IAQ</p>
              </header>
              <div class="card-content">
                <p class="title is-size-3" :class="{ 'has-skeleton': valueStatus === 'pending' }">
                  {{ values?.iaq ?? "NA" }}
                </p>
              </div>
            </div>
          </div>
          <div class="cell">
            <div class="card">
              <header class="class-header">
                <p class="card-header-title">Pressure</p>
              </header>
              <div class="card-content">
                <p class="title is-size-3" :class="{ 'has-skeleton': valueStatus === 'pending' }">
                  {{ `${values?.pressure}hPa` ?? 'N/A' }}
                </p>
              </div>
            </div>
          </div>
          <div class="cell">
            <div class="card">
              <header class="class-header">
                <p class="card-header-title">IAQ Accuracy</p>
              </header>
              <div class="card-content">
                <p class="title is-size-3" :class="{ 'has-skeleton': valueStatus === 'pending' }">
                  <span v-if="values?.iaqAccuracy == 1">Low</span>
                  <span v-else-if="values?.iaqAccuracy == 2">Medium</span>
                  <span v-else-if="values?.iaqAccuracy == 3">High</span>
                  <span v-else>Low</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
useSeoMeta({
  title: 'Room Atmosphere',
  description: 'Webpage containing various atmosphere related values from Ambient Sensor',
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/ico',
      href: '/favicon.ico'
    }
  ]
})
const { data: connected, refresh: refreshStatus, status: connectedStatus } = await useFetch('/api/getStatus')
const { data: values, refresh: refreshValues, status: valueStatus } = await useFetch('/api/getValues')

useIntervalFn(() => {
  refreshValues()
}, 30 * 1000)

useIntervalFn(() => {
  refreshStatus()
}, 60 * 1000)
</script>
<style></style>