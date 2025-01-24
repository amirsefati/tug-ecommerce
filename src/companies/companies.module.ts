import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/common/logger/logger.module';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), LoggerModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [TypeOrmModule.forFeature([Company]), CompaniesService],
})
export class CompaniesModule {}
