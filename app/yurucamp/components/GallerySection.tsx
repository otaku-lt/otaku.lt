'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // This would typically be an API call in a real app
    const galleryImages = [
      { src: '/images/yurucamp/gallery/IMG_8371.JPG', alt: 'YuruCamp 2025', width: 1920, height: 1080 },
      { src: '/images/yurucamp/gallery/IMG_8372.JPG', alt: 'YuruCamp 2025', width: 1920, height: 1080 },
      { src: '/images/yurucamp/gallery/IMG_8373.JPG', alt: 'YuruCamp 2025', width: 1920, height: 1080 },
      { src: '/images/yurucamp/gallery/IMG_8374.JPG', alt: 'YuruCamp 2025', width: 1920, height: 1080 },
      { src: '/images/yurucamp/gallery/IMG_8375.JPG', alt: 'YuruCamp 2025', width: 1920, height: 1080 },
      { src: '/images/yurucamp/gallery/IMG_8377.JPG', alt: 'YuruCamp 2025', width: 1920, height: 1080 },
    ];
    
    setImages(galleryImages);
    setLoading(false);
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(prev => (prev === 0 ? images.length - 1 : (prev || 0) - 1));
    } else {
      setSelectedImage(prev => (prev === images.length - 1 ? 0 : (prev || 0) + 1));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedImage, images.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div 
            key={index}
            className="aspect-[4/3] relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={600}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              priority={index < 3} // Load first 3 images with priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white font-medium">View Photo {index + 1}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-green-400 transition-colors"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            className="absolute left-4 p-2 text-white hover:text-green-400 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>
          
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={images[selectedImage].width}
              height={images[selectedImage].height}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
              priority
            />
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            className="absolute right-4 p-2 text-white hover:text-green-400 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>
          
          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            Photo {selectedImage + 1} of {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
