import Link from 'next/link';
import { useMeQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';

function AccountPanel() {
  const [{ data, fetching }] = useMeQuery();

  if (fetching) {
    return (
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
    );
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
        <Link href='/account'>
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
}

export default withUrqlClient(createUrqlClient)(AccountPanel);
