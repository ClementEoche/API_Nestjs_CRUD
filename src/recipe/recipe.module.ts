import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipeController } from './recipe.controller';
import { RecipesService } from './recipe.service';
import { RecipesSchema } from './recipe.model';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { IngredientsSchema } from 'src/ingredients/ingredients.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Ingredients', schema: IngredientsSchema }]), MongooseModule.forFeature([{ name: 'Recipe', schema: RecipesSchema }])],
  controllers: [RecipeController],
  providers: [RecipesService]
})
export class RecipeModule {}
