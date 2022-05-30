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

export default Footer;
