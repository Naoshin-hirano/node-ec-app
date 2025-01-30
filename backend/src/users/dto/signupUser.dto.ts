import { IsString, MaxLength, Validate } from 'class-validator';
import { IsEmployeeNumber } from 'src/common/validators';

export class SignUpUserDto {
  @IsString()
  @Validate(IsEmployeeNumber)
  employee_number: string;

  @IsString()
  @MaxLength(10)
  password: string;

  @IsString()
  name: string;

  @IsString()
  role: string;
}
