import mongoose, { Schema, Document } from "mongoose";

export interface ReviewModel extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  date: Date;

}

const reviewSchema = new Schema<ReviewModel>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  date: {
    type: Date,
    default: Date.now()
}
});

const Review = mongoose.model<ReviewModel>("Review", reviewSchema);

export default Review;
