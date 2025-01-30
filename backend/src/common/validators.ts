import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isEmployeeNumber' })
export class IsEmployeeNumber implements ValidatorConstraintInterface {
  validate(text: string) {
    // 5桁の数字のみを許容する正規表現パターン
    const pattern = /^\d{5}$/;
    return typeof text === 'string' && pattern.test(text);
  }

  defaultMessage() {
    return '社員番号は5桁の数字でなければなりません';
  }
}
