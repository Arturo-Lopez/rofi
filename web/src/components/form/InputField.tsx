import { useField } from 'formik';
import Input, { InputType } from '@ui/Input';

const InputField = (props: InputType) => {
  const [field, meta] = useField(props);

  return <Input errorText={meta.touched && meta.error ? meta.error : undefined} {...field} {...props} />;
};

export default InputField;
