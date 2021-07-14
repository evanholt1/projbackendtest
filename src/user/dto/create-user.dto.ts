export class CreateUserDto {
  constructor(name: string, uuid: string, role: string) {
    this.name = name;
    this.uuid = uuid;
    //this.phone_number = phone_number;
    this.role = role;
  }

  name: string;

  uuid: string;

  //phone_number: string;

  role: string;
}
