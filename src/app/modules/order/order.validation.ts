import { z } from 'zod'

 const OrderValidationSchema = z.object({
  email: z
    .string()
    .email('please provide an valid email')
    .min(1, 'Email is required'),
  productId: z.string().min(1, 'productId is required'),
  price: z.number().min(1, 'price is required'),
  quantity: z.number().min(1, 'quantity is required'),
})

export default OrderValidationSchema