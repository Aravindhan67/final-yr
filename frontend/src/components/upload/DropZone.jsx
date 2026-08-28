import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { RiUploadCloud2Fill, RiFileWarningFill, RiShieldFlashFill } from 'react-icons/ri';
import { HiX } from 'react-icons/hi';

const MAX_SIZE_MB = 200;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

/**
 * DropZone — Drag & drop APK upload area.
 * Props:
 *   onFileSelected(file)  — called when a valid APK is chosen
 *   disabled              — locks the zone while uploading
 */
const DropZone = ({ onFileSelected, disabled }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError]               = useState('');

  const handleFile = (file) => {
    setError('');

    // Validate extension
    if (!file.name.toLowerCase().endsWith('.apk')) {
      setError('Invalid file type. Please upload a valid Android APK file (.apk).');
      return;
    }

    // Validate size
    if (file.size > MAX_SIZE_BYTES) {
      setError(`File too large. Maximum allowed size is ${MAX_SIZE_MB} MB. Your file is ${(file.size / (1024 * 1024)).toFixed(1)} MB.`);
      return;
    }

    setSelectedFile(file);
    onFileSelected(file);
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError(`Invalid file. Please upload an APK file under ${MAX_SIZE_MB} MB.`);
      return;
    }
    if (acceptedFiles.length > 0) handleFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept:   { 'application/vnd.android.package-archive': ['.apk'] },
    maxSize:  MAX_SIZE_BYTES,
    maxFiles: 1,
    disabled,
    noClick:  false,
  });

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setError('');
    onFileSelected(null);
  };

  // Format file size
  const formatSize = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Border and background based on state
  const getBorderColor = () => {
    if (isDragReject || error) return 'rgba(239,68,68,0.5)';
    if (isDragActive)          return 'rgba(37,99,235,0.8)';
    if (selectedFile)          return 'rgba(34,197,94,0.5)';
    return 'rgba(37,99,235,0.25)';
  };

  const getBg = () => {
    if (isDragReject || error) return 'rgba(239,68,68,0.05)';
    if (isDragActive)          return 'rgba(37,99,235,0.08)';
    if (selectedFile)          return 'rgba(34,197,94,0.04)';
    return 'rgba(37,99,235,0.03)';
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className="relative w-full rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer"
        style={{ borderColor: getBorderColor(), background: getBg() }}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center gap-5 py-16 px-6 text-center">

          {/* Icon */}
          <motion.div
            animate={isDragActive ? { scale: 1.15 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: selectedFile
                ? 'rgba(34,197,94,0.1)'
                : isDragActive
                  ? 'rgba(37,99,235,0.15)'
                  : 'rgba(37,99,235,0.08)',
            }}
          >
            {selectedFile
              ? <RiShieldFlashFill size={40} className="text-[#22C55E]" />
              : <RiUploadCloud2Fill size={40} className={isDragActive ? 'text-[#2563EB]' : 'text-gray-500'} />
            }
          </motion.div>

          {/* Text */}
          <AnimatePresence mode="wait">
            {selectedFile ? (
              <motion.div
                key="selected"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col items-center gap-2"
              >
                <p className="text-[#22C55E] font-bold text-lg font-heading">File Selected</p>
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                     style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <span className="text-foreground font-mono text-sm truncate max-w-xs">{selectedFile.name}</span>
                  <span className="text-gray-500 text-xs flex-shrink-0">{formatSize(selectedFile.size)}</span>
                  <button
                    onClick={removeFile}
                    className="text-gray-500 hover:text-[#EF4444] transition-colors flex-shrink-0"
                    aria-label="Remove file"
                  >
                    <HiX size={16} />
                  </button>
                </div>
                <p className="text-gray-500 text-sm">Click <strong className="text-foreground">Analyze</strong> below to start scanning</p>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col items-center gap-2"
              >
                <p className="text-foreground font-bold text-xl font-heading">
                  {isDragActive ? 'Drop your APK here' : 'Drag & Drop your APK'}
                </p>
                <p className="text-gray-500 text-sm">
                  or{' '}
                  <span className="text-[#2563EB] underline underline-offset-2 font-semibold">
                    browse files
                  </span>
                </p>
                <p className="text-gray-600 text-xs mt-1">Accepts .apk files · Max 200 MB</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 mt-3 px-4 py-2.5 rounded-xl text-sm text-[#EF4444]"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
          >
            <RiFileWarningFill size={16} className="flex-shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropZone;
