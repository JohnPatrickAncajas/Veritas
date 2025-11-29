"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { createClient } from "../utils/supabase/client";
import { 
  Scan, 
  AlertTriangle, 
  CheckCircle, 
  Brain, 
  X, 
  UploadCloud, 
  ThumbsUp, 
  Flag, 
  Info,
  Activity,
  Layers,
  Search,
  MonitorPlay,
  Microscope,
  Cpu,
  Fingerprint,
  RefreshCw,
  Presentation as PresentationIcon,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const BACKEND_URL = "https://veritas-backend-h720.onrender.com/predict";
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dsragzhhv/image/upload";
const UPLOAD_PRESET = "veritas_unsigned";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const EDUCATIONAL_CARDS = [
  {
    id: "intro",
    title: "Pattern Recognition",
    icon: <Search className="w-6 h-6 text-blue-500" />,
    content: "Veritas uses a Convolutional Neural Network (CNN). Think of it as a pattern matching engine. It doesn't 'know' what a face is; it knows what the mathematical texture of a face looks like compared to millions of training examples."
  },
  {
    id: "layer1",
    title: "Edge Topology",
    icon: <Activity className="w-6 h-6 text-emerald-500" />,
    content: "The model scans for hard edges vs. soft transitions. 2D cartoons have distinct sharp outlines (high frequency), whereas real photos have natural light falloff (continuous gradients)."
  },
  {
    id: "layer2",
    title: "Noise Analysis",
    icon: <Layers className="w-6 h-6 text-purple-500" />,
    content: "It zooms in on pixel-level noise. 3D renders are mathematically perfect and smooth. Real camera sensors leave a specific chaotic grain pattern (ISO noise) that is hard to fake."
  },
  {
    id: "layer3",
    title: "Semantic Logic",
    icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
    content: "Generative AI struggles with global coherence. The model detects artifacts like mismatched earrings, non-circular pupils, or background objects that fade into nothingness."
  }
];

const DETAILED_KNOWLEDGE_BASE = {
  "2D": {
    label: "2D Art / Cartoon",
    shortDef: "Digital Illustration, Anime, or Vector Art.",
    aiLogic: "EfficientNet detected sharp outlines and flat color blocks. The lack of high-frequency skin texture and realistic light scattering indicates a drawing.",
    limitations: "Heavy filters or thick cosplay makeup can sometimes mimic 2D art.",
    manualChecks: [
      "Is there a distinct black outline (line art)?",
      "Is the skin shading essentially a solid gradient?",
      "Are anatomical proportions stylized (e.g., large eyes)?",
      "Do shadows have sharp, geometric edges?"
    ]
  },
  "3D": {
    label: "3D Render / CGI",
    shortDef: "Computer Generated Imagery (Games/Movies).",
    aiLogic: "The surface appears mathematically smooth. Specular highlights (shiny spots) follow perfect geometric curves typical of 3D rendering, lacking biological pores.",
    limitations: "Heavy airbrushing or 'beauty mode' filters on real photos can mimic this look.",
    manualChecks: [
      "Does the skin reflect light like plastic or wax?",
      "Is the background blur too uniform?",
      "Do hair strands look like solid ribbons?",
      "Is there a lack of natural imperfections (moles, dirt)?"
    ]
  },
  "AI": {
    label: "AI Generated",
    shortDef: "Synthetic Media (Midjourney, Stable Diffusion).",
    aiLogic: "Detected subtle noise patterns typical of image upscalers. The model likely found logical inconsistencies in the background or facial symmetry.",
    limitations: "Low-resolution or highly compressed JPEGs can introduce noise that looks like AI.",
    manualChecks: [
      "Are the pupils perfectly circular and matching?",
      "Do background objects fade into non-sense shapes?",
      "Check hands/fingers for structural logic.",
      "Are accessories (earrings/glasses) asymmetrical?"
    ]
  },
  "Real": {
    label: "Real Photograph",
    shortDef: "Authentic Optical Capture.",
    aiLogic: "Detected natural ISO sensor noise and 'Subsurface Scattering' (light penetrating skin). The texture distribution matches natural photography statistics.",
    limitations: "Deepfakes overlaid on real footage can sometimes pass as real.",
    manualChecks: [
      "Can you see individual skin pores?",
      "Is the reflection in the eyes consistent with the scene?",
      "Are there tiny, natural asymmetries in the face?",
      "Do clothing fabrics show realistic weave textures?"
    ]
  }
};

const COLORS = {
  "2D": {
    bg: "bg-orange-50 dark:bg-orange-950/20",
    border: "border-orange-200 dark:border-orange-800",
    text: "text-orange-700 dark:text-orange-400",
    gradient: "from-amber-400 to-orange-600",
    badge: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
  },
  "3D": {
    bg: "bg-cyan-50 dark:bg-cyan-950/20",
    border: "border-cyan-200 dark:border-cyan-800",
    text: "text-cyan-700 dark:text-cyan-400",
    gradient: "from-cyan-400 to-blue-600",
    badge: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200"
  },
  "AI": {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-800",
    text: "text-purple-700 dark:text-purple-400",
    gradient: "from-fuchsia-500 to-purple-600",
    badge: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
  },
  "Real": {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-800",
    text: "text-emerald-700 dark:text-emerald-400",
    gradient: "from-emerald-400 to-green-600",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
  }
};

export default function VeritasClient({ fetchedData }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [checklist, setChecklist] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [scanId, setScanId] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const fileInputRef = useRef(null);
  const supabase = createClient();

  useEffect(() => {
    if (loading) {
      const steps = ["Encrypting & Uploading...", "Running EfficientNet-B0...", "Decomposing Textures...", "Verifying Geometric Logic..."];
      let i = 0;
      setLoadingStep(steps[0]);
      const interval = setInterval(() => {
        i = (i + 1) % steps.length;
        setLoadingStep(steps[i]);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Invalid file type. Please upload a JPG, PNG, or WEBP image.");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("File is too large. Maximum size is 5MB.");
      return false;
    }
    return true;
  };

  const resetAnalysis = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setChecklist({});
    setScanId(null);
    setFeedbackGiven(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileSelect = useCallback((selectedFile) => {
    if (!selectedFile) return;
    setError(null);
    if (!validateFile(selectedFile)) return;

    if (preview) URL.revokeObjectURL(preview);
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setChecklist({});
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
    
    if (!response.ok) throw new Error("Image upload failed. Please try a smaller file.");
    return await response.json();
  };

  const getPrediction = async (fileToSend) => {
    const formData = new FormData();
    formData.append("file", fileToSend);
    
    const response = await fetch(BACKEND_URL, { 
      method: "POST", 
      body: formData 
    });
    
    if (!response.ok) throw new Error("AI prediction server is busy. Please try again.");
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

      const predictedLabel = aiResult.top1?.class_label || "Unknown";
      const probValues = Object.values(aiResult.all_probs);
      const calculatedConfidence = Math.max(...probValues);

      const { data: insertData, error: dbError } = await supabase
        .from('scans')
        .insert({
          filename: file.name,
          image_url: uploadResult.secure_url,
          prediction: predictedLabel,
          confidence: calculatedConfidence,
          prob_real: aiResult.all_probs.real || 0,
          prob_2d: aiResult.all_probs['2d'] || 0,
          prob_3d: aiResult.all_probs['3d'] || 0,
          prob_ai: aiResult.all_probs.ai || 0,
        })
        .select()
        .single();

      if (dbError) {
        console.error("Database Error:", JSON.stringify(dbError, null, 2));
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
      if (!error) setFeedbackGiven(true);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleChecklist = (index) => {
    setChecklist(prev => ({ ...prev, [index]: !prev[index] }));
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
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
      
      <div className="bg-slate-900 text-slate-400 px-4 py-3 text-xs font-medium text-center border-b border-slate-800 flex items-center justify-center gap-2">
        <Info className="w-4 h-4 text-blue-500 animate-pulse" />
        <span>Beta Version: Using EfficientNet-B0. Results are probabilistic estimates.</span>
      </div>

      <header className="max-w-5xl mx-auto px-6 py-12 lg:py-20 text-center animate-fadeIn">
        <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-xl mb-8 ring-1 ring-slate-200 dark:ring-slate-800 transition-transform hover:scale-105 duration-500">
          <Scan className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
          Veritas <span className="font-light text-slate-400">Scan</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Upload an image to detect if it's Real, AI, 3D, or 2D Art. Powered by computer vision to analyze invisible texture and edge consistency.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-24 space-y-12">
        
        <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col lg:flex-row min-h-[600px] transition-all duration-500 hover:shadow-3xl hover:border-slate-300 dark:hover:border-slate-700">
            
            <div className="flex-1 p-8 lg:p-12 bg-slate-50 dark:bg-slate-950/50 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 relative group transition-colors duration-300">
              
              {!preview ? (
                <div 
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 min-h-[400px] group-hover:scale-[1.01] ${
                    isDragging 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10 scale-[0.98]' 
                      : 'border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500'
                  }`}
                >
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
                    isDragging ? 'bg-blue-100 text-blue-600 scale-110' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-slate-700 group-hover:text-blue-500'
                  }`}>
                    <UploadCloud className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {isDragging ? 'Drop Image Now' : 'Upload Source Image'}
                  </h3>
                  <p className="text-slate-500 text-sm max-w-xs text-center">
                    Supports JPG, PNG, WEBP. Max 5MB.
                  </p>
                </div>
              ) : (
                <div className="relative w-full h-full flex flex-col animate-fadeIn">
                  <div className="absolute top-4 right-4 z-30">
                      <button 
                        onClick={resetAnalysis}
                        className="p-3 bg-black/50 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-all hover:rotate-90 duration-300 shadow-lg"
                        title="Remove Image"
                      >
                        <X className="w-5 h-5" />
                      </button>
                  </div>
                  
                  <div className="relative flex-1 rounded-2xl overflow-hidden bg-black shadow-inner ring-1 ring-white/10 group-hover:shadow-2xl transition-all duration-500 min-h-[400px]">
                    <Image 
                      src={preview} 
                      alt="Analysis Subject" 
                      fill 
                      className={`object-contain transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}
                    />
                    
                    {loading && (
                      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center z-20">
                        <div className="relative w-32 h-32 mb-8">
                          <div className="absolute inset-0 border-4 border-slate-700/50 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                          <div className="absolute inset-4 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin-reverse opacity-70"></div>
                        </div>
                        <p className="mt-4 font-mono text-blue-400 text-sm font-bold tracking-widest animate-pulse uppercase">
                          {loadingStep}
                        </p>
                      </div>
                    )}
                    
                    {!loading && result && (
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 animate-scan"></div>
                        </div>
                    )}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    {!result && !loading && (
                      <button 
                        onClick={analyzeImage}
                        className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3"
                      >
                        <Brain className="w-5 h-5" /> Run Analysis
                      </button>
                    )}
                    {result && !loading && (
                      <button 
                        onClick={resetAnalysis}
                        className="px-8 py-3 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 border border-slate-700"
                      >
                        <RefreshCw className="w-4 h-4" /> Scan Another Image
                      </button>
                    )}
                  </div>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={(e) => handleFileSelect(e.target.files?.[0])} className="hidden" accept="image/*" />
            </div>

            <div className="flex-1 p-8 lg:p-12 flex flex-col bg-white dark:bg-slate-900 h-full overflow-y-auto min-h-[600px]">
              {!result && !loading && !error && (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 opacity-40 animate-pulse-slow">
                  <Scan className="w-20 h-20 text-slate-300 dark:text-slate-700" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Awaiting Input</h4>
                    <p className="text-sm text-slate-500 mt-2">Upload an image to begin forensic breakdown.</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-2xl flex gap-4 items-start animate-fadeIn">
                  <Activity className="w-6 h-6 text-red-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-900 dark:text-red-200">Processing Failed</h4>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
                  </div>
                </div>
              )}

              {result && !loading && (
                <div className="space-y-8 animate-fadeIn h-full flex flex-col">
                  
                  <div className={`p-8 rounded-3xl border ${COLORS[topLabel].bg} ${COLORS[topLabel].border} relative overflow-hidden transition-all duration-500 hover:shadow-lg`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${COLORS[topLabel].text} opacity-80`}>
                          Classification Result
                        </p>
                        <h2 className={`text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r ${COLORS[topLabel].gradient}`}>
                          {educationalData.label}
                        </h2>
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed border-t border-slate-200 dark:border-slate-700/50 pt-4 mt-4">
                      {educationalData.shortDef}
                    </p>
                  </div>

                  <div className="py-2">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                        <Activity className="w-4 h-4" /> AI Probability
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {Object.entries(result.all_probs).sort(([,a], [,b]) => b - a).map(([key, prob]) => {
                        const label = { "2d": "2D / Flat", "3d": "3D Render", "ai": "AI Generated", "real": "Real Photo" }[key] || key;
                        const pct = (prob * 100).toFixed(1);
                        const isTop = label === educationalData.label || (key === "2d" && topLabel === "2D") || (key === "3d" && topLabel === "3D") || (key === "ai" && topLabel === "AI") || (key === "real" && topLabel === "Real");
                        
                        return (
                          <div key={key} className="group">
                            <div className="flex justify-between text-xs font-medium mb-2">
                              <span className={isTop ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-500'}>{label}</span>
                              <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">{pct}%</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${isTop ? `bg-gradient-to-r ${COLORS[topLabel].gradient}` : 'bg-slate-300 dark:bg-slate-700'}`} 
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <button 
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                        <HelpCircle className="w-4 h-4 text-blue-500" />
                        How does the % work?
                      </div>
                      {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {showExplanation && (
                      <div className="p-4 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 leading-relaxed border-t border-slate-200 dark:border-slate-800 animate-fadeIn">
                        <p className="mb-2"><strong>Not a Fact Check:</strong> This percentage represents the model's <em>confidence</em> based on visual patterns, not a guarantee of truth.</p>
                        <p className="mb-2"><strong>Training Data:</strong> The AI compares your image to thousands of examples it has seen before. If your image has unique lighting or filters, the AI might be "confused" (low confidence) or "wrongly certain" (high confidence).</p>
                        <p><strong>Errors:</strong> AI can mistake heavy makeup for "AI Smoothness" or digital art for "Cartoons." Always verify manually.</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-4">
                    {scanId && !feedbackGiven ? (
                        <div className="w-full p-6 bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-between gap-4 animate-fadeIn shadow-sm">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Human Verification</p>
                          <div className="flex gap-3 w-full">
                            <button 
                              onClick={() => handleFeedback('correct')}
                              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl text-sm font-bold transition-all"
                            >
                              <ThumbsUp className="w-4 h-4" /> Accurate
                            </button>
                            <button 
                              onClick={() => handleFeedback('flagged')}
                              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-red-400 hover:text-red-600 dark:hover:text-red-400 rounded-xl text-sm font-bold transition-all"
                            >
                              <Flag className="w-4 h-4" /> Incorrect
                            </button>
                          </div>
                        </div>
                    ) : feedbackGiven ? (
                      <div className="w-full p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl text-center animate-fadeIn">
                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4" /> Feedback Recorded
                        </p>
                      </div>
                    ) : null}
                  </div>

                </div>
              )}
            </div>
        </section>

        {result && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-shadow duration-500">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                <MonitorPlay className="w-6 h-6 text-blue-500" />
                Forensic Vision Lab
              </h3>
              <p className="text-sm text-slate-500 mb-6">Simulating how computer vision "sees" this image:</p>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="group relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-200 dark:border-slate-700">
                  <Image 
                    src={preview} 
                    alt="Texture" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    style={{ filter: 'contrast(150%) grayscale(100%)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                      <Microscope className="w-4 h-4 text-purple-400" /> Surface Texture Map
                    </div>
                    <p className="text-xs text-slate-300">
                      High-contrast view to reveal skin porosity vs. smoothing. 3D renders look flat here.
                    </p>
                  </div>
                </div>

                <div className="group relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-200 dark:border-slate-700">
                  <Image 
                    src={preview} 
                    alt="Edges" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    style={{ filter: 'invert(100%) contrast(200%)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                      <Cpu className="w-4 h-4 text-blue-400" /> Edge Topology
                    </div>
                    <p className="text-xs text-slate-300">
                      Inverted view to highlight sharp artificial outlines typical of 2D/Vector art.
                    </p>
                  </div>
                </div>

                <div className="group relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-200 dark:border-slate-700">
                  <Image 
                    src={preview} 
                    alt="Artifacts" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    style={{ filter: 'saturate(400%) contrast(120%)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                      <Fingerprint className="w-4 h-4 text-orange-400" /> Artifact Search
                    </div>
                    <p className="text-xs text-slate-300">
                      Hyper-saturated view to find color inconsistencies and compression blocks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-shadow duration-500">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                Manual Verification
              </h3>
              <div className="space-y-3">
                {educationalData.manualChecks.map((check, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => toggleChecklist(idx)}
                    className={`w-full text-left group flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 ${checklist[idx] ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900' : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-slate-600'}`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${checklist[idx] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                      {checklist[idx] && <CheckCircle className="w-3 h-3" />}
                    </div>
                    <span className={`text-sm font-medium ${checklist[idx] ? 'text-emerald-800 dark:text-emerald-200 line-through opacity-60' : 'text-slate-700 dark:text-slate-300'}`}>
                      {check}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-slate-200 dark:border-slate-800 pt-16 mt-16">
          <h3 className="text-2xl font-black text-center mb-12 text-slate-900 dark:text-white flex items-center justify-center gap-3">
            <PresentationIcon className="w-6 h-6 text-blue-600" /> 
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EDUCATIONAL_CARDS.map((card) => (
              <div key={card.id} className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                <div className="mb-4 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl inline-block">
                  {card.icon}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{card.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {card.content}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}