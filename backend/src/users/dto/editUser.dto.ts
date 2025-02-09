import { IsString, Validate } from 'class-validator';
import { IsEmployeeNumber } from 'src/common/validators';

export class EditUserDto {
  @IsString()
  @Validate(IsEmployeeNumber)
  employee_number: string;

  @IsString()
  name: string;

  @IsString()
  role: string;
}
