<script setup lang="ts">
import Card from '@/components/Card.vue';
import { type Ref, ref, watch } from 'vue';
import { store } from '@/store/rootStore';
import type { Car } from '@/models/Car';

enum CarOptions {
  LEASING,
  BUYING,
  FINANCING
}
let currentCar: Ref<Car | undefined> = ref();

const bestOption: Ref<CarOptions | undefined> = ref();

watch(store.allCars, () => {
  if (!currentCar.value) {
    currentCar.value = store.allCars[0];
    bestOption.value = calculateBestOption(currentCar.value);
  }
});

function calculateBestOption(car: Car) {
  if (car.leasingTotal < car.financeTotal && car.leasingTotal < car.buyingTotal) {
    return CarOptions.LEASING;
  } else if (car.financeTotal < car.buyingTotal) {
    return CarOptions.FINANCING;
  } else {
    return CarOptions.BUYING;
  }
}
</script>

<template>
  <Card>
    <h2>Compare</h2>
    <table class="comparison-table">
      <thead>
        <tr class="table-column property-column">
          <th class="header-row">Property</th>
          <th>Initial cost</th>
          <th>Monthly cost</th>
          <th>End payment</th>
          <th class="total-cost-row">Total cost</th>
        </tr>
      </thead>
      <tbody class="comparison-list">
        <tr :class="{ 'best-option': bestOption === CarOptions.LEASING }" class="table-column">
          <td class="header-row">Leasing</td>
          <td>{{ currentCar?.leasingDeposit ?? 0 }} €</td>
          <td>{{ currentCar?.leasingPrice ?? 0 }} €</td>
          <td>0 €</td>
          <td class="total-cost-row">{{ currentCar?.leasingTotal ?? 0 }} €</td>
        </tr>
        <tr class="table-column" :class="{ 'best-option': bestOption === CarOptions.BUYING }">
          <td class="header-row">Buying</td>
          <td>{{ currentCar?.buyingPrice ?? 0 }} €</td>
          <td>0 €</td>
          <td>0 €</td>
          <td class="total-cost-row">{{ currentCar?.buyingTotal ?? 0 }} €</td>
        </tr>
        <tr class="table-column" :class="{ 'best-option': bestOption === CarOptions.FINANCING }">
          <td class="header-row">Finance</td>
          <td>{{ currentCar?.financeDeposit ?? 0 }} €</td>
          <td>{{ currentCar?.financeMonthlyPayment ?? 0 }} €</td>
          <td>{{ currentCar?.financeFinalPayment ?? 0 }} €</td>
          <td class="total-cost-row">{{ currentCar?.financeTotal ?? 0 }} €</td>
        </tr>
      </tbody>
    </table>
  </Card>
</template>

<style scoped>
.comparison-table {
  width: 100%;
  display: flex;
  gap: 1rem;
}

.comparison-list {
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
}
.header-row {
  font-weight: 700;
  font-size: 1.5rem;
  border-bottom: 0.15rem solid var(--accent-light);
  margin-bottom: 0.5rem;
}

.total-cost-row {
  font-size: 1.75rem;
  font-weight: 600;
}

@media screen and (max-width: 728px) {
  .comparison-list {
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
  }

  .header-row {
    font-size: 1.15rem;
  }

  .table-column {
    min-width: 100%;
    scroll-snap-align: start;
  }

  .total-cost-row {
    font-size: 1.15rem;
  }
}

.table-column {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  position: relative;
  border: 0.25rem solid transparent;
  margin: 1rem 0;
}

.property-column {
  align-items: start;
}

.best-option::before {
  content: 'Best option';
  position: absolute;
  font-size: 1rem;
  font-weight: bold;
  color: var(--accent-light);
  top: -1rem;
  left: 0.5rem;
  background-color: #23262d;
  padding: 0 0.25rem;
}

.best-option {
  border: 0.25rem solid var(--accent);
}
</style>
