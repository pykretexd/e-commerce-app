import type { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useQuery } from 'urql';
import { useAtom } from 'jotai';
import cartAtom from '../components/cartState';
import Head from 'next/head';
import { createUrqlClient } from '../utils/createUrqlClient';

const Home: NextPage = () => {
  return (
    <div className='w-[85vw] md:w-[75vw] flex justify-center'>
      <Head>
        <title>Best plants available online</title>
      </Head>
      <Products />
    </div>
  );
};

function Products() {
  const [cartList, setCartList] = useAtom(cartAtom);
  const [productsResult, setProductsQuery] = useQuery({
    query: `query {
        availableProducts {
          id
          title
          price
          count
        }
      }`,
  });
  const { data, fetching, error } = productsResult;

  if (fetching) return <p>Loading...</p>;
  if (error)
    return (
      <div className='flex flex-col justify-center items-center'>
        <p>Whoops! An error occurred... </p>
        <p>{error.message}</p>
      </div>
    );

  return (
    <div>
      <ul className='grid grid-cols-2 sm:grid-cols-3'>
        {data.availableProducts.map(
          (product: {
            id: number;
            title: string;
            price: number;
            count: number;
          }) => (
            <li
              key={product.id}
              className='px-1 py-4 max-w-[175px] min-h-[260px] max-h-[355px] lg:max-h-[510px] lg:max-w-[300px] md:min-h-[335px] hover:cursor-grab'
            >
              <div className='flex flex-col'>
                <img
                  src='https://www.kindpng.com/picc/m/381-3816942_indoor-plants-png-transparent-png.png'
                  alt='plant'
                />
                <div className='flex flex-col mt-2'>
                  <p className='sm:col-span-2'>{product.title}</p>
                  <p>{product.price},00 kr</p>
                  <button
                    onClick={() =>
                      setCartList((cartList) => [
                        ...cartList,
                        {
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          count: product.count,
                        },
                      ])
                    }
                    className='relative p-2 m-2 w-[90%] bg-green-500 text-white rounded-3xl self-center'
                  >
                    Lägg i varukorg
                  </button>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default withUrqlClient(createUrqlClient)(Home);
