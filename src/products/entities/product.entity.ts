import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { Category } from './category.entity';
import { Subcategory } from './subcategory.entity';

@Entity()
@Unique(['company'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  barcode: string;

  @ManyToOne(() => Category)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => Subcategory, { nullable: true })
  @JoinColumn()
  subcategory: Subcategory;

  @ManyToOne(() => Company, (company) => company.product)
  @JoinColumn()
  company: Company;
}
