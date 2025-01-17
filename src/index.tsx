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
    (validAspectRatio ? (width as number) / validAspectRatio : undefined);

  // Check for percentage-based dimensions
  const isPercentageWidth = typeof width === "string" && width.includes("%");
  const isPercentageHeight = typeof height === "string" && height.includes("%");

  // Adjust layout based on dimension type
  const layout =
    isPercentageWidth || isPercentageHeight ? "fill" : "intrinsic";

  // Handle local or remote image optimization
  const optimizedSrc = optimizeImage(
    props?.src as string,
    quality,
    !isPercentageWidth ? width : undefined,
    !isPercentageHeight ? height : undefined,
    validAspectRatio
  );

  if (process.env.NODE_ENV !== "production" && debug) {
    console.log({
      optimizedSrc,
      deviceSize,
      width,
      height,
      validAspectRatio,
      layout,
    });
  }

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: isPercentageWidth ? width : `${width}px`,
        height: isPercentageHeight
          ? height
          : validAspectRatio
          ? `${(Number(width) / validAspectRatio).toFixed(2)}px`
          : `${height}px`,
        ...style,
      }}
    >
      <Image
        {...props}
        src={optimizedSrc}
        layout={layout}
        objectFit="cover"
        quality={quality}
        sizes={
          layout === "fill"
            ? undefined
            : `${deviceSizes.mobile}px, ${deviceSizes.tablet}px, ${deviceSizes.desktop}px`
        }
      />
    </div>
  );
};

export default NextImageOptimized;
