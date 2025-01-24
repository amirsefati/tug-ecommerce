import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../common/logger/logger.service';
import { Company } from '../companies/entities/company.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private logger: LoggerService,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Find related entities
    const category = await this.categoryRepository.findOne({
      where: { id: createProductDto.categoryId },
    });
    const subcategory = createProductDto.subcategoryId
      ? await this.subcategoryRepository.findOne({
          where: { id: createProductDto.subcategoryId },
        })
      : null;
    const company = await this.companyRepository.findOne({
      where: { id: createProductDto.companyId },
    });

    if (!category) throw new NotFoundException('Category not found');
    if (!company) throw new NotFoundException('Company not found');

    // Create new product with relationships
    const product = this.productRepository.create({
      ...createProductDto,
      category,
      subcategory,
      company,
    });

    this.logger.log('Creating new product');
    return this.productRepository.save(product);
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
