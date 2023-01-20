import './ButtonSubmit.css';
import React, {ReactNode} from "react";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode;
}

const SubmitButton:React.FC<SubmitButtonProps> = ({ children, ...props }) => {
  return <button className='submit-button' type='submit' {...props}>{children}</button>
}

export default SubmitButton;