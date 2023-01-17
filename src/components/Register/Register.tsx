import React from "react";
import useFormWithValidation from "../../utils/hooks/useFormWithValidation";
import AuthPage from "../AuthPage/AuthPage";
import {EMAIL_PATTERN} from "../../utils/constants";
import FormInput from "../FormInput/FormInput";

interface RegisterProps {
  onSubmit: (values: any) => void;
  error: string;
  isLoading: boolean;
}

const Register: React.FC<RegisterProps> = ({ onSubmit, error, isLoading }) => {

  const {
    values,
    errors,
    isValid,
    onChange,
  } = useFormWithValidation();

  const handleSubmit = () => onSubmit(values);

  return (
    <AuthPage
      type='register'
      title='Добро пожаловать!'
      isValid={isValid}
      onSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
    >
      <FormInput
        value={values.name}
        error={errors.name}
        onChange={onChange}
        variant='max'
        name='name'
        title='Имя'
        type='text'
        required
        minLength={3}
      />
      <FormInput
        value={values.email}
        error={errors.email}
        onChange={onChange}
        variant='max'
        name='email'
        title='E-mail'
        type='email'
        pattern={EMAIL_PATTERN}
        required
      />
      <FormInput
        value={values.password}
        error={errors.password}
        onChange={onChange}
        variant='max'
        name='password'
        title='Пароль'
        type='password'
        minLength={6}
        required
      />
    </AuthPage>
  );
}

export default Register;