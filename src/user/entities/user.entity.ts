import { Role } from 'src/utils/enums/role.enum';
import { capitaliseFirstLetter } from 'src/utils/helpers/capitaliseFirstLetter';
import { logToConsole } from 'src/utils/helpers/consolelogger';

export class User {
  constructor(idInput: string, roleInput: string) {
    console.log(roleInput);
    console.log(Role[capitaliseFirstLetter(roleInput)]);
    this.id = idInput;
    this.role = Role[capitaliseFirstLetter(roleInput)]; // string role to enum role
  }

  id: string;
  role: Role;
}
