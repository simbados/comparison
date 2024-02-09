import type { CarData } from '@/models/CarData'

export interface Car extends CarData {
  leasingTotal: number,
  buyingTotal: number,
  financeTotal: number,
}