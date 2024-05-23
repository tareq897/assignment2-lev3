import { Schema, model } from 'mongoose'
import { ProductModel } from '../products/product.model'
import { Prorder } from './order.interface'


const orderSchema = new Schema<Prorder>({
  email: {
    type: String,
    required: [true, "email is required"],
  },
  productId: {
    type: String,
    required: [true, "productId is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
  },
})

orderSchema.pre('save', async function (next) {
  const result = await ProductModel.findById(this.productId)
  if (!result) {
    throw new Error('Product does not exists by this productId')
  }
  // if the requested quantity is more then the product avaialability

  const {
    inventory: { quantity },
   
  }: any = await ProductModel.findById(this.productId)

  if (quantity < this.quantity) {
    throw new Error('Insufficient quantity available in inventory')
  }

  // reduce the product quantity
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    this.productId,
    {
      $inc: {
        'inventory.quantity': -this.quantity,
      },
    },
    { new: true },
  )
  // update the instock if quantity is 0
  if (updatedProduct?.inventory.quantity === 0) {
    await ProductModel.findByIdAndUpdate(this.productId, {
      $set: {
        'inventory.inStock': false,
      },
    })
  }

  next()
})

export const OrderModel = model<Prorder>('Order', orderSchema)