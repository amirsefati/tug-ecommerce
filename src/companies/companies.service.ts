import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../common/logger/logger.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private logger: LoggerService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    this.logger.log('Creating new company');
    return this.companyRepository.save(createCompanyDto);
  }

  async findAll(): Promise<Company[]> {
    this.logger.log('Fetching all companies');
    return this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    this.logger.log(`Fetching company with ID: ${id}`);
    return this.companyRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    await this.companyRepository.update(id, updateCompanyDto);
    this.logger.log(`Update company with ID: ${id}`);
    return this.companyRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Remove company with ID: ${id}`);
    await this.companyRepository.delete(id);
  }
}
