import * as yup from 'yup';

export const initialValues = {
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
};

export type ValuesType = typeof initialValues;

const schemaOne = yup.object().shape({
  email: yup.string().email('Must be a valid password').required('Required'),
});

const schemaTwo = yup.object().shape({
  code: yup.string().required('Required'),
});

const schemaThree = yup.object().shape({
  password: yup.string().min(8, 'Must be at least 8 caracters').required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Must be equal')
    .required('Required'),
});

export const validationSchemas = [schemaOne, schemaTwo, schemaThree];
