import { getDeviceSize } from './breakpoints'; // Reuse the device size utility

export const optimizeImage = (
  src: string,
  quality: number,
  width?: number | string, // Optional width
  height?: number | string, // Optional height
  aspectRatio?: number // Optional aspect ratio
): string => {
  const deviceSize = getDeviceSize();
  const defaultSizes = { desktop: 1920, tablet: 1024, mobile: 768 };
  const defaultWidth = defaultSizes[deviceSize];

  // Use provided width/height or calculate height from aspect ratio
  const finalWidth = width ?? defaultWidth;
  const finalHeight =
    height ??
    (aspectRatio ? Math.round((Number(finalWidth) as number) / aspectRatio) : undefined);

  // Build query parameters for the image URL
  let query = `?q=${quality}&format=webp`;
  if (finalWidth && typeof finalWidth === 'number') query += `&w=${finalWidth}`;
  if (finalHeight && typeof finalHeight === 'number') query += `&h=${finalHeight}`;

  return src.startsWith("http") ? `${src}${query}` : src;
};
