export interface CreateUser {
  username: string;
  password: string;
  email: string;
  roles: [
    {
      id: number;
      name: string;
    }
  ];
  addresses: [
    {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    }
  ];
}
