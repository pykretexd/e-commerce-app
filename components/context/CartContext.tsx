import { createContext } from 'react';
import Stripe from 'stripe';

export type CartContextProps = {
  items?: Stripe.Price[];
  remove?: (id: string) => void;
  add?: (p: Stripe.Price) => void;
};

const cartContextProps: CartContextProps = {};

const CartContext = createContext(cartContextProps);

export default CartContext;
