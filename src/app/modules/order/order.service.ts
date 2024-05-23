import { Prorder} from './order.interface'
import { OrderModel } from './order.model'

const createOrderinDB = async (order: Prorder) => {
  const result = await OrderModel.findById(order.productId)

  if (!result) {
    throw new Error("Product not found")
  }

  if (order.quantity > result.quantity) {
    throw new Error("Insufficient stock available")
  }
  result.quantity -= order.quantity



  await result.save()

  const finalresult = await OrderModel.create(order)
  return result
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