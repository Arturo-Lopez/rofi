import { Formik, Form, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { parsePhoneNumber } from 'react-phone-number-input';

import { InputField } from '@components/form';
import Button from '@ui/Button';
import { useCheck2FaCodeMutation, useSend2FaMutation } from '@api';

import AuthLayout from './AuthLayout';

const initialValues = {
  code: '',
};

const validationSchema = yup.object().shape({
  code: yup.string().length(6, 'El código debe tener 6 caracteres').required('Requerido'),
});

type ValuesType = typeof initialValues;

interface VerifyProps {
  phoneNumber: string;
}

const Verify = ({ phoneNumber }: VerifyProps) => {
  const router = useRouter();

  const [sendCode, { loading }] = useSend2FaMutation();
  const [checkCode] = useCheck2FaCodeMutation();

  const handleSendCode = async () => {
    const { data } = await sendCode({
      variables: {
        phoneNumber,
      },
    });

    switch (data?.send2FA.message) {
      case 'sends expired, try in 10 mins again':
        toast.error('Envios maximos alcanzados, intentelo de nuevo en 10 minutos');
        break;
      case 'an error ocurred while creating 2FA':
        toast.error('Un error ocurrio al enviar el codigo');
        break;
      case 'verification code sended':
        toast.success('Codigo de verificacion enviado');
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (values: ValuesType, { setSubmitting, setFieldError }: FormikHelpers<ValuesType>) => {
    const { data } = await checkCode({
      variables: {
        phoneNumber,
        code: values.code,
      },
    });

    const res = data?.check2FACode;

    switch (res?.message) {
      case 'verification code expired':
        setFieldError('code', 'El código de verificación expiro');
        toast.error('El código de verificación vención');
        break;
      case 'verification code is invalid':
        setFieldError('code', 'El código de verificación es incorrecto');
        toast.error('El código de verificación es incorrecto');
        break;
      case 'verification code is valid':
        toast.success('El código de verificación es valido');

        setTimeout(() => {
          router.push('/');
        }, 4000);

        break;
      default:
        break;
    }

    if (!res?.success) {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Verificación">
      <div className="h-full flex flex-col justify-center">
        <h1 className="font-serif text-[40px] text-gray-800">Verificación</h1>
        <p className="text-gray-500 ">Introduce el código de verificación para validar tu cuenta</p>

        <Formik
          initialValues={{
            code: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting }) => (
            <Form className="mt-8">
              <InputField name="code" label="Código de verificación" />
              <p className="text-xs text-center mt-1 text-gray-600">
                Ingrese el código que fue enviado a <br />
                {parsePhoneNumber(phoneNumber).formatInternational()}
              </p>

              <Button disabled={!isValid || isSubmitting} type="submit">
                Verificar
              </Button>

              <button
                className="w-full mt-4 px-2 py-3 text-sm text-primary font-medium cursor-pointer rounded-lg hover:bg-gray-50 transition-all duration-300 disabled:text-gray-600 disabled:bg-gray-50 disabled:cursor-not-allowed"
                type="button"
                disabled={loading}
                onClick={handleSendCode}
              >
                Enviar código de verificación
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
};

export default Verify;
