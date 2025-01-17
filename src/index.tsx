import Image, { ImageProps } from "next/image";
import { getDeviceSize } from "./utils/breakpoints";
import { optimizeImage } from "./utils/optimizeImage";
import * as React from "react";

interface NextImageOptimizedProps extends ImageProps {
  quality?: number; // Quality of the image (1-100)
  deviceSizes?: { desktop: number; tablet: number; mobile: number }; // Custom sizes
  aspectRatio?: number; // Maintain aspect ratio (e.g., 16/9)
  className?: string; // Additional CSS classes
  style?: React.CSSProperties; // Inline styles
}

const NextImageOptimized: React.FC<NextImageOptimizedProps> = ({
  quality = 75,
  deviceSizes = { desktop: 1920, tablet: 1024, mobile: 768 },
  aspectRatio,
  className,
  style,
  ...props
}) => {
  const deviceSize = getDeviceSize(); // Determine device size (desktop, tablet, mobile)

  // Determine width and height
  let width = props?.width || deviceSizes[deviceSize];
  let height = props?.height || (aspectRatio ? (width as number) / aspectRatio : undefined);

  // Check for percentage-based dimensions
  const isPercentageWidth = typeof width === "string" && width.includes("%");
  const isPercentageHeight = typeof height === "string" && height.includes("%");

   const optimizedSrc = optimizeImage(
    props?.src as string,
    quality,
    isPercentageWidth ? undefined : width, // Pass width if it's not a percentage
    isPercentageHeight ? undefined : height, // Pass height if it's not a percentage
    aspectRatio // Optional aspect ratio
  );


   return (
    <div
      className={className}
      style={{
        position: "relative",
        width: isPercentageWidth ? width : `${width}px`,
        height: isPercentageHeight
          ? height
          : aspectRatio
          ? `${(Number(width) / aspectRatio).toFixed(2)}px`
          : `${height}px`,
        ...style, // User-provided styles
      }}
    >
      <Image
        {...props}
        src={optimizedSrc}
        layout={isPercentageWidth || isPercentageHeight ? "fill" : "intrinsic"} // Handle percentage layout
        objectFit="cover" // Keep aspect ratio
        quality={quality}
      />
    </div>
  );
};

export default NextImageOptimized;
