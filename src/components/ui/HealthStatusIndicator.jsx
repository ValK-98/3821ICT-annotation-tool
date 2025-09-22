import React, { useEffect, useState } from "react";

export function HealthStatusIndicator({
  endpoint = "http://localhost:9090/health",
  interval = 5000,
}) {
  const [isHealthy, setIsHealthy] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(endpoint);
        setIsHealthy(res.ok);
      } catch (err) {
        setIsHealthy(false);
      }
    };

    checkHealth(); 
    const timer = setInterval(checkHealth, interval);

    return () => clearInterval(timer); 
  }, [endpoint, interval]);

  return (
    <div className="flex rounded-2xl p-6 flex-col items-start bg-muted gap-2">
      <h1 className="text-md">Emotion Backend</h1>
      <div className="flex items-center gap-2">
      <span
        className={`inline-block w-3 h-3 rounded-full ${
          isHealthy === null
            ? "bg-gray-400 animate-pulse"
            : isHealthy
            ? "bg-green-500 animate-pulse"
            : "bg-red-500"
        }`}
      />
      <span className="text-sm">
        {isHealthy === null
          ? "Checking..."
          : isHealthy
          ? "Backend is healthy"
          : "Backend is unreachable"}
      </span>
      </div>
      <div className="flex flex-col justify-end h-full">
      <span className="text-sm align-bottom text-muted-foreground">Powered by: Ultralytics, Pytorch, Flask</span>
      </div>
    </div>
  );
}