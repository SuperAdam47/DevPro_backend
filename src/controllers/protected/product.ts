import { Request, Response } from "express";
import Product from "../../models/Product";

export const addProduct = async (req: Request, res: Response) => {
  try {

    const { title, description, price, category, buyerId } = req.body;
    const images = req.files as Express.Multer.File[];
    const userId = (req.user as { id: string })?.id;

    if (!title || !description || !price || !userId || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }



    const product = new Product({
      title,
      description,
      price: Number(price),
      category: category,
      images: images.map((image) => image.path),
      user: userId,
      status: 0
      //  ...( {buyer:buyerId})
    });


    await product.save();


    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {

    res.status(500).json({ message: "Something went wrong", error });
  }
};


export const buyProduct = async (req: Request, res: Response) => {
  try {

    const { productId } = req.body;
    const userId = (req.user as { id: string })?.id;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $push: { buyer: userId } },
      { new: true }
    );

    res.status(201).json({ message: "Product bought successfully", updatedProduct });
  } catch (error) {

    res.status(500).json({ message: "Something went wrong", error });
  }
};


export const getAllProducts = async (req: Request, res: Response) => {
  try {

    const query = req.query;


    const partialMatchFields = ['description', "title", "category", "status", "price"];
    const partialMatchQueries: any = {};
    const priceRange: any = {};

    if (query.minPrice) priceRange.$gt = parseFloat(query.minPrice as string);
    if (query.maxPrice) priceRange.$lt = parseFloat(query.maxPrice as string);
    if (query.maxPrice || query.minPrice) partialMatchQueries.price = priceRange;

    partialMatchFields.forEach((field) => {
      if (field === 'price' && query[field]) {

        partialMatchQueries[field] = parseFloat(query.price as string);


      } else if (query[field]) {
        partialMatchQueries[field] = new RegExp(query[field] as string, 'i');
      }
    });


    partialMatchFields.forEach(field => {
      delete query[field];
    });

    const finalQuery = { ...partialMatchQueries };

    const products = await Product.find(finalQuery).populate({
      path: "user",
      select: "first_name last_name email",
    }).populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'first_name last_name email',
      },
    }).populate({
      path: "buyer",
      select: "first_name last_name email",
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
