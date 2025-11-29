"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Scan, 
  Menu, 
  X, 
  Brain, 
  Info, 
  ShieldCheck 
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Scanner", icon: Scan },
    { href: "/methodology", label: "Methodology", icon: Brain },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
            <div className="p-2 bg-slate-900 dark:bg-white rounded-xl group-hover:scale-105 transition-transform">
              <Scan className="w-5 h-5 text-white dark:text-slate-900" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Veritas
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 px-4 py-2 text-xs text-slate-400">
              <ShieldCheck className="w-3 h-3" />
              <span>Secure Session Active</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}