import { Formik } from 'formik';
import { useMutation } from 'urql';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(
    `mutation Register($options: UsernamePasswordInput!) {
        register(options: $options) {
          errors {
            field
            message
          }
          user {
            id
            username
            email
          }
        }
      }`
  );

  return (
    <div>
      <h1>Registrera konto</h1>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          return register(values);
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
          <form onSubmit={handleSubmit}>
            <input
              className='border-2'
              type='email'
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            {errors.email && touched.email && errors.email}

            <input
              className='border-2'
              type='username'
              name='username'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />

            {errors.username && touched.username && errors.username}

            <input
              className='border-2'
              type='password'
              name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />

            {errors.password && touched.password && errors.password}

            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
