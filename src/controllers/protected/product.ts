import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import Product from "../../models/Product";

export const addProduct =  async (req: Request, res: Response) => {
  try {
  
    const { title, description, price,  } = req.body;
    const images = req.files as Express.Multer.File[];
    const userId = (req.user as { id: string })?.id;
   
    if (!title || !description || !price || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
   

  
    const product = new Product({
      title,
      description,
      price: Number(price),
      images: images.map((image) => image.path), 
      user:userId,
    });

    
    await product.save();

   
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    
    res.status(500).json({ message: "Something went wrong", error });
  }
};


export const getAllProducts = async (req: Request, res: Response) => {
    try {

      const query = req.query;

     
      const partialMatchFields = ['description',"title"]; 
      const partialMatchQueries: any = {};
  
      partialMatchFields.forEach(field => {
        if (query[field]) {
          partialMatchQueries[field] = new RegExp(query[field] as string, 'i');
        }
      });
  
      
      partialMatchFields.forEach(field => {
        delete query[field];
      });
  
      const finalQuery = { ...query, ...partialMatchQueries };
  
        const products = await Product.find(finalQuery).populate({
        path: "user",
        select: "full_name email", 
      }); 
  
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
