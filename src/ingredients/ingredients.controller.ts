import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
    constructor(private readonly ingredientsService: IngredientsService) {}
    @Post()
    async addIngredient(
        @Body('name') ingredientName: string,
        @Body('description') ingredientDesc: string,
        @Body('price') ingredientPrice: number,
    ) {
        const ingredient = await this.ingredientsService.insertIngredient(
            ingredientName,
            ingredientDesc,
            ingredientPrice,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Ingredient added successfully',
            data: ingredient,
        };
    }
    @Get()
    async getAllIngredients() {
        const ingredients = await this.ingredientsService.getIngredients();
        return ingredients;
    }
    @Get(':id')
    getIngredient(@Param('id') ingredientId: string) {
        return this.ingredientsService.getSingleIngredient(ingredientId);
    }
    @Patch(':id')
    async updateIngredient(
        @Param('id') ingredientId: string,
        @Body('title') ingredientName: string,
        @Body('description') ingredientDesc: string,
        @Body('price') ingredientPrice: number,
    ) {
        const ingredient = await this.ingredientsService.updateIngredient(
            ingredientId,
            ingredientName,
            ingredientDesc,
            ingredientPrice,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Ingredient updated successfully',
            ingredient: ingredient,
        };
    }
    @Delete(':id')
    async removeIngredient(@Param('id') ingredientId: string) {
        const isDeleted = await this.ingredientsService.deleteIngredient(ingredientId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'ingredient deleted successfully',
            };
        }
    }
}
