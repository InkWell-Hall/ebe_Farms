// SignatureCanvas.jsx
import React, { useRef, useEffect, useState } from "react";

const SignatureCanvas = ({ setSignature }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Adjust for high-DPI screens
    const scale = window.devicePixelRatio || 1;
    canvas.width = 270 * scale;
    canvas.height = 100 * scale;
    canvas.style.width = "270px";
    canvas.style.height = "100px";
    context.scale(scale, scale);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.lineJoin = "round";
    context.lineCap = "round";
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(getX(e), getY(e));
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineTo(getX(e), getY(e));
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    setSignature(dataUrl); // Set the image base64 string in parent
  };

  const getX = (e) =>
    e.nativeEvent.offsetX || e.nativeEvent.touches?.[0]?.clientX;
  const getY = (e) =>
    e.nativeEvent.offsetY || e.nativeEvent.touches?.[0]?.clientY;

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(""); // Clear signature
  };

  return (
    <div className="space-y-4 flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        className="bg-white border border-gray-300"
        width={600}
        height={100}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      ></canvas>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={clearCanvas}
          className="px-4 mb-3 py-1 bg-red-500 text-white text-sm rounded"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SignatureCanvas;
