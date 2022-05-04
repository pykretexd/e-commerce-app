import type { NextPage } from 'next';
import Products from '../components/products';

const Home: NextPage = () => {
  return (
    <div className='w-[85vw] md:w-[75vw] flex justify-center'>
      <Products />
    </div>
  );
};

export default Home;
