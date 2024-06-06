import { UserDto } from './user.dto';

export class UserListResponseDto {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserDto[];
}
