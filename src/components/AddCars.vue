<script setup lang="ts">
import { type Ref, ref } from 'vue'
import Card from '@/components/Card.vue'
import type { CarData } from '@/models/CarData'
import { addCarToStorage } from '@/indexDb/indexDbStorage'
import { store } from '@/store/rootStore'

function addCar() {
  invalidInput.value = [];
  if (!name.value || typeof name.value !== 'string') {
    invalidInput.value.push(InputType.NAME)
    store.setErrorMessage("Please fill out the car name");
    return;
  }
  if (checkIfInvalidNumber(leasingPrice, InputType.LEASING_PRICE)) {
    return;
  }
  if (checkIfInvalidNumber(leasingTime, InputType.LEASING_TIME)) {
    return;
  }
  if (checkIfInvalidNumber(buyingPrice, InputType.BUYING_PRICE)) {
    return;
  }
  if (checkIfInvalidNumber(sellingPrice, InputType.SELLING_PRICE)) {
    return;
  }
  const car: CarData = { id: crypto.randomUUID(), name: name.value, buyingPrice: buyingPrice.value, leasingPrice: leasingTime.value * leasingPrice.value, sellingPrice: sellingPrice.value }
  addCarToStorage(car)
}

function checkIfInvalidNumber(value: Ref<number>, type: InputType) {
  const invalid = (value.value == null) || typeof parseInt(name.value ) !== 'number';
  if (invalid) {
    store.setErrorMessage("Please fill out the " + type.toString());
    invalidInput.value.push(type)
  }
  return invalid;
}

const invalidInput = ref([] as InputType[])

enum InputType {
  NAME = 'Car Name',
  LEASING_PRICE = 'leasing price',
  LEASING_TIME = 'leasing time',
  BUYING_PRICE = 'buying price',
  SELLING_PRICE = 'selling price'
}

function removeInvalid(type: InputType) {
  invalidInput.value = invalidInput.value.filter(t => t !== type)
}

const name = ref()
const leasingPrice = ref()
const leasingTime = ref()
const buyingPrice = ref()
const sellingPrice = ref()
</script>

<template>
    <Card class="all-cars">
      <h2 class="accent">Add new car</h2>
      <div class="car-input" >
          <label for="carname">Car name</label>
          <input @focus="removeInvalid(InputType.NAME)" :class="{'invalid': invalidInput.includes(InputType.NAME)}" v-model="name" type="text" name="name" id="carname" />
          <label for="leasingPrice">Leasing Price</label>
          <input @focus="removeInvalid(InputType.LEASING_PRICE)" :class="{'invalid': invalidInput.includes(InputType.LEASING_PRICE)}" v-model="leasingPrice" type="number" name="leasingPrice" id="leasingPrice" required pattern="[1-9]+"/>
          <label for="leasingTime">Leasing Time</label>
          <input @focus="removeInvalid(InputType.LEASING_TIME)" :class="{'invalid': invalidInput.includes(InputType.LEASING_TIME)}" v-model="leasingTime" type="number" name="leasingTime" id="leasingTime" required pattern="[1-9]+"/>
          <label for="buying">Buying Price</label>
          <input @focus="removeInvalid(InputType.BUYING_PRICE)" :class="{'invalid': invalidInput.includes(InputType.BUYING_PRICE)}" v-model="buyingPrice" type="number" name="buying" id="buying" required pattern="[1-9]+"/>
          <label for="selling">Selling Price</label>
          <input @focus="removeInvalid(InputType.SELLING_PRICE)" :class="{'invalid': invalidInput.includes(InputType.SELLING_PRICE)}" v-model="sellingPrice" type="number" name="selling" id="selling" required pattern="[1-9]+"/>
      </div>
      <button @click="addCar" id="add-button">Add Car</button>
    </Card>
</template>

<style scoped>
h2 {
  align-self: center;
}
h2, caption {
  font-size: 2em;
}
.invalid {
  box-shadow: inset 0 0 4px 0 #770404;
}
button {
  background-color: #4a5260;
  cursor: pointer;
  outline: none;
  border: solid 1px var(--accent-dark);
  border-radius: 5px;
  font-weight: 700;
  box-shadow: inset 0 0 0.5em var(--accent-dark);
  transition: transform 0.2s;
  width: 10em;
  padding: 0.5em;
  align-self: center;
  color: var(--vt-c-text-dark-2);
}
button:hover {
  transform: translateY(1px);
}
input {
  background-color: #4a5260;
  color: var(--vt-c-text-dark-2);
  border: 1px var(--accent-light);
  border-radius: 1px;
  padding: 0.3em;
  outline: none;
  margin: 0 0.2em;
  max-width: 10em;
  font-weight: 700;
  font-size: 16px;
}
.accent {
  color: #ceccfd;
  font-weight: 700;
}
.all-cars {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.car-input {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 0.5em
}

@media screen and (orientation: landscape) and (max-height: 728px) {
  h1 {
    display: none;
  }
  .all-cars {
    display: none;
  }
}
</style>
