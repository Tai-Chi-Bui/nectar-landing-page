import React from 'react';

interface ImageModalProps {
  children: React.ReactNode;
  isShow: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ children, isShow, onClose }) => {
  return (
    <>
      {/* Always render the children */}
      {children}

      {/* Render the modal when isShow is true */}
      {isShow && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            onClick={onClose}
            aria-hidden="true"
          ></div>

          {/* Modal Content */}
          <div
            className="relative bg-white rounded-lg shadow-lg max-w-lg h-[80vh] w-full z-10"
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
