import { forwardRef } from 'react';

export const Textarea = forwardRef(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full px-4 py-3 rounded-lg border bg-white text-gray-800
            placeholder:text-gray-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-emas-soft-blue focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            resize-y min-h-[120px]
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-sm text-red-500 mt-1" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="text-sm text-gray-500 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
