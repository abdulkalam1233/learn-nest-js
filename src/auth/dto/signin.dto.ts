import { IsNotEmpty } from 'class-validator';

export class SingInDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
