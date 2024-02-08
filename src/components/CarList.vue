<script setup lang="ts">
import Card from '@/components/Card.vue'
import { store } from '@/store/rootStore'
import type { Car } from '@/models/Car'
import { deleteCarFromStorage } from '@/indexDb/indexDbStorage'

function deleteCar(car: Car) {
  store.removeCar(car)
  deleteCarFromStorage(car);
}
</script>

<template>
  <Card class="car-list">
    <table>
      <caption>Comparison Table</caption>
      <thead>
      <tr>
        <th>Name</th>
        <th>Leasing Deposit</th>
        <th>Leasing Price</th>
        <th>Buying Price</th>
        <th>Selling Price</th>
        <th>Leasing Costs</th>
        <th>Buying Costs</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="car of store.allCars" :key="car.name">
        <td>{{car.name}}</td>
        <td>{{car.leasingDeposit}}</td>
        <td>{{car.leasingPrice}}</td>
        <td>{{car.buyingPrice}}</td>
        <td>{{car.sellingPrice}}</td>
        <td>{{car.leasingTotal}}</td>
        <td>{{car.buyingTotal}}</td>
        <td>
          <div @click="deleteCar(car)">
            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="12.25" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#a5a6a7" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </Card>
</template>

<style scoped>
.car-list {
  padding: 1em;
  overflow-x: scroll;
}
tbody tr:nth-child(odd) {
  background-color: #2f323d;
}

tbody tr:nth-child(even) {
  background-color: #131518;
}
td {
  svg {
    cursor: pointer;
  }
}
th, td {
  padding-inline: 0.8em;
  text-align: start;
}
</style>