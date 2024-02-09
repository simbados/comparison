<script setup lang="ts">
import Card from '@/components/Card.vue'
</script>

<template>
  <Card class="comparison-card">
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
        <tr class="table-column best-option">
          <td class="header-row">Leasing</td>
          <td>10.000 €</td>
          <td>499 €</td>
          <td>0 €</td>
          <td class="total-cost-row">34.000 €</td>
        </tr>
        <tr class="table-column">
          <td class="header-row">Buying</td>
          <td>58.000 €</td>
          <td>0 €</td>
          <td>-24.000 €</td>
          <td class="total-cost-row">34.000 €</td>
        </tr>
        <tr class="table-column">
          <td class="header-row">Finance</td>
          <td>10.000 €</td>
          <td>369 €</td>
          <td>23.000 €</td>
          <td class="total-cost-row">22.248 €</td>
        </tr>
      </tbody>
    </table>
  </Card>
</template>

<style scoped>
.comparison-card {
  width: 100%;
}

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
  padding-bottom: 0.15rem;
  margin-bottom: 0.5rem;
}

.table-column {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  position: relative;
  border: 0.25rem solid transparent;
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

.total-cost-row {
  font-size: 1.75rem;
  font-weight: 600;
}
</style>
