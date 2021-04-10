import * as mongoose from 'mongoose';
import {IngredientsSchema } from 'src/ingredients/ingredients.model';


export const RecipesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cookingInstruction:  { type: String, required: true },
  timeOfPrepa:  { type: Number, required: true },
  difficultyLvl:  { type: Number, required: true },
  creationDate: { type: Date, required: true },
  ingredients: { type: IngredientsSchema, required: true },
});

export interface Recipe extends mongoose.Document {
  id: string;
  title: string;
  cookingInstruction: string;
  timeOfPrepa: number;
  difficultyLvl: number;
  creationDate: Date;
  id_ingredient: string;
}