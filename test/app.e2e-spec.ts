// test/app.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Company } from '../src/companies/entities/company.entity';
import { Category } from '../src/products/entities/category.entity';
import { Product } from '../src/products/entities/product.entity';
import { Subcategory } from '../src/products/entities/subcategory.entity';

describe('E-Commerce API (e2e)', () => {
  let app: INestApplication;
  let companyRepo;
  let productRepo;
  let categoryRepo;
  let subcategoryRepo;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Get repositories
    companyRepo = moduleFixture.get(getRepositoryToken(Company));
    productRepo = moduleFixture.get(getRepositoryToken(Product));
    categoryRepo = moduleFixture.get(getRepositoryToken(Category));
    subcategoryRepo = moduleFixture.get(getRepositoryToken(Subcategory));
  });

  beforeEach(async () => {
    // Clear data in safe order
    await productRepo.delete({});
    await subcategoryRepo.delete({});
    await categoryRepo.delete({});
    await companyRepo.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/companies (Company Endpoints)', () => {
    it('GET /companies - should return all companies', async () => {
      await companyRepo.save([{ name: 'Company A' }, { name: 'Company B' }]);

      const response = await request(app.getHttpServer())
        .get('/companies')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('Company A');
    });
  });

  describe('/products (Product Endpoints)', () => {
    let testCompany;
    let testCategory;

    beforeEach(async () => {
      // Create required entities
      testCompany = await companyRepo.save({ name: 'Test Company' });
      testCategory = await categoryRepo.save({ name: 'Electronics' });
    });

    it('POST /products - should create product with required fields', async () => {
      const response = await request(app.getHttpServer())
        .post('/products')
        .send({
          name: 'Laptop',
          barcode: '123456789',
          categoryId: testCategory.id,
          companyId: testCompany.id,
        })
        .expect(201);

      expect(response.body).toMatchObject({
        name: 'Laptop',
        barcode: '123456789',
        category: { id: testCategory.id },
        company: { id: testCompany.id },
      });
    });

    it('GET /products/search - should find product by barcode', async () => {
      await productRepo.save({
        name: 'Keyboard',
        barcode: '11223344',
        category: { id: testCategory.id },
        company: { id: testCompany.id },
      });

      const response = await request(app.getHttpServer())
        .get('/products/search?barcode=11223344')
        .expect(200);

      expect(response.body).toMatchObject({
        name: 'Keyboard',
        barcode: '11223344',
      });
    });

    it('GET /products/:id - should return product details', async () => {
      const product = await productRepo.save({
        name: 'Monitor',
        barcode: '55667788',
        category: { id: testCategory.id },
        company: { id: testCompany.id },
      });

      const response = await request(app.getHttpServer())
        .get(`/products/${product.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: product.id,
        name: 'Monitor',
      });
    });
  });
});
