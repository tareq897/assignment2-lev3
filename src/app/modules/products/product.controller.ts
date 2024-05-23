import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { productValidationSchema } from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    const zodProductData = productValidationSchema.parse(productData);

    const result = await ProductServices.createProductintoDB(zodProductData);

    res.status(200).json({
      success: true,
      message: "product created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsfromDB();
    res.status(200).json({
      success: true,
      message: "product retrieved successfully",
      data: result,
    })
  }catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
  })
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.singleProductfromDB(productId);
    res.status(200).json({
      success: true,
      message: "single product retrieved successfully",
      data: result,
    })}catch(error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
  })
}
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const data = req.body
    const updatedProduct = productValidationSchema.parse(data)
    const result = await ProductServices.updateProductintoDB(
      productId,
      updatedProduct,
    )
    res.json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: err,
    })
  }
}

const deleteProduct = async(req : Request, res : Response) => {
  try{

    const {productId} = req.params;
    await ProductServices.deleteProductfromDB(productId)
    res.json({
      success : true,
      message: 'Product deleted successfully!',
      data: null,
    })

  }catch(error){
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    })
  }
}

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};
