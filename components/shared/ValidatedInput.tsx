import { Input } from '@/components/ui/input';
import React, { useRef } from 'react';
import { validateInput } from './utils';

type Props = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
    className?:string;
    placeholder:string;
    onSuccess: () => void;
    setError: (errorMsg: string) => void;
}

export default function ValidatedInput ({
    onSuccess, 
    value,
    setValue, 
    placeholder, 
    setError, 
    className = ''
}:Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    setError('');
    onSuccess()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError('');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
     const {success, errorMsg} = validateInput(value)
     if (!success) {
      setError(errorMsg)
      e.preventDefault();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
        handleSubmit()
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const {success, errorMsg} = validateInput(value)
      if (!success) {
        setError(errorMsg)
        e.preventDefault();
      } else {
        handleSubmit()
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

