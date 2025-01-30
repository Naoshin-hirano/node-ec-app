import { IsString, MaxLength, Validate } from 'class-validator';
import { IsEmployeeNumber } from 'src/common/validators';

export class LogInUserDto {
  @IsString()
  @Validate(IsEmployeeNumber)
  employee_number: string;

  @IsString()
  @MaxLength(255)
  password: string;
}
