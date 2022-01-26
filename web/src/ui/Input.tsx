import { FC, InputHTMLAttributes, ReactElement } from 'react';
import { MdError } from 'react-icons/md';
import clsx from 'clsx';

import IF from '@components/IF';

export interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactElement<any, any>;
  endComponent?: ReactElement<any, any>;
  label?: string;
  errorText?: string;
  helperText?: string;
  name: string;
  m?: string;
}

interface ErrorLabelProps {
  error: string;
}

interface InputLabelProps {
  helperText: string | undefined;
  error: string | undefined;
}

const ErrorLabel: FC<ErrorLabelProps> = ({ error }) => (
  <div className="flex items-center justify-start mt-1 text-error">
    <MdError fontSize={16} className="mr-1" />
    <p className="text-xs  font-medium">{error}</p>
  </div>
);

const InputLabel: FC<InputLabelProps> = ({ error, helperText }) => {
  if (error) return <ErrorLabel error={error} />;

  if (!helperText) return null;

  return (
    <div className="flex items-center justify-start mt-1 text-gray-700">
      <p className="text-xs  font-medium">{helperText}</p>
    </div>
  );
};

const Input: FC<InputType> = ({ startIcon, endComponent, errorText, helperText, label, name, m, ...props }) => (
  <div className={`${m || ''}`}>
    <div
      className={clsx('h-[50px] bg-gray-100 rounded-lg flex focus-within:ring-2 ring-secondary text-gray-600 ', {
        'ring-2 ring-error': !!errorText,
      })}
    >
      <IF cond={!!startIcon}>
        <div className="self-center ml-2 w-6 text-2xl">{startIcon}</div>
      </IF>
      <div className="mx-4 flex flex-col justify-center w-full">
        <IF cond={!!label}>
          <label htmlFor={name} className="text-gray-600 text-xs font-semibold mt-[6px] block leading-none">
            {label}
          </label>
        </IF>
        <input id={name} className="flex-1 bg-transparent outline-none w-full text-sm" type="text" {...props} />
      </div>

      <IF cond={!!endComponent}>
        <div className="flex items-center justify-center">{endComponent}</div>
      </IF>
    </div>
    <InputLabel helperText={helperText} error={errorText} />
  </div>
);

export default Input;
