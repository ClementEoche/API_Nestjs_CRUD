import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient } from './ingredients.model';

@Injectable()
export class IngredientsService {
  constructor(@InjectModel('Ingredients') private readonly ingredientModel: Model<Ingredient>) {}

  async insertIngredient(name: string, desc: string, price: number) {
    const newIngredient = new this.ingredientModel({
      name,
      description: desc,
      price,
    });
    const result = await newIngredient.save();
    return result;
  }

  async getIngredients() {
    const ingredients = await this.ingredientModel.find().exec();
    return ingredients.map(ingredient => ({
      id: ingredient.id,
      title: ingredient.name,
      description: ingredient.description,
      price: ingredient.price,
    }));
  }

  async getSingleIngredient(ingredientId: string) {
    const ingredient= await this.findIngredient(ingredientId);
    return {
      id: ingredient.id,
      title: ingredient.name,
      description: ingredient.description,
      price: ingredient.price,
    };
  }
  async updateIngredient(ingredientId: string, name: string, desc: string, price: number) {
    const updatedIngredient = await this.findIngredient(ingredientId);
    if (name) {
      updatedIngredient.name= name;
    }
    if (desc) {
      updatedIngredient.description = desc;
    }
    if (price) {
      updatedIngredient.price = price;
    }
    updatedIngredient.save();
    return updatedIngredient;
  }

  async deleteIngredient(ingredientId: string) {
    const result = await this.ingredientModel.deleteOne({ _id: ingredientId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find ingredient.');
    }
    return true;
  }

  private async findIngredient(id: string): Promise<Ingredient> {
    let ingredient;
    try {
      ingredient = await this.ingredientModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find ingredient.');
    }
    if (!ingredient) {
      throw new NotFoundException('Could not find ingredient.');
    }
    return ingredient;
  }
}