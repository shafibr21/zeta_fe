import React from "react";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Avatar: React.FC<AvatarProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const AvatarImage: React.FC<AvatarImageProps> = ({
  src,
  alt = "",
  className = "",
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);

  if (imageError || !src) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`aspect-square h-full w-full object-cover ${className}`}
      onError={() => setImageError(true)}
      {...props}
    />
  );
};

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
