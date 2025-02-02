import { Request, Response } from 'express';
import Category from '../models/category.model';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.status(201).json({
      status: true,
      data: savedCategory
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({
        status: false,
        message: 'Category not found'
      });
    }
    res.status(200).json({
      status: true,
      message: 'Category deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: true,
      data: categories
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message
    });
  }
};