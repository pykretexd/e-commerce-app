import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { FunctionComponent, useContext, useState } from 'react';
import Stripe from 'stripe';
import CartContext from '../components/context/CartContext';
import {
  getPriceTotal,
  getProductDescription,
  getProductImage,
  getProductName,
} from '../utils/computed';

const maxQuantity = 10;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SK as string, {
    apiVersion: '2020-08-27',
  });

  const price = await stripe.prices.retrieve(params?.id as string, {
    expand: ['product'],
  });

  return {
    props: {
      price,
    },
  };
};

type Props = {
  price: Stripe.Price;
};

const Details: FunctionComponent<Props> = ({ price }) => {
  const { add } = useContext(CartContext);
  const addToCart = (p: Stripe.Price) => {
    if (add) {
      add(p);
    }
  };

  return (
    <>
      <Head>
        <title>{getProductName(price.product)}</title>
        <meta
          name='description'
          content={getProductDescription(price.product)}
        />
      </Head>
      <div className='flex flex-col md:flex-row items-center md:items-start justify-between'>
        <img
          className='max-h-[50%] max-w-[50%]'
          src={getProductImage(price.product)}
          alt={getProductName(price.product)}
        />
        <div className='flex flex-col w-1/2 '>
          <h2 className='font-bold text-4xl'>
            {getProductName(price.product)}
          </h2>
          <p>{getPriceTotal(price)} kr</p>

          <p className='my-2'>{getProductDescription(price.product)}</p>
          <button
            onClick={() => addToCart(price)}
            className='relative p-2 my-2 w-full bg-green-500 text-white rounded-3xl self-center'
          >
            Lägg i varukorg
          </button>
        </div>
      </div>
    </>
  );
};

export default Details;