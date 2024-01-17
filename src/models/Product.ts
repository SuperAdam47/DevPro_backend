

import mongoose, { Schema, Document } from "mongoose";

export interface ProductModel extends Document {
  title: string;
  description: string;
  price: number;
  images: string[];
  user: mongoose.Types.ObjectId; 
}

const productSchema = new Schema<ProductModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }], 
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Use mongoose.Schema.Types.ObjectId for the schema
});

const Product = mongoose.model<ProductModel>("Product", productSchema);

export default Product;
