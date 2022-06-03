import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { FunctionComponent } from 'react';
import Stripe from 'stripe';
import CartStore from '../utils/CartStore';
import {
  getPriceTotal,
  getProductDescription,
  getProductImage,
  getProductName,
} from '../utils/computed';

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
  const add = () => CartStore((state) => state.add);
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
            onClick={() => add(price)}
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
