import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { IoMdKey } from 'react-icons/io';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import GoogleSignButton from '@components/GoogleSignButton';
import { InputField } from '@components/form';
import Button from '@ui/Button';
import ButtonLink from '@ui/Link';

import AuthLayout from '@module/layout/AuthLayout';
import DividerForContinue from './DividerForContinue';

const validationSchema = yup.object().shape({
  email: yup.string().email('Must be a valid email').required('Required'),
  password: yup.string().required('Required'),
});

const initialValues = {
  email: '',
  password: '',
};

type ValuesType = typeof initialValues;

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: ValuesType) => {};

  return (
    <AuthLayout title="Sign In">
      <div className="mx-auto max-w-sm h-full flex flex-col justify-center">
        <h1 className="font-serif text-[40px] text-gray-800 mb-2">Sign In</h1>
        <h4 className="text-sm mb-7 text-gray-700">
          Don&apos;t an account? <ButtonLink href="/sign-up">Sign Up</ButtonLink>
        </h4>

        <GoogleSignButton label="signin_with" callback={() => {}} />

        <DividerForContinue />

        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({ isValid, isSubmitting }) => (
            <Form>
              <InputField startIcon={<MdEmail />} name="email" placeholder="Email" />

              <InputField
                startIcon={<IoMdKey />}
                endComponent={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="flex-1 text-xs font-semibold text-gray-500 p-2"
                  >
                    SHOW
                  </button>
                }
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                m="my-4"
              />

              <Button disabled={!isValid || isSubmitting} type="submit">
                Sign in with email
              </Button>
            </Form>
          )}
        </Formik>
        <p className="text-sm text-gray-800 mt-4">
          Forgot password? <ButtonLink href="/restore">Restore it</ButtonLink>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
