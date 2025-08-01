// utils/cloudinaryLoader.ts
const cloudinaryLoader = ({ src, width, quality }: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const q = quality || 75;

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_${width}/${src}`;
};

export default cloudinaryLoader;
