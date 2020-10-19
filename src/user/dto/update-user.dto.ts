export class UpdateUserDTO {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  phonenumber: string;
  role: 'user' | 'admin';
}
