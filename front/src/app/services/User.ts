export interface User {
  id: string;
  gender: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  birthdate: string;
  city: string;
  country: string;
  photo: string;
  category: string;
  isAdmin: boolean;
}

export interface SimplifiedUser {
  userId: string;
  userPhoto: string;
  isAdmin: boolean;
}

export interface UserConnexionDto extends SimplifiedUser {
  idToken: string;
  expiresIn: string;
}
