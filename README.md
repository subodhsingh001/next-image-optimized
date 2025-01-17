# NextImageOptimized

`NextImageOptimized` is a React component that extends the Next.js `<Image>` component with additional features like adaptive sizing, aspect ratio, and optimized image URLs.

---

## 🚀 Features
- 📐 **Adaptive Sizing**: Automatically adjusts image dimensions based on the device (desktop, tablet, mobile).
- 🎨 **Aspect Ratio**: Maintain a consistent aspect ratio with ease.
- ⚡ **Optimized URLs**: Enhance image performance by appending quality and format parameters to the image source.
- 📱 **Responsive by Design**: Tailored for desktop, tablet, and mobile views.
- 🔧 **Customizable**: Fine-tune quality, device sizes, and aspect ratio via props.

---

## 📦 Installation

Install the package via npm or yarn:

```bash
# Using npm
npm install next-image-optimized

# Using yarn
yarn add next-image-optimized


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
    />
  </div>
);

export default App;


##  🎨 Customization Examples
1. Using Aspect Ratio
Maintain a consistent aspect ratio:

<NextImageOptimized
  src="/example.jpg"
  alt="Example Image"
  aspectRatio={4 / 3}
/>

2. Custom Device Sizes
Define custom breakpoints for desktop, tablet, and mobile:

<NextImageOptimized
  src="/example.jpg"
  alt="Example Image"
  deviceSizes={{ desktop: 1600, tablet: 768, mobile: 480 }}
/>
3. Dynamic Width and Height
Directly set width and height for precise control:

<NextImageOptimized
  src="/example.jpg"
  alt="Example Image"
  width={800}
  height={600}
/>

