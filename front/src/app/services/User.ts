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
  id: string;
  photo: string;
  isAdmin: boolean;
}
