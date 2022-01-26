import { useState } from 'react';
import { Formik, Form } from 'formik';

import Button from '@ui/Button';
import { InputField } from '@components/form';
import Stepper from '@components/Stepper';
import IF from '@components/IF';

import AuthLayout from '@module/layout/AuthLayout';
import { initialValues, validationSchemas, ValuesType } from './form';

const RestorePassword = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleSubmit = async (values: ValuesType) => {};

  return (
    <AuthLayout title="Restore">
      <div className="mx-auto max-w-sm h-full flex flex-col justify-center">
        <h1 className="font-serif text-[40px] text-gray-800 mb-2">Restore</h1>
        <p className="text-sm mb-7 text-gray-700 ">Fill the inputs in order to restore your password</p>

        <div className="mt-5 mb-10">
          <Stepper
            value={step}
            steps={{
              1: 'Send',
              2: 'Verify',
              3: 'Change',
            }}
          />
        </div>

        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchemas[step - 1]}>
          {({ isValid, isSubmitting }) => (
            <>
              <IF cond={step === 1}>
                <Form>
                  <InputField
                    label="Email"
                    name="email"
                    helperText="A verification code will be send to your email"
                    m="mb-4"
                  />
                  <Button disabled={!isValid || isSubmitting} type="submit">
                    Send code
                  </Button>
                </Form>
              </IF>
              <IF cond={step === 2}>
                <Form>
                  <InputField label="Verification code" name="code" m="mb-4" />
                  <Button disabled={!isValid || isSubmitting} type="submit">
                    Verify code
                  </Button>
                </Form>
              </IF>
              <IF cond={step === 3}>
                <Form>
                  <InputField label="Password" name="password" />
                  <InputField label="Confirm password" name="confirmPassword" m="mt-4" />
                  <Button disabled={!isValid || isSubmitting} type="submit">
                    Change password
                  </Button>
                </Form>
              </IF>
            </>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default RestorePassword;
