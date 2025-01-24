import {
  IsEAN,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEAN()
  @IsNotEmpty()
  barcode?: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  categoryId?: number;

  @IsOptional()
  @IsInt()
  subcategoryId?: number;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  companyId?: number;
}
