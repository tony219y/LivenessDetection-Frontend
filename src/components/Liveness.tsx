import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const RealtimeLiveness: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const isRunningRef = useRef<boolean>(false); // ใช้ useRef แทน useState
  const [result, setResult] = useState<string>("Waiting...");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(true);
  }, []);

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
      const response = await fetch(
        "https://api-liveness.tony219y.com/liveness",
        {
          method: "POST",
          body: formData,
        }
      );

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
    <div className="relative flex flex-col w-full h-screen justify-center items-center p-4 text-white gap-4">
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-md bg-opacity-10 z-10 duration-500 max-md:p-10">
          <div className="flex flex-col w-[400px] bg-white p-4 gap-4 rounded-lg shadow-lg text-black">
            <h1 className="text-xl uppercase font-bold text-center">
              Warning ⚠️
            </h1>
            <p className="text-center text-gray-700">
              This website sends images via API every few seconds, which may
              slow down the server. Please help us maintain server performance
              by using it responsibly.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <h1>Liveness Detection</h1>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-lg shadow-md"
        mirrored
      />
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleStart}
          className="p-3 bg-green-500 rounded-lg hover:bg-green-400"
          disabled={isRunningRef.current}
        >
          Start
        </button>
        <button
          onClick={handleStop}
          className="p-3 bg-red-500 rounded-lg hover:bg-red-400"
          disabled={!isRunningRef.current}
        >
          Stop
        </button>
      </div>
      <p className="mt-2 text-lg font-semibold">Liveness Result: {result}</p>
    </div>
  );
};

export default RealtimeLiveness;
