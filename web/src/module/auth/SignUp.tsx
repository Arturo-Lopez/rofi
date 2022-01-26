import { Formik, Form } from 'formik';
import * as yup from 'yup';

import GoogleSignButton from '@components/GoogleSignButton';
import InputField from '@components/form/InputField';
import ButtonLink from '@ui/Link';
import Button from '@ui/Button';

import AuthLayout from '@module/layout/AuthLayout';
import DividerForContinue from './DividerForContinue';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

type ValuesType = typeof initialValues;

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'Must be at least 2 caracters')
    .max(30, 'Must be at most 30 caracters')
    .required('Required'),
  lastName: yup
    .string()
    .min(2, 'Must be at least 2 caracters')
    .max(30, 'Must be at most 30 caracters')
    .required('Required'),
  email: yup.string().email().required('Required'),
  password: yup.string().min(8, 'Must be at least 8 caracters').required('Required'),
});

const SignIn = () => {
  const handleSubmit = (values: ValuesType) => {};

  return (
    <AuthLayout title="Sign Up">
      <div className="mx-auto max-w-sm h-full flex flex-col justify-center">
        <h1 className="font-serif text-[40px] text-gray-800 mb-2">Sign Up</h1>
        <h4 className="text-sm mb-7 text-gray-700">
          Already have and account? <ButtonLink href="/sign-in">Sign In</ButtonLink>
        </h4>

        <GoogleSignButton label="signup_with" callback={() => {}} />

        <DividerForContinue />

        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {() => (
            <Form>
              <div className="flex flex-col lg:flex-row justify-between">
                <InputField name="firstName" label="First name" m="mb-4" />
                <InputField name="lastName" label="Last name" m="mb-4" />
              </div>
              <InputField name="email" label="Email" type="email" m="mb-4" />
              <div className="flex flex-col lg:flex-row justify-between">
                <InputField name="password" label="Password" type="password" m="mb-4" />
                <InputField name="confirmPasssword" label="Confirm password" type="password" m="mb-4" />
              </div>
              <Button>Sign up with email</Button>
            </Form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
