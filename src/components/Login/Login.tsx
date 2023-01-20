import React from 'react';
import "./Login.css";
import useFormWithValidation from "../../utils/hooks/useFormWithValidation";
import {EMAIL_PATTERN} from "../../utils/constants";
import AuthPage from "../AuthPage/AuthPage";
import FormInput from "../FormInput/FormInput";

interface LoginProps {
  onSubmit: (values: any) => void;
  error: string;
  isLoading: boolean;
}

const Login: React.FC<LoginProps> = ({onSubmit, error, isLoading}) => {
  const {
    values,
    errors,
    isValid,
    onChange,
  } = useFormWithValidation();

  const handleSubmit = () => onSubmit(values);

  return (
    <AuthPage
      type='login'
      title='Рады видеть!'
      onSubmit={handleSubmit}
      isValid={isValid}
      error={error}
      isLoading={isLoading}
    >
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
};

export default Login;