import Footer from './layout/footer';
import Header from './layout/header';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main className='flex justify-center'>
        <div className='w-full max-w-[910px] flex justify-center my-10 min-h-[55.2vh] lg:min-h-[67.1vh]'>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
