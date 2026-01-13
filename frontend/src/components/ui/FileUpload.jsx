import { useRef, useState, useCallback } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';

const ALLOWED_EXTENSIONS = ['pdf', 'dwg', 'dxf', 'step', 'stp', 'png', 'jpg', 'jpeg'];
const DEFAULT_MAX_SIZE = 20; // MB

export const FileUpload = ({
  label = 'Attach File',
  accept = '.pdf,.dwg,.dxf,.step,.stp,.png,.jpg,.jpeg',
  maxSize = DEFAULT_MAX_SIZE,
  onFileSelect,
  error,
  helperText,
}) => {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [localError, setLocalError] = useState('');

  const validateFile = useCallback((file) => {
    // Check file extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
      return `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ').toUpperCase()}`;
    }

    // Check file size
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSize) {
      return `File too large. Maximum size: ${maxSize}MB`;
    }

    return null;
  }, [maxSize]);

  const handleFile = useCallback((file) => {
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setLocalError(validationError);
        setSelectedFile(null);
        onFileSelect(null);
        return;
      }
    }
    setLocalError('');
    setSelectedFile(file);
    onFileSelect(file);
  }, [validateFile, onFileSelect]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const clearFile = useCallback(() => {
    setSelectedFile(null);
    setLocalError('');
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [onFileSelect]);

  const displayError = error || localError;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6
          transition-all duration-200
          ${dragActive ? 'border-emas-soft-blue bg-emas-light-bg' : 'border-gray-200'}
          ${displayError ? 'border-red-500' : ''}
          ${selectedFile ? 'bg-emas-light-bg' : 'hover:border-emas-soft-blue hover:bg-gray-50'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="File upload"
        />

        {selectedFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emas-soft-blue/10 rounded-lg">
                <FileText className="w-6 h-6 text-emas-soft-blue" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                clearFile();
              }}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium text-emas-soft-blue">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              PDF, DWG, DXF, STEP, PNG, JPG (max {maxSize}MB)
            </p>
          </div>
        )}
      </div>

      {displayError && (
        <div className="flex items-center gap-1.5 mt-2 text-red-500">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm">{displayError}</p>
        </div>
      )}

      {helperText && !displayError && (
        <p className="text-sm text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default FileUpload;
