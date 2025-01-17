import { getDeviceSize } from './breakpoints'; // Reuse the device size utility

export const optimizeImage = (
  src: string,
  quality: number,
  width?: number | string,
  height?: number | string,
  aspectRatio?: number
): string => {
  const deviceSize = getDeviceSize() || "desktop";
  const defaultSizes = { desktop: 1920, tablet: 1024, mobile: 768 };
  const defaultWidth = defaultSizes[deviceSize];

  // Use provided width/height or calculate height from aspect ratio
  const finalWidth =
    typeof width === "number" && !isNaN(width) ? width : defaultWidth;

  const finalHeight =
    typeof height === "number" && !isNaN(height)
      ? height
      : aspectRatio && typeof finalWidth === "number"
      ? Math.round(finalWidth / aspectRatio)
      : undefined;

  // Build query parameters for the image URL
  let query = `?q=${quality}&format=webp`;

  // Only add width/height if they are valid numbers
  if (typeof finalWidth === "number" && !isNaN(finalWidth)) query += `&w=${finalWidth}`;
  if (typeof finalHeight === "number" && !isNaN(finalHeight)) query += `&h=${finalHeight}`;

  // If the image is local, return the source directly
  if (!src.startsWith("http")) {
    return src;
  }

  return `${src}${query}`;
};
