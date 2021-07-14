export class CreateUserDto {
  // constructor(
  //   name: string,
  //   uuid: string,
  //   email: string,
  //   phoneNumber: string,
  //   role: string,
  // ) {
  //   this.name = name;
  //   this.uuid = uuid;
  //   this.phone_number = phoneNumber;
  //   this.email = email;
  //   this.role = role;
  // }

  constructor({
    name,
    uuid,
    email,
    phone_number,
    login_type,
    avatar_url,
  }: {
    name?: string;
    uuid?: string;
    email?: string;
    phone_number?: string;
    login_type?: string;
    avatar_url?: string;
  } = {}) {
    this.name = name;
    this.uuid = uuid;
    this.email = email;
    this.phone_number = phone_number;
    this.login_type = login_type;
    this.avatar_url = avatar_url;
  }

  name: string;
  uuid: string;
  phone_number: string;
  email: string;
  login_type: string;
  avatar_url: string;
  role?: string;
}
