import { Formik } from 'formik';
import router from 'next/router';
import { useLoginMutation } from '../generated/graphql';
import { errorMap } from '../utils/errorMap';

const Register: React.FC<{}> = ({}) => {
  const [, login] = useLoginMutation();

  return (
    <div className='flex flex-col items-center w-1/2'>
      <h1 className='self-start font-bold text-2xl pb-4'>Logga in</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            usernameOrEmail: values.username,
            password: values.password,
          });
          if (response.data?.login.errors) {
            setErrors(errorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
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
                Användarnamn/Email
              </label>
              <input
                className='border-[1px] border-black p-2 w-full'
                type='username'
                name='username'
                placeholder='Användarnamn/Email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
            </div>

            {errors.username && touched.username && errors.username}

            <div className='w-full basis-[10%]'>
              <label className='border-x-[1px] border-t-[1px] border-black px-2'>
                Lösenord
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
            </div>

            <button
              className='bg-black text-white basis-[10%]'
              type='submit'
              disabled={isSubmitting}
            >
              Submit
            </button>
            <p>
              Har du inget konto?{' '}
              <a href='/register' className='underline'>
                Registrera dig här.
              </a>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
