"use client";
import { Github, ShieldCheck, Globe, Scan } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 font-black text-xl text-slate-900 dark:text-white">
            <Scan className="w-6 h-6 text-blue-600" />
            <span>VERITAS</span>
          </div>
          <p className="text-slate-500 max-w-xs">
            Open-source forensic analysis for the digital age. Empowering users to detect synthetic media and deepfakes through advanced computer vision.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {/* Links Column 1 */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4">Project</h4>
          <ul className="space-y-2 text-slate-500">
            <li><a href="/methodology" className="hover:text-blue-500 transition-colors">Methodology</a></li>
            <li><a href="/about" className="hover:text-blue-500 transition-colors">About Team</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Source Code</a></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-slate-500">
            <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
            <li className="flex items-center gap-2 text-xs pt-2 text-emerald-600 dark:text-emerald-500 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure Processing</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Veritas Initiative. All rights reserved.
      </div>
    </footer>
  );
}