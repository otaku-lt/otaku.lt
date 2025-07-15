import React from 'react';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';

interface LogoProps extends Omit<ImageProps, 'src' | 'alt'> {
  withText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  withText = false,
  size = 'md',
  href = '/',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const logo = (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Image
          src="/otaku_lt.png"
          alt="Otaku.lt Logo"
          width={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
          height={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
          className={`${sizeClasses[size]} transition-transform group-hover:scale-105`}
          style={{
            filter: 'var(--tw-invert, none)'
          }}
          {...props}
        />
      </div>
      {withText && (
        <span className={`${textSizes[size]} font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`}>
          otaku.lt
        </span>
      )}
    </div>
  );

  return href ? (
    <Link href={href} className="group">
      {logo}
    </Link>
  ) : (
    <div className="group">
      {logo}
    </div>
  );
};
