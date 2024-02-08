import { reactive } from 'vue'
import type { Car } from '@/models/Car'

export const store = reactive({
    allCars: [] as Car[],
    addToCars(car: Car) {
        this.allCars.push(car)
    },
    removeCar(car: Car) {
        this.allCars = [...this.allCars.filter((c) => c.id != car.id)];
    },
    errorMessage: "",
    setErrorMessage(message: string) {
        this.errorMessage = message;
        setTimeout(() => {
            this.errorMessage = "";
        }, 2000);
    },
    outSideClick: false,
    setClickedOutside() {
        this.outSideClick = true
    }
})