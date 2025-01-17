# NextImageOptimized

NextImageOptimized is a powerful React component built on top of Next.js's Image component. It adds advanced features like device-based responsive sizing, aspect ratio handling, percentage-based dimensions, and URL-based image optimization. Perfect for building highly optimized and responsive applications.

---

## 🚀 Features

- 📐 **Adaptive Sizing**: Automatically adjusts image dimensions for desktop, tablet, and mobile using breakpoints.
- 🎨 **Aspect Ratio**: Easily maintain consistent aspect ratios without manual calculations.
- ⚡ **Dynamic URL Optimization**: Appends quality, width, height, and format parameters to optimize images dynamically.
- 📱 **Responsive by Design**: Supports percentage-based width and height for fluid layouts.
- 🔧 **Customizable**: Accepts className and style for easy customization.

---

## 📦 Installation

Install the package via npm or yarn:

```bash
# Using npm
npm install next-image-optimized

# Using yarn
yarn add next-image-optimized



## 🚀 Enhancements Over Next.js Image

- 1. Automatic Device-Based Sizing
- Automatically adjusts image dimensions for desktop, tablet, and mobile using custom breakpoints.
- Eliminates the need for manually defining the sizes attribute for responsive designs.

  <NextImageOptimized
    src="/example.jpg"
    alt="Responsive Image"
    deviceSizes={{ desktop: 1920, tablet: 1024, mobile: 768 }}
  />


## 🔥 Quick Start
- Here's how to get started with NextImageOptimized:

import React from "react";
import NextImageOptimized from "next-image-optimized";

const App = () => (
  <div>
    <h1>NextImageOptimized Demo</h1>
    <NextImageOptimized
      src="/example.jpg"
      alt="Example Image"
      aspectRatio={16 / 9}
      quality={80}
      width="100%" // Responsive width
    />
  </div>
);

export default App;





##  🎨 Customization Examples

1. Default Responsive Image
  <NextImageOptimized
    src="/example.jpg"
    alt="Responsive Image"
    quality={80}
  />

2. Using Aspect Ratio
Maintain a consistent aspect ratio:

<NextImageOptimized
  src="/example.jpg"
  alt="Aspect Ratio Example"
  aspectRatio={16 / 9}
  width="100%"
/>

3. Percentage Dimensions
  <NextImageOptimized
    src="/example.jpg"
    alt="Percentage Example"
    width="50%"
    height="auto"
  />

4. Dynamic Width and Height
  <NextImageOptimized
    src="/example.jpg"
    alt="Styled Image"
    className="custom-class"
    style={{ border: "2px solid #ccc", borderRadius: "8px" }}
  />

```
