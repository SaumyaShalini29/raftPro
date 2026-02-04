'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface CoverImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = '/covers/placeholder.svg';

export default function CoverImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  ...props
}: CoverImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
