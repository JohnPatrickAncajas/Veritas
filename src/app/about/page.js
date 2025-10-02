"use client";

export default function AboutPage() {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      {/* About content */}
      <main className="flex flex-col flex-1 px-6 py-12 items-center text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          About Veritas
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl leading-relaxed mb-8">
          Veritas is a <b>face-type detection tool</b> designed to classify images as{" "}
          <b className="text-purple-600 dark:text-purple-400">AI</b>,{" "}
          <b className="text-green-600 dark:text-green-400">Real</b>,{" "}
          <b className="text-yellow-500 dark:text-yellow-400">2D</b>, or{" "}
          <b className="text-blue-500 dark:text-blue-400">3D</b>. 
          It’s not about solving deep problems—it’s a simple, fast, and clean way to label
          and sort faces in images, artwork, or renders.
        </p>

        <div className="flex flex-col gap-6 w-full text-left">
          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow duration-300">
            <h2 className="font-bold text-lg mb-2 text-purple-600 dark:text-purple-400">AI Faces</h2>
            <p className="text-gray-800 dark:text-gray-200">
              These faces often have <b>shiny, smooth skin</b>, <b>high contrast</b>, and slightly artificial features. 
              Lines may be exaggerated and proportions subtly stylized, making the face look almost real but a bit too perfect.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow duration-300">
            <h2 className="font-bold text-lg mb-2 text-green-600 dark:text-green-400">Real Faces</h2>
            <p className="text-gray-800 dark:text-gray-200">
              Faces captured from real photographs. These have <b>natural imperfections</b>, realistic lighting, 
              and textures that AI or 2D renders typically cannot fully mimic.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow duration-300">
            <h2 className="font-bold text-lg mb-2 text-yellow-500 dark:text-yellow-400">2D Faces</h2>
            <p className="text-gray-800 dark:text-gray-200">
              Fully illustrated or drawn characters. These faces often have <b>bold outlines</b>, flat or stylized shading, 
              and exaggerated expressions common in cartoons, anime, or comics.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow duration-300">
            <h2 className="font-bold text-lg mb-2 text-blue-500 dark:text-blue-400">3D Faces</h2>
            <p className="text-gray-800 dark:text-gray-200">
              Generated using 3D modeling or rendering software. These faces have <b>realistic lighting</b>, shadows, and depth 
              but may still look slightly artificial compared to real photographs. Often seen in CGI, game assets, or 3D renders.
            </p>
          </div>
        </div>

        <p className="mt-10 text-gray-600 dark:text-gray-400 text-lg sm:text-xl">
          Veritas uses a trained <b>EfficientNet</b> model to classify faces quickly and accurately. 
          Its goal is clear: help you distinguish AI, Real, 2D, and 3D faces at a glance.
        </p>
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} Veritas – Built with Next.js & PyTorch
      </footer>
    </div>
  );
}
