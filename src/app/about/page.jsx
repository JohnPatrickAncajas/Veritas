"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Users, 
  Globe, 
  Lock, 
  AlertTriangle, 
  FileText,
  Scale,
  Check,
  ExternalLink,
  Server,
  FileCode,
  Database,
  Eye,
  Fingerprint,
  ArrowRight
} from "lucide-react";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('privacy');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
      
      <header className="max-w-5xl mx-auto px-6 py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-8">
            <Globe className="w-3 h-3" />
            Global Forensic Initiative
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
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Technology</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Utilizing the EfficientNet-B0 CNN architecture, our methodology is built on verifiable computer vision principles rather than proprietary, closed systems.
            </p>
          </div>
        </section>

        <section className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
                <Lock className="w-3 h-3" />
                Data Handling Protocol
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                Your Data Contributes to <br/>
                <span className="text-indigo-400">Forensic Security</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Veritas uses an Active Learning pipeline. The images you scan are integral to teaching the model how to detect new forms of AI generation.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <Database className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Secure Retention</h4>
                    <p className="text-sm text-slate-400 mt-1">Uploads are encrypted and stored in our isolated forensic dataset to improve model accuracy.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <Eye className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Restricted Access</h4>
                    <p className="text-sm text-slate-400 mt-1">Your images are not public. They are accessible only to the Veritas core research team.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <Fingerprint className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">No Commercial Sale</h4>
                    <p className="text-sm text-slate-400 mt-1">We never sell user data or images to third-party advertisers or data brokers.</p>
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

        <section id="policy-container" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row gap-4 mb-8 border-b border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 flex items-center justify-center gap-2 pb-3 text-lg font-bold transition-colors border-b-2 ${activeTab === 'privacy' ? 'border-blue-600 text-blue-600 dark:text-white' : 'border-transparent text-slate-400 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <FileText className="w-6 h-6" /> Privacy Policy
            </button>
            <button 
              onClick={() => setActiveTab('terms')}
              className={`flex-1 flex items-center justify-center gap-2 pb-3 text-lg font-bold transition-colors border-b-2 ${activeTab === 'terms' ? 'border-blue-600 text-blue-600 dark:text-white' : 'border-transparent text-slate-400 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <Scale className="w-6 h-6" /> Terms of Service
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 space-y-10 min-h-[500px]">
            
            {/* PRIVACY POLICY CONTENT */}
            {activeTab === 'privacy' && (
              <div className="animate-fadeIn space-y-10">
                <div className="text-xl font-bold text-slate-900 dark:text-white">1. Data Collection & Retention</div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  By using Veritas, you grant us permission to store and analyze the images you upload. These images are retained indefinitely in our secure cloud storage (Cloudinary) and linked to prediction metadata in our database (Supabase).
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span><strong>Purpose:</strong> Data is used exclusively to retrain the EfficientNet model and track detection performance.</span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span><strong>Security:</strong> Transfers are encrypted via TLS 1.3. Storage buckets are protected by strict access policies.</span>
                  </li>
                </ul>

                <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">2. Your Rights</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Depending on your jurisdiction, you may have specific rights regarding your data.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href="https://gdpr.eu/what-does-it-mean-to-be-gdpr-compliant/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group">
                    <span className="font-medium text-sm">GDPR (Europe)</span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                  </a>
                  <a href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group">
                    <span className="font-medium text-sm">CCPA (California)</span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                  </a>
                  <a href="https://artificialintelligenceact.eu/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group">
                    <span className="font-medium text-sm">EU AI Act</span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                  </a>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">3. Data Deletion</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  To request the deletion of your data from our training set, please contact our legal team with the image hash or filename provided during your scan session.
                </p>
              </div>
            )}

            {/* TERMS OF SERVICE CONTENT */}
            {activeTab === 'terms' && (
              <div className="animate-fadeIn space-y-10">
                <div className="p-6 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/50 rounded-xl">
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-500 flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5" /> Content Liability
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 leading-relaxed">
                    Veritas is an analysis tool. We do not claim ownership of uploaded content. You retain all rights to the images you upload. You are solely responsible for ensuring you have the right to upload and analyze any specific image.
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
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">2. Prohibited Use</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    You agree not to use Veritas to:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>Harass, intimidate, or defame others using analysis results.</li>
                    <li>Upload illegal, CSAM, or non-consensual intimate imagery.</li>
                    <li>Reverse engineer the API or attempt to flood the service.</li>
                  </ul>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800"></div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">3. Limitation of Liability</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Veritas and its contributors shall not be liable for any damages resulting from your use of the service, including but not limited to false positives or false negatives in detection.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="text-center pt-12 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Start Verification</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto text-lg">
            Ready to test our methodology? Launch the forensic scanner to begin analyzing images.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Try the Scanner <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}