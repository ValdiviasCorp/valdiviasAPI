import { Request, Response } from 'express';
import Product from '../models/product.model';

interface ApiResponse {
  status: boolean;
  message?: string;
  data?: any;
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    const response: ApiResponse = {
      status: true,
      data: savedProduct
    };
    res.status(201).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      status: false,
      message: error.message
    };
    res.status(400).json(response);
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    const response: ApiResponse = {
      status: true,
      data: products
    };
    res.status(200).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      status: false,
      message: error.message
    };
    res.status(500).json(response);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const response: ApiResponse = {
        status: false,
        message: 'Product not found'
      };
      return res.status(404).json(response);
    }
    const response: ApiResponse = {
      status: true,
      data: product
    };
    res.status(200).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      status: false,
      message: error.message
    };
    res.status(500).json(response);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      const response: ApiResponse = {
        status: false,
        message: 'Product not found'
      };
      return res.status(404).json(response);
    }
    const response: ApiResponse = {
      status: true,
      data: product
    };
    res.status(200).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      status: false,
      message: error.message
    };
    res.status(400).json(response);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      const response: ApiResponse = {
        status: false,
        message: 'Product not found'
      };
      return res.status(404).json(response);
    }
    const response: ApiResponse = {
      status: true,
      message: 'Product deleted successfully'
    };
    res.status(200).json(response);
  } catch (error: any) {
    const response: ApiResponse = {
      status: false,
      message: error.message
    };
    res.status(500).json(response);
  }
};

export const updateProductPrice = async (req: Request, res: Response) => {
  try {
    const { price } = req.body;
    
    if (!price || typeof price !== 'number') {
      return res.status(400).json({
        status: false,
        message: 'Valid price is required'
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { price },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        status: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      status: true,
      data: product
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};