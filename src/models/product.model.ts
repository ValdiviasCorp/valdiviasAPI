import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  image?: string;
  category: string;
}

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false },
  category: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IProduct>('products', productSchema);