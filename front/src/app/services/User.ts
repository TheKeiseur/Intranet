export interface User {
  id: string;
  gender: string;
  firstName: string;
  lastName: string;
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
