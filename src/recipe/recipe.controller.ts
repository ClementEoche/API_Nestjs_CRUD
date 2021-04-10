import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus } from '@nestjs/common';
import { Ingredient } from 'src/ingredients/ingredients.model';
import { RecipesService } from './recipe.service';


@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipesService) {}

  @Post()
    async addRecipe(
        @Body('title') recipeTitle: string,
        @Body('cookingInstruction') recipeCookingInstruction: string,
        @Body('timeOfPrepa') recipeTimeOfPrepa: number,
        @Body('difficultyLvl') recipeDifficultyLvl: number,
        @Body('creationDate') recipeCreationDate: Date,
        @Body('ingredients') recipeIngredients: Ingredient,

    ) {
        const recipe = await this.recipeService.insertRecipe(
          recipeTitle,
          recipeCookingInstruction,
          recipeTimeOfPrepa,
          recipeDifficultyLvl,
          recipeCreationDate,
          recipeIngredients
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Recipe added successfully',
            data: recipe,
        };
    }

  @Get()
  async getAllRecipes() {   
    const recipes = await this.recipeService.getRecipes();
    return recipes;
  }

  @Get(':id')
  async getRecipe(@Param('id') recipeId: string) {
    
    return this.recipeService.getSingleRecipe(recipeId);
    
  }

  @Patch(':id')
  async updateRecipe(
    @Param('id') recipeId: string,
    @Body('title') recipeTitle: string,
    @Body('cookingInstruction') recipeCookingInstruction: string,
    @Body('timeOfPrepa') recipeTimeOfPrepa: number,
    @Body('difficultyLvl') recipeDifficultyLvl: number,
    @Body('creationDate') recipeCreationDate: Date,
    @Body('ingredients') recipeIngredients: Ingredient,
  ) {
    const recipe = await this.recipeService.updateRecipe(
      recipeId,
      recipeTitle,
      recipeCookingInstruction,
      recipeTimeOfPrepa,
      recipeDifficultyLvl,
      recipeCreationDate,
      recipeIngredients
    );
    return {
        statusCode: HttpStatus.OK,
        message: 'Recipe updated successfully',
        recipe: recipe,
    };
  }

  @Delete(':id')
  async deleteRecipe(@Param('id') recipeId: string) {
    const isDeleted = await this.recipeService.deleteRecipe(recipeId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Recipe deleted successfully',
            };
        }
  }

}
