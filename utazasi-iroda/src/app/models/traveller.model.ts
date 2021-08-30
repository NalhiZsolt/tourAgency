export class Traveller {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  gender: string;
  image: string;
  password: string;
  role: number;
  city: string;
  street: string;
  houseNumber: number;
  zip: number;
  my_tours: Array<string>;
}

export class UserData {
  first_name: string;
  id: string;
  role: number;
}
