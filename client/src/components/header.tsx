import { useAtom } from 'jotai';
import Link from 'next/link';
import { useMeQuery } from '../generated/graphql';
import cartAtom from './cartState';

const AccountPanel = () => {
  const [{ data, fetching }] = useMeQuery();

  if (fetching) {
    return <p>Loading...</p>;
  } else if (!data?.me) {
    return (
      <>
        <Link href='/login'>
          <div className='transition hover:cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 hover:scale-110'
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
        </Link>
      </>
    );
  } else {
    return (
      <div className='flex flex-row items-center gap-8 text-center'>
        <Link href={'/account'}>
          <div className='transition hover:cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 hover:scale-110'
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
        </Link>
      </div>
    );
  }
};

export const Header = () => {
  const [cartItems] = useAtom(cartAtom);
  return (
    <header className='bg-black h-20 text-2xl text-white flex justify-center'>
      <div className='w-[85vw] md:w-[75vw] max-w-[910px] flex items-center justify-between'>
        <Link href='/'>
          <h1 className='font-bold hover:cursor-pointer transition hover:scale-110'>
            LOGO
          </h1>
        </Link>
        <ul className='flex text-xl gap-8 items-center'>
          <li>
            <AccountPanel />
          </li>
          <li className='transition hover:cursor-pointer hover:scale-110'>
            <Link href='/cart'>
              <div>
                {cartItems.length > 0 && (
                  <span className='absolute bg-orange-400 translate-x-full -translate-y-2/3 rounded-xl w-4 h-4 text-center text-xs'>
                    {cartItems.length}
                  </span>
                )}
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
          </li>
        </ul>
      </div>
    </header>
  );
};
