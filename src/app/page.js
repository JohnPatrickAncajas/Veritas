"use client";
import { useState, useCallback } from "react";

const categories = ["Real", "AI", "2D", "3D"];
const colors = {
  Real: "from-green-400 to-teal-500",
  AI: "from-purple-400 to-pink-500",
  "2D": "from-yellow-400 to-orange-500",
  "3D": "from-blue-400 to-cyan-500",
};

export default function Home() {
  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // Replace with your actual Render backend URL
  const BACKEND_URL = "https://veritas-backend-h720.onrender.com/";

  const handleFile = useCallback(async (file) => {
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setSelected(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Prediction failed");

      const data = await res.json();
      const predictedLabel = categories[data.class_index] || "Unknown";

      setSelected(predictedLabel);
    } catch (err) {
      console.error(err);
      setSelected("Error");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => handleFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFile(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
        <div className="text-xl font-bold tracking-wide">Veritas</div>
        <div className="flex gap-8 text-sm sm:text-base font-medium">
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
            Detect
          </a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
            History
          </a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">
            Profile
          </a>
        </div>
      </nav>

      <main className="flex flex-1 px-4 py-8 gap-4">
        <div className="flex items-center justify-center">
          <div
            className={`w-8 h-[600px] rounded-full transition-all duration-500 ${
              selected
                ? `bg-gradient-to-b ${colors[selected]} shadow-[0_0_30px_5px_rgba(0,0,0,0.4)]`
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          ></div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="relative w-full max-w-md h-[500px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center overflow-hidden hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              disabled={loading}
              onChange={handleChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />

            {preview && !loading ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-contain"
              />
            ) : !preview && !loading ? (
              <p className="text-gray-500 dark:text-gray-400 text-center px-4">
                Drag & drop an image here, or click to select
              </p>
            ) : null}

            {loading && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-500/10 to-transparent animate-pulse"></div>
                <div className="absolute inset-0 overflow-hidden">
                  <div className="scanner-line"></div>
                </div>
              </>
            )}
          </div>

          {loading && (
            <p className="mt-4 font-medium text-red-500 animate-pulse">
              Processing...
            </p>
          )}

          {selected && !loading && (
            <p
              className="mt-4 font-semibold text-lg opacity-0 animate-fadeInUp"
              key={selected}
            >
              Detected as:{" "}
              <span className="capitalize text-blue-500">{selected}</span>
            </p>
          )}
        </div>

        <div className="flex items-center justify-center">
          <div
            className={`w-8 h-[600px] rounded-full transition-all duration-500 ${
              selected
                ? `bg-gradient-to-b ${colors[selected]} shadow-[0_0_30px_5px_rgba(0,0,0,0.4)]`
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          ></div>
        </div>
      </main>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
        .scanner-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(
            to right,
            rgba(255, 0, 0, 0.2),
            rgba(255, 0, 0, 1),
            rgba(255, 0, 0, 0.2)
          );
          box-shadow: 0 0 20px rgba(255, 0, 0, 0.9);
          animation: scan 1s ease-in-out 3;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
}
