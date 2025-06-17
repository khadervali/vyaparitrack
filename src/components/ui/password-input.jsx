import React, { useState, useEffect } from 'react';
import { Input } from './input';
import { Label } from './label';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { validatePassword, getPasswordStrength, PASSWORD_RULES_DESCRIPTION } from '@/lib/utils/passwordValidation';
import { cn } from '@/lib/utils';

const PasswordInput = ({
  id,
  label,
  value,
  onChange,
  onValidationChange,
  showRules = true,
  showStrength = true,
  className,
  confirmPassword,
  isConfirmPassword = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [matchError, setMatchError] = useState('');

  useEffect(() => {
    if (isConfirmPassword && confirmPassword) {
      if (value !== confirmPassword) {
        setMatchError('Passwords do not match');
      } else {
        setMatchError('');
      }
    }
  }, [value, confirmPassword, isConfirmPassword]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(e);

    if (onValidationChange) {
      const validation = validatePassword(newValue);
      onValidationChange({
        ...validation,
        matchError: isConfirmPassword && confirmPassword ? newValue !== confirmPassword : false
      });
    }
  };

  const strength = getPasswordStrength(value);
  const validation = validatePassword(value);

  const getStrengthColor = (level) => {
    switch (level) {
      case 'strong': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      case 'weak': return 'bg-red-500';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'pr-10',
            validation.isValid && !matchError ? 'border-green-500' : 'border-red-500',
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {isConfirmPassword && confirmPassword && (
        <div className="flex items-center gap-2 text-sm">
          {value === confirmPassword ? (
            <>
              <CheckCircle2 size={14} className="text-green-500" />
              <span className="text-green-500">Passwords match</span>
            </>
          ) : (
            <>
              <AlertCircle size={14} className="text-red-500" />
              <span className="text-red-500">{matchError}</span>
            </>
          )}
        </div>
      )}

      {showStrength && value && !isConfirmPassword && (
        <div className="space-y-1">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={cn('h-full transition-all duration-300', getStrengthColor(strength.level))}
              style={{ width: `${strength.percentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">
            Password strength: <span className="capitalize">{strength.level}</span>
          </p>
        </div>
      )}

      {showRules && (isFocused || value) && !isConfirmPassword && (
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">Password requirements:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            {PASSWORD_RULES_DESCRIPTION.map((rule, index) => {
              const isMet = validation.errors.every(error => !error.includes(rule));
              return (
                <li key={index} className="flex items-center gap-2">
                  {isMet ? (
                    <span className="text-green-500">✓</span>
                  ) : (
                    <AlertCircle size={14} className="text-red-500" />
                  )}
                  {rule}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export { PasswordInput }; 