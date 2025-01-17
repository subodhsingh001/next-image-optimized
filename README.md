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

