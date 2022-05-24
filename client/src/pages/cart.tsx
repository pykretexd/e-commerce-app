import { useAtom } from 'jotai';
import cartAtom from '../components/cartState';
import Head from 'next/head';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

export default function Cart() {
  const [cartList, setCartList] = useAtom(cartAtom);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { sessionId } = await fetch('/api/checkout/session', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ quantity: 1 }),
    }).then((res) => res.json());
    const stripe = await stripePromise;
    const { error } = await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <div className='flex gap-4 w-full p-4 bg-gray-100'>
      <Head>
        <title>
          Varukorg
          {cartList.length > 0 ? ` (${cartList.length} varor)` : ''}
        </title>
      </Head>
      <div className='basis-1/2 bg-white p-4'>
        <h1 className='text-2xl font-semibold'>
          Varukorg
          {cartList.length > 1 && ` (${cartList.length} varor)`}
          {cartList.length == 1 && ` (${cartList.length} vara)`}
        </h1>
        {cartList.length > 0 ? <CartList /> : <p>Din vagn är tom.</p>}
      </div>
      <form
        className='h-1/2 basis-1/2 p-4 flex flex-col gap-4 bg-white relative'
        onSubmit={handleSubmit}
        method='POST'
      >
        <h2 className='text-2xl font-semibold'>Totalsumma</h2>
        <div className='flex justify-between'>
          <p>Deltotal</p>
          <p>0,00 kr</p>
        </div>
        <div className='flex justify-between'>
          <p>Frakt</p>
          <p>0,00 kr</p>
        </div>
        <div className='w-full h-[1px] bg-black' />
        <div className='flex justify-between font-semibold'>
          <p>Totalsumma</p>
          <p>0,00 kr</p>
        </div>
        <button
          className='absolute bottom-0 self-center bg-black text-white w-4/5 py-2 mb-4 rounded'
          type='submit'
        >
          Checkout
        </button>
      </form>
    </div>
  );
}

function CartList() {
  const [cartList, setCartList] = useAtom(cartAtom);
  const uniqueCart = cartList.filter(
    (pos: { id: any; title: any; price: any }, i: any) =>
      i ===
      cartList.findIndex(
        (element: { id: any; title: any; price: any }) =>
          element.id === pos.id &&
          element.title === pos.title &&
          element.price === pos.price
      )
  );

  function removeKey(id: number) {
    const newList = cartList.filter((item: { id: number }) => item.id !== id);
    setCartList(newList);
  }

  return (
    <ul>
      {uniqueCart.map(
        (product: {
          id: number;
          title: string;
          price: number;
          count: number;
        }) => (
          <li key={product.id}>
            <div className='flex flex-col'>
              <div className='flex flex-col mt-2'>
                <p className='sm:col-span-2'>{product.title}</p>
                <p>{product.price},00 kr</p>
                <div className='flex flex-row gap-2 items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='gray'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                    />
                  </svg>
                  <p
                    className='text-gray-400 cursor-pointer'
                    onClick={() => removeKey(product.id)}
                  >
                    Ta bort vara
                  </p>
                </div>
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
}
