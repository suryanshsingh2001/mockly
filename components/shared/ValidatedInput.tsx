import { Input } from '@/components/ui/input';
import React, { useRef, useState } from 'react';

type Props = {
    onSuccess: (value:number) => void;
    value:number;
    className?:string;
    placeholder:string;
    setError: (errorMsg:string) => void;
}

const MIN_VALUE = 200;
const MAX_VALUE = 2000;

export const ValidatedInput = ({
    onSuccess, 
    value : initialValue, 
    placeholder, 
    setError, 
    className = ''
}:Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(`${initialValue}`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError('');
  };

  const validateInput = () => {
    const numericValue = Number(value);
    if (numericValue < MIN_VALUE) {
        setError(`Value must be greater than ${MIN_VALUE}.`);
        return false;
    }
    if (numericValue > MAX_VALUE) {
        setError(`Value must be less than ${MAX_VALUE}.`);
        return false;
    }
    return true;
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!validateInput()) {
      e.preventDefault();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      
      if (!validateInput()) {
        e.preventDefault();
      } else {
        setError('');
        onSuccess(Number(value))
      }
    }
  };

  return (
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        placeholder={placeholder}
        className={className}
      />

  );
};

export default ValidatedInput;
