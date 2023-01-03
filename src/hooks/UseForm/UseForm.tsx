/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { useState, ChangeEvent } from 'react';

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

type Validations<T> = Partial<Record<keyof T, Validation>>;

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

const useForm = <T extends Record<keyof T, any>>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const handleChange =
    (key: string, sanitizeFn?: (value: string) => void) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
      const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;

      setData({
        ...data,
        [key]: value,
      });
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validations = options?.validations;

    if (validations) {
      let valid = true;
      const newErrors = {} as ErrorRecord<T>;

      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];

        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;

        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;

        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);

        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return {
    data,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
