import Link from "next/link";
import { 
  ShieldCheck, 
  Users, 
  Globe, 
  Lock, 
  Github, 
  AlertTriangle, 
  FileCode,
  Fingerprint,
  Eye,
  Server,
  FileText,
  Scale,
  Check
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
      
      {/* HERO HEADER */}
      <header className="max-w-5xl mx-auto px-6 py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-8">
            <Globe className="w-3 h-3" />
            Global Open Source Initiative
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-slate-900 dark:text-white">
            Verifying Reality in the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Age of Synthesis
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Veritas is a forensic tool designed to democratize digital image analysis. We provide journalists, researchers, and the public with the optical intelligence needed to detect AI-generated media.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24 space-y-24">
        
        {/* MISSION CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">The Mission</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              To combat identity fraud and misinformation by making enterprise-grade forensic detection tools accessible to everyone, completely free of charge.
            </p>
          </div>

          <div className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">The Users</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Built for journalists verifying sources, artists protecting their style from scraping, and everyday users who want to know if a viral image is real.
            </p>
          </div>

          <div className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FileCode className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">The Code</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Security through obscurity fails. Our entire methodology and codebase are open source, allowing the global community to audit and improve the model.
            </p>
          </div>
        </section>

        {/* PRIVACY ARCHITECTURE */}
        <section className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
                <Lock className="w-3 h-3" />
                Data Privacy Protocol
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                Your Data is Processed <br/>
                <span className="text-indigo-400">Ephemeral-First</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                We believe privacy is a fundamental right. Veritas is architected to analyze images without harvesting biometric data.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <Server className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Volatile Processing</h4>
                    <p className="text-sm text-slate-400 mt-1">Images are processed in temporary memory buffers and discarded immediately after analysis is complete.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <Eye className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">No Tracking</h4>
                    <p className="text-sm text-slate-400 mt-1">We do not use tracking pixels, sell user data, or map uploads to IP addresses.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <Fingerprint className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Metadata Only</h4>
                    <p className="text-sm text-slate-400 mt-1">We only store the mathematical result (e.g., "99% AI") to track global trends in synthetic media.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-3xl">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Legal Disclaimer
              </h3>
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  Veritas is a probabilistic tool based on computer vision patterns. While highly accurate, it is <strong>not infallible</strong>.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                  <li>Results should be used as a <strong>helper signal</strong>, not definitive legal proof.</li>
                  <li>Heavy compression, filters, or low resolution can affect accuracy.</li>
                  <li>The model is biased towards detecting generators it was trained on (Midjourney, Stable Diffusion).</li>
                </ul>
                <div className="pt-4 mt-4 border-t border-slate-700 text-xs text-slate-500">
                  By using this tool, you acknowledge that Veritas Initiative is not liable for actions taken based on these predictions.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ADDED SECTION: PRIVACY POLICY --- */}
        <section id="privacy" className="scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <FileText className="w-8 h-8 text-slate-900 dark:text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h2>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 space-y-10">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">1. Data Collection & Usage</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                When you use Veritas, we collect the image you upload solely for the purpose of performing forensic analysis.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span><strong>Processing:</strong> Images are processed in temporary memory buffers.</span>
                </li>
                <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span><strong>Metadata:</strong> We store the classification result (e.g., "98% AI") to track aggregate trends.</span>
                </li>
                <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span><strong>Feedback:</strong> If you explicitly flag a result, that image hash may be retained to retrain our model.</span>
                </li>
              </ul>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">2. Data Sharing</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We do not sell, trade, or rent your personal identification information to others. We do not use third-party tracking pixels or advertising cookies on this platform.
              </p>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">3. Security</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access. All transfers are encrypted via TLS 1.3.
              </p>
            </div>
          </div>
        </section>

        {/* --- ADDED SECTION: TERMS OF SERVICE --- */}
        <section id="terms" className="scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <Scale className="w-8 h-8 text-slate-900 dark:text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Terms of Service</h2>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 space-y-10">
            
            <div className="p-6 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/50 rounded-xl">
              <h4 className="font-bold text-yellow-800 dark:text-yellow-500 flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5" /> Important Disclaimer
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-400 leading-relaxed">
                Veritas is a probabilistic tool based on computer vision patterns. It is <strong>not infallible</strong> and should be used as a helper signal, not definitive legal proof.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                By accessing or using Veritas, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.
              </p>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">2. Limitation of Liability</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Veritas and its contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of the service, or any content obtained from the service.
              </p>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">3. Permitted Use</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                You agree not to misuse the service or help anyone else do so. You may not use the service to generate misleading forensic reports or for any illegal activities.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="text-center pt-12 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Join the Initiative</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto text-lg">
            We are looking for developers, data scientists, and researchers to help improve our detection models.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
            >
              <Github className="w-5 h-5" /> Contribution Guide
            </a>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Try the Scanner
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}