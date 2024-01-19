

import mongoose, { Schema, Document } from "mongoose";

export interface ProductModel extends Document {
  title: string;
  description: string;
  price: number;
  status: number;
  category:String;
  user: mongoose.Types.ObjectId; 
  buyer: mongoose.Types.ObjectId[]; 
  images: string[];
  reviews: mongoose.Types.ObjectId[];
  date: Date;

}

const productSchema = new Schema<ProductModel>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Number,required:true  },
  category: { type:String , required: true },
  images: [{ type: String }], 
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  buyer: [{ type: mongoose.Schema.Types.ObjectId, ref: "User",}],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],  // Use mongoose.Schema.Types.ObjectId for the schema
  date: {
    type: Date,
    default: Date.now()
}
});

const Product = mongoose.model<ProductModel>("Product", productSchema);

export default Product;
