import { model, Schema } from "mongoose";
import { Inventory, Product, Variants } from "./product.interface";

const variantSchema = new Schema<Variants>({
  type: { type: String, required: true },

  value: { type: String, required: true },
});

const inventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [String],
  variants: [variantSchema],
  inventory: inventorySchema,
});

export const ProductModel = model<Product>("Product", productSchema);
