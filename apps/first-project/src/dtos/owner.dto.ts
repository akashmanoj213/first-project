import { IsString, IsInt } from 'class-validator';

export class OwnerDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}
