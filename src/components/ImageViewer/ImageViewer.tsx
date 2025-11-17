import { useState } from "react";

interface ImageViewerProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageViewer = ({ src, alt, className = "" }: ImageViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={openModal}
        className={`cursor-pointer ${className}`}
      />

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-0 top-0 hover:bg-primary hover:text-white"
              onClick={closeModal}
            >
              ✕
            </button>
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-contain p-2"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageViewer;
