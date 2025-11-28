"use client";
import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const BACKEND_URL = "https://veritas-backend-h720.onrender.com/predict";
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dsragzhhv/image/upload";
const UPLOAD_PRESET = "veritas_unsigned";

const PRESENTATION_SLIDES = [
  {
    id: "intro",
    title: "The Digital Detective",
    icon: "🕵️",
    content: "Veritas acts as a digital detective. Instead of looking at a face as a whole, it breaks the image down into millions of tiny mathematical clues to determine if it is Real, 2D, 3D, or AI.",
    visual: "intro"
  },
  {
    id: "layer1",
    title: "Layer 1: Edge Detection",
    icon: "📏",
    content: "First, the AI looks for hard edges. 2D images (cartoons) have distinct, sharp outlines. Real photos have soft transitions where light wraps around objects. This is the first step in classifying '2D art'.",
    visual: "edges"
  },
  {
    id: "layer2",
    title: "Layer 2: Texture Analysis",
    icon: "🔬",
    content: "Next, it zooms in on the skin. 3D renders often look 'too smooth' or waxy (perfect geometry). Real photos contain high-frequency noise (pores, peach fuzz) and camera grain.",
    visual: "texture"
  },
  {
    id: "layer3",
    title: "Layer 3: Artifact Hunting",
    icon: "⚠️",
    content: "Finally, it looks for 'AI Artifacts'. Generative models often make logical mistakes—like mismatched earrings or pupils that aren't round. These are strong indicators of synthetic generation.",
    visual: "artifacts"
  }
];

const DETAILED_KNOWLEDGE_BASE = {
  "2D": {
    label: "2D / Flat Art",
    shortDef: "Drawings, Anime, or Cartoons.",
    aiLogic: "EfficientNet detects sharp outlines and flat colors. It notices that light doesn't wrap around objects like it does in the real world.",
    limitations: "It might make a mistake if you upload a real photo with a cartoon filter, or if someone is wearing heavy cosplay makeup.",
    manualChecks: [
      "Is there a black outline around the character?",
      "Does the skin look like a solid color without texture?",
      "Are the eyes impossibly large?",
      "Are shadows simple shapes instead of soft fades?"
    ]
  },
  "3D": {
    label: "3D Render / CGI",
    shortDef: "Computer-Generated images (like video games or movies).",
    aiLogic: "EfficientNet sees lighting that is mathematically perfect. It looks for skin that is too smooth, like plastic or wax, lacking natural oils and dirt.",
    limitations: "It might make a mistake if a real photo is heavily airbrushed (like a magazine cover) or if the person has very smooth skin from makeup.",
    manualChecks: [
      "Does the skin look like wax or silicone?",
      "Is the lighting too perfect, with no random shadows?",
      "Do hair strands look like thick ribbons?",
      "Is the background blurry in a fake-looking way?"
    ]
  },
  "AI": {
    label: "AI Generated",
    shortDef: "Images created by tools like Midjourney or Stable Diffusion.",
    aiLogic: "EfficientNet looks for invisible noise patterns and dream-like mistakes. It spots things that don't make sense, like earrings that don't match or weird background textures.",
    limitations: "It might make a mistake if the image is blurry or low quality, because the compression artifacts look like AI noise.",
    manualChecks: [
      "Look at the eyes: Are the pupils different shapes?",
      "Check the hands: Are there too many fingers?",
      "Background: Do lines fade into nothing?",
      "Accessories: Do the earrings match each other?"
    ]
  },
  "Real": {
    label: "Authentic Photograph",
    shortDef: "A real photo of a real person.",
    aiLogic: "EfficientNet looks for chaos and messy details. It finds pores, tiny peach fuzz hairs, and camera grain that proves it was taken with a real lens.",
    limitations: "It might make a mistake if the image is a very expensive Deepfake designed to mimic skin pores, or if the lighting is studio-perfect.",
    manualChecks: [
      "Can you see tiny pores and fine hairs on the face?",
      "Does the reflection in the eyes match the room?",
      "Is the face slightly asymmetrical (natural)?",
      "Do the clothes have realistic wrinkles?"
    ]
  }
};

const COLORS = {
  "2D": {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200 dark:border-orange-800",
    text: "text-orange-700 dark:text-orange-400",
    gradient: "from-yellow-400 to-orange-600"
  },
  "3D": {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    text: "text-blue-700 dark:text-blue-400",
    gradient: "from-cyan-400 to-blue-600"
  },
  "AI": {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-700 dark:text-purple-400",
    gradient: "from-fuchsia-400 to-purple-600"
  },
  "Real": {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    text: "text-emerald-700 dark:text-emerald-400",
    gradient: "from-green-400 to-emerald-600"
  }
};

function InfoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}

function PresentationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function ThumbsUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

export default function VeritasEducational({ fetchedData }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [heatmap, setHeatmap] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [checklist, setChecklist] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [scanId, setScanId] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  
  const [presentationMode, setPresentationMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fileInputRef = useRef(null);
  const supabase = createClient();

  const resetAnalysis = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setHeatmap(null);
    setError(null);
    setChecklist({});
    setShowHeatmap(false);
    setScanId(null);
    setFeedbackGiven(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileSelect = useCallback((selectedFile) => {
    if (!selectedFile) return;
    if (preview) URL.revokeObjectURL(preview);
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setHeatmap(null);
    setError(null);
    setChecklist({});
    setShowHeatmap(false);
    setScanId(null);
    setFeedbackGiven(false);
  }, [preview]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFileSelect(droppedFile);
  }, [handleFileSelect]);

  const uploadToCloudinary = async (fileToUpload) => {
    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("upload_preset", UPLOAD_PRESET);
    
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData
    });
    
    if (!response.ok) throw new Error("Image upload failed");
    return await response.json();
  };

  const getPrediction = async (fileToSend) => {
    const formData = new FormData();
    formData.append("file", fileToSend);
    
    const response = await fetch(BACKEND_URL, { 
      method: "POST", 
      body: formData 
    });
    
    if (!response.ok) throw new Error("AI prediction failed");
    return await response.json();
  };

  const analyzeImage = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setFeedbackGiven(false);
    
    try {
      const [uploadResult, aiResult] = await Promise.all([
        uploadToCloudinary(file),
        getPrediction(file)
      ]);

      if (aiResult.error) throw new Error(aiResult.error);

      setResult(aiResult);
      if (aiResult.heatmap) {
        setHeatmap(`data:image/jpeg;base64,${aiResult.heatmap}`);
      }

      const predictedLabel = aiResult.top1?.class_label || "Unknown";
      const confidenceScore = aiResult.top1?.confidence || 0;

      const { data: insertData, error: dbError } = await supabase
        .from('scans')
        .insert({
          filename: file.name,
          image_url: uploadResult.secure_url,
          prediction: predictedLabel,
          confidence: confidenceScore,
          prob_real: aiResult.all_probs.real || 0,
          prob_2d: aiResult.all_probs['2d'] || 0,
          prob_3d: aiResult.all_probs['3d'] || 0,
          prob_ai: aiResult.all_probs.ai || 0,
        })
        .select()
        .single();

      if (dbError) {
        console.error("Database Error:", dbError);
      } else if (insertData) {
        setScanId(insertData.id);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (status) => {
    if (!scanId) return;
    
    try {
      const { error } = await supabase
        .from('scans')
        .update({ feedback: status })
        .eq('id', scanId);
        
      if (!error) {
        setFeedbackGiven(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleChecklist = (index) => {
    setChecklist(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getTopPrediction = (currentResult) => {
    const r = currentResult || result;
    if (!r) return null;
    const label = r.top1?.class_label || "Unknown";
    const mappedLabel = { "2d": "2D", "3d": "3D", "ai": "AI", "real": "Real" }[label] || label;
    return mappedLabel;
  };

  const topLabel = getTopPrediction(result);
  const educationalData = topLabel ? DETAILED_KNOWLEDGE_BASE[topLabel] : null;

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${presentationMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100'}`}>
      
      {!presentationMode && fetchedData && (
        <div className="absolute top-0 right-0 p-2 text-xs text-slate-400">
           Total Scans in DB: {fetchedData.length}
        </div>
      )}

      {presentationMode ? (
        <div className="h-screen flex flex-col items-center justify-center p-8 max-w-6xl mx-auto relative">
          
          <button 
            onClick={() => setPresentationMode(false)}
            className="absolute top-6 right-6 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-sm font-bold transition-all flex items-center gap-2"
          >
            <span>Exit Presentation</span> <XIcon />
          </button>

          <div className="w-full h-1 bg-slate-800 rounded-full mb-12 overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500 ease-out" 
              style={{ width: `${((currentSlide + 1) / PRESENTATION_SLIDES.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex-1 flex flex-col md:flex-row items-center gap-16 w-full animate-fadeIn">
            <div className="flex-1 text-center md:text-left space-y-8">
              <div className="inline-block p-4 rounded-3xl bg-slate-800 shadow-2xl text-6xl mb-2">
                {PRESENTATION_SLIDES[currentSlide].icon}
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 leading-tight">
                {PRESENTATION_SLIDES[currentSlide].title}
              </h1>
              <p className="text-2xl text-slate-400 leading-relaxed font-light">
                {PRESENTATION_SLIDES[currentSlide].content}
              </p>
            </div>
            
            <div className="flex-1 flex justify-center items-center w-full max-w-md">
              <div className="w-full aspect-square bg-slate-800 rounded-[2rem] border-4 border-slate-700 flex items-center justify-center relative overflow-hidden shadow-2xl group">
                 {preview ? (
                   <div className="relative w-full h-full">
                     <Image src={preview} alt="Subject" fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                     <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>
                   </div>
                 ) : (
                   <div className="text-center p-8 opacity-50">
                     <BrainIcon />
                     <p className="mt-4 font-mono text-sm">No Image Loaded</p>
                   </div>
                 )}
                 
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-8 pt-24">
                    <p className="font-mono text-blue-300 text-sm">EfficientNet-B0 // Block {currentSlide + 1}</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="flex gap-6 mt-12 w-full max-w-md">
            <button 
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide(c => c - 1)}
              className="flex-1 py-4 rounded-xl bg-slate-800 disabled:opacity-30 hover:bg-slate-700 font-bold transition-all"
            >
              Previous
            </button>
            <button 
              onClick={() => {
                if (currentSlide < PRESENTATION_SLIDES.length - 1) {
                  setCurrentSlide(c => c + 1);
                } else {
                  setPresentationMode(false);
                  setCurrentSlide(0);
                }
              }}
              className="flex-1 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
            >
              {currentSlide === PRESENTATION_SLIDES.length - 1 ? "Finish Demo" : "Next Slide"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-slate-900 text-slate-200 px-4 py-3 text-sm text-center border-b border-slate-800">
            <span className="font-bold text-yellow-400 mr-2">⚠ Educational Tool:</span>
            This tool uses Artificial Intelligence to guess, but it is not magic. It can be wrong. Always use your own judgment.
          </div>

          <header className="max-w-6xl mx-auto px-6 py-12 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl mb-6 ring-1 ring-slate-200 dark:ring-slate-800">
              <BrainIcon />
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Veritas <span className="font-light text-slate-400">Classroom</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              See the world through the eyes of an AI. Upload an image to learn how computers distinguish between <span className="font-bold text-slate-900 dark:text-white">Real Photos</span>, <span className="font-bold text-slate-900 dark:text-white">AI Art</span>, and <span className="font-bold text-slate-900 dark:text-white">Cartoons</span>.
            </p>
          </header>

          <main className="max-w-6xl mx-auto px-4 pb-24 space-y-12">
            
            <section 
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[600px]">
                
                <div className="lg:col-span-3 p-8 bg-slate-100 dark:bg-slate-950/50 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 relative group">
                  
                  {!preview ? (
                    <div 
                      onDragEnter={handleDragEnter}
                      onDragOver={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex-1 border-4 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 min-h-[400px] ${
                        isDragging 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[0.99]' 
                          : 'border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 hover:border-slate-400'
                      }`}
                    >
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors ${
                        isDragging ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                      }`}>
                        <UploadIcon />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                        {isDragging ? 'Drop it here!' : 'Upload Image'}
                      </h3>
                      <p className="text-slate-500 text-center max-w-xs">
                        {isDragging ? 'Release to analyze' : 'Click here or drag a file to start learning.'}
                      </p>
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex flex-col">
                      <div className="absolute top-4 right-4 z-30">
                         <button 
                           onClick={resetAnalysis}
                           className="p-2 bg-slate-900/80 hover:bg-red-600 text-white rounded-full backdrop-blur-sm transition-all shadow-lg"
                           title="Clear Image"
                         >
                           <XIcon />
                         </button>
                      </div>
                      
                      <div className="relative flex-1 rounded-2xl overflow-hidden bg-black shadow-inner ring-1 ring-white/10">
                        <Image 
                          src={showHeatmap && heatmap ? heatmap : preview} 
                          alt="Analysis Subject" 
                          fill 
                          className="object-contain"
                        />
                        
                        {loading && (
                          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                            <div className="relative w-24 h-24">
                              <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                              <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                            </div>
                            <p className="mt-6 font-mono text-blue-400 text-lg animate-pulse">EfficientNet is thinking...</p>
                            <p className="text-slate-500 text-sm mt-2">Scanning pixels for patterns...</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        {result && !loading && (
                          <button 
                            onClick={() => setShowHeatmap(!showHeatmap)}
                            disabled={!heatmap}
                            className={`flex items-center gap-2 px-6 py-2.5 font-medium rounded-xl transition-all ${showHeatmap ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900'}`}
                          >
                            <EyeIcon />
                            {showHeatmap ? "Show Original Photo" : "Show How AI Sees It"}
                          </button>
                        )}
                        {!result && !loading && (
                          <button 
                            onClick={analyzeImage}
                            className="px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105"
                          >
                            Start Analysis
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={(e) => handleFileSelect(e.target.files?.[0])} className="hidden" accept="image/*" />
                </div>

                <div className="lg:col-span-2 p-8 flex flex-col overflow-y-auto max-h-[800px]">
                  {!result && !loading && !error && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                      <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
                        <InfoIcon />
                      </div>
                      <h4 className="text-xl font-medium">Ready to Learn</h4>
                      <p className="text-sm max-w-xs">Upload an image and click Start Analysis to see how the EfficientNet model breaks it down.</p>
                      {fetchedData && fetchedData.length > 0 && (
                        <div className="mt-4 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                          Supabase Connected: {fetchedData.length} records found
                        </div>
                      )}
                    </div>
                  )}

                  {error && (
                    <div className="p-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl">
                      <div className="flex items-center gap-3 text-red-600 dark:text-red-400 font-bold mb-2">
                        <AlertIcon />
                        Oops!
                      </div>
                      <p className="text-red-700 dark:text-red-300">{error}</p>
                    </div>
                  )}

                  {result && !loading && (
                    <div className="space-y-8 animate-fadeIn">
                      
                      <div className={`p-6 rounded-2xl border ${COLORS[topLabel].bg} ${COLORS[topLabel].border} shadow-sm`}>
                        <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${COLORS[topLabel].text} opacity-70`}>The AI thinks this is:</p>
                        <div className="flex items-baseline gap-3">
                          <h2 className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${COLORS[topLabel].gradient}`}>
                            {educationalData.label}
                          </h2>
                        </div>
                        <p className="mt-3 text-slate-700 dark:text-slate-300 leading-snug">
                          {educationalData.shortDef}
                        </p>
                      </div>

                      {scanId && !feedbackGiven && (
                         <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                           <p className="text-sm font-bold text-center mb-3 text-slate-700 dark:text-slate-300">Is this result correct?</p>
                           <div className="flex gap-3">
                             <button 
                               onClick={() => handleFeedback('correct')}
                               className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg text-sm font-bold transition-colors"
                             >
                               <ThumbsUpIcon /> Yes
                             </button>
                             <button 
                               onClick={() => handleFeedback('flagged')}
                               className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-sm font-bold transition-colors"
                             >
                               <FlagIcon /> No, Flag It
                             </button>
                           </div>
                         </div>
                      )}
                      
                      {feedbackGiven && (
                        <div className="p-3 bg-blue-50 text-blue-700 text-center rounded-lg text-sm font-medium border border-blue-100">
                          Thank you for your feedback! This helps us improve.
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"></path></svg>
                            AI Confidence
                          </h3>
                          <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">How sure is it?</span>
                        </div>
                        <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                          {Object.entries(result.all_probs).sort(([,a], [,b]) => b - a).map(([key, prob]) => {
                            const label = { "2d": "2D", "3d": "3D", "ai": "AI", "real": "Real" }[key] || key;
                            const pct = (prob * 100).toFixed(1);
                            const isTop = label === topLabel;
                            
                            return (
                              <div key={key} className="relative">
                                <div className="flex justify-between text-sm mb-1 z-10 relative">
                                  <span className={`font-medium ${isTop ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{label}</span>
                                  <span className="font-mono text-slate-400">{pct}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${isTop ? `bg-gradient-to-r ${COLORS[topLabel].gradient}` : 'bg-slate-300 dark:bg-slate-700'}`} 
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                        <p className="text-xs text-slate-400 mt-2 italic">
                          Note: AI is just guessing based on math. Even 99% confidence means it could still be wrong.
                        </p>
                      </div>

                      <div className="p-5 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/50 rounded-xl">
                        <h4 className="text-yellow-800 dark:text-yellow-500 font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                          <AlertIcon />
                          When is the AI wrong?
                        </h4>
                        <p className="text-sm text-yellow-900/80 dark:text-yellow-200/80 leading-relaxed">
                          {educationalData.limitations}
                        </p>
                      </div>

                    </div>
                  )}
                </div>
              </div>
            </section>

            {result && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                      <BrainIcon />
                    </div>
                    How EfficientNet Sees This
                  </h3>
                  <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                    <p className="mb-4">
                      We use an AI technology called <strong>EfficientNet</strong>. Think of it like a huge stack of transparent stencils. The first stencils look for simple lines. The middle ones look for shapes (like eyes or noses). The final stencils look for complex textures like skin pores or brushstrokes.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-3">Why it chose {educationalData.label}:</h4>
                      <p className="italic text-lg text-slate-700 dark:text-slate-200 border-l-4 border-blue-500 pl-4 py-1">
                        &quot;{educationalData.aiLogic}&quot;
                      </p>
                    </div>
                    <p className="mt-6 text-sm">
                      Click the &quot;Show How AI Sees It&quot; button above. If it works, it will glow on the parts of the image that convinced the AI. If the glow is on the background instead of the face, the AI might be confused!
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                        <CheckIcon />
                      </div>
                      Human Checklist
                    </h3>
                    <p className="text-slate-500 mt-2">
                      You are smarter than the AI. Use your own eyes to double-check. If the AI says <strong>{educationalData.label}</strong>, look for these signs:
                    </p>
                  </div>

                  <div className="flex-1 space-y-3">
                    {educationalData.manualChecks.map((check, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => toggleChecklist(idx)}
                        className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer border transition-all duration-200 ${checklist[idx] ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 hover:border-blue-300'}`}
                      >
                        <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${checklist[idx] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-400 bg-white dark:bg-slate-900'}`}>
                          {checklist[idx] && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>}
                        </div>
                        <span className={`text-sm font-medium ${checklist[idx] ? 'text-emerald-800 dark:text-emerald-200 line-through opacity-70' : 'text-slate-700 dark:text-slate-200'}`}>
                          {check}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Human Judgment &gt; AI Prediction
                    </p>
                  </div>
                </div>

              </section>
            )}

            <section className="border-t border-slate-200 dark:border-slate-800 pt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-slate-500 dark:text-slate-400 mb-12">
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-2">What is Veritas?</h5>
                  <p>Veritas is a free tool to help people understand deepfakes and computer images. We want to help you spot what is real and what is fake.</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Your Privacy</h5>
                  <p>We analyze your images instantly and then forget them. We do not save your photos or use them to train our robots.</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Technical Details</h5>
                  <p>We use a model called EfficientNet-B0 trained on thousands of faces. It is good at spotting textures, but bad at spotting logical mistakes (like hands with 6 fingers).</p>
                </div>
              </div>

              <div className="w-full flex justify-center pb-12">
                <button 
                  onClick={() => {
                    setPresentationMode(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                    <PresentationIcon />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-blue-300 uppercase tracking-wider">Teacher Mode</p>
                    <p className="text-lg leading-none">Start Slideshow Presentation</p>
                  </div>
                </button>
              </div>

            </section>

          </main>
        </>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}