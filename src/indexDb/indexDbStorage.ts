import type { CarData } from '@/models/CarData'
import { store } from '@/store/rootStore'
import type { Car } from '@/models/Car'

const DB_NAME = 'comparison';
const DB_VERSION = 4;
const DB_STORE_NAME = 'cars';

let db: IDBDatabase;

export function openDb() {
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
    const createIndex = (objectStore: IDBObjectStore, name: string, options: { unique: boolean }) => {
      if (!objectStore.get(name)) {
        objectStore.createIndex(name, name, options)
      }
    }
    const target = event.target;
    let objectStore;
    if (event.newVersion != event.oldVersion && event.oldVersion != 0) {
      const transaction = target.transaction;
      objectStore = transaction.objectStore(DB_STORE_NAME);
    } else {
      objectStore = target.result.createObjectStore(DB_STORE_NAME, { keyPath: 'id' })
    }
    createIndex(objectStore, "id", { unique: true });
    createIndex(objectStore, "name", { unique: false });
    createIndex(objectStore, "buyingPrice", { unique: false });
    createIndex(objectStore, "sellingPrice", { unique: false });
    createIndex(objectStore, "leasingPrice", { unique: false });
    createIndex(objectStore, "leasingDeposit", { unique: false });
    createIndex(objectStore, "financeDeposit", { unique: false });
    createIndex(objectStore, "financeTime", { unique: false });
    createIndex(objectStore, "financeMonthlyPayment", { unique: false });
    createIndex(objectStore, "financeFinalPayment", { unique: false });
    objectStore.transaction.oncomplete = () => {
      console.log("Complete upgrade")
    };
  };
}
function addCarToArr(car: CarData) {
  store.addToCars(
    {
      ...car,
      leasingTotal: car.leasingPrice,
      buyingTotal: car.buyingPrice - car.sellingPrice,
      financeTotal: (car.financeDeposit + (car.financeTime * car.financeMonthlyPayment) + car.financeFinalPayment) - car.buyingPrice || 0,
    }
  );
}

export function deleteCarFromStorage(car: Car) {
  const req = getObjectStore(DB_STORE_NAME, "readwrite");
  req.delete(car.id);
}

function getObjectStore(store_name: string, mode: IDBTransactionMode) {
  const tx = db.transaction(store_name, mode);
  return tx.objectStore(store_name);
}

export function addCarToStorage(car: CarData) {
  const store = getObjectStore(DB_STORE_NAME, 'readwrite');
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

function displayCars() {
  const store = getObjectStore(DB_STORE_NAME, 'readonly');
  const req = store.openCursor();
  req.onsuccess = function(evt: any) {
    const cursor = evt.target.result;
    if (cursor) {
      const req = store.get(cursor.key);
      req.onsuccess = function (evt: any) {
        const car: CarData = evt.target.result;
        console.log('add car', car);
        addCarToArr(car)
      };
      cursor.continue();
    }
  }
}
