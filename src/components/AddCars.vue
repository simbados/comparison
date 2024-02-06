<script setup lang="ts">
import { ref } from 'vue'

const DB_NAME = 'comparison';
const DB_VERSION = 1;
const DB_STORE_NAME = 'cars';

interface Car {
  id: string;
  name: string;
  leasingPrice: number;
  buyingPrice: number;
  sellingPrice: number;
}

let db: IDBDatabase;
function openDb() {
  const indexDb = window.indexedDB.open(DB_NAME, DB_VERSION)
  indexDb.onerror = (event: any) => {
    console.log("Please allow index db", event)
  };
  indexDb.onsuccess = (event: any) => {
    console.log("onsuccess");
    db = event.target.result
    displayCars();
  };

  indexDb.onupgradeneeded = (event: any) => {
    const dbUpgrade = event.target.result
    const objectStore = dbUpgrade.createObjectStore(DB_STORE_NAME, { keyPath: "id" });
    objectStore.createIndex("id", "id", { unique: true });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("buyingPrice", "buyingPrice", { unique: false });
    objectStore.createIndex("leasingPrice", "leasingPrice", { unique: false });
    objectStore.createIndex("sellingPrice", "sellingPrice", { unique: false });
    objectStore.transaction.oncomplete = () => {
      console.log("Complete upgrade")
    };
  };
}
function addCar() {
  const car: Car = { id: crypto.randomUUID(), name: name.value, buyingPrice: buyingPrice.value, leasingPrice: leasingTime.value * leasingPrice.value, sellingPrice: sellingPrice.value }
  let store = getObjectStore(DB_STORE_NAME, 'readwrite');
  let req;
  try {
    req = store.add(car);
  } catch (e) {
    console.log("Something went wrong while adding to store")
    throw e;
  }
  req.onsuccess = function () {
    console.log("Insertion of car successful", car);
  };
  req.onerror = function(event: any) {
    console.error("addCar error", event.target.error);
  };
  addCarToArr(car)
}

function addCarToArr(car: Car) {
  allCars.value.push({ ...car, leasingTotal: -car.leasingPrice, buyingTotal: car.sellingPrice - car.buyingPrice});
}

type CarDisplay = Car & { leasingTotal: number, buyingTotal: number }

const allCars = ref([] as CarDisplay[]);
function displayCars() {
  const store = getObjectStore(DB_STORE_NAME, 'readonly');
  const req = store.openCursor();
  req.onsuccess = function(evt: any) {
    let cursor = evt.target.result;
    if (cursor) {
      const req = store.get(cursor.key);
      req.onsuccess = function (evt: any) {
        const car: Car = evt.target.result;
        console.log('add car', car);
        addCarToArr(car)
      };
      cursor.continue();
    }
  }
}

function deleteCar(car: Car) {
  allCars.value = allCars.value.filter((c) => c.id != car.id);
  deleteCarFromStorage(car);
}

function deleteCarFromStorage(car: Car) {
  const req = getObjectStore(DB_STORE_NAME, "readwrite");
  req.delete(car.id);
}

function getObjectStore(store_name: string, mode: IDBTransactionMode) {
  const tx = db.transaction(store_name, mode);
  return tx.objectStore(store_name);
}
openDb();

const name = ref()
const leasingPrice = ref()
const leasingTime = ref()
const buyingPrice = ref()
const sellingPrice = ref()
</script>

<template>
  <div>
    <h1>Welcome to <span class="text-gradient">Compare</span></h1>
    <div class="all-cars card">
      <h2>Add new car</h2>
      <div class="car-input" >
          <label for="carname">Car name</label>
          <input v-model="name" type="text" name="name" id="carname" />
          <label for="leasingPrice">Leasing Price</label>
          <input v-model="leasingPrice" type="text" name="leasingPrice" id="leasingPrice" required pattern="[1-9]+"/>
          <label for="leasingTime">Leasing Time</label>
          <input v-model="leasingTime" type="text" name="leasingTime" id="leasingTime" required pattern="[1-9]+"/>
          <label for="buying">Buying Price</label>
          <input v-model="buyingPrice" type="text" name="buying" id="buying" required pattern="[1-9]+"/>
          <label for="selling">Selling Price</label>
          <input v-model="sellingPrice" type="text" name="selling" id="selling" required pattern="[1-9]+"/>
      </div>
      <button @click="addCar" id="add-button" class="add-button">Add Car</button>
    </div>
    <div class="car-list card">
      <table>
        <caption>Comparison Table</caption>
        <thead>
        <tr>
          <th>Name</th>
          <th>Leasing Price</th>
          <th>Buying Price</th>
          <th>Selling Price</th>
          <th>Leasing Costs Total</th>
          <th>Buying Costs Total</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="car of allCars" :key="car.name" class="car-list-element">
          <td>{{car.name}}</td>
          <td>{{car.leasingPrice}}</td>
          <td>{{car.sellingPrice}}</td>
          <td>{{car.buyingPrice}}</td>
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
    </div>
  </div>
</template>

<style scoped>
td {
  svg {
    cursor: pointer;
  }
}
h2 {
  align-self: center;
}
h2, caption {
  font-size: 2em;
}
th, td {
  padding-inline: 0.8em;
  text-align: start;
}
button {
  outline: none;
  border: 2px var(--color-border);
  border-radius: 5px;
  font-weight: 500;
}
input {
  border: 1px var(--accent-light);
  border-radius: 1px;
  padding: 0.3em;
  outline: none;
  margin: 0 0.2em;
}
.add-button {
  width: 10em;
  align-self: center;
}
.card {
  margin-inline: auto;
  padding: 1em;
  margin-bottom: 2em;
  background-color: #23262d;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  width: fit-content;
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
.car-list {
  width: fit-content;
  padding: 1em;
}
h1 {
  font-size: 4rem;
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

</style>
