import Link from "next/link";
import {
  Brain,
  Cpu,
  Scan,
  Layers,
  Activity,
  Zap,
  ArrowRight,
  Eye,
  Search,
  Binary,
  ShieldCheck,
  Microscope,
  FileSearch,
  BarChart3,
} from "lucide-react";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
      <header className="max-w-5xl mx-auto px-6 pt-20 pb-16 lg:pt-32 lg:pb-24 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-900 shadow-xl rounded-xl mb-6 border border-slate-200 dark:border-slate-800">
            <Brain className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white">
            The Science of
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Digital Forensics
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Veritas moves beyond simple face recognition. It uses Convolutional Neural Networks (CNNs) to analyze the microscopic texture, lighting physics, and compression artifacts of an image.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-24 space-y-28 lg:space-y-36">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-3 h-3" />
              Core Architecture
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              EfficientNet-B0: <br />
              <span className="text-slate-500 dark:text-slate-400">Seeing the Invisible</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              We utilize a custom-tuned EfficientNet-B0 architecture. Unlike traditional models that only look at broad shapes, EfficientNet analyzes images at multiple scales simultaneously, detecting patterns invisible to the human eye.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex gap-4 transition hover:shadow-lg hover:shadow-emerald-500/10">
                <div className="mt-1 w-10 h-10 rounded-lg bg-blue-50 dark:bg-slate-800 flex items-center justify-center shrink-0 text-blue-500">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Frequency Analysis</h4>
                  <p className="text-xs text-slate-500 mt-1">Detecting unnatural repetitive patterns often left by AI upscalers.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex gap-4 transition hover:shadow-lg hover:shadow-purple-500/10">
                <div className="mt-1 w-10 h-10 rounded-lg bg-purple-50 dark:bg-slate-800 flex items-center justify-center shrink-0 text-purple-500">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Texture Mapping</h4>
                  <p className="text-xs text-slate-500 mt-1">Differentiating between biological skin pores and synthetic Gaussian noise.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Binary className="w-64 h-64 text-slate-900 dark:text-white" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 font-black text-xl text-slate-300 dark:text-slate-600">
                    <Search className="w-6 h-6 text-slate-500" />
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">Step 1: Input Normalization</h4>
                    <p className="text-sm text-slate-500 mt-1">Image is resized to 224x224 and pixel values are scaled to standardize the input for the neural network.</p>
                  </div>
                </div>

                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 ml-6"></div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 font-black text-xl text-slate-300 dark:text-slate-600">
                    <Cpu className="w-6 h-6 text-slate-500" />
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">Step 2: Multi-Scale Feature Extraction</h4>
                    <p className="text-sm text-slate-500 mt-1">The CNN sweeps for edges, fine-grain textures, compression artifacts, and geometric anomalies across multiple resolutions.</p>
                  </div>
                </div>

                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 ml-6"></div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 font-black text-xl text-slate-300 dark:text-slate-600">
                    <BarChart3 className="w-6 h-6 text-slate-500" />
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">Step 3: Probability Distribution</h4>
                    <p className="text-sm text-slate-500 mt-1">The model calculates a raw score for the image belonging to each of the 4 defined classification categories.</p>
                  </div>
                </div>

                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 ml-6"></div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-black text-xl shadow-lg shadow-blue-500/30">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">Step 4: Final Classification Output</h4>
                    <p className="text-sm text-slate-500 mt-1">The scores are normalized into confidence percentages, determining the final, nuanced classification result.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Scan className="w-3 h-3" />
              Taxonomy
            </div>
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">The 4 Classifications</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">How Veritas categorizes every pixel it sees based on distinct visual signatures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all group hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/10">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Real Photo</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Contains natural ISO grain, sensor noise, and realistic sub-surface scattering (light penetrating skin). Imperfections are random and organic.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all group hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">AI Generated</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Often lacks proper noise. Backgrounds may dissolve into nonsense. Features like pupils or earrings are frequently asymmetrical or structurally illogical.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all group hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="w-12 h-12 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 rounded-xl flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">3D Render</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Mathematically perfect lighting. Skin texture often appears waxy or plastic-like because it lacks the oil and micro-dirt found on real human skin.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500/50 transition-all group hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/10">
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">2D Art</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Defined by hard edges and distinct outlines. Lighting does not follow real-world physics, often represented by flat blocks of color or gradients.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6">Beyond the Pixel</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Veritas performs a multi-layered analysis that goes deeper than standard metadata checks.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <Microscope className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Sub-Pixel Artifacts</h4>
                    <p className="text-sm text-slate-400 mt-1">AI generation leaves microscopic traces in the pixel grid where upscaling algorithms have filled in gaps.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <FileSearch className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Semantic Consistency</h4>
                    <p className="text-sm text-slate-400 mt-1">Checking for logical errors in lighting shadows, reflections, and biological symmetry that generative models often miss.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Probability Distribution</h4>
                    <p className="text-sm text-slate-400 mt-1">We don&apos;t just give a yes/no. We provide a confidence score across all 4 categories to show nuance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-3xl flex flex-col justify-center items-center text-center">
              <div className="mb-6 p-4 bg-slate-900 rounded-full inline-block shadow-lg shadow-indigo-500/20">
                <ShieldCheck className="w-10 h-10 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Ready to Verify?</h3>
              <p className="text-slate-400 mb-8 max-w-sm">
                Put our methodology to the test. Upload an image now to see the forensic analysis in real-time.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:scale-[1.02] transition-transform shadow-xl shadow-indigo-900/30"
              >
                Launch Scanner <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}