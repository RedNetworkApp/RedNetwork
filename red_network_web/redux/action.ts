import { ADD_CART, REMOVE, REMOVE_ITEM } from "./type"

export const ADD = (item: any) => {
  return {
    type: ADD_CART,
    payload: item,
  }
}
export const DELETE = (id: any) => {
  return {
    type: REMOVE,
    payload: id,
  }
}
export const REMOVE_INT = (item: any) => {
  return {
    type: REMOVE_ITEM,
    payload: item,
  }
}
