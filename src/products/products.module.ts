import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/common/logger/logger.module';
import { CompaniesModule } from '../companies/companies.module';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { Subcategory } from './entities/subcategory.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Subcategory]),
    CompaniesModule,
    ConfigModule,
    LoggerModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [TypeOrmModule, ProductsService],
})
export class ProductsModule {}
