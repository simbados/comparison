<script setup lang="ts">
import { type Ref, ref } from 'vue';
import Card from '@/components/Card.vue';
import type { CarData } from '@/models/CarData';
import { addCarToStorage } from '@/indexDb/indexDbStorage';
import { store } from '@/store/rootStore';
import Tooltip from '@/components/Tooltip.vue';
import { Placement } from '@/models/Placement';

function addCar() {
  invalidInput.value = [];
  if (!name.value || typeof name.value !== 'string') {
    invalidInput.value.push(InputType.NAME);
    store.setErrorMessage('Please fill out the car name');
    return;
  }
  checkIfInvalidNumber(leasingPrice, InputType.LEASING_PRICE);
  checkIfInvalidNumber(leasingTime, InputType.LEASING_TIME);
  checkIfInvalidNumber(buyingPrice, InputType.BUYING_PRICE);
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
    financeFinalPayment: financeFinalPayment.value
  };
  addCarToStorage(car);
}

function checkIfInvalidNumber(value: Ref<number>, type: InputType) {
  const invalid = value.value == null || typeof parseInt(name.value) !== 'number';
  if (invalid) {
    store.setErrorMessage('Please fill out the ' + type.toString());
    invalidInput.value.push(type);
  }
  return invalid;
}

const invalidInput = ref([] as InputType[]);

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
  FINANCE_FINAL_PAYMENT = 'finance payment'
}

function removeInvalid(type: InputType) {
  invalidInput.value = invalidInput.value.filter((t) => t !== type);
}

const name = ref();
const leasingPrice = ref();
const leasingTime = ref();
const leasingDeposit = ref();
const buyingPrice = ref();
const sellingPrice = ref();
const financeDeposit = ref();
const financeTime = ref();
const financeMonthlyPayment = ref();
const financeFinalPayment = ref();
</script>

<template>
  <Card class="all-cars">
    <h2>Add new car</h2>
    <div class="car-input">
      <div class="input-element">
        <label for="carname"
          ><span>Car Name</span> <Tooltip :placement="Placement.RIGHT" message="Name of Car"
        /></label>
        <input
          @focus="removeInvalid(InputType.NAME)"
          :class="{ invalid: invalidInput.includes(InputType.NAME) }"
          v-model="name"
          type="text"
          name="name"
          id="carname"
        />
      </div>
      <div class="input-element">
        <label for="leasingDeposit"
          ><span>Leasing Deposit</span
          ><Tooltip
            :placement="Placement.RIGHT"
            message="Leasing deposit which is normally paid once upfront"
        /></label>
        <input
          @focus="removeInvalid(InputType.LEASING_DEPOSIT)"
          :class="{ invalid: invalidInput.includes(InputType.LEASING_DEPOSIT) }"
          v-model="leasingDeposit"
          type="number"
          name="leasingDeposit"
          id="leasingDeposit"
        />
      </div>
      <div class="input-element">
        <label for="leasingPrice"
          ><span>Leasing Price</span
          ><Tooltip :placement="Placement.RIGHT" message="Leasing price per month"
        /></label>
        <input
          @focus="removeInvalid(InputType.LEASING_PRICE)"
          :class="{ invalid: invalidInput.includes(InputType.LEASING_PRICE) }"
          v-model="leasingPrice"
          type="number"
          name="leasingPrice"
          id="leasingPrice"
        />
      </div>
      <div class="input-element">
        <label for="leasingTime"
          ><span>Leasing Time</span
          ><Tooltip :placement="Placement.RIGHT" message="Leasing Time in month"
        /></label>
        <input
          @focus="removeInvalid(InputType.LEASING_TIME)"
          :class="{ invalid: invalidInput.includes(InputType.LEASING_TIME) }"
          v-model="leasingTime"
          type="number"
          name="leasingTime"
          id="leasingTime"
        />
      </div>
      <div class="input-element">
        <label for="buying"
          ><span>Buying Price</span
          ><Tooltip :placement="Placement.RIGHT" message="Total price of car"
        /></label>
        <input
          @focus="removeInvalid(InputType.BUYING_PRICE)"
          :class="{ invalid: invalidInput.includes(InputType.BUYING_PRICE) }"
          v-model="buyingPrice"
          type="number"
          name="buying"
          id="buying"
        />
      </div>
      <div class="input-element">
        <label for="selling"
          ><span>Selling Price</span
          ><Tooltip
            :placement="Placement.RIGHT"
            message="Estimated selling price after leasing period"
        /></label>
        <input
          @focus="removeInvalid(InputType.SELLING_PRICE)"
          :class="{ invalid: invalidInput.includes(InputType.SELLING_PRICE) }"
          v-model="sellingPrice"
          type="number"
          name="selling"
          id="selling"
        />
      </div>
      <div class="input-element">
        <label for="finance-deposit"
          ><span>Finance Deposit</span
          ><Tooltip :placement="Placement.RIGHT" message="Initial deposit for financing"
        /></label>
        <input
          @focus="removeInvalid(InputType.FINANCE_DEPOSIT)"
          :class="{ invalid: invalidInput.includes(InputType.FINANCE_DEPOSIT) }"
          v-model="financeDeposit"
          type="number"
          name="finance-deposit"
          id="finance-deposit"
        />
      </div>
      <div class="input-element">
        <label for="finance-time"
          ><span>Finance Time</span
          ><Tooltip :placement="Placement.RIGHT" message="Time in month for finance option"
        /></label>
        <input
          @focus="removeInvalid(InputType.FINANCE_TIME)"
          :class="{ invalid: invalidInput.includes(InputType.FINANCE_TIME) }"
          v-model="financeTime"
          type="number"
          name="finance-time"
          id="finance-time"
        />
      </div>
      <div class="input-element">
        <label for="finance-monthly-payment"
          ><span>Finance Rate</span
          ><Tooltip :placement="Placement.RIGHT" message="Rate per month for finance option"
        /></label>
        <input
          @focus="removeInvalid(InputType.FINANCE_MONTHLY_PAYMENT)"
          :class="{ invalid: invalidInput.includes(InputType.FINANCE_MONTHLY_PAYMENT) }"
          v-model="financeMonthlyPayment"
          type="number"
          name="finance-monthly-payment"
          id="finance-monthly-payment"
        />
      </div>
      <div class="input-element">
        <label for="finance-final-payment"
          ><span>End Payment</span
          ><Tooltip :placement="Placement.RIGHT" message="Payment at the end of the finance option"
        /></label>
        <input
          @focus="removeInvalid(InputType.FINANCE_FINAL_PAYMENT)"
          :class="{ invalid: invalidInput.includes(InputType.FINANCE_FINAL_PAYMENT) }"
          v-model="financeFinalPayment"
          type="number"
          name="finance-final-payment"
          id="finance-final-payment"
        />
      </div>
    </div>
    <button @click="addCar" id="add-button">Add Car</button>
  </Card>
</template>

<style scoped>
.all-cars {
  display: flex;
  flex-direction: column;
}

h2 {
  padding-bottom: 1em;
}

.car-input {
  --columns: 2;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: 2rem;
}

@media screen and (max-width: 728px) {
  .car-input {
    --columns: 1;
    gap: 0.5rem;
  }
}

.invalid {
  box-shadow: inset 0 0 4px 0 #770404;
}

button {
  background-color: var(--accent-light);
  cursor: pointer;
  outline: none;
  border: solid 1px var(--accent-dark);
  border-radius: 5px;
  font-weight: 700;
  box-shadow: inset 0 0 0.5em var(--accent-dark);
  transition: transform 0.2s;
  width: 50%;
  padding: 0.75em;
  color: var(--accent-dark);
  margin-top: 1.5rem;
  align-self: center;
}

button:hover {
  transform: translateY(1px);
}
input {
  background-color: #4a5260;
  color: var(--vt-c-text-dark-2);
  border: 1px var(--accent-light);
  border-radius: 4px;
  padding: 0.5em;
  outline: none;
  font-weight: 700;
  font-size: 16px;
  display: block;
  width: 100%;
}

label {
  display: inline-block;
  margin-bottom: 0.25rem;
}

label span {
  font-weight: bold;
  margin-right: 0.5rem;
}

.input-element:not(:last-child) {
  margin-bottom: 1rem;
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
