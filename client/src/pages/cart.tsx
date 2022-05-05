import { useAtom } from 'jotai';
import { NextPage } from 'next';
import cartAtom from '../components/cartState';

const Cart: NextPage = () => {
  const [cartItems] = useAtom(cartAtom);
  return <p>{cartItems}</p>;
};

export default Cart;
