import { IsNotEmpty } from 'class-validator';

export class UpdateCompanyDto {
  @IsNotEmpty()
  name: string;
}
