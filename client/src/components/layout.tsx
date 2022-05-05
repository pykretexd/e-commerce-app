import Link from 'next/link';

const Header = () => {
  return (
    <header className='bg-black h-[10vh] text-2xl text-white flex justify-center'>
      <div className='w-[85vw] md:w-[75vw] max-w-[910px] h-[10vh] flex items-center justify-between'>
        <Link href='/'>
          <h1 className='font-bold hover:cursor-pointer transition-all hover:scale-110'>
            LOGO
          </h1>
        </Link>
        <div className='flex text-xl'>
          <div className='h-[10vh] flex items-center gap-2 transition-all'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <Link href='/cart'>
            <div className='h-[10vh] flex ml-8 items-center gap-2 transition-all hover:cursor-pointer hover:scale-110'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className='bg-black flex justify-center items-center py-10'>
      <div className='w-[85vw] md:w-[75vw] max-w-[910px] flex flex-col items-center pt-4'>
        <div className='text-white w-full basis-1/2 flex flex-row justify-between items-center'>
          <h1 className='text-2xl font-bold'>LOGO</h1>
          <p>&copy; 2022 Company name</p>
        </div>
        <hr className='my-4 w-full' />
        <div className='w-full flex flex-col gap-6 sm:flex-row basis-1/2 text-white'>
          <div className='basis-1/3'>
            <h3 className='text-xl font-medium mb-6'>Sociala medier</h3>
            <ul className='flex flex-row gap-6'>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
          <div className='basis-1/3'>
            <h3 className='text-xl font-medium mb-6'>Om oss</h3>
            <ul>
              <li>rad 1</li>
              <li>rad 2</li>
              <li>rad 3</li>
            </ul>
          </div>
          <div className='basis-1/3'>
            <h3 className='text-xl font-medium mb-6'>Kundservice</h3>
            <ul>
              <li>rad 1</li>
              <li>rad 2</li>
              <li>rad 3</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className='flex justify-center my-10'>{children}</main>
      <Footer />
    </>
  );
}
