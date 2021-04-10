import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { IngredientsModule } from './ingredients/ingredients.module';

import { RecipesService } from './recipe/recipe.service';
import { IngredientsService } from './ingredients/ingredients.service';

@Module({
  imports: [RecipeModule, IngredientsModule, MongooseModule.forRoot('mongodb+srv://Users:<ohAjcIDRhhP7Teaa>@dbcluster.biesc.mongodb.net/DBCluster?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService, RecipesService, IngredientsService],
})
export class AppModule {}
