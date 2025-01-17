import Image, { ImageProps } from "next/image";
import { getDeviceSize } from "./utils/breakpoints";
import { optimizeImage } from "./utils/optimizeImage";
import * as React from "react";

interface NextImageOptimizedProps extends ImageProps {
  quality?: number; // Quality of the image (1-100)
  deviceSizes?: { desktop: number; tablet: number; mobile: number }; // Custom sizes
  aspectRatio?: number; // Maintain aspect ratio (e.g., 16/9)
}

const NextImageOptimized: React.FC<NextImageOptimizedProps> = ({
  quality = 75,
  deviceSizes = { desktop: 1920, tablet: 1024, mobile: 768 },
  aspectRatio,
  ...props
}) => {
  const deviceSize = getDeviceSize(); // Determine device size (desktop, tablet, mobile)

  // Compute width and height if aspectRatio is provided
  let width = (props as ImageProps)?.width || deviceSizes[deviceSize];
  let height =
    (props as ImageProps)?.height || (aspectRatio ? (width as number) / aspectRatio : undefined);

  // Optimize the image URL
  const optimizedSrc = optimizeImage(props?.src as string, quality);

  return (
    <Image
      {...props}
      src={optimizedSrc}
      width={width}
      height={height}
      quality={quality}
    />
  );
};

export default NextImageOptimized;
