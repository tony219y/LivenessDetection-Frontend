import { useRef, useState } from "react";
import Webcam from "react-webcam";

const RealtimeLiveness: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const isRunningRef = useRef<boolean>(false); // ใช้ useRef แทน useState
  const [result, setResult] = useState<string>("Waiting...");

  const captureFrame = async () => {
    if (!webcamRef.current || !isRunningRef.current) {
      console.log("Webcam not ready or stopped");
      return;
    }

    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        console.log("Failed to capture screenshot");
        return;
      }

      const blob = await fetch(imageSrc).then((res) => res.blob());
      const formData = new FormData();
      formData.append("file", blob, "image.jpg");

      console.log("Sending frame to API...");
      const response = await fetch("https://api-liveness.tony219y.com/liveness", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data.is_real ? "✅ Real Face" : "❌ Fake Face");

      if (isRunningRef.current) {
        setTimeout(captureFrame, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Error detecting liveness ❌");

      if (isRunningRef.current) {
        setTimeout(captureFrame, 6000); // Retry after 5 seconds
        // requestAnimationFrame(captureFrame);
      }
    }
  };

  const handleStart = () => {
    console.log("Starting...");
    isRunningRef.current = true;
    captureFrame();
  };

  const handleStop = () => {
    console.log("Stopping...");
    isRunningRef.current = false;
    setResult("Stopped ⏹️");
  };

  return (
    <div className="flex flex-col items-center p-4 text-white">
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="rounded-lg shadow-md" mirrored />
      <div className="mt-4 flex gap-4">
        <button onClick={handleStart} className="p-3 bg-green-500 rounded-lg hover:bg-green-400" disabled={isRunningRef.current}>
          Start
        </button>
        <button onClick={handleStop} className="p-3 bg-red-500 rounded-lg hover:bg-red-400" disabled={!isRunningRef.current}>
          Stop
        </button>
      </div>
      <p className="mt-2 text-lg font-semibold">Liveness Result: {result}</p>
    </div>
  );
};

export default RealtimeLiveness;
