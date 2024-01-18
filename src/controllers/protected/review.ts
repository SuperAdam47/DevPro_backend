import { Request, Response } from "express";
import Product, { ProductModel } from "../../models/Product";
import Review, { ReviewModel } from "../../models/Review";


// <--------- ADD review -------------------------->

export const addReview = async (req: Request, res: Response) => {
    try {
      const { productId, userId, rating, comment } = req.body;
  
      if (!productId || !userId || !rating || !comment) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const newReview = new Review({
        user: userId,
        product: productId,
        rating,
        comment,
      });
  
      await newReview.save();
  
      const product = await Product.findByIdAndUpdate(productId, { $push: { reviews: newReview._id } }, { new: true });
  
      res.status(201).json({ message: "Review added successfully", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong", error });
    }
  };
  

// <--------- update review -------------------------->

  export const updateReview = async (req: Request, res: Response) => {
    try {
      const { reviewId } = req.params;
      const { rating, comment } = req.body;
  
    const reviewData: { [key: string]: any } ={};
    if(rating) reviewData.rating=rating;
    if(comment) reviewData.comment=comment;
  
      const updatedReview = await Review.findByIdAndUpdate(reviewId, reviewData, { new: true });
  
      if (!updatedReview) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      res.status(200).json({ message: "Review updated successfully", updatedReview });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong", error });
    }
  };