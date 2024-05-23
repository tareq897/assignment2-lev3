import { Prorder} from './order.interface'
import { OrderModel } from './order.model'

const createOrderinDB = async (order: Prorder) => {
  const result = await OrderModel.create(order)
  return result
}

const getAllOrdersfromDB = async (email: string) => {
  if (typeof email === 'string') {
    const result = await OrderModel.find({ email })
    return result
  }
  const result = await OrderModel.find()
  return result
}

export const OrderServices = {
  createOrderinDB,
  getAllOrdersfromDB,
}