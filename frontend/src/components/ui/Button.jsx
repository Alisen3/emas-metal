import { Loader2 } from 'lucide-react';

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-emas-cta-blue text-white hover:bg-emas-deep-blue hover:shadow-lg hover:-translate-y-0.5 focus:ring-emas-soft-blue disabled:hover:translate-y-0',
    secondary: 'bg-transparent text-emas-deep-blue border-2 border-emas-deep-blue hover:bg-emas-deep-blue hover:text-white hover:shadow-lg focus:ring-emas-soft-blue',
    text: 'text-emas-soft-blue hover:text-emas-deep-blue focus:ring-0 focus:underline',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-md gap-1.5',
    md: 'px-6 py-3 text-base rounded-lg gap-2',
    lg: 'px-8 py-4 text-lg rounded-lg gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export const PrimaryButton = (props) => (
  <Button variant="primary" {...props} />
);

export const SecondaryButton = (props) => (
  <Button variant="secondary" {...props} />
);

export const TextButton = (props) => (
  <Button variant="text" {...props} />
);

export default Button;
