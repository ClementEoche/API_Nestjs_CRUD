import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { Recipe } from './recipe.model';



@Injectable()
export class RecipesService {
  constructor(@InjectModel('Recipe') private readonly recipeModel: Model<Recipe>,private readonly ingredientMod: IngredientsService) {}

  async insertRecipe(title: string, cookingInstruction: string, timeOfPrepa: number, difficultyLvl: number, creationDate: Date,id_ingredient: string) {
    if(this.ingredientMod.existIngredient(id_ingredient) != null ){
      const newRecipe = new this.recipeModel({
        title,
        cookingInstruction,
        timeOfPrepa,
        difficultyLvl,
        creationDate,
        id_ingredient
      });  
      const result = await newRecipe.save();
      return result;
    }
  }

  async getRecipes() {
    const recipe = await this.recipeModel.find().exec();
    return recipe.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      cookingInstruction: recipe.cookingInstruction,
      timeOfPrepa: recipe.timeOfPrepa ,
      difficultyLvl: recipe.difficultyLvl,
      creationDate: recipe.creationDate,
      id_ingredient: recipe.id_ingredient
    }));
  }

  async getSingleRecipe(recipeId: string) {
    const recipe = await this.findRecipe(recipeId);
    return {
      id: recipe.id,
      title: recipe.title,
      cookingInstruction: recipe.cookingInstruction,
      timeOfPrepa: recipe.timeOfPrepa ,
      difficultyLvl: recipe.difficultyLvl,
      creationDate: recipe.creationDate,
      ingredients: recipe.id_ingredient
    };
  }

  async updateRecipe(recipeId: string, title: string, cookingInstruction: string, timeOfPrepa: number, difficultyLvl: number, creationDate: Date,id_ingredient: string) {
    const updatedRecipe = await this.findRecipe(recipeId);
    if (title) {
      updatedRecipe.title = title;
    }
    if (cookingInstruction) {
      updatedRecipe.cookingInstruction = cookingInstruction;
    }
    if (timeOfPrepa) {
      updatedRecipe.timeOfPrepa = timeOfPrepa;
    }
    if (difficultyLvl) {
      updatedRecipe.difficultyLvl = difficultyLvl;
    }
    if (creationDate) {
      updatedRecipe.creationDate = creationDate;
    }
    if (id_ingredient) {
      updatedRecipe.id_ingredient = id_ingredient;
    }
    updatedRecipe.save();
    return updatedRecipe;
  }

  async deleteRecipe(recipeId: string) {
    const result = await this.recipeModel.deleteOne({ _id: recipeId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find recipe.');
    }
    return true;
  }

  private async findRecipe(id: string): Promise<Recipe> {
    let recipe;
    try {
      recipe = await this.recipeModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find recipe.');
    }
    if (!recipe) {
      throw new NotFoundException('Could not find recipe.');
    }
    return recipe;
  }

}
