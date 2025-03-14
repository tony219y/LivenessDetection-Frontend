import { useRef, useEffect, useState } from "react";

interface FaceRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const RealtimeCam: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [result, setResult] = useState<string>("Waiting...");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [faces, setFaces] = useState<FaceRect[]>([]);

  useEffect(() => {
    // เปิดกล้องเมื่อ Component โหลด
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  }, []);

  // แสดงภาพจากกล้องและวาดกรอบใบหน้า
  useEffect(() => {
    const renderFrame = () => {
      if (!videoRef.current || !displayCanvasRef.current) return;
      
      const video = videoRef.current;
      const canvas = displayCanvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      // ตั้งขนาด canvas ให้เท่ากับ video
      if (video.videoWidth > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }
      
      // วาดภาพจากกล้องลงใน canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // วาดกรอบรอบใบหน้า
      if (faces.length > 0) {
        ctx.strokeStyle = '#00ff00'; // สีเขียว
        ctx.lineWidth = 3;
        
        faces.forEach(face => {
          ctx.strokeRect(face.x, face.y, face.width, face.height);
        });
      }
      
      // วนรับภาพ
      requestAnimationFrame(renderFrame);
    };
    
    renderFrame();
  }, [faces]);

  // ฟังก์ชันสำหรับตรวจจับใบหน้า
  useEffect(() => {
    let frameTimer: number | null = null;
    
    if (isRunning) {
      console.log("Detection started, capturing frame...");
      
      const captureAndProcess = async () => {
        if (!canvasRef.current || !videoRef.current) {
          console.log("Cannot capture: missing refs");
          return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        // กำหนดขนาดของ canvas ให้เท่ากับ video
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        // วาดภาพจากกล้องลงใน canvas
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // แปลงเป็น Blob แล้วส่งไป Backend
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const formData = new FormData();
          formData.append("file", blob, "frame.jpg");

          try {
            console.log("Sending frame to API...");
            const response = await fetch("http://localhost:8000/api/detect", {
              method: "POST",
              body: formData,
            });

            const data = await response.json();
            setResult(data.face_detected ? `Face Detected (${data.faces.length}) ✅` : "No Face ❌");
            
            // อัพเดทตำแหน่งใบหน้า
            setFaces(data.faces || []);
          } catch (error) {
            console.error("Error:", error);
            setResult("Error detecting face ❌");
            setFaces([]);
          }

          // ยังคงทำงานต่อเมื่อ isRunning ยังเป็น true
          if (isRunning) {
            frameTimer = window.setTimeout(captureAndProcess, 500); // ปรับเป็น 500ms เพื่อการตอบสนองที่ดีขึ้น
          }
        }, "image/jpeg");
      };
      
      // เริ่มกระบวนการทันที
      captureAndProcess();
      
      // Cleanup function เมื่อ component unmount หรือ isRunning เปลี่ยน
      return () => {
        if (frameTimer) {
          window.clearTimeout(frameTimer);
        }
        setFaces([]); // ล้างกรอบใบหน้าเมื่อหยุดการทำงาน
      };
    }
  }, [isRunning]);

  const handleStart = () => {
    console.log("starting");
    setIsRunning(true);
  };

  const handleStop = () => {
    console.log("stopping");
    setIsRunning(false);
    setResult("Stopped ⏹️");
  };
  
  const testAPI = async () => {
    const res = await fetch("http://localhost:8000/api/test", {
      method: "GET"
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center p-4 text-white">
      <div className="relative">
        <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }} />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <canvas ref={displayCanvasRef} className="rounded-lg shadow-md" />
      </div>
      <div className="mt-4 flex gap-4">
        <button onClick={handleStart} className="p-3 bg-green-500 rounded-lg hover:bg-green-400" disabled={isRunning}>
          Start Detection
        </button>
        <button onClick={handleStop} className="p-3 bg-red-500 rounded-lg hover:bg-red-400" disabled={!isRunning}>
          Stop
        </button>
        <button onClick={testAPI} className="p-3 bg-blue-500 rounded-lg hover:bg-blue-400">
          Test API
        </button>
      </div>
      <p className="mt-2 text-lg font-semibold">{result}</p>
    </div>
  );
};

export default RealtimeCam;