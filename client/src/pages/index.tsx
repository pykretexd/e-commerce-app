import type { NextPage } from 'next';
import { useQuery } from 'urql';
import { useAtom } from 'jotai';
import cartAtom from '../components/cartState';

const Home: NextPage = () => {
  return (
    <div className='w-[85vw] md:w-[75vw] flex justify-center'>
      <Products />
    </div>
  );
};

function Products() {
  const [cartItems, setCartItems] = useAtom(cartAtom);
  const [productsResult, setProductsQuery] = useQuery({
    query: `query {
        availableProducts {
          id
          title
          price
        }
      }`,
  });
  const { data, fetching, error } = productsResult;

  if (fetching) return <p>Loading...</p>;
  if (error)
    return (
      <div className='w-full max-w-[910px] h-screen flex justify-center items-center'>
        <p>Oh no... {error.message}</p>
      </div>
    );

  return (
    <ul className='w-full max-w-[910px] grid grid-cols-2 sm:grid-cols-3'>
      {data.availableProducts.map(
        (product: { id: number; title: string; price: number }) => (
          <li
            key={product.id}
            className='px-1 py-4 max-w-[175px] min-h-[260px] max-h-[355px] lg:max-h-[510px] lg:max-w-[300px] md:min-h-[335px] hover:cursor-grab'
          >
            <div className='flex flex-col'>
              <img
                src='https://www.pngitem.com/pimgs/m/516-5162680_snake-plant-png-transparent-png.png'
                alt='plant'
              />
              <div className='flex flex-col sm:grid sm:grid-cols-2 sm:gap-2 mt-2 '>
                <p className='sm:col-span-2'>{product.title}</p>
                <p className='text-gray-500 sm:col-span-2'>Höjd 120cm / Grön</p>
                <p>{product.price},00 kr</p>
                <button
                  onClick={() =>
                    setCartItems((cartItems) => [...cartItems, product.id])
                  }
                  className='relative p-2 w-1/2 sm:w-full bg-green-500 text-white rounded self-center text-xs'
                >
                  Köp
                </button>
              </div>
            </div>
          </li>
        )
      )}
      <p>{cartItems}</p>
    </ul>
  );
}

export default Home;
