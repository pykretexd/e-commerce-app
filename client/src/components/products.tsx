import { useQuery } from 'urql';

const Products = () => {
  const [productsResult, setProductsQuery] = useQuery({
    query: `query {
        products {
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
      <div className='w-full max-w-[910px] h-screen flex justify-center items-center'>
        <p>Oh no... {error.message}</p>
      </div>
    );

  return (
    <ul className='w-full max-w-[910px] grid grid-cols-2 sm:grid-cols-3'>
      {data.products.map(
        (product: {
          id: number;
          title: string;
          price: number;
          count: number;
        }) => (
          <li
            key={product.id}
            className='px-1 py-4 max-w-[175px] min-h-[260px] max-h-[260px] lg:max-h-[425px] lg:max-w-[300px] h-[60vw] sm:h-[40vw] md:h-[35vw]'
          >
            <div className='flex flex-col items-center'>
              <img
                src='https://www.pngitem.com/pimgs/m/516-5162680_snake-plant-png-transparent-png.png'
                alt='plant'
              />
              <p>{product.title}</p>
              <p>{product.price}</p>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default Products;
