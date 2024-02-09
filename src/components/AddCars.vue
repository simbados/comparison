<script setup lang="ts">
import { type Ref, ref } from 'vue'
import Card from '@/components/Card.vue'
import type { CarData } from '@/models/CarData'
import { addCarToStorage } from '@/indexDb/indexDbStorage'
import { store } from '@/store/rootStore'
import Tooltip from '@/components/Tooltip.vue'
import { Placement } from '@/models/Placement'

function addCar() {
  invalidInput.value = [];
  if (!name.value || typeof name.value !== 'string') {
    invalidInput.value.push(InputType.NAME)
    store.setErrorMessage("Please fill out the car name");
    return;
  }
  checkIfInvalidNumber(leasingPrice, InputType.LEASING_PRICE);
  checkIfInvalidNumber(leasingTime, InputType.LEASING_TIME);
  checkIfInvalidNumber(buyingPrice, InputType.BUYING_PRICE)
  checkIfInvalidNumber(sellingPrice, InputType.SELLING_PRICE);
  checkIfInvalidNumber(leasingDeposit, InputType.LEASING_DEPOSIT);
  checkIfInvalidNumber(financeDeposit, InputType.FINANCE_DEPOSIT);
  checkIfInvalidNumber(financeTime, InputType.FINANCE_TIME);
  checkIfInvalidNumber(financeMonthlyPayment, InputType.FINANCE_MONTHLY_PAYMENT);
  checkIfInvalidNumber(financeFinalPayment, InputType.FINANCE_FINAL_PAYMENT);
  const car: CarData = {
    id: crypto.randomUUID(),
    name: name.value,
    leasingDeposit: leasingDeposit.value,
    buyingPrice: buyingPrice.value,
    leasingPrice: leasingTime.value * leasingPrice.value,
    sellingPrice: sellingPrice.value,
    financeDeposit: financeDeposit.value,
    financeTime: financeTime.value,
    financeMonthlyPayment: financeMonthlyPayment.value,
    financeFinalPayment: financeFinalPayment.value,
  }
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
  SELLING_PRICE = 'selling price',
  LEASING_DEPOSIT = 'leasing deposit',
  FINANCE_DEPOSIT = 'finance deposit',
  FINANCE_TIME = 'finance deposit',
  FINANCE_MONTHLY_PAYMENT = 'finance payment',
  FINANCE_FINAL_PAYMENT = 'finance payment',
}

function removeInvalid(type: InputType) {
  invalidInput.value = invalidInput.value.filter(t => t !== type)
}

const name = ref()
const leasingPrice = ref()
const leasingTime = ref()
const leasingDeposit = ref()
const buyingPrice = ref()
const sellingPrice = ref()
const financeDeposit = ref()
const financeTime = ref()
const financeMonthlyPayment = ref()
const financeFinalPayment = ref()
</script>

<template>
    <Card class="all-cars">
      <h2 class="accent">Add new car</h2>
      <div class="car-input" >
        <label for="carname">Car Name</label>
        <Tooltip :placement="Placement.RIGHT" message="Name of Car"/>
        <input @focus="removeInvalid(InputType.NAME)" :class="{'invalid': invalidInput.includes(InputType.NAME)}" v-model="name" type="text" name="name" id="carname" />
        <label for="leasingDeposit">Leasing Deposit</label>
        <Tooltip :placement="Placement.RIGHT" message="Leasing deposit which is normally paid once upfront"/>
        <input @focus="removeInvalid(InputType.LEASING_DEPOSIT)" :class="{'invalid': invalidInput.includes(InputType.LEASING_DEPOSIT)}" v-model="leasingDeposit" type="number" name="leasingDeposit" id="leasingDeposit" />
        <label for="leasingPrice">Leasing Price</label>
        <Tooltip :placement="Placement.RIGHT" message="Leasing price per month"/>
        <input @focus="removeInvalid(InputType.LEASING_PRICE)" :class="{'invalid': invalidInput.includes(InputType.LEASING_PRICE)}" v-model="leasingPrice" type="number" name="leasingPrice" id="leasingPrice" />
        <label for="leasingTime">Leasing Time</label>
        <Tooltip :placement="Placement.RIGHT" message="Leasing Time in month"/>
        <input @focus="removeInvalid(InputType.LEASING_TIME)" :class="{'invalid': invalidInput.includes(InputType.LEASING_TIME)}" v-model="leasingTime" type="number" name="leasingTime" id="leasingTime" />
        <label for="buying">Buying Price</label>
        <Tooltip :placement="Placement.RIGHT" message="Total price of car"/>
        <input @focus="removeInvalid(InputType.BUYING_PRICE)" :class="{'invalid': invalidInput.includes(InputType.BUYING_PRICE)}" v-model="buyingPrice" type="number" name="buying" id="buying" />
        <label for="selling">Selling Price</label>
        <Tooltip :placement="Placement.RIGHT" message="Estimated selling price after leasing period"/>
        <input @focus="removeInvalid(InputType.SELLING_PRICE)" :class="{'invalid': invalidInput.includes(InputType.SELLING_PRICE)}" v-model="sellingPrice" type="number" name="selling" id="selling" />
        <label for="finance-deposit">Finance Deposit</label>
        <Tooltip :placement="Placement.RIGHT" message="Initial deposit for financing"/>
        <input @focus="removeInvalid(InputType.FINANCE_DEPOSIT)" :class="{'invalid': invalidInput.includes(InputType.FINANCE_DEPOSIT)}" v-model="financeDeposit" type="number" name="finance-deposit" id="finance-deposit" />
        <label for="finance-time">Finance Time</label>
        <Tooltip :placement="Placement.RIGHT" message="Time in month for finance option"/>
        <input @focus="removeInvalid(InputType.FINANCE_TIME)" :class="{'invalid': invalidInput.includes(InputType.FINANCE_TIME)}" v-model="financeTime" type="number" name="finance-time" id="finance-time" />
        <label for="finance-monthly-payment">Finance Rate</label>
        <Tooltip :placement="Placement.RIGHT" message="Rate per month for finance option"/>
        <input @focus="removeInvalid(InputType.FINANCE_MONTHLY_PAYMENT)" :class="{'invalid': invalidInput.includes(InputType.FINANCE_MONTHLY_PAYMENT)}" v-model="financeMonthlyPayment" type="number" name="finance-monthly-payment" id="finance-monthly-payment" />
        <label for="finance-final-payment">End Payment</label>
        <Tooltip :placement="Placement.RIGHT" message="Payment at the end of the finance option"/>
        <input @focus="removeInvalid(InputType.FINANCE_FINAL_PAYMENT)" :class="{'invalid': invalidInput.includes(InputType.FINANCE_FINAL_PAYMENT)}" v-model="financeFinalPayment" type="number" name="finance-final-payment" id="finance-final-payment" />
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
  grid-template-columns: 48% 4% 48%;
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
