export const getDeviceSize = (): "desktop" | "tablet" | "mobile" => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1920;
  
    if (width > 1024) return "desktop";
    if (width > 768) return "tablet";
    return "mobile";
  };
  