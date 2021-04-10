import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { IngredientsSchema } from './ingredients.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Ingredient', schema: IngredientsSchema }])],
  controllers: [IngredientsController],
  providers: [IngredientsService ],
})
export class IngredientsModule {}