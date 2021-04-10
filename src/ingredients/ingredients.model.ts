import * as mongoose from 'mongoose';

export const IngredientsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface Ingredient extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  price: number;
}