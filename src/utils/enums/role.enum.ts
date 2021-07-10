export enum Role {
  User = 'user',
  Driver = 'driver',
  Restaurant = 'restaurant',
  Admin = 'admin',
  All = 'all', // means you must have a token( unlike @Public() ), but the role doesnt matter
}
