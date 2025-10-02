"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Predict" },
    { href: "/how-to-use", label: "How to Use?" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 via-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 backdrop-blur-md">
      {/* Logo / Title */}
      <div className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text select-none">
        Veritas
      </div>

      {/* Links */}
      <div className="flex gap-6 text-sm sm:text-base font-medium">
        {links.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`transition-colors duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold"
                  : "hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
