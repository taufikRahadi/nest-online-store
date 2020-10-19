export class CreateUserDTO {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  phonenumber: string;
  role: 'user' | 'admin';
}
