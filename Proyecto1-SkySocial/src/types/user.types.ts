// Usuario de JSONPlaceholder en /users; solo se modelan los campos que usa la app
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
  };
}
