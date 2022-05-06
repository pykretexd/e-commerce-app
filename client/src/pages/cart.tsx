import { NextPage } from 'next';
import { useAtom } from 'jotai';
import cartAtom from '../components/cartState';
import Head from 'next/head';

const Cart: NextPage = () => {
  const [cartList, setCartList] = useAtom(cartAtom);
  return (
    <div className='w-full p-8 bg-gray-100'>
      <Head>
        <title>
          Varukorg
          {cartList.length > 0 && ` (${cartList.length} varor)`}
        </title>
      </Head>
      <h2 className='text-2xl font-semibold'>
        Varukorg
        {cartList.length > 1 && ` (${cartList.length} varor)`}
        {cartList.length == 1 && ` (${cartList.length} vara)`}
      </h2>
      {cartList.length > 0 ? <CartList /> : <p>Din vagn är tom.</p>}
    </div>
  );
};

function CartList() {
  const [cartList, setCartList] = useAtom(cartAtom);
  const uniqueCart = cartList.filter(
    (pos, i) =>
      i ===
      cartList.findIndex(
        (element) =>
          element.id === pos.id &&
          element.title === pos.title &&
          element.price === pos.price
      )
  );

  function removeKey(id: number) {
    const newList = cartList.filter((item) => item.id !== id);
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

export default Cart;
