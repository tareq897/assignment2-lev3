import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductintoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsfromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const singleProductfromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

export const ProductServices = {
  createProductintoDB,
  getAllProductsfromDB,
  singleProductfromDB,
};
