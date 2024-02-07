<script lang="ts">
  import { openDb } from '@/indexDb/indexDbStorage'
  import ErrorMessage from '@/components/ErrorMessage.vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: { ErrorMessage }
  })

  openDb()
</script>
<template>
  <body>
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
