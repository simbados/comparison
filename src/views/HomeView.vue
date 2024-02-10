<script setup lang="ts">
import AddCars from '@/components/AddCars.vue'
import CarList from '@/components/CarList.vue'
import CarComparison from '@/components/CarComparison.vue'
</script>
<template>
  <div class="comparison">
    <h1>Welcome to <span class="text-gradient">Carcom</span></h1>
    <CarComparison />
    <AddCars />
    <CarList />
  </div>
</template>
<style scoped>
h1 {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  margin-bottom: 1em;
}
.text-gradient {
  background-image: var(--accent-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-position: 0;
}
.comparison {
  display: flex;
  flex-direction: column;
}
@media screen and (orientation: landscape) and (max-height: 728px) {
  .comparison {
    min-height: 100vh;
    place-content: center;
  }
  h1 {
    display: none;
  }
}
</style>
