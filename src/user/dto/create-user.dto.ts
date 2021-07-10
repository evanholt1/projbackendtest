export class CreateUserDto {
  constructor(name: string, phone_number: string) {
    this.name = name;
    this.phone_number = phone_number;
  }

  name: string;

  phone_number: string;
}
