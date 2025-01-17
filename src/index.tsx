import Image, { ImageProps } from "next/image";
import { getDeviceSize } from "./utils/breakpoints";
import { optimizeImage } from "./utils/optimizeImage";
import React from "react";

interface NextImageOptimizedProps extends ImageProps {
  quality?: number; // Quality of the image (1-100)
  deviceSizes?: { desktop: number; tablet: number; mobile: number }; // Custom sizes
  aspectRatio?: number; // Maintain aspect ratio (e.g., 16/9)
  className?: string; // Additional CSS classes
  style?: React.CSSProperties; // Inline styles
  debug?: boolean; // Debugging mode
}

const NextImageOptimized: React.FC<NextImageOptimizedProps> = ({
  quality = 75,
  deviceSizes = { desktop: 1920, tablet: 1024, mobile: 768 },
  aspectRatio,
  className,
  style,
  debug = false,
  ...props
}) => {
  const deviceSize = getDeviceSize() || "desktop"; // Default to 'desktop'
  const validAspectRatio = aspectRatio && aspectRatio > 0 ? aspectRatio : undefined;

  // Determine width and height
  let width = props?.width || deviceSizes[deviceSize];
  let height =
    props?.height ||
    (validAspectRatio && typeof width === "number"
      ? Math.round((width as number) / validAspectRatio)
      : undefined);

  // Handle missing dimensions
  if (!width || !height) {
    width = 800; // Default fallback width
    height = 450; // Default fallback height
  }

  // Check for percentage-based dimensions
  const isPercentageWidth = typeof width === "string" && width.includes("%");
  const isPercentageHeight = typeof height === "string" && height.includes("%");

  // Determine if fill or responsive should be used
  const isFill = isPercentageWidth || isPercentageHeight;
  const layout = isFill ? "fill" : "responsive";

  // Optimize image source
  const optimizedSrc = optimizeImage(
    props?.src as string,
    quality,
    !isFill && typeof width === "number" ? width : undefined,
    !isFill && typeof height === "number" ? height : undefined,
    validAspectRatio
  );

  if (process.env.NODE_ENV !== "production" && debug) {
    console.log({
      optimizedSrc,
      deviceSize,
      width,
      height,
      validAspectRatio,
      isFill,
      layout,
    });
  }

  // Remove width/height from props if fill is true
  const { width: propWidth, height: propHeight, ...cleanedProps } = props;

  return (
    <div
      className={className}
      style={{
        ...(isPercentageWidth ? { width } : {}),
        ...(isPercentageHeight ? { height } : {}),
        ...(validAspectRatio && typeof width === "number"
          ? { height: `${(width / validAspectRatio).toFixed(2)}px` }
          : {}),
        ...style, // Allow user-defined styles to override defaults
      }}
    >
      <Image
        {...cleanedProps} // Spread cleaned props without width/height
        src={optimizedSrc}
        layout={layout}
        objectFit="cover"
        quality={quality}
        {...(!isFill && {
          width: typeof width === "number" ? width : undefined,
          height: typeof height === "number" ? height : undefined,
        })}
      />
    </div>
  );
};

export default NextImageOptimized;
