import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecipeController } from './recipe.controller';
import { RecipesService } from './recipe.service';
import { RecipesSchema } from './recipe.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: RecipesSchema }])],
  controllers: [RecipeController],
  providers: [RecipesService]
})
export class RecipeModule {}

