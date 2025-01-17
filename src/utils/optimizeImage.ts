import { getDeviceSize } from './breakpoints'; // Reuse the device size utility

export const optimizeImage = (
  src: string,
  quality: number,
  aspectRatio: number = 16 / 9
): string => {
  const deviceSize = getDeviceSize();
  const sizes = { desktop: 1920, tablet: 1024, mobile: 768 };
  const width = sizes[deviceSize];
  const height = width / aspectRatio;

  if (src.startsWith("http")) {
    return `${src}?w=${width}&h=${height}&q=${quality}&format=webp`;
  }
  return src;
};
