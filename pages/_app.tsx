import { useState } from 'react';
import Stripe from 'stripe';
import _ from 'lodash';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import CartContext, {
  CartContextProps,
} from '../components/context/CartContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [items, setItems] = useState<Stripe.Price[]>([]);

  const remove = (id: string) => {
    let i = _.reject(items, (item) => item.id === id);
    setItems(i);
  };

  const add = (p: Stripe.Price) => {
    let i = _.union(items, [p]);
    setItems(i);
  };

  const cartContext: CartContextProps = {
    items: items,
    add: add,
    remove: remove,
  };

  return (
    <CartContext.Provider value={cartContext}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContext.Provider>
  );
}

export default MyApp;
