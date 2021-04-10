import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';


@Module({
  imports: [RecipeModule,MongooseModule.forRoot('mongodb+srv://Users:ohAjcIDRhhP7Teaa@dbcluster.biesc.mongodb.net/myRecipeManager?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
