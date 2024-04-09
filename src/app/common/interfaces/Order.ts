import {Address} from './Address';
import {Cart} from './Cart';
import {Role} from './Role';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  shoppingCart: Cart;
  roles: Role[];
  addresses: Address[];
}

