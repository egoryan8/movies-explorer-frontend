import React, { useCallback, useState } from 'react';

function useFormWithValidation() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const { name, value } = target;

    setValues(values => ({ ...values, [name]: value }))
    setErrors(errors => ({ ...errors, [name]: target.validationMessage }))
    setIsValid(target!.closest('form')!.checkValidity())
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    errors,
    isValid,
    onChange,
    resetForm,
  }
}

export default useFormWithValidation;