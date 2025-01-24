import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../common/logger/logger.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private logger: LoggerService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    this.logger.log('Creating new product');
    return this.productRepository.save(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    this.logger.log('Fetching all products');
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    this.logger.log(`Fetching product with ID: ${id}`);
    return this.productRepository.findOneBy({ id });
  }

  async findByBarcode(barcode: string): Promise<Product> {
    this.logger.log(`Searching product by barcode: ${barcode}`);
    return this.productRepository.findOneBy({ barcode });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    this.logger.log(`Update product With Id : ${id}`);
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Remove product with ID: ${id}`);
    await this.productRepository.delete(id);
  }
}
