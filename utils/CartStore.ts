import Stripe from 'stripe';
import create from 'zustand';

type CartStoreProps = {
  items: Stripe.Price[];
  remove?: (id: string) => void;
  add?: (p: Stripe.Price) => void;
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
};

const CartStore = create<CartStoreProps>((set) => ({
  items: [],
  quantity: 0,
  incrementQuantity: () => set((state) => ({ quantity: state.quantity + 1 })),
  decrementQuantity: () => set((state) => ({ quantity: state.quantity - 1 })),
  add: (p: Stripe.Price) => set((state) => ({ items: [...state.items, p] })),
  remove: (id: string) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));

export default CartStore;
