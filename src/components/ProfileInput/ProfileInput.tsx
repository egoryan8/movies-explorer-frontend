import './ProfileInput.css';
import React from "react";

interface ProfileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string,
  name: string,
  variant: string,
  error: string,
  value: string,
}

const ProfileInput: React.FC<ProfileInputProps> =
  ({title, name, variant, error, value = '', ...props}) => {
  const profileInputClasses = `profile-input__input profile-input__input_variant_${variant}${error? `profile-input__input_variant_${variant}-with-error` : ''}`;
  return (
    <div className={`profile-input profile-input_variant_${variant}`}>
      <label className={`profile-input__title_variant_${variant}`} htmlFor={name}>
        {title}
      </label>
      <input
        className={profileInputClasses}
        id={name}
        name={name}
        value={value}
        {...props}
      />
      <span className={`profile-input__error-message profile-input__error-message_variant_${variant}`}>
        {error}
      </span>
    </div>
  )
}

export default ProfileInput;