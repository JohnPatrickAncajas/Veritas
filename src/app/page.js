"use client";
import { useState, useCallback, useRef } from "react";
import Image from "next/image";

const colors = {
  "2D": "from-yellow-400 to-orange-500",
  "3D": "from-blue-400 to-indigo-500",
  AI: "from-purple-400 to-pink-500",
  Real: "from-green-400 to-teal-500",
};

const CLASS_MAP = {
  "2d": "2D",
  "3d": "3D",
  ai: "AI",
  real: "Real",
};

const CLASS_NAMES = ["2D", "3D", "AI", "Real"];

export default function PredictPage() {
  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState(null);
  const [allProbs, setAllProbs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noFace, setNoFace] = useState(false);
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef(null);
  const lockRef = useRef(false);

  const BACKEND_BASE = "https://veritas-backend-h720.onrender.com";
  // const BACKEND_BASE = "http://localhost:5000";
  const PREDICT_URL = `${BACKEND_BASE}/predict`;
  const DETECT_URL = `${BACKEND_BASE}/detect_face`;

  const handleFile = useCallback(async (file) => {
    if (!file || lockRef.current) return;
    lockRef.current = true;

  setPreview(URL.createObjectURL(file));
  setSelected(null);
  setAllProbs(null);
  setError(null);
  setNoFace(false);
    setLoading(true);

    try {
      // First: call detect_face to ensure a face is present
      const formData = new FormData();
      formData.append("file", file);

      const detectRes = await fetch(DETECT_URL, { method: "POST", body: formData });
      if (!detectRes.ok) {
        const t = await detectRes.text();
        throw new Error(`Face detection failed: ${t}`);
      }
      const detectData = await detectRes.json();
      if (detectData.error) throw new Error(detectData.error || "Face detection error");

      if (!detectData.face_present) {
        // No face: show message, skip prediction
        setNoFace(true);
        setSelected(null);
        setAllProbs(null);
        return;
      }

      // Face detected — use the first returned crop (if present) as input to /predict
      let predictInputFile = file;
      const firstCropDataUrl = detectData.detections?.[0]?.crop;
      if (firstCropDataUrl) {
        try {
          // Convert data URL to Blob via fetch, then to File
          const blob = await (await fetch(firstCropDataUrl)).blob();
          predictInputFile = new File([blob], "crop.jpg", { type: blob.type || "image/jpeg" });
          // Update preview to show the cropped face
          try {
            const obj = URL.createObjectURL(blob);
            setPreview(obj);
          } catch (e) {
            // fallback: keep existing preview
          }
        } catch (e) {
          // If converting crop fails, fall back to original file
          console.warn("Failed to convert crop data URL to Blob, using original file for prediction", e);
        }
      }

      const predictForm = new FormData();
      predictForm.append("file", predictInputFile);

      const res = await fetch(PREDICT_URL, { method: "POST", body: predictForm });
      if (!res.ok) throw new Error("Prediction failed");

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const predictedLabel = CLASS_MAP[data.top1?.class_label] || "Unknown";
      setSelected(predictedLabel);

      const mappedProbs = {};
      for (const [key, val] of Object.entries(data.all_probs)) {
        mappedProbs[CLASS_MAP[key] || key] = val;
      }
      setAllProbs(mappedProbs);
    } catch (err) {
      setError(err.message || "Error");
      setSelected(null);
      setAllProbs(null);
    } finally {
      setLoading(false);
      lockRef.current = false;
      setTimeout(() => {
        if (inputRef.current) inputRef.current.value = "";
      }, 50);
    }
  }, []);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const leftPositions = ["justify-start", "justify-center", "justify-end", "justify-center"];
  const leftWidths = ["w-80", "w-72", "w-88", "w-64"];
  const rightPositions = ["justify-end", "justify-start", "justify-center", "justify-end"];
  const rightWidths = ["w-68", "w-84", "w-60", "w-76"];

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <header className="px-6 py-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Veritas – Face Type Detection
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Upload an image and Veritas will classify it as <b>2D</b>, <b>3D</b>, <b>AI</b>, or <b>Real</b>.
        </p>
      </header>

      <main className="flex flex-col flex-1 px-4 pb-12 gap-6 items-center justify-center w-full">
        <div className="flex w-full justify-center gap-6">
          {/* Left Pills */}
          <div className="hidden md:flex flex-col justify-between h-[500px] gap-2">
            {leftWidths.map((w, i) => (
              <div key={i} className={`flex ${leftPositions[i]} w-full`}>
                <div
                  className={`h-4 ${w} rounded-full transition-all duration-500 ${
                    selected
                      ? `bg-gradient-to-r ${colors[selected] || "from-gray-400 to-gray-600"} animate-pulse shadow-[0_0_20px_5px_rgba(0,0,0,0.3)]`
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Upload Box */}
          <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative w-full max-w-md h-[450px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${
                dragging
                  ? "border-blue-500 shadow-[0_0_25px_5px_rgba(59,130,246,0.5)]"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                disabled={loading}
                onChange={handleChange}
                className="hidden"
              />

              {preview && !loading ? (
                <div className="relative w-full h-full">
                  <Image
                    src={preview}
                    alt="preview"
                    fill
                    style={{ objectFit: "contain" }}
                    className="backdrop-blur-md rounded-lg"
                  />
                </div>
              ) : !preview && !loading ? (
                <p className="text-gray-500 dark:text-gray-400 text-center px-4 mb-4">
                  Drag & drop an image here
                </p>
              ) : null}

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-4 border-t-blue-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Status messages */}
            {loading && <p className="mt-4 font-medium text-blue-500 animate-pulse">Processing...</p>}
            {error && !loading && <p className="mt-4 font-semibold text-lg text-red-500">{error}</p>}
            {noFace && !loading && !error && (
              <p className="mt-4 font-semibold text-lg text-gray-700 dark:text-gray-300">No face detected</p>
            )}
            {selected && !loading && !error && (
              <p className="mt-6 font-bold text-xl opacity-0 animate-fadeInUp drop-shadow-lg" key={selected}>
                Detected as:{" "}
                <span
                  className={`capitalize bg-clip-text text-transparent bg-gradient-to-r ${
                    colors[selected] || "from-gray-400 to-gray-600"
                  } animate-gradient-x`}
                >
                  {selected}
                </span>
              </p>
            )}
          </div>

          {/* Right Pills */}
          <div className="hidden md:flex flex-col justify-between h-[500px] gap-2">
            {rightWidths.map((w, i) => (
              <div key={i} className={`flex ${rightPositions[i]} w-full`}>
                <div
                  className={`h-4 ${w} rounded-full transition-all duration-500 ${
                    selected
                      ? `bg-gradient-to-r ${colors[selected] || "from-gray-400 to-gray-600"} animate-pulse shadow-[0_0_20px_5px_rgba(0,0,0,0.3)]`
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Probability Table */}
        {selected && allProbs && !loading && !error && (
          <div className="w-full max-w-3xl mt-8 overflow-x-auto text-center">
            <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
              <tbody>
                {CLASS_NAMES.map((cls) => (
                  <tr key={cls}>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">{cls}</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      {(allProbs[cls] * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Select Image Button */}
        {!loading && (
          <button
            onClick={() => inputRef.current?.click()}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded shadow-md transform transition-all duration-200 hover:bg-blue-600 hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer"
          >
            {preview ? "Select Another Image" : "Select an Image"}
          </button>
        )}
      </main>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.7s ease forwards; }

        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
      `}</style>
    </div>
  );
}
