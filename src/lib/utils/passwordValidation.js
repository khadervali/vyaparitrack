export const PASSWORD_RULES = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
};

export const PASSWORD_RULES_DESCRIPTION = [
  `At least ${PASSWORD_RULES.minLength} characters long`,
  'Contains at least one uppercase letter',
  'Contains at least one lowercase letter',
  'Contains at least one number',
  'Contains at least one special character (!@#$%^&*)',
];

export const validatePassword = (password) => {
  const errors = [];

  if (password.length < PASSWORD_RULES.minLength) {
    errors.push(`Password must be at least ${PASSWORD_RULES.minLength} characters long`);
  }

  if (PASSWORD_RULES.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (PASSWORD_RULES.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (PASSWORD_RULES.requireNumber && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (PASSWORD_RULES.requireSpecialChar && !/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const getPasswordStrength = (password) => {
  let strength = 0;
  
  // Length check
  if (password.length >= PASSWORD_RULES.minLength) strength += 1;
  
  // Character type checks
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[!@#$%^&*]/.test(password)) strength += 1;
  
  // Calculate percentage
  const percentage = (strength / 5) * 100;
  
  // Determine strength level
  if (percentage >= 80) return { level: 'strong', percentage };
  if (percentage >= 60) return { level: 'good', percentage };
  if (percentage >= 40) return { level: 'fair', percentage };
  return { level: 'weak', percentage };
}; 