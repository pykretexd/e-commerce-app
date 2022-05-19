import { Formik } from 'formik';
import { responsePathAsArray } from 'graphql';
import { useRouter } from 'next/router';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { errorMap } from '../utils/errorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <div className='flex flex-col items-center w-1/2'>
      <h1 className='self-start font-bold text-2xl pb-4'>Registrera konto</h1>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(errorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push('/');
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-4 w-full h-full'
          >
            <div className='w-full basis-[10%]'>
              <label className='border-x-[1px] border-t-[1px] border-black px-2'>
                Användarnamn*
              </label>
              <input
                className='border-[1px] border-black p-2 w-full'
                type='username'
                name='username'
                placeholder='Användarnamn'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
            </div>

            {errors.username && touched.username && errors.username}

            <div className='w-full basis-[10%]'>
              <label className='border-x-[1px] border-t-[1px] border-black px-2'>
                E-postadress*
              </label>
              <input
                className='border-[1px] border-black p-2 w-full'
                type='email'
                name='email'
                placeholder='E-postadress'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </div>

            {errors.email && touched.email && errors.email}

            <div className='w-full basis-[10%]'>
              <label className='border-x-[1px] border-t-[1px] border-black px-2'>
                Lösenord*
              </label>
              <input
                className='border-[1px] border-black p-2 w-full'
                type='password'
                name='password'
                placeholder='Lösenord'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />

              {errors.password && touched.password && errors.password}

              <div className='flex flex-row gap-1 py-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <p className='text-sm'>Ange minst 6 tecken.</p>
              </div>
            </div>

            <button
              className='bg-black text-white basis-[10%]'
              type='submit'
              disabled={isSubmitting}
            >
              Submit
            </button>
            <p>
              Har du redan konto?{' '}
              <a href='/login' className='underline'>
                Logga in här.
              </a>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
