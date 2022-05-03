import type { NextPage } from 'next';
import Products from '../components/products';

const Home: NextPage = () => {
  return (
    <div className='w-[85vw] md:w-1/2 h-screen'>
      <Products />
    </div>
  );
};

export default Home;
