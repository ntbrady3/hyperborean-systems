import { useState, useEffect } from 'react';

export const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (replace with actual loading logic, e.g., asset preloading)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust based on your loading time
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-foreground font-electrolize">Loading...</p>
      </div>
    </div>
  );
};