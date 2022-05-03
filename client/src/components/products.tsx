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
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ul className='w-full flex flex-wrap justify-between'>
      {data.products.map(
        (product: {
          id: number;
          title: string;
          price: number;
          count: number;
        }) => (
          <li
            key={product.id}
            className='max-w-[175px] md:max-w-[300px] basis-1/2 h-[50vw] max-h-[400px] px-1 py-4 bg-slate-600'
          >
            <div className='flex flex-col items-center'>
              <img
                src='../images/plant.png'
                alt='plant'
                className='max-w-[175px]'
              />
              <p>{product.title}</p>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default Products;
