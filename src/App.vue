<script setup lang="ts">
  import { openDb } from '@/indexDb/indexDbStorage'
  import ErrorMessage from '@/components/ErrorMessage.vue'
  import { store } from '@/store/rootStore'

  openDb()
</script>
<template>
  <body @click="store.clickedOutside()">
    <ErrorMessage />
    <RouterView/>
  </body>
</template>

<style scoped>
body {
  min-height: 100%;
  width: 100%;
}
</style>
