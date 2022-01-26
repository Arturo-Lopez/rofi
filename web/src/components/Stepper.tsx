import { FC } from 'react';
import clsx from 'clsx';

interface StepperProps {
  value: string | number;
  steps: Record<string | number, string>;
}

const Stepper: FC<StepperProps> = ({ value, steps: data }) => {
  const stepsArray = Object.entries(data);

  if (stepsArray.length === 0) return null;

  const isCurrentValue = (val: string | number) => {
    if (typeof val === 'string') {
      return value === parseInt(val, 10);
    }

    return value === val;
  };

  return (
    <div className="flex rounded-lg overflow-hidden bg-gray-100 text-xs">
      {stepsArray?.map(([val, label], idx) => (
        <div
          key={val}
          className={clsx('flex-1 text-center px-2 py-3 font-medium', {
            'bg-primary text-white': isCurrentValue(val),
          })}
        >
          <span className="mr-2 font-semibold">{idx + 1}</span>
          {label}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
