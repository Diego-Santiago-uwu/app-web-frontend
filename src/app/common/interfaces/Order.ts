import {Address} from './Address';
import {Cart} from './Cart';
import {User} from "./User";


export interface Order {
    id: number;
    user: User;
    shippingAddress: Address;
    shoppingCart: Cart;
    status: string;
}
