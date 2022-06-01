import { useContext, Fragment, FunctionComponent, useState } from 'react';
import { TrashIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { Popover, Transition } from '@headlessui/react';
import CartContext from '../context/CartContext';
import {
  getPriceTotal,
  getProductDescription,
  getProductImage,
  getProductName,
} from '../../utils/computed';
import Link from 'next/link';

const Header: FunctionComponent = () => {
  const { items, remove } = useContext(CartContext);

  const maxQuantity = 10;

  const removeFromCart = (id: string) => {
    if (remove) {
      remove(id);
    }
  };

  const checkout = async () => {
    const lineItems = items?.map((price) => {
      return {
        price: price.id,
        quantity: 1,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: maxQuantity,
        },
      };
    });
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ lineItems: lineItems }),
    });

    const b = await res.json();
    window.location.href = b.session.url;
  };

  return (
    <header className='relative flex justify-center h-20 bg-black text-white text-2xl '>
      <div className='w-[85vw] md:w-[75vw] max-w-[910px] flex items-center justify-between'>
        {/* Logo */}
        <div className='flex-1 flex hover:cursor-pointer'>
          <Link href='/'>
            <p className='text-2xl font-bold'>LOGO</p>
          </Link>
        </div>

        {/* Cart */}
        <div className='flex-1 flex items-center justify-end'>
          <Popover className='ml-4 flow-root text-sm lg:relative lg:ml-8 z-50'>
            <Popover.Button className='group -m-2 p-2 flex items-center'>
              <ShoppingBagIcon
                className='flex-shrink-0 h-6 w-6 text-white group-hover:text-gray-200'
                aria-hidden='true'
              />
              <span className='absolute bg-orange-400 translate-x-full -translate-y-1/2 rounded-xl w-4 h-4 text-center text-xs'>
                {items?.length}
              </span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Popover.Panel className='absolute top-16 inset-x-0 mt-px pb-6 bg-white shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-[30rem] lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5'>
                {/* Shopping bag panel */}
                {items?.length ? (
                  <>
                    <h2 className='sr-only'>Korg</h2>

                    <div className='max-w-2xl mx-auto px-4'>
                      <ul role='list' className='divide-y divide-gray-200'>
                        {items?.map((price) => (
                          <li key={price.id} className='py-6 flex'>
                            <div className='flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden'>
                              <img
                                src={getProductImage(price.product)}
                                alt={getProductDescription(price.product)}
                                className='w-full h-full object-center object-cover'
                              />
                            </div>

                            <div className='ml-4 flex-1 flex flex-col'>
                              <div>
                                <div className='flex justify-between text-base font-medium text-gray-900'>
                                  <h3>{getProductName(price.product)}</h3>
                                  <p className='ml-4'>
                                    {getPriceTotal(price)} kr
                                  </p>
                                </div>
                              </div>
                              <div className='flex-1 flex items-end text-sm'>
                                <button
                                  onClick={(e) => removeFromCart(price.id)}
                                  type='button'
                                  className='font-medium flex items-center text-gray-400 hover:text-gray-500'
                                >
                                  <TrashIcon className='h-6 w-6' />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={checkout}
                        className='w-full bg-green-500 hover:bg-green-700 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white'
                      >
                        Gå till kassan
                      </button>
                    </div>
                  </>
                ) : (
                  <div className='w-2xl mt-4 px-4'>
                    <p className='text-black text-center text-lg font-semibold'>
                      Din korg är tom. Fortsätt handla och dina varor läggs här.
                    </p>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
