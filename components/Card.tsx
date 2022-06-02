import Link from 'next/link';
import { FunctionComponent, useContext } from 'react';
import Stripe from 'stripe';
import {
  getPriceTotal,
  getProductImage,
  getProductName,
} from '../utils/computed';
import CartContext from './context/CartContext';

type CardProps = {
  price: Stripe.Price;
};

const Card: FunctionComponent<CardProps> = ({ price }) => {
  const { add } = useContext(CartContext);
  const addToCart = (p: Stripe.Price) => {
    if (add) {
      add(p);
    }
  };

  return (
    <div className='flex flex-col p-2 mx-8 my-4 max-w-[175px] min-h-[260px] max-h-[355px] lg:max-h-[510px] lg:max-w-[300px] md:min-h-[335px] hover:cursor-pointer'>
      <Link href={`/${price.id}`}>
        <img
          className='w-3/4 h-3/4 object-center object-cover self-center'
          src={getProductImage(price.product)}
        />
      </Link>
      <Link href={`/${price.id}`}>
        <div className='flex flex-col'>
          <p className='sm:col-span-2'>{getProductName(price.product)}</p>
          <p>{getPriceTotal(price)} kr</p>
        </div>
      </Link>
      <button
        onClick={() => addToCart(price)}
        className='relative p-2 my-2 w-full border-2 border-black font-bold rounded-3xl self-center'
      >
        Lägg i varukorg
      </button>
    </div>
  );
};

export default Card;
